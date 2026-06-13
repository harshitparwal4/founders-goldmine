export interface PhaseTask {
  id: string;
  text: string;
  category: "Clarity" | "Planning" | "Compliance" | "Product" | "Marketing" | "Launch" | "Analytics" | "Operations" | "Growth";
}

export interface Phase {
  id: number;
  name: string;
  tagline: string;
  description: string;
  scoreWeight: number; // e.g. 10 for 10%
  objectives: string[];
  deliverables: string[];
  mistakes: string[];
  toolIds: string[];
  tasks: PhaseTask[];
}

export const phasesData: Phase[] = [
  {
    id: 0,
    name: "Clarity & Self Discovery",
    tagline: "Prevent years of wasted execution",
    description: "Assess your strengths, lock down your budget, declare your target industry and define your risk tolerance before putting capital on the line.",
    scoreWeight: 10,
    objectives: [
      "Understand founder strengths and limitations",
      "Declare available runway budget (target ₹0 - ₹25L)",
      "Pinpoint target Indian consumer or business sectors",
      "Assess weekly time commitments"
    ],
    deliverables: [
      "Founder Profile Declaration",
      "Problem Statement Outline",
      "Target Capital Allocation Plan"
    ],
    mistakes: [
      "Starting a business solely because it is trending on Instagram",
      "Committing money on branding before knowing what you are selling",
      "Assuming business building requires instant full-time resignations"
    ],
    toolIds: ["google-trends", "validate-my-saas", "worth-build"],
    tasks: [
      { id: "p0-t1", text: "Complete the Founder Onboarding Quiz to benchmark your baseline metrics.", category: "Clarity" },
      { id: "p0-t2", text: "Write down a specific problem statement you want to solve in under 100 words.", category: "Clarity" },
      { id: "p0-t3", text: "Map out your available capital reserves (safe startup budget limit).", category: "Planning" },
      { id: "p0-t4", text: "Draft a list of personal skills you possess vs what you must outsource/hire.", category: "Clarity" }
    ]
  },
  {
    id: 1,
    name: "Idea Validation & Research",
    tagline: "Ensure actual demand exists in India",
    description: "Validate the business thesis by mapping competitors, analyzing Google search trend volumes, and interviewing actual target consumers.",
    scoreWeight: 10,
    objectives: [
      "Verify search demand using SEO indices",
      "Identify 3 primary direct competitors in India",
      "Design customer discovery question guides",
      "Interview 10 potential customers face-to-face or via forms"
    ],
    deliverables: [
      "Competitor Audit Log",
      "Customer Discovery Script",
      "10 Customer Survey Reponses",
      "Validated Revenue Model"
    ],
    mistakes: [
      "Asking family and friends if they would buy it (they will lie to make you happy)",
      "Building a complex web app before checking search volumes",
      "Ignoring existing local competitors who have already achieved scale"
    ],
    toolIds: ["google-trends", "ahrefs", "semrush", "similarweb", "tracxn"],
    tasks: [
      { id: "p1-t1", text: "Search target keywords in Google Trends and note historical search demand.", category: "Planning" },
      { id: "p1-t2", text: "Map out details (pricing, features, strengths) of 3 direct competitors in India.", category: "Planning" },
      { id: "p1-t3", text: "Create a customer feedback form using free tools like Tally Forms.", category: "Planning" },
      { id: "p1-t4", text: "Conduct discovery chats with 10 target buyers and document their specific pain points.", category: "Planning" }
    ]
  },
  {
    id: 2,
    name: "Legal Setup & Compliance",
    tagline: "Formalize operations and build legal credibility",
    description: "Register your business entity, secure your GSTIN, open corporate current accounts, and set up your tax compliance structure.",
    scoreWeight: 10,
    objectives: [
      "Select business structure (Pvt Ltd, LLP, Sole Proprietorship)",
      "Secure GSTIN certificate",
      "Open business bank account",
      "Install GST-ready billing systems",
      "Apply for sector-specific licenses (FSSAI, CPCB/SPCB)"
    ],
    deliverables: [
      "Incorporation Certificate / Udyam Certificate",
      "GSTIN Number",
      "Active Current Account Details",
      "Compliance Calendar"
    ],
    mistakes: [
      "Paying high consultancy fees upfront when you could register as a free MSME",
      "Delaying GST registration, causing payment gateway activation failures",
      "Using personal bank accounts for customer transactions, complicating auditing"
    ],
    toolIds: ["razorpay-rize", "indiafilings", "vakilsearch", "mca-portal", "udyam-registration", "cpcb-portal", "zoho-books", "vyapar", "tallyprime", "khatabook"],
    tasks: [
      { id: "p2-t1", text: "Check your proposed company name availability on the official Ministry of Corporate Affairs portal.", category: "Compliance" },
      { id: "p2-t2", text: "Apply for a Udyam Registration Certificate to qualify for MSME perks.", category: "Compliance" },
      { id: "p2-t3", text: "Register for GSTIN via Razorpay Rize, IndiaFilings, or the GST government portal.", category: "Compliance" },
      { id: "p2-t4", text: "Open a corporate current bank account with verified banking partners.", category: "Compliance" },
      { id: "p2-t5", text: "Set up billing software like Zoho Books or Vyapar to track business transactions.", category: "Compliance" }
    ]
  },
  {
    id: 3,
    name: "Funding & Government Support",
    tagline: "Acquire funding resources & state support",
    description: "Get DPIIT recognition, map funding schemes on the Grant Radar, and draft pitching assets to lock in initial startup capital.",
    scoreWeight: 10,
    objectives: [
      "Submit DPIIT Startup India recognition application",
      "Identify 3 eligible state or central government grants",
      "Draft pitch deck or project feasibility reports",
      "Understand revenue financing or angel capital avenues"
    ],
    deliverables: [
      "DPIIT Certificate of Recognition",
      "Investor Pitch Deck",
      "Grant Application Package"
    ],
    mistakes: [
      "Pitching VCs for an idea that is suitable for bootstrapping or local loans",
      "Overlooking regional subsidies like iStart Rajasthan seed funds",
      "Valuing equity too early during family capital seed rounds"
    ],
    toolIds: ["istart-rajasthan", "letsventure", "tyke", "velocity"],
    tasks: [
      { id: "p3-t1", text: "Apply for DPIIT Recognition on the Startup India Portal to unlock tax benefits.", category: "Compliance" },
      { id: "p3-t2", text: "Check your eligibility against schemes listed in the Grant Radar.", category: "Planning" },
      { id: "p3-t3", text: "Draft an investor pitch deck mapping out metrics and target milestones.", category: "Planning" }
    ]
  },
  {
    id: 4,
    name: "Product & Supply Chain",
    tagline: "Assemble your Minimum Viable Product (MVP)",
    description: "Sourcing raw materials, identifying local manufacturers on IndiaMART, negotiating contract manufacturing, and packaging your first MVP.",
    scoreWeight: 10,
    objectives: [
      "Define product specifications & Bill of Materials (BOM)",
      "Shortlist 3 suppliers or contract manufacturers",
      "Negotiate MOQ (Minimum Order Quantity) and unit pricing",
      "Coordinate packaging and warehousing logistics",
      "Build first physical batch or launch software prototype"
    ],
    deliverables: [
      "Product Prototype / Initial Software MVP",
      "Supplier Agreement Details",
      "Unit Cost & Pricing Spreadsheet"
    ],
    mistakes: [
      "Ordering 1,000 units of custom packaging before validating supplier product quality",
      "Underestimating Indian shipping/freight times and import customs clearances",
      "Ignoring unit economics, leading to selling products at a net loss"
    ],
    toolIds: ["indiamart", "zetwerk", "shiprocket", "jumbotail"],
    tasks: [
      { id: "p4-t1", text: "Draft specifications and target unit economics for your initial product/service.", category: "Product" },
      { id: "p4-t2", text: "Contact 3 verified manufacturers on IndiaMART or TradeIndia to compare rates.", category: "Product" },
      { id: "p4-t3", text: "Negotiate sample orders to check build quality before signing contracts.", category: "Product" },
      { id: "p4-t4", text: "Assemble your first functional product batch or launch software prototype.", category: "Product" }
    ]
  },
  {
    id: 5,
    name: "Digital Presence & Payments",
    tagline: "Establish your storefront and checkout pipeline",
    description: "Buy your domain, build a clean website, integrate your checkout payment gateway, and run a live end-to-end checkout test.",
    scoreWeight: 10,
    objectives: [
      "Register brand domain name (.in or .com)",
      "Build store/landing pages on Shopify or Framer",
      "Integrate Razorpay or Stripe checkout scripts",
      "Configure automated email/SMS invoice alerts",
      "Test end-to-end transaction flows"
    ],
    deliverables: [
      "Active Domain Name",
      "Published E-commerce Store / Landing Page",
      "Approved Payment Gateway Integration",
      "Successful Live ₹1 checkout verification"
    ],
    mistakes: [
      "Spending weeks building custom code when Shopify or Framer could launch in a day",
      "Failing to verify checkouts on mobile screens (where 80% of traffic exists in India)",
      "Leaving payment gateways in sandbox mode during launch announcements"
    ],
    toolIds: ["shopify", "framer", "hostinger", "razorpay", "cashfree", "instamojo", "stripe"],
    tasks: [
      { id: "p5-t1", text: "Register a brand domain name on Hostinger or Namecheap.", category: "Product" },
      { id: "p5-t2", text: "Build a responsive landing page or e-commerce shop using Shopify or Framer.", category: "Product" },
      { id: "p5-t3", text: "Connect payment processing credentials (like Razorpay or Stripe).", category: "Compliance" },
      { id: "p5-t4", text: "Complete a live transaction of ₹1 to verify settlement flows.", category: "Compliance" }
    ]
  },
  {
    id: 6,
    name: "Marketing & Audience Building",
    tagline: "Generate consumer interest before launching",
    description: "Create your brand assets, establish professional channels, draft content playbooks, and launch waitlist capture programs.",
    scoreWeight: 10,
    objectives: [
      "Design brand logos and assets on Canva",
      "Launch professional profiles on LinkedIn, YouTube, or Instagram",
      "Plan out a 30-day content calendar",
      "Create landing page lead-capture waitlists"
    ],
    deliverables: [
      "Brand Asset Kit",
      "LinkedIn/Instagram content layout",
      "Pre-launch Waitlist of 100+ emails"
    ],
    mistakes: [
      "Investing in expensive meta ads before building organic posting profiles",
      "Posting inconsistent low-quality graphics instead of value-first videos",
      "Failing to capture viewer emails, losing retargeting capability"
    ],
    toolIds: ["canva", "predis-ai", "beehiiv", "taplio", "ahrefs", "semrush"],
    tasks: [
      { id: "p6-t1", text: "Design a professional logo and brand layout using Canva.", category: "Marketing" },
      { id: "p6-t2", text: "Set up company handle accounts on LinkedIn, Instagram, or YouTube.", category: "Marketing" },
      { id: "p6-t3", text: "Schedule 2 weeks of educational/teaser posts using social planners.", category: "Marketing" },
      { id: "p6-t4", text: "Create an email subscription list (e.g. Beehiiv) to collect waitlist signups.", category: "Marketing" }
    ]
  },
  {
    id: 7,
    name: "Operations & Systems",
    tagline: "Build scalable back-office workflows",
    description: "Organize tasks on Notion, set up company email inboxes, organize payroll systems, and configure automated data syncing pipelines.",
    scoreWeight: 10,
    objectives: [
      "Centralize operational guidelines (SOPs) on Notion",
      "Configure business email domain addresses",
      "Set up accounting books and payroll pipelines",
      "Automate lead logs to CRM databases"
    ],
    deliverables: [
      "Notion Internal Wiki",
      "Business Email Accounts",
      "Active Payroll / Employee logging system",
      "Operational automation rules"
    ],
    mistakes: [
      "Keeping critical business files in scattered individual WhatsApp messages",
      "Neglecting contracts for freelance builders, causing legal disputes",
      "Failing to track employee tax (TDS) and Professional Tax (PT) calculations"
    ],
    toolIds: ["notion", "slack", "zapier", "razorpay-payroll"],
    tasks: [
      { id: "p7-t1", text: "Set up a centralized Notion workspace to document business processes (SOPs).", category: "Operations" },
      { id: "p7-t2", text: "Create professional business emails using Google Workspace or Zoho Mail.", category: "Operations" },
      { id: "p7-t3", text: "Set up compliance payroll dashboards if hiring employees or contractors.", category: "Operations" },
      { id: "p7-t4", text: "Establish a Zapier or Make connection flow to sync incoming leads directly into your database.", category: "Operations" }
    ]
  },
  {
    id: 8,
    name: "Launch Engine",
    tagline: "Deploy your product to the market",
    description: "Launch public listings on directories like Product Hunt and BetaList, broadcast to email lists, and trigger PR distribution lists.",
    scoreWeight: 10,
    objectives: [
      "Draft promotional graphics and launch copywriting copy",
      "Establish profiles on global and local startup directories",
      "Launch to pre-collected email waitlists",
      "Track customer signups and checkout metrics"
    ],
    deliverables: [
      "Product Hunt Launch Page",
      "Live Launch Email Broadcast",
      "Launch Day Metrics Dashboard"
    ],
    mistakes: [
      "Launching quietly without telling anyone, expecting traffic to magically appear",
      "Failing to support customers live on launch day (leads to poor early reviews)",
      "Ignoring feedback comments on community boards during launch week"
    ],
    toolIds: ["shopify", "razorpay", "beehiiv"],
    tasks: [
      { id: "p8-t1", text: "Prepare high-fidelity mockups and marketing copy for your launch campaign.", category: "Launch" },
      { id: "p8-t2", text: "Draft launch listings for Product Hunt, Uneed, and Indian startup directories.", category: "Launch" },
      { id: "p8-t3", text: "Send a launch announcement newsletter to your warm pre-launch waitlist.", category: "Launch" },
      { id: "p8-t4", text: "Monitor real-time visitors, checkout conversions, and coordinate client support queries.", category: "Launch" }
    ]
  },
  {
    id: 9,
    name: "Analytics, Growth & Scale",
    tagline: "Track data to compound expansion",
    description: "Analyze customer session replays, configure metrics databases, optimize sales pipelines, and chart hiring expansions.",
    scoreWeight: 10,
    objectives: [
      "Integrate product telemetry codes (Google Analytics, PostHog)",
      "Set up CAC, LTV, and cohort retention charts",
      "Establish affiliate referral programs",
      "Create scalable expansion templates"
    ],
    deliverables: [
      "Analytics Cohort Dashboard",
      "Financial Runrate sheet",
      "12-Month Growth Roadmap"
    ],
    mistakes: [
      "Ignoring analytics, running blind updates without tracking user click flows",
      "Scaling paid ads while unit economics are negative, speeding up insolvency",
      "Hiring employees too fast before locking in stable monthly recurring revenue (MRR)"
    ],
    toolIds: ["posthog", "mixpanel"],
    tasks: [
      { id: "p9-t1", text: "Integrate PostHog or Google Analytics tracking scripts to log site behavior.", category: "Analytics" },
      { id: "p9-t2", text: "Analyze CAC (Customer Acquisition Cost) vs Customer LTV (Lifetime Value) ratios.", category: "Growth" },
      { id: "p9-t3", text: "Set up a customer referral scheme to generate viral growth.", category: "Growth" },
      { id: "p9-t4", text: "Formulate a hiring checklist and operational scaling plan for the next 12 months.", category: "Growth" }
    ]
  }
];
