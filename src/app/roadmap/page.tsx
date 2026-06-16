"use client";

import React, { useState } from "react";
import { AppShell } from "@/components/ui/AppShell";
import { useFounder } from "@/context/FounderContext";
import { phasesData, Phase } from "@/data/phases";
import { toolsData, Tool } from "@/data/tools";
import { 
  Search, ExternalLink, Save, MapPin, Sparkles, CheckCircle2, 
  ChevronDown, ChevronRight, Info, Globe, Cpu, Zap, BookOpen, 
  HelpCircle, ShieldCheck, Filter, ToggleLeft, ToggleRight,
  Plus, X, AlertCircle, CheckCircle
} from "lucide-react";

export default function Roadmap() {
  const { completedTasks, savedTools, toggleSaveTool, selectedTrack, customTools, addCustomTool } = useFounder();
  
  // States for search and interactive filters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showOnlyBookmarked, setShowOnlyBookmarked] = useState(false);
  const [expandedPhases, setExpandedPhases] = useState<Record<number, boolean>>({
    0: true, // expand phase 0 by default
    1: true, // expand phase 1 by default
  });

  // Modal form states for custom tools
  const [showAddModal, setShowAddModal] = useState(false);
  const [newName, setNewName] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [newCategory, setNewCategory] = useState("Validation");
  const [newPhaseId, setNewPhaseId] = useState(0);
  const [newDescription, setNewDescription] = useState("");
  const [newPricing, setNewPricing] = useState("Free");
  const [successAlert, setSuccessAlert] = useState("");

  const categories = [
    "All",
    "Validation",
    "Research",
    "Legal",
    "Accounting",
    "Payments",
    "Funding",
    "Supply Chain",
    "Website",
    "Marketing",
    "Operations",
    "Analytics"
  ];

  // Check if all tasks in a phase are complete
  const isPhaseCompleted = (phase: Phase) => {
    return phase.tasks.every(t => completedTasks.includes(t.id));
  };

  // Toggle expansion of a phase card
  const togglePhaseExpand = (phaseId: number) => {
    setExpandedPhases(prev => ({
      ...prev,
      [phaseId]: !prev[phaseId]
    }));
  };

  // Expand all / Collapse all helper functions
  const expandAll = () => {
    const allExpanded: Record<number, boolean> = {};
    phasesData.forEach(p => {
      allExpanded[p.id] = true;
    });
    setExpandedPhases(allExpanded);
  };

  const collapseAll = () => {
    setExpandedPhases({});
  };

  // Check if a tool matches the current filters
  const matchesFilters = (tool: Tool) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch = 
      tool.name.toLowerCase().includes(query) ||
      tool.description.toLowerCase().includes(query) ||
      tool.category.toLowerCase().includes(query) ||
      tool.tags.some(t => t.toLowerCase().includes(query)) ||
      tool.useCases.some(u => u.toLowerCase().includes(query));

    const matchesCat = selectedCategory === "All" || tool.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesBookmark = !showOnlyBookmarked || savedTools.includes(tool.id);

    return matchesSearch && matchesCat && matchesBookmark;
  };

  // Calculate pricing tier style/label
  const getPricingBadge = (pricing: string) => {
    switch (pricing.toLowerCase()) {
      case "free":
        return "bg-brand-success/15 border border-brand-success/30 text-brand-success";
      case "freemium":
        return "bg-brand-warning/15 border border-brand-warning/30 text-brand-warning";
      case "paid":
        return "bg-brand-accent/15 border border-brand-accent/30 text-brand-accent";
      default:
        return "bg-slate-900 border border-brand-border text-slate-300";
    }
  };

  // Handle submitting custom resource
  const handleSubmitCustomTool = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newUrl.trim() || !newDescription.trim()) return;

    // Standardize URL
    let formattedUrl = newUrl.trim();
    if (!/^https?:\/\//i.test(formattedUrl)) {
      formattedUrl = `https://${formattedUrl}`;
    }

    const customToolField = {
      name: newName.trim(),
      category: newCategory,
      description: newDescription.trim(),
      website: formattedUrl,
      pricing: newPricing,
      pricingDetails: `${newPricing} customized tool`,
      country: "Global",
      indiaScore: 90,
      aiScore: 80,
      founderRating: 5.0,
      difficulty: "Easy" as const,
      alternatives: [],
      useCases: ["Custom task execution"],
      tags: ["Custom", newCategory],
      lastVerified: "Just now",
      affiliateEligible: false
    };

    // Save custom tool via Context Provider
    addCustomTool(customToolField, newPhaseId);

    // Expand the target phase automatically to show the new card
    setExpandedPhases(prev => ({
      ...prev,
      [newPhaseId]: true
    }));

    // Reset Form and close modal
    setNewName("");
    setNewUrl("");
    setNewDescription("");
    setShowAddModal(false);

    // Trigger Success Alert
    setSuccessAlert(`"${customToolField.name}" has been successfully added to Phase ${newPhaseId}!`);
    setTimeout(() => {
      setSuccessAlert("");
    }, 4000);
  };

  return (
    <AppShell>
      <div className="space-y-6">
        
        {/* Banner Section */}
        <div className="p-5 bg-brand-surface border border-brand-border rounded-2xl glass-panel text-left flex flex-col md:flex-row md:items-center justify-between gap-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
            <Sparkles className="w-24 h-24 text-brand-accent animate-pulse" />
          </div>
          <div>
            <span className="text-[10px] text-brand-accent font-mono uppercase tracking-wider">Visual Spine Maps</span>
            <h1 className="font-display font-black text-2xl text-white mt-0.5">Resource Web-Map</h1>
            <p className="text-xs text-text-secondary mt-1 max-w-xl">
              An interactive, phase-by-phase directory mapping every stage of the founder journey directly to verified websites, official portals, and builder platforms. Bookmark tools to save them on your dashboard.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2 md:self-center">
            <button
              onClick={() => setShowAddModal(true)}
              className="px-3.5 py-2 bg-brand-accent text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-brand-accent/25 hover:shadow-brand-accent/40 hover:scale-[1.02] transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Add Custom Resource</span>
            </button>
            <button
              onClick={expandAll}
              className="px-3.5 py-2 bg-slate-900 border border-brand-border hover:border-brand-accent rounded-xl text-xs text-slate-300 hover:text-white transition-all cursor-pointer font-bold"
            >
              Expand All
            </button>
            <button
              onClick={collapseAll}
              className="px-3.5 py-2 bg-slate-900 border border-brand-border hover:border-brand-accent rounded-xl text-xs text-slate-300 hover:text-white transition-all cursor-pointer font-bold"
            >
              Collapse All
            </button>
          </div>
        </div>

        {/* Success Alert toast banner */}
        {successAlert && (
          <div className="p-4 bg-brand-success/10 border border-brand-success/30 text-brand-success text-xs rounded-xl flex items-center gap-2.5 shadow-[0_0_15px_rgba(34,197,94,0.15)] text-left">
            <CheckCircle className="w-5 h-5 flex-shrink-0 animate-bounce" />
            <span className="font-semibold text-slate-200">{successAlert}</span>
          </div>
        )}

        {/* Global Toolbar and Controls */}
        <div className="p-4 bg-slate-900/40 border border-brand-border rounded-2xl glass-panel text-left space-y-4">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="flex-1 max-w-md bg-slate-950 border border-brand-border rounded-xl px-3 py-2.5 flex items-center gap-2 focus-within:border-brand-accent transition-colors">
              <Search className="w-4.5 h-4.5 text-text-secondary" />
              <input 
                type="text"
                placeholder="Search websites by name, service or purpose..."
                className="bg-transparent border-none text-xs text-text-primary focus:outline-none flex-1 placeholder:text-slate-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Filter Group */}
            <div className="flex flex-wrap items-center gap-4">
              
              {/* Category Filter */}
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-text-secondary uppercase">Filter:</span>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-slate-950 border border-brand-border rounded-xl px-3 py-2 text-xs text-text-primary focus:outline-none hover:border-brand-accent transition-colors cursor-pointer"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Bookmark Toggle */}
              <button
                onClick={() => setShowOnlyBookmarked(prev => !prev)}
                className="flex items-center gap-2 px-3 py-2 bg-slate-950 border border-brand-border rounded-xl text-xs hover:border-brand-accent transition-colors cursor-pointer text-slate-300 hover:text-white"
              >
                {showOnlyBookmarked ? (
                  <ToggleRight className="w-5 h-5 text-brand-success" />
                ) : (
                  <ToggleLeft className="w-5 h-5 text-text-secondary" />
                )}
                <span>Show Bookmarked Only</span>
              </button>

            </div>
          </div>
        </div>

        {/* Vertical Spine Timeline Layout */}
        <div className="relative pl-10 md:pl-12 py-4">
          
          {/* Timeline Vertical Line Spine */}
          <div className="absolute left-[18px] md:left-[22px] top-0 bottom-0 w-[3px] bg-slate-900 border-l border-brand-border/40 pointer-events-none z-0">
            {/* Animated spine progression height indicator */}
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
              // Combine static toolsData with context customTools
              const staticTools = toolsData.filter(t => phase.toolIds.includes(t.id));
              const customPhaseTools = customTools.filter(t => t.phaseId === phase.id);
              const combinedTools = [...staticTools, ...customPhaseTools];
              const matchingTools = combinedTools.filter(matchesFilters);
              
              // Skip rendering phase card if user is searching/filtering and there are no matching tools in this phase
              if ((searchQuery || selectedCategory !== "All" || showOnlyBookmarked) && matchingTools.length === 0) {
                return null;
              }

              const isCompleted = isPhaseCompleted(phase);
              const isExpanded = !!expandedPhases[phase.id];

              return (
                <div key={phase.id} className="relative text-left">
                  
                  {/* Timeline Node Icon/Marker */}
                  <div 
                    onClick={() => togglePhaseExpand(phase.id)}
                    className={`absolute -left-[32px] md:-left-[36px] top-2.5 w-6 h-6 rounded-full flex items-center justify-center border transition-all cursor-pointer z-10 ${
                      isCompleted 
                        ? "bg-brand-success border-brand-success text-slate-950 timeline-glow-green" 
                        : isExpanded 
                          ? "bg-brand-accent border-brand-accent text-slate-950 pulse-active-node" 
                          : "bg-slate-950 border-brand-border text-slate-500 hover:border-brand-accent"
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      <span className="text-[10px] font-mono font-bold">{phase.id}</span>
                    )}
                  </div>

                  {/* Main Phase Card */}
                  <div className={`glass-panel border rounded-2xl overflow-hidden transition-all duration-300 ${
                    isExpanded 
                      ? "border-brand-border/80 shadow-[0_4px_20px_rgba(0,0,0,0.4)]" 
                      : "border-brand-border/40 hover:border-brand-accent/50"
                  }`}>
                    
                    {/* Accordion Toggle Header */}
                    <div 
                      onClick={() => togglePhaseExpand(phase.id)}
                      className="p-4 flex items-center justify-between cursor-pointer bg-slate-900/20 hover:bg-slate-900/40 transition-colors"
                    >
                      <div className="flex-1 min-w-0 pr-4">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono font-bold text-brand-accent uppercase tracking-wider">
                            Phase 0{phase.id}
                          </span>
                          <span className="text-[9px] font-mono text-slate-500 bg-slate-900/60 border border-brand-border px-1.5 py-0.5 rounded">
                            {combinedTools.length} Resources
                          </span>
                        </div>
                        <h3 className="font-display font-black text-base mt-1 text-white flex items-center gap-2">
                          {phase.name}
                        </h3>
                        <p className="text-xs text-text-secondary mt-0.5 italic line-clamp-1">
                          &quot;{phase.tagline}&quot;
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-[10px] text-text-secondary bg-[#1E293B] border border-brand-border px-2.5 py-1 rounded-lg font-mono font-semibold">
                          Score weight: {phase.scoreWeight}%
                        </span>
                        {isExpanded ? (
                          <ChevronDown className="w-4 h-4 text-text-secondary" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-text-secondary" />
                        )}
                      </div>
                    </div>

                    {/* Expandable Phase Content */}
                    {isExpanded && (
                      <div className="p-5 border-t border-brand-border/60 bg-[#0F162A]/40 space-y-5">
                        
                        <div className="bg-slate-950/60 p-3.5 rounded-xl border border-brand-border/45 space-y-1">
                          <h4 className="text-[10px] uppercase tracking-wider font-mono font-bold text-slate-400 flex items-center gap-1.5">
                            <Info className="w-3.5 h-3.5 text-brand-accent" />
                            Phase Description & Directives
                          </h4>
                          <p className="text-xs text-text-secondary leading-relaxed">
                            {phase.description}
                          </p>
                        </div>

                        {/* Websites & Platforms Cards Grid */}
                        <div className="space-y-3">
                          <h4 className="font-display font-bold text-xs text-white uppercase tracking-wider flex items-center gap-1.5 border-b border-brand-border pb-1">
                            <BookOpen className="w-4 h-4 text-brand-accent" />
                            Verified Platforms & Website Links
                          </h4>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                            {matchingTools.map((tool) => {
                              const isBookmarked = savedTools.includes(tool.id);
                              const isCustomTool = tool.id.startsWith("custom-tool-");

                              return (
                                <div 
                                  key={tool.id}
                                  className="glass-panel border border-brand-border rounded-xl p-4.5 flex flex-col justify-between hover:border-brand-accent/40 transition-colors text-left glow-hover"
                                >
                                  <div>
                                    
                                    {/* Tool Header */}
                                    <div className="flex justify-between items-start gap-2">
                                      <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                          <span className="text-[9px] font-mono font-bold text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-brand-border">
                                            {tool.category}
                                          </span>
                                          <span className={`text-[9px] font-bold px-2 py-0.5 rounded ${getPricingBadge(tool.pricing)}`}>
                                            {tool.pricing}
                                          </span>
                                          {isCustomTool && (
                                            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-brand-accent/20 border border-brand-accent/35 text-brand-accent font-mono">
                                              Custom Link
                                            </span>
                                          )}
                                        </div>
                                        <h4 className="font-display font-black text-sm text-white mt-1.5 flex items-center gap-1.5">
                                          {tool.name}
                                        </h4>
                                      </div>
                                      
                                      {/* Bookmark Button */}
                                      <button
                                        onClick={() => toggleSaveTool(tool.id)}
                                        className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                                          isBookmarked 
                                            ? "bg-brand-success/15 border-brand-success/35 text-brand-success" 
                                            : "bg-slate-950 border-brand-border text-slate-500 hover:text-white"
                                        }`}
                                        title={isBookmarked ? "Bookmarked" : "Bookmark resource"}
                                      >
                                        <Save className="w-3.5 h-3.5" />
                                      </button>
                                    </div>

                                    {/* Tool Description */}
                                    <p className="text-xs text-text-secondary leading-normal mt-2.5">
                                      {tool.description}
                                    </p>

                                    {/* Score Progress Metrics */}
                                    <div className="mt-4.5 space-y-2 bg-slate-950/60 p-2.5 rounded-xl border border-brand-border/30">
                                      {/* India Score */}
                                      <div className="space-y-1">
                                        <div className="flex justify-between text-[9px] font-mono text-text-secondary">
                                          <span>India Market Compatibility:</span>
                                          <span className="font-bold text-brand-success">{tool.indiaScore}/100</span>
                                        </div>
                                        <div className="w-full bg-slate-900 h-1 rounded-full overflow-hidden">
                                          <div 
                                            className="h-full bg-brand-success transition-all duration-300"
                                            style={{ width: `${tool.indiaScore}%` }}
                                          />
                                        </div>
                                      </div>
                                      {/* AI Automation Score */}
                                      <div className="space-y-1">
                                        <div className="flex justify-between text-[9px] font-mono text-text-secondary">
                                          <span>AI Automation Potential:</span>
                                          <span className="font-bold text-brand-accent">{tool.aiScore}/100</span>
                                        </div>
                                        <div className="w-full bg-slate-900 h-1 rounded-full overflow-hidden">
                                          <div 
                                            className="h-full bg-brand-accent transition-all duration-300"
                                            style={{ width: `${tool.aiScore}%` }}
                                          />
                                        </div>
                                      </div>
                                    </div>

                                    {/* Use Cases tags */}
                                    <div className="mt-4 flex flex-wrap gap-1.5">
                                      {tool.useCases.map((useCase, idx) => (
                                        <span 
                                          key={idx} 
                                          className="text-[8px] font-semibold text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-brand-border/40"
                                        >
                                          ✓ {useCase}
                                        </span>
                                      ))}
                                    </div>

                                  </div>

                                  {/* Link footer */}
                                  <div className="border-t border-brand-border/40 mt-4.5 pt-3.5 flex items-center justify-between">
                                    <span className="text-[10px] text-text-secondary flex items-center gap-1">
                                      <Globe className="w-3 h-3 text-slate-500" />
                                      {tool.country === "India" ? "🇮🇳 India Sourced" : "🌐 Global Service"}
                                    </span>

                                    <a
                                      href={tool.website}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="px-3.5 py-1.5 bg-slate-950 border border-brand-border hover:border-brand-accent hover:text-white rounded-lg text-xs text-text-secondary hover:shadow-[0_0_15px_rgba(168,85,247,0.15)] transition-all cursor-pointer flex items-center gap-1.5 font-bold"
                                    >
                                      <span>Launch Portal</span>
                                      <ExternalLink className="w-3.5 h-3.5" />
                                    </a>
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

      {/* Onboarding Add Custom Tool Modal Dialog */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[9999] flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-[#0F162A]/90 border border-brand-border rounded-2xl shadow-2xl glass-panel-heavy overflow-hidden p-6 sm:p-8 text-left space-y-6">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-3.5 border-b border-brand-border">
              <div className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-brand-accent animate-pulse" />
                <span className="font-display font-bold text-sm text-white">Add Custom Resource</span>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-xs text-text-secondary hover:text-brand-danger transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmitCustomTool} className="space-y-4">
              
              {/* Tool Name */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-text-secondary uppercase">Resource Name</label>
                <input
                  type="text"
                  placeholder="e.g. IndiaMART Wholesale Portal"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full bg-slate-950 border border-brand-border rounded-xl p-2.5 text-xs text-text-primary placeholder:text-text-secondary focus:border-brand-accent focus:outline-none"
                />
              </div>

              {/* Website URL */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-text-secondary uppercase">Website URL</label>
                <input
                  type="text"
                  placeholder="e.g. indiamart.com or https://..."
                  required
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  className="w-full bg-slate-950 border border-brand-border rounded-xl p-2.5 text-xs text-text-primary placeholder:text-text-secondary focus:border-brand-accent focus:outline-none"
                />
              </div>

              {/* Grid selectors */}
              <div className="grid grid-cols-2 gap-4">
                
                {/* Category Selection */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-text-secondary uppercase">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full bg-slate-950 border border-brand-border rounded-xl p-2.5 text-xs text-text-primary focus:border-brand-accent focus:outline-none cursor-pointer"
                  >
                    {categories.filter(c => c !== "All").map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Target Phase Selection */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-text-secondary uppercase">Target Phase</label>
                  <select
                    value={newPhaseId}
                    onChange={(e) => setNewPhaseId(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-brand-border rounded-xl p-2.5 text-xs text-text-primary focus:border-brand-accent focus:outline-none cursor-pointer"
                  >
                    {phasesData.map((phase) => (
                      <option key={phase.id} value={phase.id}>
                        Phase {phase.id}: {phase.name}
                      </option>
                    ))}
                  </select>
                </div>

              </div>

              {/* Pricing selector */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-text-secondary uppercase">Pricing Type</label>
                <div className="flex gap-3">
                  {["Free", "Freemium", "Paid"].map((opt) => (
                    <button
                      type="button"
                      key={opt}
                      onClick={() => setNewPricing(opt)}
                      className={`flex-1 p-2 text-xs rounded-xl border transition-all cursor-pointer ${
                        newPricing === opt
                          ? "bg-brand-accent/20 border-brand-accent text-brand-accent font-bold"
                          : "bg-slate-950 border-brand-border text-text-secondary hover:border-slate-700"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Short Description */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-text-secondary uppercase">Short Description</label>
                <textarea
                  rows={3}
                  placeholder="Describe what you use this website for (e.g. Sourcing suppliers for plastic molds)..."
                  required
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full bg-slate-950 border border-brand-border rounded-xl p-2.5 text-xs text-text-primary placeholder:text-text-secondary focus:border-brand-accent focus:outline-none"
                />
              </div>

              {/* Action buttons */}
              <div className="pt-4 flex justify-end gap-3 border-t border-brand-border">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4.5 py-2.5 border border-brand-border hover:border-slate-700 hover:text-white text-text-secondary text-xs rounded-xl transition-all cursor-pointer font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-brand-accent text-slate-950 text-xs font-bold rounded-xl shadow-lg shadow-brand-accent/25 hover:shadow-brand-accent/40 transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Submit to Roadmap</span>
                </button>
              </div>

            </form>

          </div>
        </div>
      )}
    </AppShell>
  );
}
