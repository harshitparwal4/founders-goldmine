"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useFounder } from "@/context/FounderContext";
import { ConstellationCanvas } from "@/components/ui/ConstellationCanvas";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { CommandCenter } from "@/components/ui/CommandCenter";
import { Sparkles, ArrowRight, Play, Calculator, Trophy, HelpCircle, ChevronRight, AlertTriangle, Compass, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const router = useRouter();
  const { profile, setProfile, setSelectedTrack, resetOS } = useFounder();
  
  // States for widgets
  const [reelsHours, setReelsHours] = useState(15); // average hours/week
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizStep, setQuizStep] = useState(1);
  
  // Quiz states
  const [idea, setIdea] = useState("");
  const [budget, setBudget] = useState("₹50k - ₹2L");
  const [hours, setHours] = useState("20-40 hrs");
  const [location, setLocation] = useState("Jaipur, Rajasthan");
  const [skill, setSkill] = useState("Sourcing/Manufacturing");

  // Reality Check calculations
  const calculateLostMonths = () => {
    // 52 weeks in a year. 40 hours work-week.
    const yearlyHours = reelsHours * 52;
    const workWeeksLost = yearlyHours / 40;
    const months = workWeeksLost / 4.3; // 4.3 weeks per month
    return Math.round(months * 10) / 10;
  };

  const calculateDelayedRevenue = () => {
    const months = calculateLostMonths();
    // Assuming ₹1,20,000 average monthly revenue for Operator tier
    return (Math.round(months * 120000)).toLocaleString("en-IN");
  };

  const handleStartQuiz = () => {
    resetOS();
    setShowQuiz(true);
    setQuizStep(1);
  };

  const handleNextStep = () => {
    if (quizStep < 5) {
      setQuizStep(prev => prev + 1);
    } else {
      // Process Quiz Outcomes
      let assignedTrack = "B2B Agency";
      let displayStage = "Dreamer";
      let budgetNum = 150000;

      // Track matching rules
      const ideaLower = idea.toLowerCase();
      if (ideaLower.includes("plastic") || ideaLower.includes("recycle") || ideaLower.includes("eco") || ideaLower.includes("waste") || ideaLower.includes("sustainable")) {
        assignedTrack = "Sustainable/Recycling";
      } else if (ideaLower.includes("d2c") || ideaLower.includes("brand") || ideaLower.includes("clothes") || ideaLower.includes("skincare") || ideaLower.includes("product")) {
        assignedTrack = "D2C Brand";
      } else if (ideaLower.includes("ai") || ideaLower.includes("saas") || ideaLower.includes("software") || ideaLower.includes("app")) {
        assignedTrack = "AI Startup";
      } else if (ideaLower.includes("food") || ideaLower.includes("cafe") || ideaLower.includes("restaurant") || ideaLower.includes("kitchen")) {
        assignedTrack = "Food Business";
      } else if (ideaLower.includes("drop") || ideaLower.includes("ship")) {
        assignedTrack = "Dropshipping";
      }

      if (budget === "₹10L - ₹25L") budgetNum = 1800000;
      else if (budget === "₹2L - ₹10L") budgetNum = 500000;
      else if (budget === "₹50k - ₹2L") budgetNum = 150000;
      else budgetNum = 35000;

      // Seed Profile
      setProfile({
        name: "Harshit Sharma", // Preset default name
        email: "harshit@jaipurscrap.com",
        businessType: assignedTrack,
        startupStage: "Validation",
        location: location,
        budget: budget,
        budgetNum: budgetNum,
        teamSize: "1 Founder",
        revenue: "₹0 (Pre-revenue)",
        goals: `Validate my ${assignedTrack} startup and achieve first sales order.`
      });

      setSelectedTrack(assignedTrack);
      setShowQuiz(false);
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg text-text-primary flex flex-col font-sans select-none relative overflow-hidden">
      <CustomCursor />
      
      {/* Background Constellation Effect */}
      <ConstellationCanvas />

      {/* Subtle background gradient glow meshes */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-brand-accent/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-900/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Main Container */}
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 flex-1 flex flex-col relative z-10">
        
        {/* Navigation Bar */}
        <header className="py-6 flex items-center justify-between border-b border-brand-border/40 backdrop-blur-sm relative z-50">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-brand-accent rounded flex items-center justify-center font-bold text-slate-950 text-base shadow-[0_0_15px_rgba(168,85,247,0.5)]">
              G
            </div>
            <span className="font-display font-extrabold text-base tracking-tight text-white">
              FOUNDER&apos;S <span className="text-brand-accent">GOLDMINE</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <CommandCenter />
            <button
              onClick={() => router.push("/dashboard")}
              className="text-xs text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
            >
              Skip to Cockpit
            </button>
            <button
              onClick={handleStartQuiz}
              className="px-3.5 py-1.5 bg-brand-accent text-slate-950 font-bold text-xs rounded hover:bg-brand-accent/90 transition-all shadow-lg hover:shadow-brand-accent/20 cursor-pointer"
            >
              Launch Dashboard
            </button>
          </div>
        </header>

        {/* Hero Section */}
        <section className="pt-20 pb-16 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-accent/10 border border-brand-accent/25 text-[10px] font-mono uppercase tracking-wider text-brand-accent mb-6"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>India&apos;s Founder Operating System</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display font-black text-4xl sm:text-6xl md:text-7xl leading-tight tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-400"
          >
            Stop Doomscrolling.<br />
            Start Building.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-text-secondary text-sm sm:text-base md:text-lg max-w-2xl mt-6 leading-relaxed"
          >
            Escape the infinite loop of startup videos and Reels. Get the exact step-by-step roadmap, AI execution partner, compliance pipeline, and funding matches to reach your first ₹1 Crore revenue.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 mt-10 justify-center w-full max-w-md"
          >
            <button
              onClick={handleStartQuiz}
              className="flex-1 py-3 bg-brand-accent text-slate-950 font-bold text-sm rounded-lg hover:bg-brand-accent/90 transition-all shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] flex items-center justify-center gap-2 cursor-pointer"
            >
              Start Your Journey <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                resetOS();
                router.push("/dashboard?aryan=open");
              }}
              className="flex-1 py-3 bg-slate-950 text-text-primary font-bold text-sm rounded-lg border border-brand-border hover:border-brand-accent hover:bg-slate-900/60 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              Let Aryan Guide Me <Play className="w-3.5 h-3.5 text-brand-accent" />
            </button>
          </motion.div>
        </section>

        {/* The Reality Check Calculator */}
        <section className="py-12 border-t border-brand-border/40">
          <div className="max-w-4xl mx-auto glass-panel p-6 sm:p-8 rounded-2xl relative border border-brand-border overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
              <Calculator className="w-32 h-32 text-brand-accent" />
            </div>

            <div className="flex items-center gap-2 mb-4 text-brand-warning">
              <AlertTriangle className="w-5 h-5" />
              <h3 className="font-display font-bold text-base uppercase tracking-wider">THE REALITY CHECK</h3>
            </div>

            <h2 className="font-display font-extrabold text-xl sm:text-2xl text-white mb-2">
              How much time are you wasting on passive advice?
            </h2>
            <p className="text-xs text-text-secondary max-w-xl mb-6">
              Startup content is addictive because it feels like work. But watching another founder interview doesn&apos;t validate your product or file your GST.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* Control slider */}
              <div className="space-y-4">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-text-secondary">Doomscroll Time Weekly:</span>
                  <span className="text-brand-accent font-bold">{reelsHours} Hours/week</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="40"
                  step="1"
                  value={reelsHours}
                  onChange={(e) => setReelsHours(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-brand-accent"
                />
                <div className="flex justify-between text-[10px] text-text-secondary font-mono">
                  <span>5 Hrs (Casual)</span>
                  <span>40 Hrs (Full Doom)</span>
                </div>
              </div>

              {/* Output stats */}
              <div className="bg-slate-950/70 border border-brand-border p-4 rounded-xl space-y-4">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="border-r border-brand-border">
                    <div className="text-2xl sm:text-3xl font-mono font-black text-brand-danger">
                      {calculateLostMonths()}
                    </div>
                    <div className="text-[10px] text-text-secondary uppercase tracking-wider mt-1">Months Lost / Yr</div>
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-mono font-black text-brand-warning">
                      ₹{calculateDelayedRevenue()}
                    </div>
                    <div className="text-[10px] text-text-secondary uppercase tracking-wider mt-1">Revenue Delayed</div>
                  </div>
                </div>
                
                <div className="p-3 bg-brand-warning/10 border border-brand-warning/20 rounded-lg text-xs text-slate-100 flex items-start gap-2.5">
                  <div className="p-1 bg-brand-warning/20 rounded text-brand-warning text-[10px] font-mono font-bold mt-0.5">STEP</div>
                  <div>
                    <span className="font-bold text-brand-warning">YOUR NEXT IMMEDIATE STEP:</span> Close YouTube and launch your Founder Score Quiz to build a tangible checklist.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Journey Preview Timeline */}
        <section className="py-16 border-t border-brand-border/40">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="font-display font-black text-2xl sm:text-3xl text-white">Universal Execution Roadmap</h2>
            <p className="text-xs text-text-secondary mt-2">
              Every Indian business follows this 10-phase pipeline. Switch tracks to dynamically adapt deliverables.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { id: 0, title: "Clarity", desc: "Strengths & Capital" },
              { id: 1, title: "Validation", desc: "Customer Discovery" },
              { id: 2, title: "Legal Setup", desc: "GST & Udyam Certs" },
              { id: 3, title: "Funding", desc: "Grants & SIDBI" },
              { id: 4, title: "Product MVP", desc: "IndiaMART Sourcing" },
              { id: 5, title: "Presence", desc: "Shopify & Payments" },
              { id: 6, title: "Marketing", desc: "Audience Pipeline" },
              { id: 7, title: "Systems", desc: "Notion SOPs & Admin" },
              { id: 8, title: "Launch", desc: "Product Hunt & PR" },
              { id: 9, title: "Analytics", desc: "CAC & Growth Scale" }
            ].map((phase) => (
              <div
                key={phase.id}
                onClick={handleStartQuiz}
                className="p-4 bg-brand-surface border border-brand-border rounded-xl hover:border-brand-accent transition-all cursor-pointer group text-left"
              >
                <div className="text-[10px] font-mono font-bold text-brand-accent mb-1 group-hover:translate-x-1 transition-transform">
                  PHASE 0{phase.id}
                </div>
                <h4 className="font-bold text-xs text-text-primary group-hover:text-brand-accent transition-colors">
                  {phase.title}
                </h4>
                <p className="text-[10px] text-text-secondary mt-1">{phase.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 border-t border-brand-border/40 text-center text-xs text-text-secondary mt-auto">
          <p>© 2026 The Founder&apos;s Goldmine. Engineered for execution. Verified for June 2026.</p>
        </footer>
      </div>

      {/* Onboarding Quiz Modal Dialog */}
      <AnimatePresence>
        {showQuiz && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[9999] flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-xl bg-[#0F162A]/90 border border-brand-border rounded-2xl shadow-2xl glass-panel-heavy overflow-hidden font-sans p-6 sm:p-8"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-brand-border mb-6">
                <div className="flex items-center gap-2">
                  <Compass className="w-5 h-5 text-brand-accent animate-spin" style={{ animationDuration: "10s" }} />
                  <span className="font-display font-bold text-sm text-white">Founder OS Setup Wizard</span>
                </div>
                <button
                  onClick={() => setShowQuiz(false)}
                  className="text-xs text-text-secondary hover:text-brand-danger transition-colors cursor-pointer"
                >
                  Cancel
                </button>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden mb-6 border border-brand-border">
                <div
                  className="bg-brand-accent h-full transition-all duration-300"
                  style={{ width: `${(quizStep / 5) * 100}%` }}
                />
              </div>

              {/* Steps rendering */}
              {quizStep === 1 && (
                <div className="space-y-4">
                  <h3 className="font-display font-bold text-lg text-white">
                    Step 1: What startup idea are you building?
                  </h3>
                  <p className="text-xs text-text-secondary">
                    Provide a brief line (e.g. &quot;plastic scrap recycling plant&quot; or &quot;organic skincare D2C brand&quot;).
                  </p>
                  <textarea
                    rows={3}
                    placeholder="Enter your business idea description here..."
                    value={idea}
                    onChange={(e) => setIdea(e.target.value)}
                    className="w-full bg-slate-950 border border-brand-border rounded-lg p-3 text-xs text-text-primary placeholder:text-text-secondary focus:border-brand-accent focus:outline-none"
                  />
                  <div className="text-[10px] text-text-secondary bg-slate-900/60 p-2.5 rounded border border-brand-border leading-relaxed">
                    💡 **Track matching rules are live:** typing terms like *recycle* / *waste* / *sustainable* assigns the Sustainable Recycling track. Typing *d2c* / *brand* / *skincare* assigns the D2C brand track.
                  </div>
                </div>
              )}

              {quizStep === 2 && (
                <div className="space-y-4">
                  <h3 className="font-display font-bold text-lg text-white">
                    Step 2: What is your available startup capital?
                  </h3>
                  <p className="text-xs text-text-secondary">
                    We specialize in bootstrapper validation pathways to keep your runway safe.
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {["₹0 - ₹50k (Micro)", "₹50k - ₹2L (Starter)", "₹2L - ₹10L (Grower)", "₹10L - ₹25L (Capitalist)"].map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setBudget(opt)}
                        className={`p-3 text-xs rounded-lg border text-left cursor-pointer transition-all ${
                          budget === opt
                            ? "bg-brand-accent/20 border-brand-accent text-brand-accent font-bold"
                            : "bg-slate-950 border-brand-border text-text-secondary hover:border-slate-700"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {quizStep === 3 && (
                <div className="space-y-4">
                  <h3 className="font-display font-bold text-lg text-white">
                    Step 3: How many hours can you commit weekly?
                  </h3>
                  <p className="text-xs text-text-secondary">
                    Be honest. Your score calculation depends on realistic weekly sprints.
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {["5-10 hrs (Side Hustle)", "10-20 hrs (Part-time)", "20-40 hrs (High Focus)", "40+ hrs (Full-time Builder)"].map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setHours(opt)}
                        className={`p-3 text-xs rounded-lg border text-left cursor-pointer transition-all ${
                          hours === opt
                            ? "bg-brand-accent/20 border-brand-accent text-brand-accent font-bold"
                            : "bg-slate-950 border-brand-border text-text-secondary hover:border-slate-700"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {quizStep === 4 && (
                <div className="space-y-4">
                  <h3 className="font-display font-bold text-lg text-white">
                    Step 4: Where is your business based?
                  </h3>
                  <p className="text-xs text-text-secondary">
                    We cross-reference this to match regional state subsidies (like iStart Rajasthan or Karnataka schemes).
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {["Jaipur, Rajasthan", "Bengaluru, Karnataka", "Mumbai, Maharashtra", "Delhi NCR"].map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setLocation(opt)}
                        className={`p-3 text-xs rounded-lg border text-left cursor-pointer transition-all ${
                          location === opt
                            ? "bg-brand-accent/20 border-brand-accent text-brand-accent font-bold"
                            : "bg-slate-950 border-brand-border text-text-secondary hover:border-slate-700"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {quizStep === 5 && (
                <div className="space-y-4">
                  <h3 className="font-display font-bold text-lg text-white">
                    Step 5: What is your primary skillset?
                  </h3>
                  <p className="text-xs text-text-secondary">
                    We balance your checklist based on what tasks you can execute vs what requires outsourcing.
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {["Tech & Coding", "Sales & Marketing", "Operations & Finance", "Sourcing/Manufacturing"].map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setSkill(opt)}
                        className={`p-3 text-xs rounded-lg border text-left cursor-pointer transition-all ${
                          skill === opt
                            ? "bg-brand-accent/20 border-brand-accent text-brand-accent font-bold"
                            : "bg-slate-950 border-brand-border text-text-secondary hover:border-slate-700"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Navigation buttons inside modal */}
              <div className="mt-8 flex justify-between items-center border-t border-brand-border pt-4">
                <span className="text-[10px] text-text-secondary uppercase tracking-widest font-mono">
                  Question {quizStep} of 5
                </span>
                
                <button
                  onClick={handleNextStep}
                  disabled={quizStep === 1 && !idea.trim()}
                  className="px-5 py-2.5 bg-brand-accent disabled:opacity-50 text-slate-950 font-bold text-xs rounded-lg hover:bg-brand-accent/90 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  {quizStep === 5 ? "Submit & Enter Cockpit" : "Next Question"}
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
