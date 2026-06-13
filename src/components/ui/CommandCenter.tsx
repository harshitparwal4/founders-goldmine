"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { toolsData } from "@/data/tools";
import { grantsData } from "@/data/grants";
import { phasesData } from "@/data/phases";
import { Search, Sparkles, BookOpen, Key, DollarSign, Settings, CheckSquare } from "lucide-react";
import { useFounder } from "@/context/FounderContext";

interface SearchItem {
  id: string;
  name: string;
  category: "Tool" | "Grant" | "Phase" | "Track" | "Resource";
  url: string;
  desc: string;
}

export const CommandCenter: React.FC = () => {
  const router = useRouter();
  const { setSelectedTrack } = useFounder();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<SearchItem[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  
  const inputRef = useRef<HTMLInputElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  // Set hydration mount state
  useEffect(() => {
    setMounted(true);
  }, []);

  // Compile all searchable indexes on mount
  const searchIndex: SearchItem[] = [
    // Phases
    ...phasesData.map(p => ({
      id: `phase-${p.id}`,
      name: `Phase ${p.id}: ${p.name}`,
      category: "Phase" as const,
      url: `/journey`,
      desc: p.tagline
    })),
    // Tools
    ...toolsData.map(t => ({
      id: `tool-${t.id}`,
      name: t.name,
      category: "Tool" as const,
      url: `/tools?id=${t.id}`,
      desc: `${t.category} • Rating: ${t.founderRating} ★`
    })),
    // Grants
    ...grantsData.map(g => ({
      id: `grant-${g.id}`,
      name: g.name,
      category: "Grant" as const,
      url: `/grants`,
      desc: `${g.state} • Value: ${g.amount}`
    })),
    // Tracks
    { id: "track-d2c", name: "D2C Brand Track", category: "Track", url: "/dashboard", desc: "Build physical product ecommerce brand in India." },
    { id: "track-agency", name: "B2B Agency Track", category: "Track", url: "/dashboard", desc: "Start consultancy, design, or engineering agency." },
    { id: "track-recycle", name: "Sustainable & Recycling Track", category: "Track", url: "/dashboard", desc: "Explore EPR, CPCB clearances and green energy." },
    { id: "track-creator", name: "Creator Economy Track", category: "Track", url: "/dashboard", desc: "Sponsor pipelines for YouTube, Substack, Instagram builders." },
    { id: "track-ai", name: "AI Startup Track", category: "Track", url: "/dashboard", desc: "Software tooling using RAG, embeddings and agentic workflows." },
    // Resources
    { id: "res-momp", name: "The Mom Test Book Summary", category: "Resource", url: "/learn", desc: "How to talk to customers & validate ideas." },
    { id: "res-lean", name: "The Lean Startup Playbook", category: "Resource", url: "/learn", desc: "Build MVP, iterate fast, and avoid waste." },
    { id: "res-bplan", name: "Business Model Canvas Template", category: "Resource", url: "/learn", desc: "One-page business plan worksheet." },
    { id: "res-pitch", name: "D2C Investor Pitch Deck", category: "Resource", url: "/learn", desc: "Standard 10-slide startup pitch outline." }
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && (e.key?.toLowerCase() === "k" || e.code === "KeyK")) {
        e.preventDefault();
        e.stopPropagation();
        setIsOpen(prev => !prev);
      }
    };
    document.addEventListener("keydown", handleKeyDown, true);
    return () => document.removeEventListener("keydown", handleKeyDown, true);
  }, []);

  // Set focus on input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSearchQuery("");
      setActiveIndex(0);
    }
  }, [isOpen]);

  // Handle fuzzy searching
  useEffect(() => {
    if (!searchQuery.trim()) {
      setResults(searchIndex.slice(0, 5));
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = searchIndex.filter(
      item =>
        item.name.toLowerCase().includes(query) ||
        item.desc.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query)
    );
    setResults(filtered.slice(0, 8));
    setActiveIndex(0);
  }, [searchQuery]);

  const selectItem = (item: SearchItem) => {
    setIsOpen(false);
    if (item.category === "Track") {
      if (item.id === "track-d2c") setSelectedTrack("D2C Brand");
      else if (item.id === "track-agency") setSelectedTrack("B2B Agency");
      else if (item.id === "track-recycle") setSelectedTrack("Sustainable/Recycling");
      else if (item.id === "track-creator") setSelectedTrack("Creator");
      else if (item.id === "track-ai") setSelectedTrack("AI Startup");
      router.push("/dashboard");
    } else {
      router.push(item.url);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex(prev => (prev + 1) % Math.max(1, results.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex(prev => (prev - 1 + results.length) % Math.max(1, results.length));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (results[activeIndex]) {
        selectItem(results[activeIndex]);
      }
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Tool": return <Settings className="w-4 h-4 text-brand-accent" />;
      case "Grant": return <DollarSign className="w-4 h-4 text-brand-success" />;
      case "Phase": return <CheckSquare className="w-4 h-4 text-brand-warning" />;
      case "Track": return <Sparkles className="w-4 h-4 text-purple-400" />;
      default: return <BookOpen className="w-4 h-4 text-sky-400" />;
    }
  };

  // Button trigger elements sitting inline in the headers
  const triggerButton = (
    <button
      onClick={() => setIsOpen(true)}
      className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-brand-surface border border-brand-border rounded-lg text-sm text-text-secondary hover:text-text-primary hover:border-brand-accent transition-all cursor-pointer font-sans"
    >
      <Search className="w-4 h-4" />
      <span>Search anything...</span>
      <kbd className="text-xs bg-slate-900 border border-brand-border px-1.5 py-0.5 rounded text-slate-500 font-mono select-none ml-2">
        Ctrl + K
      </kbd>
    </button>
  );

  // Modal portal overlay content rendering at document.body level
  const modalContent = (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-md z-[9999] flex items-start justify-center p-4 md:p-20 font-sans"
      onClick={() => setIsOpen(false)}
    >
      {/* Solid background card, removing glass-panel opacity to hide underlying card text */}
      <div
        className="w-full max-w-2xl bg-[#0B0F19] border border-brand-border rounded-xl shadow-2xl overflow-hidden mt-10 z-[10000]"
        onClick={e => e.stopPropagation()}
      >
        {/* Search header */}
        <div className="flex items-center border-b border-brand-border px-4 py-3.5 gap-3">
          <Search className="w-5 h-5 text-text-secondary" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a tool, grant, stage, or track..."
            className="flex-1 bg-transparent border-none text-text-primary placeholder:text-text-secondary focus:outline-none text-sm"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <span className="text-xs bg-slate-900 border border-brand-border px-1.5 py-0.5 rounded text-slate-500 font-mono">
            ESC
          </span>
        </div>

        {/* Results list */}
        <div ref={listRef} className="max-h-[350px] overflow-y-auto p-2">
          {results.length === 0 ? (
            <div className="text-center py-8 text-text-secondary text-sm">
              No results found for &quot;<span className="text-text-primary">{searchQuery}</span>&quot;
            </div>
          ) : (
            <>
              <div className="text-[10px] uppercase font-bold text-text-secondary tracking-widest px-3 py-2">
                {searchQuery ? "Search Results" : "Suggested Actions"}
              </div>
              <div className="flex flex-col gap-1">
                {results.map((item, idx) => (
                  <div
                    key={item.id}
                    onClick={() => selectItem(item)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all ${
                      idx === activeIndex
                        ? "bg-brand-accent/25 border-l-2 border-brand-accent pl-2.5 text-text-primary"
                        : "hover:bg-slate-800/50 text-text-secondary"
                    }`}
                  >
                    <div className="p-1.5 bg-slate-900/60 rounded border border-brand-border">
                      {getCategoryIcon(item.category)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm truncate text-text-primary">
                          {item.name}
                        </span>
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 uppercase tracking-wide border border-brand-border">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-xs text-text-secondary truncate mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                    {idx === activeIndex && (
                      <span className="text-[10px] text-brand-accent font-mono border border-brand-accent/30 px-1 py-0.5 rounded uppercase font-semibold">
                        Enter
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Search footer */}
        <div className="bg-slate-950/80 border-t border-brand-border px-4 py-2.5 flex items-center justify-between text-xs text-slate-500 font-sans">
          <div className="flex gap-4">
            <span>↑↓ to navigate</span>
            <span>↵ to select</span>
            <span>esc to close</span>
          </div>
          <span className="text-brand-accent/70 font-semibold">The Founder&apos;s Goldmine OS</span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {triggerButton}
      {mounted && isOpen && createPortal(modalContent, document.body)}
    </>
  );
};
