"use client";

import React, { useState } from "react";
import { AppShell } from "@/components/ui/AppShell";
import { BookOpen, FileText, Play, Download, Sparkles, Trophy, CheckCircle, HelpCircle, ExternalLink } from "lucide-react";

export default function Learn() {
  const [activeTab, setActiveTab] = useState<"case-studies" | "books" | "templates">("case-studies");
  const [downloadCounts, setDownloadCounts] = useState<Record<string, number>>({
    "bmc": 284,
    "pdeck": 512,
    "ccal": 418
  });

  const handleDownload = (key: string) => {
    setDownloadCounts(prev => ({
      ...prev,
      [key]: prev[key] + 1
    }));
  };

  const caseStudies = [
    {
      id: "cs-1",
      title: "How a Jaipur Founder Built a ₹5L/Month Recycling Sourcing Network",
      capital: "₹1,50,000",
      timeline: "6 Months",
      milestones: "First contract closed in 45 days. scaled to 12 active factory contracts in 6 months.",
      mistakes: "Spent too much time on logo design initially instead of calling scrap yards directly.",
      lessons: "Verify supply lines before selling to recycling mills. Cash flows are tight, negotiate advance terms.",
      tools: ["IndiaMART", "Vyapar", "Notion"],
      url: "https://yourstory.com/2023/10/rajasthan-scrap-recycling-startup-istart-jaipur"
    },
    {
      id: "cs-2",
      title: "Bootstrapping an Organic D2C Skincare Brand to ₹25L Annual Run Rate",
      capital: "₹80,000",
      timeline: "9 Months",
      milestones: "100 orders in first week. Scaled organically via Instagram Reels.",
      mistakes: "Paying for Facebook Ads too early with a negative unit economics margin.",
      lessons: "Focus heavily on repeat customer purchase rate. Content marketing drives higher LTV than pure ads.",
      tools: ["Shopify", "Canva", "Shiprocket", "Razorpay"],
      url: "https://www.starterstory.com/stories/how-i-started-an-organic-skincare-brand"
    },
    {
      id: "cs-3",
      title: "AI-Driven E-commerce & Store Dropshipping Blueprint",
      capital: "₹0 - ₹20,000",
      timeline: "30 Days",
      milestones: "Created AI storefront, validated products via spy tools, and launched AI video ads to scale to 10+ orders/day.",
      mistakes: "Purchasing inventory upfront before validating product demand and ad conversion rates.",
      lessons: "Target Indian Dropshipping margins: Product Cost (₹300) + Ads & Delivery (₹150) + Returns (₹100) vs Selling Price (₹999) = ₹450 profit per order (~₹1.35L/month on 10 orders/day).",
      tools: ["BuildYourStore.ai", "SellTheTrend", "Creatify.ai", "Shown.io", "Manychat"],
      url: "https://www.instagram.com/reel/DZMNP6BgCUy/"
    }
  ];

  const books = [
    {
      title: "The Mom Test",
      author: "Rob Fitzpatrick",
      concept: "How to validate business ideas without asking leading questions.",
      takeaway: "Never ask your mom if your idea is good. Ask about their active historical actions instead of future assumptions. Focus on specific past problems rather than hypothetical pricing."
    },
    {
      title: "The Lean Startup",
      author: "Eric Ries",
      concept: "Build, Measure, Learn iteration framework.",
      takeaway: "Build a Minimum Viable Product (MVP) immediately. Avoid wasting months coding features before measuring actual customer clicks. Pivot early if validation data rejects the core thesis."
    },
    {
      title: "Zero to One",
      author: "Peter Thiel",
      concept: "How to build companies that create new value.",
      takeaway: "Monopoly is the target. Avoid pure copycats. A startup should create a 10x improvement over existing options. Technology yields leaps, whereas globalization yields horizontal copycats."
    }
  ];

  const templates = [
    { id: "bmc", name: "One-Page Business Model Canvas", format: "PDF/Notion", size: "128 KB", desc: "Maps customer segments, value propositions, key resources, and cost structures on a single canvas." },
    { id: "pdeck", name: "Standard 10-Slide Seed Pitch Deck Guide", format: "PPTX/Canva", size: "2.1 MB", desc: "Outlines problem statements, market size estimations, product visual mockups, and VC funding targets." },
    { id: "ccal", name: "MSME Annual Tax & Compliance Calendar", format: "Excel/Notion", size: "85 KB", desc: "Pre-filled compliance roadmap listing GST return filings, TDS cuts, and Udyam certification checkups." }
  ];

  return (
    <AppShell>
      <div className="space-y-6">
        
        {/* Banner */}
        <div className="p-5 bg-brand-surface border border-brand-border rounded-2xl glass-panel text-left">
          <span className="text-[10px] text-brand-accent font-mono uppercase tracking-wider">Education Engine</span>
          <h1 className="font-display font-black text-2xl text-white mt-0.5">Founder Resource Vault</h1>
          <p className="text-xs text-text-secondary mt-1">
            Access verified playbooks, Indian success dossiers, pitch models, and book summaries to guide your journey.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-brand-border/60 pb-1.5 gap-2">
          {[
            { id: "case-studies", label: "Case Studies Dossiers", icon: <Trophy className="w-4.5 h-4.5" /> },
            { id: "books", label: "Essential Book Summaries", icon: <BookOpen className="w-4.5 h-4.5" /> },
            { id: "templates", label: "Downloadable Templates", icon: <FileText className="w-4.5 h-4.5" /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeTab === tab.id
                  ? "bg-[#1E293B] text-brand-accent border border-brand-border/60"
                  : "text-text-secondary hover:text-text-primary hover:bg-slate-900/40"
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab contents */}
        <div className="text-left">
          
          {/* Case Studies tab */}
          {activeTab === "case-studies" && (
            <div className="space-y-6">
              {caseStudies.map((cs) => (
                <div 
                  key={cs.id}
                  className="glass-panel border border-brand-border rounded-2xl p-6 space-y-4"
                >
                  <div className="flex justify-between items-start gap-4">
                    <h3 className="font-display font-black text-base text-white leading-snug">
                      {cs.title}
                    </h3>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="text-[9px] font-mono text-brand-success bg-brand-success/15 border border-brand-success/20 px-2 py-0.5 rounded animate-pulse">
                        Verified
                      </span>
                      <a
                        href={cs.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1 bg-slate-900 border border-brand-border hover:border-brand-accent hover:text-white rounded text-[10px] text-text-secondary transition-all cursor-pointer flex items-center gap-1 font-semibold"
                      >
                        <span>Full Dossier</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>

                  {/* Summary matrix */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-xs">
                    <div className="border-r border-brand-border/40 pr-2">
                      <div className="text-text-secondary text-[10px] uppercase font-mono">Starting Capital:</div>
                      <div className="font-bold text-white mt-0.5">{cs.capital}</div>
                    </div>
                    <div className="md:border-r border-brand-border/40 pr-2">
                      <div className="text-text-secondary text-[10px] uppercase font-mono">Time to Traction:</div>
                      <div className="font-bold text-white mt-0.5">{cs.timeline}</div>
                    </div>
                    <div className="col-span-2 md:col-span-1">
                      <div className="text-text-secondary text-[10px] uppercase font-mono">Key Milestone:</div>
                      <div className="font-bold text-white mt-0.5 line-clamp-1">{cs.milestones}</div>
                    </div>
                  </div>

                  {/* Breakdown details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-brand-border/40 text-[11px] leading-relaxed">
                    <div className="p-3.5 bg-brand-danger/5 border border-brand-danger/10 rounded-xl space-y-1">
                      <h4 className="font-bold text-brand-danger uppercase text-[9px] tracking-wide">Critical Mistake Made</h4>
                      <p className="text-slate-300">{cs.mistakes}</p>
                    </div>
                    <div className="p-3.5 bg-brand-success/5 border border-brand-success/10 rounded-xl space-y-1">
                      <h4 className="font-bold text-brand-success uppercase text-[9px] tracking-wide">Strategic Lesson Learned</h4>
                      <p className="text-slate-300">{cs.lessons}</p>
                    </div>
                  </div>

                  {/* Sourced tools list */}
                  <div className="flex items-center gap-2 flex-wrap text-[10px] text-text-secondary">
                    <span>Sourced Tools:</span>
                    {cs.tools.map((t) => (
                      <span key={t} className="px-2.5 py-0.5 bg-slate-900 border border-brand-border rounded text-[9px] text-white">
                        {t}
                      </span>
                    ))}
                  </div>

                </div>
              ))}
            </div>
          )}

          {/* Book summaries tab */}
          {activeTab === "books" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {books.map((bk) => (
                <div 
                  key={bk.title}
                  className="glass-panel border border-brand-border rounded-2xl p-5 flex flex-col justify-between hover:border-brand-accent/40 transition-colors"
                >
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <span className="text-[9px] font-mono text-brand-accent uppercase bg-brand-accent/5 px-2 py-0.5 rounded border border-brand-accent/20">
                        Book Summary
                      </span>
                      <h3 className="font-display font-black text-base text-white mt-2 leading-snug">
                        {bk.title}
                      </h3>
                      <div className="text-[10px] text-text-secondary font-mono">
                        by {bk.author}
                      </div>
                    </div>

                    <div className="space-y-1.5 text-xs">
                      <div className="text-slate-400 font-semibold">Core Concept:</div>
                      <p className="text-[11px] text-text-secondary leading-relaxed">{bk.concept}</p>
                    </div>

                    <div className="space-y-1.5 text-xs p-3.5 bg-slate-950/60 border border-brand-border/40 rounded-xl">
                      <div className="text-brand-accent font-semibold flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5" />
                        Key Execution Takeaway:
                      </div>
                      <p className="text-[11px] text-slate-300 leading-normal">{bk.takeaway}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Templates tab */}
          {activeTab === "templates" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {templates.map((tpl) => (
                <div 
                  key={tpl.id}
                  className="glass-panel border border-brand-border rounded-2xl p-5 flex flex-col justify-between hover:border-brand-accent/40 transition-colors"
                >
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <span className="text-[9px] font-mono text-slate-400 bg-slate-900 border border-brand-border px-2 py-0.5 rounded uppercase">
                        {tpl.format} • {tpl.size}
                      </span>
                      <h3 className="font-display font-black text-sm text-white mt-2 leading-snug">
                        {tpl.name}
                      </h3>
                    </div>
                    
                    <p className="text-[10px] text-text-secondary leading-relaxed">
                      {tpl.desc}
                    </p>
                  </div>

                  <div className="border-t border-brand-border/40 mt-5 pt-3.5 flex items-center justify-between">
                    <span className="text-[9px] font-mono text-text-secondary">
                      Downloads: <b className="text-white">{downloadCounts[tpl.id]}</b>
                    </span>
                    
                    <button
                      onClick={() => handleDownload(tpl.id)}
                      className="px-3.5 py-1.5 bg-brand-accent text-slate-950 font-bold text-[10px] rounded-lg shadow-lg hover:shadow-brand-accent/15 transition-all cursor-pointer flex items-center gap-1"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

      </div>
    </AppShell>
  );
}
