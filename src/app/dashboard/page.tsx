"use client";

import React from "react";
import { AppShell } from "@/components/ui/AppShell";
import { useFounder } from "@/context/FounderContext";
import { phasesData, PhaseTask } from "@/data/phases";
import { toolsData } from "@/data/tools";
import { grantsData } from "@/data/grants";
import { 
  Trophy, CheckSquare, Sparkles, AlertCircle, ArrowRight, Save, 
  MapPin, Coins, Zap, ShieldAlert, BadgeInfo 
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const { 
    profile, 
    selectedTrack, 
    completedTasks, 
    toggleTask, 
    savedTools, 
    founderScore, 
    scoreTier, 
    scoreBreakdown,
    launchReadiness,
    streak 
  } = useFounder();

  // Find active phase details based on task completion
  // We'll treat the active phase as the first phase where there are incomplete tasks
  const getActivePhase = () => {
    for (const phase of phasesData) {
      const incomplete = phase.tasks.some(t => !completedTasks.includes(t.id));
      if (incomplete) return phase;
    }
    return phasesData[phasesData.length - 1];
  };

  const activePhase = getActivePhase();

  // Filter saved tools
  const bookmarkedTools = toolsData.filter(t => savedTools.includes(t.id));

  // Get matching grants based on location & track (e.g. Rajasthan, Sustainable)
  const getMatchingGrants = () => {
    return grantsData.filter(g => {
      const stateMatch = g.state === "All India" || profile.location.includes(g.state);
      const industryMatch = g.industry.includes("All") || g.industry.some(i => selectedTrack.includes(i) || i.includes(selectedTrack));
      return stateMatch && industryMatch;
    }).slice(0, 3);
  };

  const matchedGrants = getMatchingGrants();

  // Get active phase task checklist
  const phaseTasks = activePhase.tasks;

  // Calculate dynamic NEXT IMMEDIATE STEP based on active incomplete tasks
  const getNextImmediateStep = () => {
    const nextTask = phaseTasks.find(t => !completedTasks.includes(t.id));
    if (nextTask) {
      return {
        text: nextTask.text,
        phase: activePhase.name
      };
    }
    // Fallback if current phase is fully complete
    return {
      text: "Navigate to the Journey tab to unlock Phase " + (activePhase.id + 1) + " milestones.",
      phase: activePhase.name
    };
  };

  const nextStep = getNextImmediateStep();

  return (
    <AppShell>
      <div className="space-y-6">
        
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 bg-[#1E293B]/30 border border-brand-border/60 rounded-2xl glass-panel relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
            <Sparkles className="w-24 h-24 text-brand-accent" />
          </div>
          <div>
            <span className="text-[10px] text-brand-accent font-mono uppercase tracking-wider">Welcome back, founder</span>
            <h1 className="font-display font-black text-2xl md:text-3xl text-white mt-1">
              Welcome back, {profile.name}
            </h1>
            <p className="text-xs text-text-secondary mt-1 max-w-xl">
              Operating system set to <span className="text-white font-semibold">{selectedTrack}</span> startup in <span className="text-white font-semibold">{profile.location}</span>. Keep building to compound your momentum.
            </p>
          </div>
          <button 
            onClick={() => router.push("/journey")}
            className="px-4 py-2.5 bg-slate-900 border border-brand-border rounded-xl text-xs hover:border-brand-accent hover:text-white transition-colors cursor-pointer self-start md:self-center flex items-center gap-1.5"
          >
            <span>Timeline Spine</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Dashboard Metrics Cockpit */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* Founder Score Circular Meter */}
          <div className="glass-panel border border-brand-border rounded-2xl p-5 flex flex-col justify-between h-48 relative overflow-hidden">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-text-secondary uppercase font-bold tracking-widest">Founder Score</span>
                <span className="text-[10px] bg-brand-accent/20 border border-brand-accent/30 text-brand-accent font-mono px-2 py-0.5 rounded-full font-bold uppercase">
                  {scoreTier}
                </span>
              </div>
              <div className="flex items-baseline gap-2 mt-4">
                <span className="text-5xl font-mono font-black text-white">{founderScore}</span>
                <span className="text-text-secondary text-sm font-mono">/ 100</span>
              </div>
            </div>

            {/* Micro Progress bar for score categories */}
            <div className="space-y-1.5 mt-2">
              <div className="flex justify-between text-[9px] text-text-secondary font-mono">
                <span>Clarity: {scoreBreakdown.clarity}%</span>
                <span>Compliance: {scoreBreakdown.compliance}%</span>
                <span>Product: {scoreBreakdown.product}%</span>
              </div>
              <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden border border-brand-border/40">
                <div 
                  className="h-full bg-gradient-to-r from-brand-accent to-brand-success transition-all duration-500" 
                  style={{ width: `${founderScore}%` }}
                />
              </div>
            </div>
          </div>

          {/* Active Phase & Progress */}
          <div className="glass-panel border border-brand-border rounded-2xl p-5 flex flex-col justify-between h-48">
            <div>
              <span className="text-[10px] text-text-secondary uppercase font-bold tracking-widest">Current Stage</span>
              <h3 className="font-display font-extrabold text-base text-white mt-1">
                Phase {activePhase.id}: {activePhase.name}
              </h3>
              <p className="text-[10px] text-text-secondary leading-normal mt-1.5 max-w-[250px]">
                &quot;{activePhase.tagline}&quot;
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-mono">
                <span className="text-text-secondary">Phase Tasks Completed:</span>
                <span className="text-brand-success font-semibold">
                  {activePhase.tasks.filter(t => completedTasks.includes(t.id)).length} / {activePhase.tasks.length}
                </span>
              </div>
              <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden border border-brand-border/40">
                <div 
                  className="h-full bg-brand-success transition-all duration-500" 
                  style={{ 
                    width: `${
                      (activePhase.tasks.filter(t => completedTasks.includes(t.id)).length / activePhase.tasks.length) * 100
                    }%` 
                  }}
                />
              </div>
            </div>
          </div>

          {/* Launch Readiness Panel */}
          <div className="glass-panel border border-brand-border rounded-2xl p-5 flex flex-col justify-between h-48">
            <div>
              <span className="text-[10px] text-text-secondary uppercase font-bold tracking-widest">Launch Readiness</span>
              <div className="flex items-baseline gap-1 mt-4">
                <span className="text-5xl font-mono font-black text-brand-warning">{launchReadiness}%</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-mono">
                <span className="text-text-secondary">GST, Payment & Domain status:</span>
                <span>{launchReadiness > 50 ? "Ready to Deploy" : "Sourcing MVP"}</span>
              </div>
              <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden border border-brand-border/40">
                <div 
                  className="h-full bg-brand-warning transition-all duration-500" 
                  style={{ width: `${launchReadiness}%` }}
                />
              </div>
            </div>
          </div>

        </div>

        {/* Dashboard Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Columns (Checklist & Goals) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Active Goals Checklist */}
            <div className="glass-panel border border-brand-border rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-brand-border/60 pb-3">
                <div className="flex items-center gap-2">
                  <CheckSquare className="w-5 h-5 text-brand-accent" />
                  <h2 className="font-display font-extrabold text-sm uppercase tracking-wider text-white">
                    Active Execution Checklist
                  </h2>
                </div>
                <span className="text-[10px] text-text-secondary font-mono">
                  Phase {activePhase.id} Action items
                </span>
              </div>

              <div className="flex flex-col gap-2">
                {phaseTasks.map((task) => {
                  const isDone = completedTasks.includes(task.id);
                  return (
                    <div 
                      key={task.id}
                      onClick={() => toggleTask(task.id)}
                      className={`flex items-start gap-3 p-3.5 rounded-xl border transition-all cursor-pointer ${
                        isDone 
                          ? "bg-brand-success/5 border-brand-success/20 text-text-secondary" 
                          : "bg-slate-900/60 border-brand-border hover:border-brand-accent/50 text-text-primary"
                      }`}
                    >
                      <input 
                        type="checkbox"
                        checked={isDone}
                        readOnly
                        className="w-4 h-4 rounded border-brand-border text-brand-success focus:ring-brand-success bg-transparent mt-0.5 cursor-pointer accent-brand-success"
                      />
                      <div className="flex-1">
                        <span className={`text-xs ${isDone ? "line-through text-slate-500" : "font-medium"}`}>
                          {task.text}
                        </span>
                        <div className="flex gap-2 mt-1.5">
                          <span className="text-[8px] uppercase tracking-wider font-mono font-bold px-1.5 py-0.5 bg-slate-950 border border-brand-border rounded text-slate-400">
                            {task.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Saved Tools Drawer */}
            <div className="glass-panel border border-brand-border rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-brand-border/60 pb-3">
                <div className="flex items-center gap-2">
                  <Save className="w-5 h-5 text-brand-accent" />
                  <h2 className="font-display font-extrabold text-sm uppercase tracking-wider text-white">
                    Bookmarked Operating Tools
                  </h2>
                </div>
                <button 
                  onClick={() => router.push("/tools")}
                  className="text-[10px] text-brand-accent hover:underline cursor-pointer"
                >
                  Browse Vault
                </button>
              </div>

              {bookmarkedTools.length === 0 ? (
                <div className="text-center py-6 text-xs text-text-secondary bg-slate-900/40 rounded-xl border border-brand-border/40">
                  No saved tools. Browse our catalog to bookmark resources.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {bookmarkedTools.map((tool) => (
                    <div 
                      key={tool.id}
                      className="p-3 bg-slate-900/60 border border-brand-border rounded-xl hover:border-brand-accent/50 transition-colors flex items-center justify-between"
                    >
                      <div>
                        <h4 className="font-bold text-xs text-text-primary">{tool.name}</h4>
                        <span className="text-[9px] text-text-secondary mt-0.5 block">{tool.category}</span>
                      </div>
                      <a 
                        href={tool.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 bg-slate-950 border border-brand-border hover:border-brand-accent hover:text-white rounded text-[10px] text-text-secondary transition-all cursor-pointer font-semibold"
                      >
                        Launch
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* Right Column (Grants, Notes, Context) */}
          <div className="space-y-6">
            
            {/* Aryan Intelligence Summary */}
            <div className="glass-panel border border-[#EF4444]/20 rounded-2xl p-5 relative overflow-hidden bg-slate-900/20">
              <div className="absolute top-0 right-0 p-3 opacity-5 pointer-events-none">
                <ShieldAlert className="w-16 h-16 text-brand-accent" />
              </div>

              <div className="flex items-center gap-1.5 text-brand-accent">
                <BadgeInfo className="w-4 h-4 text-brand-accent" />
                <h3 className="font-display font-bold text-xs uppercase tracking-wider">Aryan Context Summary</h3>
              </div>

              <div className="mt-3 p-3 bg-slate-950/70 border border-brand-border rounded-xl text-xs leading-relaxed text-slate-300">
                <span className="font-bold text-white">Current Track Strategy:</span> Focus heavily on unit economics and logistics. Setup a current account using Udyam concessions to bypass gateway waiting lists.
              </div>
            </div>

            {/* Grant Radar Opportunities */}
            <div className="glass-panel border border-brand-border rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-brand-border/60 pb-3">
                <div className="flex items-center gap-2">
                  <Coins className="w-5 h-5 text-brand-success" />
                  <h2 className="font-display font-extrabold text-sm uppercase tracking-wider text-white">
                    Eligible Grants Matching
                  </h2>
                </div>
                <button 
                  onClick={() => router.push("/grants")}
                  className="text-[10px] text-brand-success hover:underline cursor-pointer"
                >
                  Open Radar
                </button>
              </div>

              <div className="flex flex-col gap-3">
                {matchedGrants.map((grant) => (
                  <div 
                    key={grant.id}
                    className="p-3 bg-slate-900/60 border border-brand-border rounded-xl space-y-2 text-left"
                  >
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-xs text-text-primary line-clamp-1 flex-1">
                        {grant.name}
                      </h4>
                      <span className="text-[9px] font-bold text-brand-success bg-brand-success/15 px-1.5 py-0.5 rounded ml-2 border border-brand-success/20">
                        Match
                      </span>
                    </div>
                    <p className="text-[10px] text-text-secondary line-clamp-2">
                      {grant.description}
                    </p>
                    <div className="flex justify-between items-center text-[9px] font-mono text-text-secondary pt-1">
                      <span>Value: <b className="text-white">{grant.amount}</b></span>
                      <span>Diff: <b className="text-white">{grant.difficulty}</b></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Global YOUR NEXT IMMEDIATE STEP Sticky footer */}
        <div className="p-4 bg-brand-warning/10 border border-brand-warning/30 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-[0_0_20px_rgba(245,158,11,0.08)]">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-brand-warning/20 border border-brand-warning/35 rounded-xl text-brand-warning">
              <Zap className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="text-[10px] font-mono font-black text-brand-warning uppercase tracking-widest">
                YOUR NEXT IMMEDIATE STEP • {nextStep.phase}
              </div>
              <p className="font-display font-extrabold text-sm text-slate-100 mt-0.5">
                {nextStep.text}
              </p>
            </div>
          </div>
          <button 
            onClick={() => router.push("/journey")}
            className="px-4 py-2 bg-brand-warning hover:bg-brand-warning/90 text-slate-950 font-bold text-xs rounded-xl shadow-lg transition-colors cursor-pointer self-stretch sm:self-auto text-center"
          >
            Execute Step
          </button>
        </div>

      </div>
    </AppShell>
  );
}
