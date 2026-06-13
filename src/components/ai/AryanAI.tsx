"use client";

import React, { useState, useRef, useEffect } from "react";
import { useFounder } from "@/context/FounderContext";
import { Sparkles, Send, Bot, User, ShieldAlert, BookOpen, Trash2 } from "lucide-react";
import { phasesData } from "@/data/phases";

export const AryanAI: React.FC<{ sidebarMode?: boolean }> = ({ sidebarMode = false }) => {
  const { profile, selectedTrack, completedTasks, chatHistory, addChatMessage, clearChatHistory } = useFounder();
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory, isTyping]);

  // Context-specific suggestion prompts based on the current phase
  const getSuggestionChips = () => {
    // Check which phase is active based on task completion
    const totalPhase0Tasks = phasesData[0].tasks.length;
    const completedPhase0 = phasesData[0].tasks.filter(t => completedTasks.includes(t.id)).length;
    
    if (completedPhase0 < totalPhase0Tasks) {
      return [
        "Help me write my problem statement.",
        "How do I allocate a ₹2 Lakh startup budget?",
        "Is sustainable manufacturing a high-margin business in India?"
      ];
    } else {
      return [
        "Draft customer interview questions for my validation phase.",
        "How do I apply for Udyam MSME registration in Rajasthan?",
        "Explain GST registration thresholds for manufacturing brands."
      ];
    }
  };

  const forbiddenKeywords = [
    "dating", "love", "girlfriend", "boyfriend", "politics", "modi", "gandhi", "election",
    "religion", "hindu", "muslim", "christian", "gossip", "bollywood", "cricket", "movie", "entertainment"
  ];

  const handleSendMessage = (textToSend: string) => {
    if (!textToSend.trim()) return;

    // Log User message
    addChatMessage("user", textToSend);
    setInputMessage("");
    setIsTyping(true);

    setTimeout(() => {
      let reply = "";
      const textLower = textToSend.toLowerCase();

      // Check forbidden guardrails
      const hitsForbidden = forbiddenKeywords.some(keyword => textLower.includes(keyword));

      if (hitsForbidden) {
        reply = "I am built strictly for business execution.\n\nLet's get back to building.\n\nWhat are we working on?\n\nYOUR NEXT IMMEDIATE STEP\nFocus on mapping your target customer demographics rather than consuming entertainment content.";
      }
      // Specific triggers
      else if (textLower.includes("problem statement") || textLower.includes("problem")) {
        reply = `To write a sharp problem statement, skip the jargon. What is the exact leakage or friction? For your business type (${profile.businessType}), you must specify: Who suffers, what is the cost of delay, and why current alternatives fail.\n\nHere is a draft:\n"Indian MSMEs face complex compliance frameworks for raw material scrap procurement, spending over ₹40,000/month on consultancies with 3-week clearance delays. We provide pre-verified supply routes with automated SPCB clearance logs."\n\nYOUR NEXT IMMEDIATE STEP\nRewrite your problem statement using this format and share it with 3 prospective buyers for feedback.`;
      } 
      else if (textLower.includes("budget") || textLower.includes("lakh") || textLower.includes("capital")) {
        reply = `You have budgeted ${profile.budget} for this launch. Kunal Shah's rule: Double your cost assumptions and halve your revenue targets. Do not spend a single rupee on legal incorporation, shiny SaaS subscriptions, or office rents until you have active order sheet receipts.\n\nFor a budget under ₹5 Lakhs, allocate:\n- 70% for raw materials/product development samples.\n- 20% for local distribution testing.\n- 10% cash runway reserves.\n- ₹0 on custom coding, agencies or PR.\n\nYOUR NEXT IMMEDIATE STEP\nCreate a spreadsheet detailing your estimated cost of goods sold (COGS) and raw materials before building a website.`;
      } 
      else if (textLower.includes("udyam") || textLower.includes("msme") || textLower.includes("registration")) {
        reply = `Udyam Registration is the single most valuable free compliance license in India. It officially establishes you as an MSME, unlocking 1% interest concessions on bank loans and matching government subsidies under SIDBI.\n\n- Time required: 15 minutes.\n- Documents needed: Aadhaar, PAN, and Bank details.\n- Cost: ₹0. Do not pay an agent to do this.\n\nYOUR NEXT IMMEDIATE STEP\nGo directly to the official government portal [udyamregistration.gov.in](https://udyamregistration.gov.in) and register your company right now.`;
      } 
      else if (textLower.includes("gst") || textLower.includes("gstin")) {
        reply = `GST is compulsory for manufacturing/goods businesses with turnover exceeding ₹40 Lakhs (₹20 Lakhs for services). However, payment gateways (Razorpay/Stripe) require a GSTIN for corporate activation. \n\nIf you are pre-revenue, you can register as a sole proprietorship first to test. Once validated, upgrade to a Pvt Ltd with formal GST registration using Razorpay Rize or IndiaFilings.\n\nYOUR NEXT IMMEDIATE STEP\nConfirm if your current local banks require GSTIN to open a business account, or register a sole proprietorship to bypass it for initial pilot testing.`;
      } 
      else if (textLower.includes("survey") || textLower.includes("interview") || textLower.includes("questions")) {
        reply = `The Mom Test rule by Rob Fitzpatrick: Never ask customers 'Would you buy this?' Ask about their active historical actions instead.\n\nUse these 3 core validation questions:\n1. 'How do you currently source raw materials/scrap?'\n2. 'What was the hardest part about your last shipment cycle?'\n3. 'How much did you pay to resolve that issue?'\n\nYOUR NEXT IMMEDIATE STEP\nSet up a simple feedback form on Tally.so using these 3 questions, and message the link to 5 potential clients on LinkedIn.`;
      }
      else if (textLower.includes("istart") || textLower.includes("rajasthan") || textLower.includes("grant")) {
        reply = `Since you are operating out of ${profile.location}, you qualify directly for Rajasthan iStart support. This state program is highly structured, offering sustenance allowances of up to ₹20,000/month for founders and matching scaling grants up to ₹25 Lakhs.\n\nTo apply:\n- Fill out the basic project pitch on the iStart Rajasthan website.\n- Present a 5-minute slide deck to their assessment board.\n- Secure a Q-Rate tier score.\n\nYOUR NEXT IMMEDIATE STEP\nLog into [istart.rajasthan.gov.in](https://istart.rajasthan.gov.in) and draft your basic profile details under the 'Startup registration' section today.`;
      }
      else if (textLower.includes("supplier") || textLower.includes("indiamart") || textLower.includes("raw material")) {
        reply = `Sourcing in India is about managing cash flow and trust. When using platforms like IndiaMART:\n- Filter only by GST-verified suppliers.\n- Never pay 100% upfront. Negotiate 30% advance / 70% on dispatch.\n- Ask for raw material test certifications (especially for sustainable/plastic recycling loops).\n\nYOUR NEXT IMMEDIATE STEP\nCall 3 verified suppliers on IndiaMART and request a small trial batch of samples to inspect quality, before signing a bulk contract.`;
      }
      else {
        // Generates typical Naval/Kunal response based on track
        reply = `I see you are navigating the ${selectedTrack} track in ${profile.location}. The biggest trap for you right now is analysis paralysis. Do not build frameworks for problems you do not have yet. \n\nFocus strictly on your active execution stage. Validate demand, negotiate supplier MOQ samples, keep your fixed costs at zero, and collect payment deposits as fast as humanly possible.\n\nYOUR NEXT IMMEDIATE STEP\nIdentify your single biggest bottleneck preventing your first sales conversion today, and allocate 4 hours to solve only that task.`;
      }

      addChatMessage("aryan", reply);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className={`flex flex-col h-full bg-[#0F162A]/60 border-l border-brand-border glass-panel relative ${sidebarMode ? "w-full" : "rounded-xl overflow-hidden shadow-xl"}`}>
      {/* Chat Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#1E293B]/50 border-b border-brand-border">
        <div className="flex items-center gap-2">
          <div className="p-1 bg-brand-accent/20 rounded border border-brand-accent/30 animate-pulse">
            <Bot className="w-4 h-4 text-brand-accent" />
          </div>
          <div>
            <div className="text-xs text-text-secondary font-mono uppercase tracking-wider">Operating Partner</div>
            <h3 className="font-bold text-sm text-text-primary">Aryan AI</h3>
          </div>
        </div>
        <button
          onClick={clearChatHistory}
          className="p-1.5 text-text-secondary hover:text-brand-danger rounded transition-colors cursor-pointer"
          title="Clear Conversation"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 font-sans text-sm">
        {chatHistory.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-4">
            <Bot className="w-10 h-10 text-brand-accent/40 mb-2" />
            <p className="font-semibold text-text-primary">Aryan is ready to build.</p>
            <p className="text-xs text-text-secondary max-w-[200px] mt-1">
              Ask about business models, budget allocation, Udyam setups, or local grants.
            </p>
          </div>
        ) : (
          chatHistory.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-2.5 ${msg.sender === "user" ? "flex-row-reverse" : ""}`}
            >
              <div
                className={`p-1.5 rounded ${
                  msg.sender === "user"
                    ? "bg-brand-accent/25 border border-brand-accent/40 text-brand-accent"
                    : "bg-slate-900 border border-brand-border text-slate-400"
                }`}
              >
                {msg.sender === "user" ? <User className="w-4.5 h-4.5" /> : <Bot className="w-4.5 h-4.5" />}
              </div>
              <div className="flex flex-col max-w-[80%]">
                <div
                  className={`px-3 py-2 rounded-lg text-sm whitespace-pre-line leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-brand-accent/15 border border-brand-accent/25 text-text-primary"
                      : "bg-[#1E293B]/70 border border-brand-border text-text-primary"
                  }`}
                >
                  {/* Styling the YOUR NEXT IMMEDIATE STEP section customly inside chat bubble */}
                  {msg.text.includes("YOUR NEXT IMMEDIATE STEP") ? (
                    <>
                      {msg.text.split("YOUR NEXT IMMEDIATE STEP")[0]}
                      <div className="mt-3 p-2.5 bg-brand-warning/10 border border-brand-warning/35 rounded-lg text-brand-warning">
                        <div className="font-mono text-[10px] uppercase font-bold tracking-widest mb-1">
                          YOUR NEXT IMMEDIATE STEP
                        </div>
                        <div className="font-sans font-semibold text-xs text-slate-100">
                          {msg.text.split("YOUR NEXT IMMEDIATE STEP")[1].trim()}
                        </div>
                      </div>
                    </>
                  ) : (
                    msg.text
                  )}
                </div>
                <span className="text-[10px] text-text-secondary mt-1 font-mono self-end">
                  {msg.timestamp}
                </span>
              </div>
            </div>
          ))
        )}

        {isTyping && (
          <div className="flex items-start gap-2.5">
            <div className="p-1.5 rounded bg-slate-900 border border-brand-border text-slate-400">
              <Bot className="w-4.5 h-4.5" />
            </div>
            <div className="px-3 py-2.5 rounded-lg bg-[#1E293B]/70 border border-brand-border flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-brand-accent rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
              <span className="w-1.5 h-1.5 bg-brand-accent rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
              <span className="w-1.5 h-1.5 bg-brand-accent rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Suggestion Chips */}
      <div className="px-4 py-2 flex flex-wrap gap-1.5 border-t border-brand-border/60 bg-[#0F162A]/40">
        {getSuggestionChips().map((chip, i) => (
          <button
            key={i}
            onClick={() => handleSendMessage(chip)}
            className="text-[11px] bg-slate-900 hover:bg-slate-800 text-text-secondary hover:text-text-primary px-2.5 py-1.5 rounded-full border border-brand-border transition-colors cursor-pointer text-left line-clamp-1 max-w-full font-sans"
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Chat Input */}
      <div className="p-3 border-t border-brand-border bg-[#0F162A]/90">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage(inputMessage);
          }}
          className="flex items-center gap-2 bg-slate-950 border border-brand-border rounded-lg px-2.5 py-1.5 focus-within:border-brand-accent transition-colors"
        >
          <input
            type="text"
            placeholder="Ask Aryan a building question..."
            className="flex-1 bg-transparent border-none text-xs text-text-primary placeholder:text-text-secondary focus:outline-none py-1"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
          />
          <button
            type="submit"
            className="p-1.5 bg-brand-accent text-white rounded-md hover:bg-brand-accent/80 transition-colors cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
