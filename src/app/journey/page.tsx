"use client";

import React, { useState } from "react";
import { AppShell } from "@/components/ui/AppShell";
import { useFounder } from "@/context/FounderContext";
import { phasesData, Phase } from "@/data/phases";
import { toolsData } from "@/data/tools";
import { 
  CheckCircle2, Circle, AlertCircle, Sparkles, ChevronRight, 
  ChevronDown, BookOpen, Key, DollarSign, Zap 
} from "lucide-react";

export default function Journey() {
  const { completedTasks, toggleTask, selectedTrack } = useFounder();
  const [expandedPhaseId, setExpandedPhaseId] = useState<number | null>(1); // default expand Phase 1

  // Checks if all tasks inside a phase are completed
  const isPhaseCompleted = (phase: Phase) => {
    return phase.tasks.every(t => completedTasks.includes(t.id));
  };

  // Checks if a phase is the active phase (the first phase containing incomplete tasks)
  const isPhaseActive = (phase: Phase) => {
    for (const p of phasesData) {
      const incomplete = p.tasks.some(t => !completedTasks.includes(t.id));
      if (incomplete) return p.id === phase.id;
    }
    // If all tasks are completed, the last phase is active
    return phase.id === phasesData.length - 1;
  };

  const toggleExpand = (phaseId: number) => {
    setExpandedPhaseId(prev => (prev === phaseId ? null : phaseId));
  };

  return (
    <AppShell>
      <div className="space-y-6">
        
        {/* Banner Section */}
        <div className="p-5 bg-brand-surface border border-brand-border rounded-2xl glass-panel text-left">
          <span className="text-[10px] text-brand-accent font-mono uppercase tracking-wider">System A: Self Navigation</span>
          <h1 className="font-display font-black text-2xl text-white mt-0.5">Founder Execution Journey</h1>
          <p className="text-xs text-text-secondary mt-1">
            Complete the milestones sequentially. The central spine changes colors in real-time as you execute and progress. Active track: <span className="text-white font-semibold">{selectedTrack}</span>.
          </p>
        </div>

        {/* Timeline Layout */}
        <div className="relative pl-10 md:pl-12 py-4">
          
          {/* Vertical Spine Line */}
          <div className="absolute left-[18px] md:left-[22px] top-0 bottom-0 w-[3px] bg-slate-900 border-l border-brand-border/40 pointer-events-none z-0">
            {/* Dynamic filled spine representing progress */}
            <div 
              className="w-full spine-gradient transition-all duration-500 rounded-full" 
              style={{
                height: `${
                  (phasesData.filter(p => isPhaseCompleted(p)).length / phasesData.length) * 100
                }%`
              }}
            />
          </div>

          <div className="space-y-8 relative z-10">
            {phasesData.map((phase) => {
              const completed = isPhaseCompleted(phase);
              const active = isPhaseActive(phase);
              const expanded = expandedPhaseId === phase.id;

              return (
                <div key={phase.id} className="relative text-left">
                  
                  {/* Spine Node Marker */}
                  <div 
                    onClick={() => toggleExpand(phase.id)}
                    className={`absolute -left-[32px] md:-left-[36px] top-1.5 w-6 h-6 rounded-full flex items-center justify-center border transition-all cursor-pointer z-10 ${
                      completed 
                        ? "bg-brand-success border-brand-success text-slate-950 timeline-glow-green" 
                        : active 
                          ? "bg-brand-warning border-brand-warning text-slate-950 pulse-active-node" 
                          : "bg-slate-950 border-brand-border text-slate-500 hover:border-brand-accent"
                    }`}
                  >
                    {completed ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      <span className="text-[10px] font-mono font-bold">{phase.id}</span>
                    )}
                  </div>

                  {/* Phase Card */}
                  <div className={`glass-panel border rounded-xl overflow-hidden transition-all ${
                    expanded 
                      ? "border-brand-border/80" 
                      : "border-brand-border/40 hover:border-brand-accent/50"
                  }`}>
                    
                    {/* Header Toggle */}
                    <div 
                      onClick={() => toggleExpand(phase.id)}
                      className="p-4 flex items-center justify-between cursor-pointer bg-slate-900/20"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono font-bold text-brand-accent">
                            PHASE 0{phase.id}
                          </span>
                          {active && (
                            <span className="text-[8px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded bg-brand-warning/15 border border-brand-warning/20 text-brand-warning">
                              Active Goal
                            </span>
                          )}
                        </div>
                        <h3 className={`font-display font-bold text-sm mt-0.5 ${active ? "text-brand-warning" : "text-white"}`}>
                          {phase.name}
                        </h3>
                        <p className="text-[10px] text-text-secondary truncate mt-0.5">
                          {phase.tagline}
                        </p>
                      </div>

                      {expanded ? (
                        <ChevronDown className="w-4 h-4 text-text-secondary" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-text-secondary" />
                      )}
                    </div>

                    {/* Expanded Content Panel */}
                    {expanded && (
                      <div className="p-5 border-t border-brand-border/60 bg-[#0F162A]/40 space-y-5 font-sans text-xs">
                        
                        <p className="text-xs text-text-secondary leading-relaxed">
                          {phase.description}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          
                          {/* Objectives & Deliverables */}
                          <div className="space-y-3.5">
                            <div>
                              <h4 className="font-bold text-white uppercase tracking-wider text-[10px] mb-1.5 flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 bg-brand-accent rounded-full" />
                                Key Objectives
                              </h4>
                              <ul className="space-y-1 pl-3 list-disc text-text-secondary">
                                {phase.objectives.map((obj, i) => (
                                  <li key={i}>{obj}</li>
                                ))}
                              </ul>
                            </div>

                            <div>
                              <h4 className="font-bold text-white uppercase tracking-wider text-[10px] mb-1.5 flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 bg-brand-success rounded-full" />
                                Targets & Deliverables
                              </h4>
                              <ul className="space-y-1 pl-3 list-disc text-text-secondary">
                                {phase.deliverables.map((del, i) => (
                                  <li key={i}>{del}</li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          {/* Common Mistakes to Avoid */}
                          <div className="p-4 bg-brand-danger/5 border border-brand-danger/15 rounded-xl space-y-2.5">
                            <h4 className="font-bold text-brand-danger uppercase tracking-wider text-[10px] flex items-center gap-1.5">
                              <AlertCircle className="w-4 h-4" />
                              Common Indian Founder Mistakes
                            </h4>
                            <ul className="space-y-1.5 text-text-secondary leading-normal">
                              {phase.mistakes.map((mistake, i) => (
                                <li key={i} className="flex items-start gap-1.5">
                                  <span className="text-brand-danger font-bold">×</span>
                                  <span>{mistake}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                        </div>

                        {/* Integrated tools shortcut */}
                        {phase.toolIds.length > 0 && (
                          <div className="border-t border-brand-border/60 pt-4">
                            <h4 className="font-bold text-white uppercase tracking-wider text-[10px] mb-2">
                              Verified Tools for this Phase
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {toolsData.filter(t => phase.toolIds.includes(t.id)).map((tool) => (
                                <a
                                  key={tool.id}
                                  href={tool.website}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="px-2.5 py-1 bg-slate-900 border border-brand-border rounded hover:border-brand-accent transition-colors text-[10px] text-text-secondary hover:text-text-primary"
                                >
                                  {tool.name}
                                </a>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Interactive Phase checklist */}
                        <div className="border-t border-brand-border/60 pt-4 space-y-3">
                          <h4 className="font-bold text-white uppercase tracking-wider text-[10px]">
                            Checklist Progress
                          </h4>
                          <div className="flex flex-col gap-2">
                            {phase.tasks.map((task) => {
                              const isTaskDone = completedTasks.includes(task.id);
                              return (
                                <div
                                  key={task.id}
                                  onClick={() => toggleTask(task.id)}
                                  className={`flex items-start gap-3 p-3 rounded-lg border transition-all cursor-pointer ${
                                    isTaskDone 
                                      ? "bg-brand-success/5 border-brand-success/15 text-text-secondary" 
                                      : "bg-slate-950 border-brand-border/80 hover:border-brand-accent/50 text-text-primary"
                                  }`}
                                >
                                  <input 
                                    type="checkbox"
                                    checked={isTaskDone}
                                    readOnly
                                    className="w-4 h-4 rounded border-brand-border text-brand-success focus:ring-brand-success bg-transparent mt-0.5 cursor-pointer accent-brand-success"
                                  />
                                  <div className="flex-1">
                                    <span className={isTaskDone ? "line-through text-slate-500" : ""}>
                                      {task.text}
                                    </span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                      </div>
                    )}
                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </AppShell>
  );
}
