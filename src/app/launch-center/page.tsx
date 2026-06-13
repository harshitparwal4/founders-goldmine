"use client";

import React, { useState } from "react";
import { AppShell } from "@/components/ui/AppShell";
import { useFounder } from "@/context/FounderContext";
import { Rocket, CheckSquare, Sparkles, Scale, ExternalLink, Calendar, Plus, Save, AlertCircle } from "lucide-react";

export default function LaunchCenter() {
  const { launchReadiness, completedTasks, toggleTask, profile } = useFounder();
  
  // Custom states for copywriting templates
  const [launchTagline, setLaunchTagline] = useState("India's first decentralized plastic waste recycling network.");
  const [shortPitch, setShortPitch] = useState("We enable small manufacturing units in Rajasthan to source verified, quality-tested plastic scrap directly from local recyclers with automated compliance logs, cutting procurement costs by 30%.");
  const [savedCopy, setSavedCopy] = useState(false);

  // Custom checklist states for launch preparation
  const launchPrepTasks = [
    { id: "lp-t1", text: "Design high-fidelity product screenshots and dashboard mockups.", category: "Assets" },
    { id: "lp-t2", text: "Create a 60-second product walkthrough video link.", category: "Assets" },
    { id: "lp-t3", text: "Draft launch emails to notify our 100+ waitlist subscribers.", category: "Outreach" },
    { id: "lp-t4", text: "Draft a personalized founder announcement thread for Indie Hackers & LinkedIn.", category: "Copywriting" },
    { id: "lp-t5", text: "Submit details to Startup India for official DPIIT certificates.", category: "Compliance" }
  ];

  const handleSaveCopy = () => {
    setSavedCopy(true);
    setTimeout(() => setSavedCopy(false), 2000);
  };

  const platforms = [
    { name: "Product Hunt", url: "https://www.producthunt.com", target: "Global early adopters", traffic: "High", difficulty: "Hard" },
    { name: "BetaList", url: "https://betalist.com", target: "Early stage software users", traffic: "Medium", difficulty: "Easy" },
    { name: "Smol Launch", url: "https://smollaunch.com", target: "Developer & Indie projects", traffic: "Low", difficulty: "Easy" },
    { name: "Uneed", url: "https://www.uneed.best", target: "Curated software directories", traffic: "Medium", difficulty: "Medium" },
    { name: "Hacker News", url: "https://news.ycombinator.com", target: "Tech enthusiasts & builders", traffic: "Very High", difficulty: "Hard" },
    { name: "Indie Hackers", url: "https://www.indiehackers.com", target: "Bootstrappers & developers", traffic: "Medium", difficulty: "Medium" }
  ];

  return (
    <AppShell>
      <div className="space-y-6">
        
        {/* Banner */}
        <div className="p-5 bg-brand-surface border border-brand-border rounded-2xl glass-panel text-left flex justify-between items-center flex-wrap gap-4">
          <div className="flex-1 min-w-[250px]">
            <span className="text-[10px] text-brand-accent font-mono uppercase tracking-wider">Mission Deployment</span>
            <h1 className="font-display font-black text-2xl text-white mt-0.5">Founder Launch Center</h1>
            <p className="text-xs text-text-secondary mt-1">
              Track your launch checklist parameters and coordinate submittals to directories.
            </p>
          </div>
          
          <div className="flex items-center gap-3 bg-slate-900 border border-brand-border px-4 py-2.5 rounded-xl text-left">
            <div>
              <div className="text-[9px] uppercase font-mono font-bold text-text-secondary">Readiness Score</div>
              <div className="font-display font-extrabold text-lg text-brand-warning">{launchReadiness}%</div>
            </div>
            <div className="w-16 bg-slate-950 h-2 rounded-full overflow-hidden border border-brand-border/40">
              <div className="bg-brand-warning h-full transition-all duration-500" style={{ width: `${launchReadiness}%` }} />
            </div>
          </div>
        </div>

        {/* Content columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main tasks & copywriting */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Launch preparation checklist */}
            <div className="glass-panel border border-brand-border rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-2 border-b border-brand-border/60 pb-3">
                <CheckSquare className="w-5 h-5 text-brand-accent" />
                <h2 className="font-display font-extrabold text-sm uppercase tracking-wider text-white">
                  Launch Preparation Sprints
                </h2>
              </div>

              <div className="flex flex-col gap-2">
                {launchPrepTasks.map((task) => {
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
                      <div className="flex-1 text-left">
                        <span className={`text-xs ${isDone ? "line-through text-slate-500" : "font-medium"}`}>
                          {task.text}
                        </span>
                        <span className="text-[8px] uppercase tracking-wider font-mono font-bold px-1.5 py-0.5 bg-slate-950 border border-brand-border rounded text-slate-400 ml-2">
                          {task.category}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Launch copywriting workspace */}
            <div className="glass-panel border border-brand-border rounded-2xl p-6 space-y-4 text-left">
              <div className="flex items-center justify-between border-b border-brand-border/60 pb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-brand-accent animate-pulse" />
                  <h2 className="font-display font-extrabold text-sm uppercase tracking-wider text-white">
                    Onboarding Copywriting Workspace
                  </h2>
                </div>
                <button
                  onClick={handleSaveCopy}
                  className="px-3 py-1.5 bg-slate-900 border border-brand-border rounded hover:border-brand-accent text-[10px] text-text-secondary hover:text-white transition-all cursor-pointer flex items-center gap-1 font-semibold"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{savedCopy ? "Saved!" : "Save Copy"}</span>
                </button>
              </div>

              <div className="space-y-4 text-xs font-sans">
                <div className="space-y-1.5">
                  <label className="text-[9px] font-mono font-bold text-text-secondary uppercase">Launch Tagline (Max 60 Characters)</label>
                  <input
                    type="text"
                    value={launchTagline}
                    onChange={(e) => setLaunchTagline(e.target.value)}
                    className="w-full bg-slate-950 border border-brand-border rounded-lg p-2.5 text-xs text-text-primary focus:outline-none focus:border-brand-accent"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] font-mono font-bold text-text-secondary uppercase">Short Elevator Pitch (Max 250 Characters)</label>
                  <textarea
                    rows={4}
                    value={shortPitch}
                    onChange={(e) => setShortPitch(e.target.value)}
                    className="w-full bg-slate-950 border border-brand-border rounded-lg p-2.5 text-xs text-text-primary focus:outline-none focus:border-brand-accent leading-relaxed"
                  />
                </div>
              </div>
            </div>

          </div>

          {/* Right sidebar: Launch Platform catalogs */}
          <div className="space-y-6">
            
            <div className="glass-panel border border-brand-border rounded-2xl p-6 space-y-4 text-left">
              <div className="flex items-center gap-2 border-b border-brand-border/60 pb-3">
                <Rocket className="w-5 h-5 text-brand-accent" />
                <h2 className="font-display font-extrabold text-sm uppercase tracking-wider text-white">
                  Target Launch Platforms
                </h2>
              </div>

              <div className="flex flex-col gap-3">
                {platforms.map((plat) => (
                  <div 
                    key={plat.name}
                    className="p-3 bg-slate-900/60 border border-brand-border rounded-xl space-y-2"
                  >
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-xs text-text-primary">{plat.name}</h4>
                      <a
                        href={plat.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-brand-accent hover:underline flex items-center gap-0.5 text-[9px] font-semibold"
                      >
                        Submit <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    </div>
                    
                    <p className="text-[10px] text-text-secondary leading-normal">
                      Focus: {plat.target}
                    </p>

                    <div className="flex justify-between items-center text-[9px] font-mono text-text-secondary pt-1 border-t border-brand-border/30">
                      <span>Traffic: <b className="text-white">{plat.traffic}</b></span>
                      <span>Difficulty: <b className="text-white">{plat.difficulty}</b></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </AppShell>
  );
}
