"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { AppShell } from "@/components/ui/AppShell";
import { useFounder } from "@/context/FounderContext";
import { toolsData, Tool } from "@/data/tools";
import { phasesData } from "@/data/phases";
import { 
  Search, Settings, Filter, Save, Scale, AlertCircle, 
  ExternalLink, CheckCircle, Info, Landmark, ChevronDown,
  Plus, X
} from "lucide-react";

export default function Tools() {
  const { savedTools, toggleSaveTool, customTools, addCustomTool } = useFounder();
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedToolsToCompare, setSelectedToolsToCompare] = useState<string[]>([]);
  const [showComparison, setShowComparison] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  // Modal form states for custom tools
  const [showAddModal, setShowAddModal] = useState(false);
  const [newName, setNewName] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [newCategory, setNewCategory] = useState("Validation");
  const [newPhaseId, setNewPhaseId] = useState(0);
  const [newDescription, setNewDescription] = useState("");
  const [newPricing, setNewPricing] = useState("Free");
  const [successAlert, setSuccessAlert] = useState("");

  const combinedTools = [...toolsData, ...customTools];

  // Check if a specific tool ID was requested in URL search params (e.g., from command center search redirect)
  useEffect(() => {
    const id = searchParams?.get("id");
    if (id) {
      const tool = combinedTools.find(t => t.id === id);
      if (tool) {
        setSearchQuery(tool.name);
      }
    }
  }, [searchParams, combinedTools]);

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

  // Filtering tools
  const filteredTools = combinedTools.filter(tool => {
    const categoryMatch = selectedCategory === "All" || tool.category === selectedCategory;
    const query = searchQuery.toLowerCase();
    const searchMatch = 
      tool.name.toLowerCase().includes(query) ||
      tool.description.toLowerCase().includes(query) ||
      tool.useCases.some(u => u.toLowerCase().includes(query)) ||
      tool.tags.some(t => t.toLowerCase().includes(query));
    return categoryMatch && searchMatch;
  });

  const toggleCompareSelection = (toolId: string) => {
    setSelectedToolsToCompare(prev => 
      prev.includes(toolId)
        ? prev.filter(id => id !== toolId)
        : prev.length < 3 
          ? [...prev, toolId] 
          : prev
    );
  };

  const getCompareToolsData = () => {
    return combinedTools.filter(t => selectedToolsToCompare.includes(t.id));
  };

  // Mock static comparison details to simulate heavy database records
  const getComparisonAttributes = (toolId: string) => {
    switch (toolId) {
      case "shopify":
        return {
          price: "₹1,999/mo + 2% tx",
          ease: "Very High",
          indiaReady: "98% (Shiprocket, Razorpay ready)",
          bestFor: "D2C brands starting up",
          integrations: "Canva, Facebook, Google, WhatsApp CRM",
          curve: "Low (No-code visual)"
        };
      case "instamojo":
        return {
          price: "Free setup, 2% + ₹3 transaction fee",
          ease: "Extremely High",
          indiaReady: "96% (Built for Indian SMBs)",
          bestFor: "Freelancers, single digital products",
          integrations: "UPI checkouts, SMS billing",
          curve: "Very Low (Instantly live)"
        };
      case "stripe":
        return {
          price: "2.9% + $0.30 (International)",
          ease: "Medium",
          indiaReady: "85% (Requires import documentation)",
          bestFor: "SaaS & international agency clients",
          integrations: "API-driven hooks, Next.js, billing",
          curve: "High (Requires code config)"
        };
      case "razorpay":
        return {
          price: "2% per transactions fee",
          ease: "High",
          indiaReady: "100% (Gold Standard in India)",
          bestFor: "D2C stores & domestic SaaS sites",
          integrations: "One-click Shopify, WooCommerce, API",
          curve: "Medium (Custom keys)"
        };
      case "zoho-books":
        return {
          price: "Free < ₹20L turnover; starts ₹799/mo",
          ease: "Medium",
          indiaReady: "99% (Fully GST-compliant filing)",
          bestFor: "Tax invoices & compliance tracking",
          integrations: "Payment gateways, ICICI bank links",
          curve: "Medium (Tax configurations)"
        };
      case "vyapar":
        return {
          price: "Free Mobile App; ₹2,399/yr Desktop",
          ease: "High",
          indiaReady: "98% (Local billing focus)",
          bestFor: "Offline trade shopkeepers, small retail",
          integrations: "WhatsApp bills, thermal printing",
          curve: "Low (Intuitive bookkeeping)"
        };
      default:
        const tool = combinedTools.find(t => t.id === toolId);
        return {
          price: tool?.pricingDetails || "Varies",
          ease: "Medium",
          indiaReady: `${tool?.indiaScore || 90}% Readiness`,
          bestFor: tool?.useCases[0] || "Founders",
          integrations: "API, Zapier",
          curve: tool?.difficulty || "Medium"
        };
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
        
        {/* Page Banner */}
        <div className="p-5 bg-brand-surface border border-brand-border rounded-2xl glass-panel text-left flex justify-between items-center flex-wrap gap-4">
          <div className="flex-1 min-w-[250px]">
            <span className="text-[10px] text-brand-accent font-mono uppercase tracking-wider">Verified June 2026</span>
            <h1 className="font-display font-black text-2xl text-white mt-0.5">Indian Tool Vault</h1>
            <p className="text-xs text-text-secondary mt-1">
              IMDb-style index for startup building software in India. Bookmark items to lock progress configurations on your dashboard.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowAddModal(true)}
              className="px-3.5 py-2 bg-brand-accent text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-brand-accent/25 hover:shadow-brand-accent/40 hover:scale-[1.02] transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Add Custom Resource</span>
            </button>
            {selectedToolsToCompare.length > 1 && (
              <button
                onClick={() => setShowComparison(prev => !prev)}
                className="px-4 py-2 bg-brand-accent text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-brand-accent/20 flex items-center gap-1.5 cursor-pointer"
              >
                <Scale className="w-4 h-4" />
                <span>{showComparison ? "Close Comparison" : `Compare Selected (${selectedToolsToCompare.length})`}</span>
              </button>
            )}
          </div>
        </div>

        {/* Success Alert toast banner */}
        {successAlert && (
          <div className="p-4 bg-brand-success/10 border border-brand-success/30 text-brand-success text-xs rounded-xl flex items-center gap-2.5 shadow-[0_0_15px_rgba(34,197,94,0.15)] text-left">
            <CheckCircle className="w-5 h-5 flex-shrink-0 animate-bounce" />
            <span className="font-semibold text-slate-200">{successAlert}</span>
          </div>
        )}

        {/* Comparison Dashboard overlay */}
        {showComparison && selectedToolsToCompare.length > 1 && (
          <div className="p-6 bg-[#0F162A]/90 border border-brand-accent/30 rounded-2xl glass-panel-heavy text-left space-y-4">
            <h3 className="font-display font-bold text-sm text-white uppercase tracking-wider flex items-center gap-1.5 border-b border-brand-border pb-2">
              <Scale className="w-4 h-4 text-brand-accent" />
              Side-By-Side Comparison Matrix
            </h3>
            
            <div className="overflow-x-auto">
              <table className="w-full text-xs font-sans">
                <thead>
                  <tr className="border-b border-brand-border">
                    <th className="py-2 text-text-secondary font-mono font-bold text-left w-1/4">Criteria</th>
                    {getCompareToolsData().map(tool => (
                      <th key={tool.id} className="py-2 font-bold text-brand-accent text-left">{tool.name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-border/60 text-slate-300">
                  <tr>
                    <td className="py-2.5 font-semibold text-text-secondary">Category</td>
                    {getCompareToolsData().map(tool => (
                      <td key={tool.id} className="py-2.5">{tool.category}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-2.5 font-semibold text-text-secondary">India Score</td>
                    {getCompareToolsData().map(tool => (
                      <td key={tool.id} className="py-2.5 font-mono font-bold text-brand-success">{tool.indiaScore}/100</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-2.5 font-semibold text-text-secondary">Pricing Details</td>
                    {getCompareToolsData().map(tool => (
                      <td key={tool.id} className="py-2.5">{getComparisonAttributes(tool.id).price}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-2.5 font-semibold text-text-secondary">Ease of Setup</td>
                    {getCompareToolsData().map(tool => (
                      <td key={tool.id} className="py-2.5">{getComparisonAttributes(tool.id).ease}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-2.5 font-semibold text-text-secondary">India-specific Readiness</td>
                    {getCompareToolsData().map(tool => (
                      <td key={tool.id} className="py-2.5">{getComparisonAttributes(tool.id).indiaReady}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-2.5 font-semibold text-text-secondary">Best For</td>
                    {getCompareToolsData().map(tool => (
                      <td key={tool.id} className="py-2.5">{getComparisonAttributes(tool.id).bestFor}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-2.5 font-semibold text-text-secondary">Integrations</td>
                    {getCompareToolsData().map(tool => (
                      <td key={tool.id} className="py-2.5 text-[10px]">{getComparisonAttributes(tool.id).integrations}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-2.5 font-semibold text-text-secondary">Learning Curve</td>
                    {getCompareToolsData().map(tool => (
                      <td key={tool.id} className="py-2.5">{getComparisonAttributes(tool.id).curve}</td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Filter controls */}
        <div className="flex flex-col sm:flex-row gap-3">
          
          {/* Search box input */}
          <div className="flex-1 bg-slate-900 border border-brand-border rounded-xl px-3 py-2 flex items-center gap-2 focus-within:border-brand-accent transition-colors">
            <Search className="w-4.5 h-4.5 text-text-secondary" />
            <input 
              type="text"
              placeholder="Search tools by name, utility, or keywords..."
              className="bg-transparent border-none text-xs text-text-primary focus:outline-none flex-1"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Custom Category Dropdown */}
          <div className={`relative ${showCategoryDropdown ? "z-30" : "z-10"}`}>
            <button
              onClick={() => setShowCategoryDropdown(prev => !prev)}
              className="bg-slate-900 border border-brand-border rounded-xl px-3.5 py-2 flex items-center gap-2 hover:border-brand-accent transition-colors text-xs text-text-primary cursor-pointer h-full"
            >
              <Filter className="w-4 h-4 text-text-secondary" />
              <span>Category: <b className="text-brand-accent">{selectedCategory}</b></span>
              <ChevronDown className="w-3.5 h-3.5 text-text-secondary ml-1" />
            </button>

            {showCategoryDropdown && (
              <>
                <div 
                  className="fixed inset-0 z-10" 
                  onClick={() => setShowCategoryDropdown(false)} 
                />
                <div className="absolute right-0 mt-2 w-48 bg-[#0F162A] border border-brand-border rounded-xl shadow-2xl overflow-hidden z-50">
                  <div className="text-[9px] uppercase font-bold text-text-secondary tracking-widest px-3 py-2 border-b border-brand-border/40">
                    Filter Category
                  </div>
                  <div className="max-h-60 overflow-y-auto">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => {
                          setSelectedCategory(cat);
                          setShowCategoryDropdown(false);
                        }}
                        className={`w-full text-left px-3.5 py-2 text-xs transition-colors cursor-pointer ${
                          selectedCategory === cat
                            ? "bg-brand-accent/15 text-brand-accent font-semibold"
                            : "text-slate-400 hover:bg-slate-800 hover:text-white"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

        </div>

        {/* Tool Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {filteredTools.map((tool) => {
            const isSaved = savedTools.includes(tool.id);
            const isCompared = selectedToolsToCompare.includes(tool.id);
            const isCustomTool = tool.id.startsWith("custom-tool-");

            return (
              <div 
                key={tool.id}
                className="glass-panel border border-brand-border rounded-xl p-5 flex flex-col justify-between hover:border-brand-accent/40 transition-colors text-left"
              >
                <div>
                  
                  {/* Card header */}
                  <div className="flex justify-between items-start gap-2">
                    <div className="flex flex-wrap gap-1.5 items-center">
                      <span className="text-[9px] font-mono font-bold text-brand-accent uppercase tracking-wide bg-brand-accent/5 px-2 py-0.5 rounded border border-brand-accent/15">
                        {tool.category}
                      </span>
                      {isCustomTool && (
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-brand-accent/20 border border-brand-accent/35 text-brand-accent font-mono">
                          Custom Link
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-1">
                      {/* Compare checkbox */}
                      <button
                        onClick={() => toggleCompareSelection(tool.id)}
                        className={`p-1.5 rounded border transition-colors cursor-pointer ${
                          isCompared 
                            ? "bg-purple-900/30 border-brand-accent text-brand-accent" 
                            : "bg-slate-950 border-brand-border text-slate-500 hover:text-white"
                        }`}
                        title="Compare Tool"
                      >
                        <Scale className="w-3.5 h-3.5" />
                      </button>

                      {/* Bookmark button */}
                      <button
                        onClick={() => toggleSaveTool(tool.id)}
                        className={`p-1.5 rounded border transition-colors cursor-pointer ${
                          isSaved 
                            ? "bg-brand-success/10 border-brand-success/30 text-brand-success" 
                            : "bg-slate-950 border-brand-border text-slate-500 hover:text-white"
                        }`}
                        title="Bookmark Tool"
                      >
                        <Save className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <h3 className="font-display font-black text-sm text-white mt-3 flex items-center gap-1.5">
                    {tool.name}
                  </h3>
                  <p className="text-[10px] text-text-secondary leading-relaxed mt-1.5">
                    {tool.description}
                  </p>

                  <div className="mt-3.5 flex items-center gap-1.5 flex-wrap">
                    {tool.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="text-[8px] font-mono text-slate-400 bg-slate-900 px-1.5 py-0.5 rounded border border-brand-border/40">
                        #{tag}
                      </span>
                    ))}
                  </div>

                </div>

                <div className="border-t border-brand-border/40 mt-5 pt-3.5 space-y-3">
                  
                  {/* Scores dashboard */}
                  <div className="grid grid-cols-2 gap-2 text-[9px] font-mono text-text-secondary">
                    <div className="flex items-center justify-between border-r border-brand-border/40 pr-2">
                      <span>India Readiness:</span>
                      <span className="font-bold text-brand-success">{tool.indiaScore}%</span>
                    </div>
                    <div className="flex items-center justify-between pl-2">
                      <span>AI Automation:</span>
                      <span className="font-bold text-brand-accent">{tool.aiScore}%</span>
                    </div>
                  </div>

                  {/* Actions buttons */}
                  <div className="flex items-center justify-between pt-1.5">
                    <span className="text-[9px] font-bold text-slate-400">
                      Pricing: <span className="text-white">{tool.pricing}</span>
                    </span>
                    <a
                      href={tool.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-slate-950 border border-brand-border hover:border-brand-accent hover:text-white rounded text-[10px] text-text-secondary transition-all cursor-pointer flex items-center gap-1 font-semibold"
                    >
                      <span>Visit Site</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                </div>
              </div>
            );
          })}
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
