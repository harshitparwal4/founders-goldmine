import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    
    // Check if API key is not configured or is the default placeholder
    if (!apiKey || apiKey === "YOUR_API_KEY_HERE" || apiKey.trim() === "") {
      return NextResponse.json(
        { 
          error: "API_KEY_MISSING",
          message: "Please configure your GEMINI_API_KEY in the `.env.local` file to unlock live AI mode." 
        }, 
        { status: 400 }
      );
    }

    const { messages, profile, selectedTrack } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid chat history" }, { status: 400 });
    }

    // Initialize Google Gen AI client using the standard GoogleGenerativeAI SDK
    const genAI = new GoogleGenerativeAI(apiKey);

    // Format chat history to match Gemini SDK chat history format:
    // role: "user" | "model"
    // parts: [{ text: string }]
    const formattedHistory = messages.map((msg: any) => ({
      role: msg.sender === "user" ? "user" : "model",
      parts: [{ text: msg.text }]
    }));

    // The user's active prompt is the last message
    const lastMessage = formattedHistory[formattedHistory.length - 1];
    
    // Convert history messages (excluding the last one which is sent in sendMessage)
    const chatHistory = formattedHistory.slice(0, -1);

    // Formulate a robust system instruction injecting the founder's details and constraints
    const systemInstruction = `
You are Aryan, a battle-tested, hyper-pragmatic business operating AI partner for Indian startup founders.
You talk in a sharp, realistic, no-nonsense manner (inspired by Naval Ravikant and Kunal Shah).
Your tone is value-first, encouraging execution, and highly critical of doomscrolling or wasting money on vanity metrics (logos, shiny SaaS, office spaces, early company incorporation).

Here is the profile of the founder you are advising:
- Name: ${profile.name || "Founder"}
- Email: ${profile.email || "N/A"}
- Business Track: ${selectedTrack || "Startup"}
- Target Location: ${profile.location || "India"}
- Available Capital Runway: ${profile.budget || "N/A"}
- Startup Stage: ${profile.startupStage || "Validation"}
- Team Size: ${profile.teamSize || "1 Founder"}
- Revenue: ${profile.revenue || "₹0"}
- Goals: ${profile.goals || "Validate business"}

Rules of interaction:
1. Focus heavily on keeping cost at ZERO during validation. Remind them of the "Mom Test" rules: validate customer behavior, not assumptions.
2. Filter out and forbid discussion about general entertainment, movies, dating, politics, or gossip. Bring them back to business.
3. Be specific to the Indian market context, referencing local regulatory pipelines (Udyam MSME, GSTIN, Razorpay, iStart Rajasthan) or logistics (IndiaMART sourcing, Shiprocket) where relevant.
4. IMPORTANT: At the end of every message, you MUST include a clear, capitalized, distinct section starting with the phrase "YOUR NEXT IMMEDIATE STEP" followed by a single, highly actionable task they can execute in under 4 hours. Keep it on a new line.

Example structure:
[Your main helpful, pragmatic feedback and advice here...]

YOUR NEXT IMMEDIATE STEP
[One single actionable task...]
`;

    // Start a chat session using gemini-2.5-flash with systemInstruction
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: systemInstruction,
    });

    const chat = model.startChat({
      history: chatHistory,
      generationConfig: {
        temperature: 0.7,
      }
    });

    const result = await chat.sendMessage(lastMessage.parts[0].text);
    const replyText = result.response.text() || "I was unable to formulate a response. Let's get back to validating your core concept.";

    return NextResponse.json({ reply: replyText });

  } catch (error: any) {
    console.error("Gemini AI API Route Error:", error);
    return NextResponse.json(
      { error: "API_ERROR", message: error.message || "An internal error occurred." }, 
      { status: 500 }
    );
  }
}
