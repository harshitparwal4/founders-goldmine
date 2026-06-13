"use client";

import React, { useState } from "react";
import { AppShell } from "@/components/ui/AppShell";
import { useFounder } from "@/context/FounderContext";
import { grantsData, Grant } from "@/data/grants";
import { Coins, Filter, CheckCircle2, AlertTriangle, ExternalLink, ShieldCheck, MapPin, ChevronDown } from "lucide-react";

export default function Grants() {
  const { profile, selectedTrack } = useFounder();
  
  // Interactive filters
  const [filterState, setFilterState] = useState("All");
  const [filterIndustry, setFilterIndustry] = useState("All");
  const [budgetRange, setBudgetRange] = useState(2500000); // 25 Lakhs default slider
  const [showStateDropdown, setShowStateDropdown] = useState(false);
  const [showIndustryDropdown, setShowIndustryDropdown] = useState(false);

  const statesList = ["All", "Rajasthan", "Karnataka", "Maharashtra", "Delhi", "All India"];
  const industriesList = ["All", "Sustainable", "Manufacturing", "AI Startup", "Dropshipping", "Food Business", "Creator", "Freelancer"];

  // Helper matching formula to output Green/Yellow/Red
  const getEligibilityStatus = (grant: Grant) => {
    const userState = profile.location.split(",")[1]?.trim() || "Rajasthan";
    const userTrack = selectedTrack;

    // Check location match
    const locationMatch = grant.state === "All India" || userState.toLowerCase().includes(grant.state.toLowerCase());
    
    // Check industry/track match
    const industryMatch = grant.industry.includes("All") || grant.industry.some(i => userTrack.toLowerCase().includes(i.toLowerCase()) || i.toLowerCase().includes(userTrack.toLowerCase()));

    if (locationMatch && industryMatch) {
      return { status: "Eligible", color: "text-brand-success bg-brand-success/10 border-brand-success/20", label: "Highly Eligible" };
    } else if (locationMatch || grant.state === "All India") {
      return { status: "Maybe", color: "text-brand-warning bg-brand-warning/10 border-brand-warning/20", label: "Potentially Eligible" };
    } else {
      return { status: "Not Eligible", color: "text-brand-danger bg-brand-danger/10 border-brand-danger/20", label: "Ineligible" };
    }
  };

  // Main filter engine
  const filteredGrants = grantsData.filter(grant => {
    const stateMatch = filterState === "All" || grant.state === "All India" || grant.state.toLowerCase() === filterState.toLowerCase();
    const industryMatch = filterIndustry === "All" || grant.industry.includes("All") || grant.industry.some(i => i.toLowerCase() === filterIndustry.toLowerCase());
    const budgetMatch = grant.amountVal <= budgetRange || budgetRange >= 10000000; // if set to max slider, allow all
    return stateMatch && industryMatch && budgetMatch;
  });

  return (
    <AppShell>
      <div className="space-y-6">
        
        {/* Banner */}
        <div className="p-5 bg-brand-surface border border-brand-border rounded-2xl glass-panel text-left">
          <span className="text-[10px] text-brand-success font-mono uppercase tracking-wider">Dynamic Radar Matrix</span>
          <h1 className="font-display font-black text-2xl text-white mt-0.5">Government Grant Radar</h1>
          <p className="text-xs text-text-secondary mt-1">
            Matches government subsidies, state allowances, and credit lending schemes based on your profile context (<span className="text-white font-semibold">{profile.location}</span>, active track <span className="text-white font-semibold">{selectedTrack}</span>).
          </p>
        </div>

        {/* Filter panel */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-900/40 p-4 border border-brand-border rounded-2xl glass-panel text-left">
          
          {/* State filter */}
          <div className={`space-y-1.5 text-left relative ${showStateDropdown ? "z-30" : "z-10"}`}>
            <label className="text-[10px] font-mono text-text-secondary uppercase">Regional Territory</label>
            <div className="relative">
              <button
                onClick={() => setShowStateDropdown(prev => !prev)}
                className="w-full bg-slate-950 border border-brand-border rounded-xl p-2.5 text-xs text-text-primary focus:outline-none hover:border-brand-accent transition-colors flex items-center justify-between cursor-pointer"
              >
                <span>{filterState}</span>
                <ChevronDown className="w-3.5 h-3.5 text-text-secondary ml-1" />
              </button>

              {showStateDropdown && (
                <>
                  <div 
                    className="fixed inset-0 z-10" 
                    onClick={() => setShowStateDropdown(false)} 
                  />
                  <div className="absolute left-0 mt-2 w-full bg-[#0F162A] border border-brand-border rounded-xl shadow-2xl overflow-hidden z-50">
                    <div className="max-h-60 overflow-y-auto">
                      {statesList.map((st) => (
                        <button
                          key={st}
                          onClick={() => {
                            setFilterState(st);
                            setShowStateDropdown(false);
                          }}
                          className={`w-full text-left px-3.5 py-2 text-xs transition-colors cursor-pointer ${
                            filterState === st
                              ? "bg-brand-accent/15 text-brand-accent font-semibold"
                              : "text-slate-400 hover:bg-slate-800 hover:text-white"
                          }`}
                        >
                          {st}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Industry filter */}
          <div className={`space-y-1.5 text-left relative ${showIndustryDropdown ? "z-30" : "z-10"}`}>
            <label className="text-[10px] font-mono text-text-secondary uppercase">Business Sector</label>
            <div className="relative">
              <button
                onClick={() => setShowIndustryDropdown(prev => !prev)}
                className="w-full bg-slate-950 border border-brand-border rounded-xl p-2.5 text-xs text-text-primary focus:outline-none hover:border-brand-accent transition-colors flex items-center justify-between cursor-pointer"
              >
                <span>{filterIndustry}</span>
                <ChevronDown className="w-3.5 h-3.5 text-text-secondary ml-1" />
              </button>

              {showIndustryDropdown && (
                <>
                  <div 
                    className="fixed inset-0 z-10" 
                    onClick={() => setShowIndustryDropdown(false)} 
                  />
                  <div className="absolute left-0 mt-2 w-full bg-[#0F162A] border border-brand-border rounded-xl shadow-2xl overflow-hidden z-50">
                    <div className="max-h-60 overflow-y-auto">
                      {industriesList.map((ind) => (
                        <button
                          key={ind}
                          onClick={() => {
                            setFilterIndustry(ind);
                            setShowIndustryDropdown(false);
                          }}
                          className={`w-full text-left px-3.5 py-2 text-xs transition-colors cursor-pointer ${
                            filterIndustry === ind
                              ? "bg-brand-accent/15 text-brand-accent font-semibold"
                              : "text-slate-400 hover:bg-slate-800 hover:text-white"
                          }`}
                        >
                          {ind}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Budget Range slider */}
          <div className="space-y-1.5 flex flex-col justify-center">
            <div className="flex justify-between text-[10px] font-mono text-text-secondary">
              <span>Grant Value Target:</span>
              <span className="text-brand-success font-bold">
                {budgetRange >= 10000000 ? "Any amount" : `Up to ₹${(budgetRange / 100000).toFixed(0)} Lakhs`}
              </span>
            </div>
            <input 
              type="range"
              min="50000"
              max="10000000"
              step="50000"
              value={budgetRange}
              onChange={(e) => setBudgetRange(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-950 border border-brand-border rounded-lg appearance-none cursor-pointer accent-brand-success mt-2"
            />
          </div>

        </div>

        {/* Radar List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredGrants.map((grant) => {
            const eligibility = getEligibilityStatus(grant);

            return (
              <div 
                key={grant.id}
                className="glass-panel border border-brand-border rounded-2xl p-5 hover:border-brand-accent/40 transition-all text-left flex flex-col justify-between"
              >
                <div className="space-y-4">
                  
                  {/* Card Header */}
                  <div className="flex justify-between items-start gap-4">
                    <div className="space-y-1">
                      <span className="text-[9px] font-mono font-bold text-slate-400 bg-slate-900 border border-brand-border px-2 py-0.5 rounded">
                        {grant.state}
                      </span>
                      <h3 className="font-display font-black text-sm text-white mt-1.5 leading-snug">
                        {grant.name}
                      </h3>
                    </div>
                    
                    {/* Eligibility marker */}
                    <span className={`text-[9px] font-bold px-2 py-1 rounded border uppercase tracking-wider whitespace-nowrap ${eligibility.color}`}>
                      {eligibility.label}
                    </span>
                  </div>

                  <p className="text-[10px] text-text-secondary leading-relaxed">
                    {grant.description}
                  </p>

                  {/* Requirements checklist */}
                  <div className="space-y-2 bg-slate-950/60 p-3 rounded-xl border border-brand-border/40">
                    <h4 className="text-[9px] uppercase tracking-wider font-mono font-bold text-slate-400 flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-brand-accent" />
                      Eligibility Requirements
                    </h4>
                    <ul className="space-y-1.5 pl-4 list-disc text-slate-300">
                      {grant.eligibility.map((req, idx) => (
                        <li key={idx} className="text-[9px] leading-normal">{req}</li>
                      ))}
                    </ul>
                  </div>

                </div>

                {/* Footer metrics & actions */}
                <div className="border-t border-brand-border/40 mt-5 pt-4 flex items-center justify-between text-[10px]">
                  <div className="space-y-0.5 text-left">
                    <div className="text-text-secondary">Value Pool:</div>
                    <div className="font-display font-extrabold text-xs text-white">{grant.amount}</div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="text-right hidden sm:block">
                      <div className="text-text-secondary">Difficulty:</div>
                      <div className="font-bold text-slate-300">{grant.difficulty}</div>
                    </div>
                    <a
                      href={grant.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-slate-950 border border-brand-border hover:border-brand-accent hover:text-white rounded-xl text-text-secondary hover:shadow-[0_0_15px_rgba(168,85,247,0.15)] transition-all cursor-pointer flex items-center gap-1.5 font-bold"
                    >
                      <span>Apply Portal</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </AppShell>
  );
}
