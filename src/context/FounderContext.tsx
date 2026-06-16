"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { toolsData, Tool } from "@/data/tools";
import { grantsData, Grant } from "@/data/grants";
import { phasesData, Phase, PhaseTask } from "@/data/phases";

export interface UserProfile {
  name: string;
  email: string;
  businessType: string;
  startupStage: string;
  location: string;
  budget: string; // e.g. "₹2,00,000"
  budgetNum: number; // e.g. 200000
  teamSize: string;
  revenue: string;
  goals: string;
}

export interface ScoreBreakdown {
  clarity: number;
  planning: number;
  compliance: number;
  product: number;
  marketing: number;
  launch: number;
  analytics: number;
  operations: number;
  growth: number;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "aryan";
  text: string;
  timestamp: string;
}

interface FounderContextType {
  profile: UserProfile;
  setProfile: (p: Partial<UserProfile>) => void;
  selectedTrack: string;
  setSelectedTrack: (track: string) => void;
  completedTasks: string[];
  toggleTask: (taskId: string) => void;
  savedTools: string[];
  toggleSaveTool: (toolId: string) => void;
  founderScore: number;
  scoreTier: string;
  scoreBreakdown: ScoreBreakdown;
  launchReadiness: number;
  streak: number;
  chatHistory: ChatMessage[];
  addChatMessage: (sender: "user" | "aryan", text: string) => void;
  clearChatHistory: () => void;
  resetOS: () => void;
  customTools: Tool[];
  addCustomTool: (tool: Omit<Tool, "id">, phaseId: number) => void;
}

const FounderContext = createContext<FounderContextType | undefined>(undefined);

// Seeding standard high-fidelity data as requested for "Harshit Sharma, Sustainable Manufacturing"
const DEFAULT_PROFILE: UserProfile = {
  name: "Harshit Sharma",
  email: "harshit@jaipurscrap.com",
  businessType: "Sustainable Manufacturing (Recycling)",
  startupStage: "Validation",
  location: "Jaipur, Rajasthan",
  budget: "₹2,00,000",
  budgetNum: 200000,
  teamSize: "2 Founders",
  revenue: "₹0 (Pre-revenue)",
  goals: "Reach first ₹1,00,000/month in contract orders"
};

const DEFAULT_COMPLETED_TASKS = [
  "p0-t1", "p0-t2", "p0-t3", "p0-t4", // Phase 0 Complete (+10 pts)
  "p1-t1", "p1-t2", "p1-t3",          // Phase 1: 3/4 tasks done (+7.5 pts)
  "p2-t2", "p2-t4",                   // Phase 2: Udyam and current account done (+4 pts)
  "p7-t1"                             // Phase 7: Notion setup (+2.5 pts)
];

const DEFAULT_SAVED_TOOLS = [
  "google-trends",
  "worth-build",
  "udyam-registration",
  "vyapar",
  "indiamart",
  "notion"
];

const DEFAULT_CHAT: ChatMessage[] = [
  {
    id: "m1",
    sender: "user",
    text: "Aryan, I registered for Udyam and opened the current account. What should I focus on next?",
    timestamp: "18:00"
  },
  {
    id: "m2",
    sender: "aryan",
    text: "Excellent progress, Harshit. Getting the current account and MSME Udyam credentials locked in is critical. It lays the groundwork to qualify for state support. Since you are building a Sustainable Recycling factory in Jaipur, compliance is your ultimate leverage. However, do not buy scrap stock or machinery yet. You are currently in Phase 1: Idea Validation & Research. Focus on validating raw scrap supply agreements first.\n\nYOUR NEXT IMMEDIATE STEP\nVisit 5 plastic scrap collection sites in Jaipur tomorrow and verify their wholesale pricing per metric ton.",
    timestamp: "18:01"
  }
];

export const FounderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfileState] = useState<UserProfile>(DEFAULT_PROFILE);
  const [selectedTrack, setSelectedTrackState] = useState<string>("Sustainable/Recycling");
  const [completedTasks, setCompletedTasks] = useState<string[]>(DEFAULT_COMPLETED_TASKS);
  const [savedTools, setSavedTools] = useState<string[]>(DEFAULT_SAVED_TOOLS);
  const [streak, setStreak] = useState<number>(7);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>(DEFAULT_CHAT);
  const [customTools, setCustomTools] = useState<Tool[]>([]);

  // Load state from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedProfile = localStorage.getItem("founder_profile");
      const storedTrack = localStorage.getItem("founder_track");
      const storedTasks = localStorage.getItem("founder_completed_tasks");
      const storedTools = localStorage.getItem("founder_saved_tools");
      const storedStreak = localStorage.getItem("founder_streak");
      const storedChat = localStorage.getItem("founder_chat_history");
      const storedCustomTools = localStorage.getItem("founder_custom_tools");

      if (storedProfile) setProfileState(JSON.parse(storedProfile));
      if (storedTrack) setSelectedTrackState(storedTrack);
      if (storedTasks) setCompletedTasks(JSON.parse(storedTasks));
      if (storedTools) setSavedTools(JSON.parse(storedTools));
      if (storedStreak) setStreak(Number(storedStreak));
      if (storedChat) setChatHistory(JSON.parse(storedChat));
      if (storedCustomTools) setCustomTools(JSON.parse(storedCustomTools));
    }
  }, []);

  const addCustomTool = (tool: Omit<Tool, "id">, phaseId: number) => {
    setCustomTools((prev) => {
      const newTool: Tool = {
        ...tool,
        id: `custom-tool-${Date.now()}`,
        phaseId: phaseId
      };
      const updated = [...prev, newTool];
      localStorage.setItem("founder_custom_tools", JSON.stringify(updated));
      return updated;
    });
  };

  const setProfile = (newFields: Partial<UserProfile>) => {
    setProfileState((prev) => {
      const updated = { ...prev, ...newFields };
      localStorage.setItem("founder_profile", JSON.stringify(updated));
      return updated;
    });
  };

  const setSelectedTrack = (track: string) => {
    setSelectedTrackState(track);
    localStorage.setItem("founder_track", track);
  };

  const toggleTask = (taskId: string) => {
    setCompletedTasks((prev) => {
      const updated = prev.includes(taskId)
        ? prev.filter((id) => id !== taskId)
        : [...prev, taskId];
      localStorage.setItem("founder_completed_tasks", JSON.stringify(updated));
      return updated;
    });
  };

  const toggleSaveTool = (toolId: string) => {
    setSavedTools((prev) => {
      const updated = prev.includes(toolId)
        ? prev.filter((id) => id !== toolId)
        : [...prev, toolId];
      localStorage.setItem("founder_saved_tools", JSON.stringify(updated));
      return updated;
    });
  };

  const addChatMessage = (sender: "user" | "aryan", text: string) => {
    const time = new Date().toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false
    });
    setChatHistory((prev) => {
      const updated = [
        ...prev,
        { id: Math.random().toString(36).substring(7), sender, text, timestamp: time }
      ];
      localStorage.setItem("founder_chat_history", JSON.stringify(updated));
      return updated;
    });
  };

  const clearChatHistory = () => {
    setChatHistory([]);
    localStorage.setItem("founder_chat_history", JSON.stringify([]));
  };

  const resetOS = () => {
    setProfileState(DEFAULT_PROFILE);
    setSelectedTrackState("Sustainable/Recycling");
    setCompletedTasks(DEFAULT_COMPLETED_TASKS);
    setSavedTools(DEFAULT_SAVED_TOOLS);
    setStreak(7);
    setChatHistory(DEFAULT_CHAT);
    setCustomTools([]);
    localStorage.clear();
  };

  // --- Dynamic calculations for scores ---
  // Total available tasks in phasesData
  const allTasks: PhaseTask[] = phasesData.flatMap((p) => p.tasks);
  
  // Categorized progress scores
  const getCategoryScore = (category: keyof ScoreBreakdown): number => {
    const categoryTasks = allTasks.filter((t) => t.category.toLowerCase() === category);
    if (categoryTasks.length === 0) return 0;
    const completedCategoryTasks = categoryTasks.filter((t) => completedTasks.includes(t.id));
    return Math.round((completedCategoryTasks.length / categoryTasks.length) * 100);
  };

  const scoreBreakdown: ScoreBreakdown = {
    clarity: getCategoryScore("clarity"),
    planning: getCategoryScore("planning"),
    compliance: getCategoryScore("compliance"),
    product: getCategoryScore("product"),
    marketing: getCategoryScore("marketing"),
    launch: getCategoryScore("launch"),
    analytics: getCategoryScore("analytics"),
    operations: getCategoryScore("operations"),
    growth: getCategoryScore("growth")
  };

  // Core Founder Score (Weighted calculation or flat average across categories)
  // Let's calculate based on total percentage of overall task completion scaled up slightly for active momentum, capping at 100.
  // To reach 72 initially (like Harshit), we can use:
  // Baseline task completion + bonuses for active streak / settings
  const baseTaskPercentage = allTasks.length > 0 ? (completedTasks.length / allTasks.length) * 100 : 0;
  
  // Custom formula matching target user score 72 for sample data:
  // Base task completion (10/37 tasks ~ 27%) * 2 + streak bonus (7) + profile completions (10) ~ 72
  const profileFilledCount = Object.values(profile).filter(v => v !== "").length;
  const rawScore = Math.round((baseTaskPercentage * 1.5) + (streak * 1) + (profileFilledCount * 2));
  const founderScore = Math.max(0, Math.min(100, rawScore));

  // Score tiers
  let scoreTier = "Dreamer";
  if (founderScore > 80) scoreTier = "Founder";
  else if (founderScore > 60) scoreTier = "Operator";
  else if (founderScore > 40) scoreTier = "Builder";
  else if (founderScore > 20) scoreTier = "Explorer";

  // Launch readiness score (focused on tasks in Phase 0-5 and 8)
  const launchTasks = allTasks.filter(t => ["clarity", "planning", "compliance", "product", "launch"].includes(t.category.toLowerCase()));
  const completedLaunchTasks = launchTasks.filter(t => completedTasks.includes(t.id));
  const launchReadiness = launchTasks.length > 0 ? Math.round((completedLaunchTasks.length / launchTasks.length) * 100) : 0;

  return (
    <FounderContext.Provider
      value={{
        profile,
        setProfile,
        selectedTrack,
        setSelectedTrack,
        completedTasks,
        toggleTask,
        savedTools,
        toggleSaveTool,
        founderScore,
        scoreTier,
        scoreBreakdown,
        launchReadiness,
        streak,
        chatHistory,
        addChatMessage,
        clearChatHistory,
        resetOS,
        customTools,
        addCustomTool
      }}
    >
      {children}
    </FounderContext.Provider>
  );
};

export const useFounder = () => {
  const context = useContext(FounderContext);
  if (context === undefined) {
    throw new Error("useFounder must be used within a FounderProvider");
  }
  return context;
};
