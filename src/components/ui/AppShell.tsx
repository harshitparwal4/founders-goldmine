"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useFounder } from "@/context/FounderContext";
import { CommandCenter } from "@/components/ui/CommandCenter";
import { AryanAI } from "@/components/ai/AryanAI";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { 
  Trophy, Flame, Search, MessageSquareCode, Sparkles, LayoutDashboard, 
  Map, Settings, DollarSign, Rocket, BookOpen, Menu, X, ChevronDown 
} from "lucide-react";

export const AppShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { profile, selectedTrack, setSelectedTrack, founderScore, streak } = useFounder();
  
  const [isAryanOpen, setIsAryanOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showTrackDropdown, setShowTrackDropdown] = useState(false);

  // Parse URL search parameters to open Aryan by default if required
  useEffect(() => {
    if (searchParams?.get("aryan") === "open") {
      setIsAryanOpen(true);
    }
  }, [searchParams]);

  const navLinks = [
    { name: "Dashboard", href: "/dashboard", icon: <LayoutDashboard className="w-4 h-4" /> },
    { name: "Journey", href: "/journey", icon: <Map className="w-4 h-4" /> },
    { name: "Tools", href: "/tools", icon: <Settings className="w-4 h-4" /> },
    { name: "Grant Radar", href: "/grants", icon: <DollarSign className="w-4 h-4" /> },
    { name: "Launch Center", href: "/launch-center", icon: <Rocket className="w-4 h-4" /> },
    { name: "Learn", href: "/learn", icon: <BookOpen className="w-4 h-4" /> },
  ];

  const tracks = [
    "Sustainable/Recycling",
    "D2C Brand",
    "B2B Agency",
    "AI Startup",
    "Creator",
    "Food Business",
    "Dropshipping",
    "Freelancer"
  ];

  return (
    <div className="min-h-screen bg-brand-bg text-text-primary flex flex-col font-sans select-none relative overflow-hidden">
      <CustomCursor />
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-brand-accent/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Top Header Navigation */}
      <header className="sticky top-0 z-50 w-full bg-[#0B0F19]/80 backdrop-blur-md border-b border-brand-border/60 px-4 md:px-6 py-3.5 flex items-center justify-between">
        
        {/* Left Side: Logo & Track Picker */}
        <div className="flex items-center gap-4">
          <div 
            onClick={() => router.push("/")}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-7 h-7 bg-brand-accent rounded flex items-center justify-center font-bold text-slate-950 text-xs shadow-[0_0_15px_rgba(168,85,247,0.4)] group-hover:scale-105 transition-transform">
              G
            </div>
            <span className="font-display font-extrabold text-sm tracking-tight text-white hidden sm:block">
              FOUNDER&apos;S <span className="text-brand-accent">GOLDMINE</span>
            </span>
          </div>

          <div className="h-4 w-px bg-brand-border/60 hidden md:block" />

          {/* Track Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowTrackDropdown(prev => !prev)}
              className="flex items-center gap-1.5 px-3 py-1 bg-slate-900/60 border border-brand-border rounded-lg text-xs font-semibold hover:border-brand-accent transition-colors text-slate-200 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-brand-accent" />
              <span>{selectedTrack}</span>
              <ChevronDown className="w-3 h-3 text-text-secondary" />
            </button>

            {showTrackDropdown && (
              <>
                <div 
                  className="fixed inset-0 z-10" 
                  onClick={() => setShowTrackDropdown(false)} 
                />
                <div className="absolute left-0 mt-2 w-52 bg-[#0F162A] border border-brand-border rounded-lg shadow-2xl overflow-hidden z-[100]">
                  <div className="text-[9px] uppercase font-bold text-text-secondary tracking-widest px-3 py-2 border-b border-brand-border/40">
                    Switch Active Track
                  </div>
                  {tracks.map((track) => (
                    <button
                      key={track}
                      onClick={() => {
                        setSelectedTrack(track);
                        setShowTrackDropdown(false);
                      }}
                      className={`w-full text-left px-3.5 py-2 text-xs transition-colors cursor-pointer ${
                        selectedTrack === track
                          ? "bg-brand-accent/15 text-brand-accent font-semibold"
                          : "text-slate-400 hover:bg-slate-800 hover:text-white"
                      }`}
                    >
                      {track}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Center: Desktop Route Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <button
                key={link.name}
                onClick={() => router.push(link.href)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  isActive
                    ? "bg-[#1E293B] text-brand-accent border border-brand-border/60"
                    : "text-text-secondary hover:text-text-primary hover:bg-slate-900/40"
                }`}
              >
                {link.icon}
                <span>{link.name}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Side: Metrics, Search, Aryan Toggle */}
        <div className="flex items-center gap-3">
          
          {/* Global Spotlight Search */}
          <CommandCenter />

          {/* User Score Pill */}
          <div className="flex items-center gap-2 px-2.5 py-1 bg-slate-900/60 border border-brand-border rounded-lg text-xs">
            <Trophy className="w-3.5 h-3.5 text-brand-accent" />
            <span className="font-semibold text-text-primary">{founderScore}</span>
            <span className="text-text-secondary text-[10px]">Score</span>
          </div>

          {/* Streak Counter */}
          <div className="flex items-center gap-1 px-2 py-1 bg-brand-warning/15 border border-brand-warning/20 rounded-lg text-xs text-brand-warning font-semibold">
            <Flame className="w-3.5 h-3.5" />
            <span>{streak}d</span>
          </div>

          {/* System A/B Toggle button */}
          <button
            onClick={() => setIsAryanOpen(prev => !prev)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              isAryanOpen 
                ? "bg-brand-accent text-slate-950 shadow-[0_0_15px_rgba(168,85,247,0.35)]" 
                : "bg-slate-900/80 border border-brand-border text-text-secondary hover:text-text-primary hover:border-slate-600"
            }`}
          >
            <MessageSquareCode className="w-4 h-4" />
            <span className="hidden sm:inline">{isAryanOpen ? "Hide Aryan" : "Speak to Aryan"}</span>
          </button>

          {/* Mobile menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(prev => !prev)}
            className="lg:hidden p-1.5 bg-slate-900 border border-brand-border rounded-lg text-text-secondary cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/90 backdrop-blur-md pt-20 px-6 space-y-4">
          <div className="text-[10px] uppercase font-bold text-text-secondary tracking-widest border-b border-brand-border/60 pb-2">
            Navigation Menu
          </div>
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <button
                  key={link.name}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    router.push(link.href);
                  }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
                    isActive
                      ? "bg-brand-accent/15 text-brand-accent"
                      : "text-text-secondary hover:text-white"
                  }`}
                >
                  {link.icon}
                  <span>{link.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Core Split Screen Layout: Canvas Left & Aryan Right */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Workspace Canvas (Left/Center) */}
        <main className="flex-1 overflow-y-auto px-4 md:px-8 py-6 max-w-full">
          <div className="max-w-[1200px] mx-auto w-full">
            {children}
          </div>
        </main>

        {/* Aryan Context Sidebar Panel (Right) */}
        <div 
          className={`h-[calc(100vh-65px)] sticky top-[65px] transition-all duration-300 overflow-hidden flex-shrink-0 ${
            isAryanOpen ? "w-80 md:w-96 border-l border-brand-border" : "w-0"
          }`}
        >
          <div className="w-80 md:w-96 h-full">
            <AryanAI sidebarMode={true} />
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation Tabs */}
      <div className="lg:hidden sticky bottom-0 z-30 w-full bg-[#0B0F19]/90 border-t border-brand-border/60 py-2.5 px-4 flex items-center justify-around text-text-secondary">
        {navLinks.slice(0, 4).map((link) => {
          const isActive = pathname === link.href;
          return (
            <button
              key={link.name}
              onClick={() => router.push(link.href)}
              className={`flex flex-col items-center gap-1 cursor-pointer ${
                isActive ? "text-brand-accent" : "hover:text-text-primary"
              }`}
            >
              {link.icon}
              <span className="text-[9px] font-semibold">{link.name}</span>
            </button>
          );
        })}
        <button
          onClick={() => setIsAryanOpen(prev => !prev)}
          className={`flex flex-col items-center gap-1 cursor-pointer ${
            isAryanOpen ? "text-brand-accent" : "hover:text-text-primary"
          }`}
        >
          <MessageSquareCode className="w-4 h-4" />
          <span className="text-[9px] font-semibold">Aryan</span>
        </button>
      </div>
    </div>
  );
};
