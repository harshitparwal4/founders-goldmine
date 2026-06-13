export interface Grant {
  id: string;
  name: string;
  description: string;
  amount: string; // e.g. "₹5,00,000", "₹20,000 to ₹10,000,000"
  amountVal: number; // numerical value in INR for logic checks
  difficulty: "Easy" | "Medium" | "Hard";
  deadline: string;
  state: string; // "All India" or specific state like "Rajasthan", "Karnataka"
  industry: string[]; // "All" or categories like ["Manufacturing", "Sustainable"]
  eligibility: string[];
  url: string;
}

export const grantsData: Grant[] = [
  {
    id: "startup-india-seed-fund",
    name: "Startup India Seed Fund Scheme (SISFS)",
    description: "Financial assistance to early-stage startups for proof of concept, prototype development, product trials, market-entry, and commercialization.",
    amount: "Up to ₹50 Lakhs",
    amountVal: 5000000,
    difficulty: "Hard",
    deadline: "Ongoing (Apply via incubator portal)",
    state: "All India",
    industry: ["All", "AI Startup", "Manufacturing", "Sustainable"],
    eligibility: [
      "Must be DPIIT registered startup incorporated less than 2 years ago",
      "Should have a business idea to develop a product or service with market fit",
      "Must not have received more than ₹10 Lakhs of monetary support from other state/central schemes"
    ],
    url: "https://seedfund.startupindia.gov.in"
  },
  {
    id: "istart-rajasthan-seed",
    name: "iStart Rajasthan Startup Fund",
    description: "Seed funding support for registered Rajasthan startups. Offers monthly sustenance allowance, marketing assistance, and scale-up matching grants.",
    amount: "Up to ₹25 Lakhs (Non-dilutive)",
    amountVal: 2500000,
    difficulty: "Medium",
    deadline: "Open All Year",
    state: "Rajasthan",
    industry: ["All", "Dropshipping", "AI Startup", "Sustainable", "Food Business"],
    eligibility: [
      "Registered on the iStart Rajasthan portal",
      "Startup must have active physical presence or head office in Rajasthan",
      "Must have a valid Q-Rate score issued by iStart team (Bronze or above)"
    ],
    url: "https://istart.rajasthan.gov.in"
  },
  {
    id: "msme-credit-guarantee",
    name: "MSME Credit Guarantee Scheme (CGTMSE)",
    description: "Collateral-free credit loans for micro and small enterprises to build industrial assets, set up raw plant facilities, and manage working capital requirements.",
    amount: "Collateral-free Loans up to ₹5 Crores",
    amountVal: 50000000,
    difficulty: "Hard",
    deadline: "Open All Year (Apply via partner banks)",
    state: "All India",
    industry: ["Manufacturing", "Sustainable", "Food Business"],
    eligibility: [
      "Must hold a valid Udyam Registration Certificate",
      "Must qualify as a Micro or Small Enterprise under MSME definitions",
      "Project feasibility report verified by lending institutions (SIDBI, SBI, PNB, etc.)"
    ],
    url: "https://www.cgtmse.in"
  },
  {
    id: "mudra-loan-shishu",
    name: "Pradhan Mantri MUDRA Yojana - Shishu Loan",
    description: "Low-interest financial assistance to micro units and small businesses for starting basic trade, shop outlets, or small-scale local manufacturing units.",
    amount: "Up to ₹50,000",
    amountVal: 50000,
    difficulty: "Easy",
    deadline: "Ongoing",
    state: "All India",
    industry: ["Freelancer", "Food Business", "Dropshipping", "Manufacturing"],
    eligibility: [
      "Must be an Indian citizen starting a non-farm income-generating activity",
      "Does not require collateral or security guarantees",
      "Minimum age of applicant must be 18 years"
    ],
    url: "https://www.mudra.org.in"
  },
  {
    id: "msme-idea-hackathon",
    name: "MSME Idea Hackathon (Design & IP Support)",
    description: "Financial grant from Ministry of MSME supporting execution, incubation, patent filing, and design validation of innovative entrepreneur ideas.",
    amount: "Up to ₹15 Lakhs per idea",
    amountVal: 1500000,
    difficulty: "Medium",
    deadline: "Next cycle begins July 2026",
    state: "All India",
    industry: ["Sustainable", "Manufacturing", "AI Startup"],
    eligibility: [
      "Open to individual students, innovators, and registered MSME units",
      "Project must demonstrate ecological viability or technology innovation",
      "Must be presented at an approved host incubator institution"
    ],
    url: "https://innovative.msme.gov.in"
  },
  {
    id: "samridh-accelerator",
    name: "MeitY SAMRIDH Scheme",
    description: "Accelerator program providing mentorship, market access, and co-investment matching funds for early-stage software and tech-based startups.",
    amount: "Up to ₹40 Lakhs (Co-investment model)",
    amountVal: 4000000,
    difficulty: "Hard",
    deadline: "Rolling batches via MeitY incubators",
    state: "All India",
    industry: ["AI Startup"],
    eligibility: [
      "Software product startup with a working prototype/MVP",
      "Must be incorporated and registered under Startup India DPIIT",
      "Should have generated initial customer traction or pilot trial pipelines"
    ],
    url: "https://www.meitystartuphub.in"
  },
  {
    id: "green-energy-subsidy",
    name: "IREDA Green Energy Sourcing Subsidy",
    description: "Subsidies on capital costs and low-cost solar installation loans for startups executing sustainable waste recycling plants or installing clean power grids.",
    amount: "20% to 35% Capital Subsidy",
    amountVal: 10000000,
    difficulty: "Hard",
    deadline: "Open (Subject to state electricity board quotas)",
    state: "All India",
    industry: ["Sustainable"],
    eligibility: [
      "Registered plant under State Pollution Control Board guidelines",
      "EPR (Extended Producer Responsibility) authorization certificate",
      "Commercial land ownership or factory layout clearance certificate"
    ],
    url: "https://www.ireda.in"
  },
  {
    id: "women-entrepreneurship-platform",
    name: "WEP NITI Aayog Grant Pool",
    description: "Seed grants, incubation mentorship, and zero-equity capital pools provided exclusively to women-led enterprises in India.",
    amount: "Up to ₹10 Lakhs",
    amountVal: 1000000,
    difficulty: "Medium",
    deadline: "Next Cohort Sept 2026",
    state: "All India",
    industry: ["All", "Creator", "D2C Brand", "Food Business", "B2B Agency"],
    eligibility: [
      "Enterprise must be led by a female founder holding at least 51% equity stake",
      "Must be registered on the WEP (Women Entrepreneurship Platform)",
      "Targeting small scale expansion, raw-material sourcing, or tech upgrades"
    ],
    url: "https://wep.gov.in"
  }
];
