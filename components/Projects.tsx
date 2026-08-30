"use client";
import { useState, useMemo } from "react";
import { ExternalLink, Calendar, Tag, Globe, Search, Copy, Check, Sparkles } from "lucide-react";

type Project = {
  name: string;
  file: string;
  category: "Web2 SaaS" | "Web3 Blockchain" | "Mobile Apps" | "Tools & Self";
  period: string;
  url: string;
  desc: string;
  tags: string[];
  accent: string;
  border: string;
  dotBg: string;
  metrics: { v: string; l: string }[];
  points: string[];
  code: string;
};

const featuredProjects: Project[] = [
  {
    name: "OWR",
    file: "owr.ts",
    category: "Web2 SaaS",
    period: "04/2023 – 06/2025",
    url: "https://owr.app/",
    desc: "Fully customizable e-commerce platform — Shopify-like multi-tenant store management for merchants with dynamic themes and Redis caching.",
    tags: ["React.js", "Node.js", "PostgreSQL", "Tailwind CSS", "Redis", "Multi-Tenant"],
    accent: "text-vs-accent",
    border: "border-vs-accent",
    dotBg: "bg-vs-accent",
    metrics: [{ v: "+30%", l: "Merchant Presence" }, { v: "+30%", l: "User Engagement" }],
    points: [
      "Super Admin Panel with complete centralized control over merchants, dynamic storefronts, and system users.",
      "Custom storefront themes, automated delivery partner dispatch, and multi-gateway payment integrations.",
      "Real-time WhatsApp transactional order updates, automated customer alerts, and in-app support.",
      "Redis multi-tier caching to optimize catalog data retrieval, reducing average page load times by 70%.",
    ],
    code: `const owr = new MultiTenantStore({
  merchants: "unlimited",
  ui: "React + Tailwind",
  cache: "Redis (sub-100ms)",
  db: "PostgreSQL",
  payments: ["Stripe", "Razorpay", "UPI"],
  features: ["Dynamic Themes", "WhatsApp Alerts"]
});`,
  },
  {
    name: "Indonesia On Chain",
    file: "indonesia-on-chain.ts",
    category: "Web3 Blockchain",
    period: "04/2024 – 06/2024",
    url: "https://rqy52-yyaaa-aaaak-qloeq-cai.icp0.io/",
    desc: "Decentralized LMS on ICP blockchain — course tracking, interactive quizzes, and tamper-proof NFT certificate issuance.",
    tags: ["React.js", "ICP Blockchain", "Motoko", "Web3", "NFT", "Google Cloud"],
    accent: "text-vs-cyan",
    border: "border-vs-cyan",
    dotBg: "bg-vs-cyan",
    metrics: [{ v: "+150/mo", l: "Course Uploads" }, { v: "+30%", l: "User Satisfaction" }],
    points: [
      "Admin dashboard to curate multimedia courses and monitor student engagement metrics.",
      "Student learning portal with quiz assessments and direct on-chain certificate minting.",
      "Integrated Internet Computer (ICP) Motoko canisters for issuing tamper-proof NFT credentials with zero gas fees.",
      "Google Cloud storage integration for adaptive bitrate video streaming.",
    ],
    code: `const platform = new LearningPlatform({
  blockchain: "ICP (Internet Computer)",
  contracts: "Motoko Canisters",
  certificates: "NFT Credentials",
  storage: "Google Cloud Video Streaming",
  gasModel: "Reverse Gas ($0 user fees)"
});`,
  },
  {
    name: "Begods",
    file: "begods.ts",
    category: "Web3 Blockchain",
    period: "06/2022 – 09/2023",
    url: "https://ljk2g-uyaaa-aaaak-qi3hq-cai.icp0.io/",
    desc: "Web3 NFT collector platform on ICP — collect, buy, sell and trade game character NFTs with rare editions and marketplace mechanics.",
    tags: ["ICP Blockchain", "EXTv2 Smart Contracts", "React.js", "NFT", "Web3"],
    accent: "text-vs-yellow",
    border: "border-vs-yellow",
    dotBg: "bg-vs-yellow",
    metrics: [{ v: "10 Devs", l: "Team Led" }, { v: "+30%", l: "Faster Delivery" }],
    points: [
      "Collectors can acquire character cards with tiered rarity metrics and special attributes.",
      "Decentralized peer-to-peer trading powered by EXTv2 smart contracts on ICP.",
      "Admin dashboard for mint batches, rarity probabilities, and commission management.",
      "Smooth gaming-themed UI with micro-animations and non-custodial wallet connections.",
    ],
    code: `const begods = new NFTCollector({
  chain: "ICP",
  standards: "EXTv2 Smart Contracts",
  features: ["Mint", "Buy", "Sell", "Trade", "Rarity Matrix"],
  teamSize: 10,
  architecture: "High-Throughput Web3"
});`,
  },
  {
    name: "BlockseBlock",
    file: "blockseblock.ts",
    category: "Web2 SaaS",
    period: "2023 – 2024",
    url: "https://blockseblock.com/",
    desc: "Comprehensive hackathon & competition platform with participant, organizer, and judge dashboards.",
    tags: ["React.js", "Node.js", "MongoDB", "Security", "Hackathon"],
    accent: "text-vs-purple",
    border: "border-vs-purple",
    dotBg: "bg-[#c586c0]",
    metrics: [{ v: "Encrypted", l: "Secure Data" }, { v: "3-Role", l: "Live Dashboard" }],
    points: [
      "Participants can browse global hackathons, submit project demos, and claim verified certificates.",
      "Organizers access cohort analytics, team formation tools, and sponsorship management.",
      "Dedicated judging portal with weighted score rubrics and automated winner ranking.",
      "End-to-end encryption across submissions and participant data.",
    ],
    code: `const blockseblock = new HackathonPlatform({
  roles: ["participant", "organizer", "judge"],
  security: "End-to-End Encrypted",
  db: "MongoDB",
  evaluations: "Automated Weighted Scoring"
});`,
  },
  {
    name: "SipNPlay",
    file: "sipnplay.ts",
    category: "Web3 Blockchain",
    period: "2023 – 2024",
    url: "https://sipnplay.io/",
    desc: "ICP-based gaming platform — play HTML5 games with SIPNPLAY tokens and earn leaderboard rewards.",
    tags: ["ICP Blockchain", "Rust", "React.js", "Web3", "Gaming", "Tokens"],
    accent: "text-vs-blue",
    border: "border-vs-blue",
    dotBg: "bg-vs-blue",
    metrics: [{ v: "Token", l: "Based Gameplay" }, { v: "Auto", l: "Reward Payout" }],
    points: [
      "Connect Web3 wallets and utilize SIPNPLAY tokens for entry into arcade titles.",
      "Compete on global leaderboards with automated smart-contract reward distribution.",
      "Admin panel for game analytics, token burn schedules, and airdrops.",
      "Low-latency wallet authentication built on ICP canisters.",
    ],
    code: `const sipnplay = new GamingPlatform({
  chain: "ICP",
  contracts: "Rust Canisters",
  tokens: "SIPNPLAY Utility Token",
  rewards: "Automated Daily Payouts"
});`,
  },
  {
    name: "Finstreet",
    file: "finstreet.ts",
    category: "Web2 SaaS",
    period: "2021 – 2022",
    url: "https://finstreet.in/",
    desc: "Leading financial education platform in India — interactive learning modules, market analysis, and crypto insights.",
    tags: ["React.js", "Node.js", "PostgreSQL", "Finance", "Education"],
    accent: "text-vs-accent",
    border: "border-vs-accent",
    dotBg: "bg-vs-accent",
    metrics: [{ v: "100K+", l: "Learners" }, { v: "Top", l: "Finance Platform" }],
    points: [
      "Educational portal covering financial markets, technical analysis, and blockchain fundamentals.",
      "Structured curriculum with interactive quizzes and community discussion forums.",
      "Recognized as one of India's prominent early financial literacy platforms.",
      "Successfully scaled to support thousands of concurrent learners.",
    ],
    code: `const finstreet = new FinancePlatform({
  stack: "React + Node.js",
  db: "PostgreSQL",
  focus: "Financial Literacy & Crypto Education",
  scale: "100k+ users"
});`,
  },
  {
    name: "Xpedition",
    file: "xpedition.ts",
    category: "Web2 SaaS",
    period: "2023 – 2024",
    url: "https://xpedition.club/",
    desc: "Task & reward platform — complete micro-tasks, track social media engagement, and earn verified rewards.",
    tags: ["React.js", "Node.js", "Express.js", "PostgreSQL", "Docker", "CI/CD"],
    accent: "text-vs-cyan",
    border: "border-vs-cyan",
    dotBg: "bg-vs-cyan",
    metrics: [{ v: "Real $", l: "Payouts" }, { v: "Automated", l: "Social Verification" }],
    points: [
      "Users complete campaigns, earn verified point balances, and request direct payouts.",
      "Automated verification APIs for YouTube, Twitter (X), and Instagram engagements.",
      "Admin campaign manager for task upload, payout queue processing, and fraud detection.",
      "Engineered high-reliability Docker and CI/CD deployment pipeline.",
    ],
    code: `const xpedition = new TaskPlatform({
  stack: "React + Node + Express",
  db: "PostgreSQL",
  infra: "Docker + GitHub Actions CI/CD",
  verification: ["YouTube", "Twitter/X", "Instagram"]
});`,
  },
  {
    name: "Heebee Coffee",
    file: "heebee.ts",
    category: "Web2 SaaS",
    period: "2022 – 2023",
    url: "https://heebee.in/",
    desc: "POS & restaurant ordering system — QR table ordering, kitchen order tickets (KOT), and franchise management.",
    tags: ["React.js", "Node.js", "PostgreSQL", "POS", "QR Ordering"],
    accent: "text-vs-yellow",
    border: "border-vs-yellow",
    dotBg: "bg-vs-yellow",
    metrics: [{ v: "30s", l: "Order Time (was 15m)" }, { v: "Multi-Store", l: "Franchise Ready" }],
    points: [
      "Cut table order-taking time down from 15 minutes to under 30 seconds via QR digital ordering.",
      "Real-time kitchen order tickets (KOT) synchronization with barista screens.",
      "Franchise reporting analytics for branch-wise sales, inventory wastage, and revenue reconciliation.",
      "Transparent digital register eliminated barista cash discrepancies.",
    ],
    code: `const heebee = new POSSystem({
  stack: "React + Node.js",
  db: "PostgreSQL",
  features: ["QR Table Ordering", "Real-Time KOT", "Franchise Sync"],
  efficiencyGain: "96% faster ordering"
});`,
  },
  {
    name: "Valueswap",
    file: "valueswap.ts",
    category: "Web3 Blockchain",
    period: "2022 – 2023",
    url: "https://ibd5w-gqaaa-aaaac-aadda-cai.icp0.io/",
    desc: "Decentralized multi-chain swap platform on ICP — Balancer-style liquidity pools for token conversions.",
    tags: ["ICP Blockchain", "Rust", "React.js", "DeFi", "Multi-chain", "DEX"],
    accent: "text-vs-purple",
    border: "border-vs-purple",
    dotBg: "bg-[#c586c0]",
    metrics: [{ v: "Multi-Chain", l: "Token Swaps" }, { v: "Balancer", l: "Pool Model" }],
    points: [
      "Cross-chain swaps executed seamlessly on the Internet Computer network.",
      "Balancer-inspired weighted liquidity pools for automated market making.",
      "Real-time slippage, liquidity tracking, and depth visualization.",
      "Audited canister architecture ensuring fund safety and minimal transaction friction.",
    ],
    code: `const valueswap = new DEXPlatform({
  chain: "ICP",
  contracts: "Rust Canisters",
  model: "Weighted Liquidity Pools",
  capabilities: ["Instant Multi-Chain Swaps", "LP Staking"]
});`,
  },
  {
    name: "Codestep",
    file: "codestep.ts",
    category: "Web2 SaaS",
    period: "2023 – 2024",
    url: "https://codestep.kaifoundry.com/",
    desc: "Developer mentorship & collaboration ecosystem — real production projects, rewards, and talent hiring pathways.",
    tags: ["React.js", "Node.js", "Express.js", "PostgreSQL", "Mentorship"],
    accent: "text-vs-blue",
    border: "border-vs-blue",
    dotBg: "bg-vs-blue",
    metrics: [{ v: "Direct", l: "Hiring Pipeline" }, { v: "Verified", l: "Contributions" }],
    points: [
      "Aspiring developers collaborate on real production repositories under senior mentorship.",
      "Automated code review metrics, milestone rewards, and verified credential certificates.",
      "Integrated developer chat, task assignments, and progress tracking.",
      "Direct talent matching with tech recruiters seeking proven contributors.",
    ],
    code: `const codestep = new MentorshipPlatform({
  stack: "React + Node + Express",
  db: "PostgreSQL",
  features: ["Project Matching", "Milestone Rewards", "Direct Hiring Pipeline"]
});`,
  },
];

const allProjectsArchive = [
  // WEB2 COMPANY
  { name: "YSchool",               category: "Web2 SaaS",         url: "" },
  { name: "SIM",                   category: "Web2 SaaS",         url: "" },
  { name: "VCF Convertor",         category: "Tools & Self",      url: "" },
  { name: "Arctic Buying Co",      category: "Web2 SaaS",         url: "" },
  { name: "Finstreet 2021",        category: "Web2 SaaS",         url: "https://finstreet.in/" },
  { name: "Quadb Sample",          category: "Web2 SaaS",         url: "" },
  { name: "Quadbtech Ecommerce",   category: "Web2 SaaS",         url: "" },
  { name: "Quadbtech Ecom Admin",  category: "Web2 SaaS",         url: "" },
  { name: "Quadbtech Investment",  category: "Web2 SaaS",         url: "" },
  { name: "Blog CMS",              category: "Web2 SaaS",         url: "" },
  { name: "Finflix OTT",           category: "Web2 SaaS",         url: "" },
  { name: "Cryptic Entertainment", category: "Web2 SaaS",         url: "" },
  { name: "Shop Quadb",            category: "Web2 SaaS",         url: "" },
  { name: "Spicy Punks",           category: "Web3 Blockchain",   url: "" },
  { name: "React CMS",             category: "Web2 SaaS",         url: "" },
  { name: "Finflix 2021",          category: "Web2 SaaS",         url: "" },
  { name: "Dank Thrift",           category: "Web2 SaaS",         url: "" },
  { name: "Qworks",                category: "Web2 SaaS",         url: "" },
  { name: "Kaifoundry 2.0",        category: "Web2 SaaS",         url: "" },
  { name: "SigLab",                category: "Web2 SaaS",         url: "https://siglabs.xyz/" },
  { name: "Nek Punjabi Estate",    category: "Web2 SaaS",         url: "" },
  { name: "Quadbtech 2.0",         category: "Web2 SaaS",         url: "" },
  { name: "BlockseBlock",          category: "Web2 SaaS",         url: "https://blockseblock.com/" },
  { name: "Xpedition",             category: "Web2 SaaS",         url: "https://xpedition.club/" },
  { name: "Codestep",              category: "Web2 SaaS",         url: "https://codestep.kaifoundry.com/" },
  { name: "NIFD Login",            category: "Web2 SaaS",         url: "" },
  { name: "Qtech 2.0",             category: "Web2 SaaS",         url: "" },
  { name: "Heebee Coffee",         category: "Web2 SaaS",         url: "https://heebee.in/" },
  { name: "Learn Blockseblock",    category: "Web2 SaaS",         url: "https://learn.blockseblock.com/" },
  { name: "Jio HTML5 Games",       category: "Web2 SaaS",         url: "" },
  { name: "Game Distribution",     category: "Web2 SaaS",         url: "" },
  { name: "Game Monetized",        category: "Web2 SaaS",         url: "" },
  { name: "Crazy Games",           category: "Web2 SaaS",         url: "" },
  { name: "16 Goti Games",         category: "Web2 SaaS",         url: "" },
  { name: "Royal Multiplayer Chess", category: "Web2 SaaS",       url: "" },

  // WEB3 COMPANY
  { name: "PinkPaper",             category: "Web3 Blockchain",   url: "http://165.227.164.81/" },
  { name: "UniqArt",               category: "Web3 Blockchain",   url: "http://143.244.138.172/" },
  { name: "Ethereum Shop",         category: "Web3 Blockchain",   url: "" },
  { name: "Attendee Reward System",category: "Web3 Blockchain",   url: "" },
  { name: "GrowTown",              category: "Web3 Blockchain",   url: "https://7ynkd-kiaaa-aaaac-ahmfq-cai.icp0.io/" },
  { name: "Valueswap",             category: "Web3 Blockchain",   url: "https://ibd5w-gqaaa-aaaac-aadda-cai.icp0.io/" },
  { name: "SipNPlay",              category: "Web3 Blockchain",   url: "https://sipnplay.io/" },
  { name: "Indonesia On Chain",    category: "Web3 Blockchain",   url: "https://rqy52-yyaaa-aaaak-qloeq-cai.icp0.io/" },
  { name: "Begods",                category: "Web3 Blockchain",   url: "https://ljk2g-uyaaa-aaaak-qi3hq-cai.icp0.io/" },
  { name: "Ddate",                 category: "Web3 Blockchain",   url: "" },

  // MOBILE APPS
  { name: "Crypto Trainer",        category: "Mobile Apps",       url: "" },
  { name: "Plant Vs Alien",        category: "Mobile Apps",       url: "" },

  // SELF PROJECTS
  { name: "MakeMySNAP",            category: "Tools & Self",      url: "" },
  { name: "Multi Downloader",      category: "Tools & Self",      url: "" },
  { name: "Envato Downloader",     category: "Tools & Self",      url: "" },
  { name: "WhatsTool",             category: "Tools & Self",      url: "" },
  { name: "BMI Motoko",            category: "Web3 Blockchain",   url: "" },
  { name: "URL Shortener",         category: "Tools & Self",      url: "" },
  { name: "Resume Portfolio",      category: "Tools & Self",      url: "" },
  { name: "Expense Manager",       category: "Tools & Self",      url: "" },
  { name: "Smart Kitchen Management", category: "Tools & Self",   url: "" },
  { name: "Corpow (Productivity)", category: "Tools & Self",      url: "" },
];

export default function Projects() {
  const [active, setActive] = useState(0);
  const [filterCategory, setFilterCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [copied, setCopied] = useState(false);

  const filteredFeatured = useMemo(() => {
    return featuredProjects.filter((p) => {
      const matchCat = filterCategory === "All" || p.category === filterCategory;
      const matchSearch =
        searchQuery === "" ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCat && matchSearch;
    });
  }, [filterCategory, searchQuery]);

  const p = filteredFeatured[active] || featuredProjects[0];

  const handleCopyCode = () => {
    if (p) {
      navigator.clipboard?.writeText(p.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <div className="p-3 sm:p-6 font-mono max-w-5xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1 text-[11px] text-vs-muted mb-5">
        <span>chandan-portfolio</span>
        <span className="text-vs-border mx-0.5">›</span>
        <span className="text-vs-text">projects.tsx</span>
      </div>

      {/* Header with Search & Filter Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-5">
        <div>
          <p className="text-vs-comment text-[12px]">{"// Featured Production Projects — 58 total (2020–2025)"}</p>
          <p className="text-vs-muted text-[11px] mt-0.5">Select a project to inspect architecture, metrics & code snippet</p>
        </div>

        {/* Search Input */}
        <div className="flex items-center gap-2 bg-vs-bg2 border border-vs-border rounded px-3 py-1.5 w-full md:w-64">
          <Search size={13} className="text-vs-muted shrink-0" />
          <input
            type="text"
            placeholder="Search by tech or name..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setActive(0);
            }}
            className="bg-transparent text-[11px] text-vs-text outline-none w-full placeholder-vs-muted font-mono"
          />
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-4">
        {["All", "Web2 SaaS", "Web3 Blockchain", "Mobile Apps", "Tools & Self"].map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setFilterCategory(cat);
              setActive(0);
            }}
            className={`px-2.5 py-1 rounded text-[11px] whitespace-nowrap border transition-all ${
              filterCategory === cat
                ? "bg-vs-accent text-white border-vs-accent font-semibold shadow-glow"
                : "bg-vs-bg2 border-vs-border text-vs-muted hover:text-vs-text hover:border-vs-border2"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Main Project Inspector */}
      {filteredFeatured.length === 0 ? (
        <div className="p-8 text-center bg-vs-bg2 border border-vs-border rounded-lg text-vs-muted text-[12px]">
          No projects matched your search &quot;{searchQuery}&quot; in category &quot;{filterCategory}&quot;.
        </div>
      ) : (
        <div className="flex gap-4 flex-col lg:flex-row">
          {/* Project List (Left sidebar on desktop, horizontal scroll on mobile) */}
          <div className="flex flex-row lg:flex-col gap-1 lg:w-56 shrink-0 overflow-x-auto pb-1 lg:pb-0 lg:overflow-visible">
            {filteredFeatured.map((proj, i) => (
              <button
                key={proj.name}
                onClick={() => setActive(i)}
                className={`text-left px-3 py-2.5 rounded border text-[12px] transition-all shrink-0 ${
                  active === i
                    ? `${proj.border} bg-vs-bg2 ${proj.accent} shadow-sm font-semibold`
                    : "border-transparent text-vs-muted hover:text-vs-text hover:bg-vs-bg2"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${active === i ? proj.dotBg : "bg-vs-border"} shrink-0`} />
                  <span className="truncate">{proj.name}</span>
                </div>
                <div className="flex items-center justify-between text-[10px] text-vs-muted mt-1 pl-4 hidden lg:flex">
                  <span className="truncate">{proj.period.split("–")[0]}</span>
                  <span className="text-[9px] opacity-70">{proj.category.split(" ")[0]}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Project Detail Card */}
          <div className={`flex-1 bg-vs-bg2 border ${p.border} rounded-lg overflow-hidden flex flex-col`} key={p.name}>
            {/* Tab top bar */}
            <div className="flex items-center justify-between px-4 py-2 bg-vs-bg3 border-b border-vs-border text-[11px]">
              <div className="flex items-center gap-2 text-vs-muted">
                <span className={p.accent}>●</span>
                <span className="text-vs-text font-semibold">{p.file}</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-vs-bg border border-vs-border hidden sm:inline">
                  {p.category}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {p.url && (
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-[11px] text-vs-cyan hover:underline bg-vs-bg px-2 py-0.5 rounded border border-vs-border"
                  >
                    <Globe size={12} />
                    <span>Live URL ↗</span>
                  </a>
                )}
              </div>
            </div>

            <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
              <div>
                {/* Title + Desc */}
                <div className="mb-4">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <h3 className={`text-xl font-bold ${p.accent}`}>{p.name}</h3>
                    <span className="text-vs-muted text-[11px] flex items-center gap-1">
                      <Calendar size={12} /> {p.period}
                    </span>
                  </div>
                  <p className="text-vs-text text-[13px] mt-1.5 leading-relaxed">{p.desc}</p>
                </div>

                {/* Key Metrics */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {p.metrics.map((m) => (
                    <div key={m.l} className="bg-vs-bg3 border border-vs-border rounded px-3 py-2 text-center min-w-[90px] flex-1 sm:flex-initial">
                      <p className="text-vs-cyan font-bold text-lg leading-none">{m.v}</p>
                      <p className="text-vs-muted text-[10px] mt-1">{m.l}</p>
                    </div>
                  ))}
                  <div className="bg-vs-bg3 border border-vs-border rounded px-3 py-2 text-center min-w-[90px] flex-1 sm:flex-initial flex flex-col justify-center">
                    <p className="text-green-400 font-bold text-sm leading-none flex items-center justify-center gap-1">
                      <Sparkles size={12} /> Production
                    </p>
                    <p className="text-vs-muted text-[10px] mt-1">Verified Delivery</p>
                  </div>
                </div>

                {/* Points & Code Snippet */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {/* Highlights */}
                  <div className="space-y-2.5">
                    <p className="text-[11px] uppercase tracking-wider text-vs-muted font-semibold">Key Highlights & Architecture</p>
                    {p.points.map((pt, i) => (
                      <div key={i} className="flex gap-2 text-[12px] leading-relaxed">
                        <span className={`${p.accent} shrink-0 mt-0.5`}>▸</span>
                        <span className="text-vs-text">{pt}</span>
                      </div>
                    ))}
                  </div>

                  {/* Code Block with Copy button */}
                  <div className="bg-vs-bg rounded border border-vs-border overflow-hidden flex flex-col">
                    <div className="flex items-center justify-between px-3 py-1.5 bg-vs-bg3 border-b border-vs-border text-[10px] text-vs-muted">
                      <div className="flex items-center gap-1.5">
                        <span className={p.accent}>●</span>
                        <span>architecture_snippet.ts</span>
                      </div>
                      <button
                        onClick={handleCopyCode}
                        className="flex items-center gap-1 text-vs-muted hover:text-vs-text transition-colors p-0.5 rounded"
                        title="Copy code"
                      >
                        {copied ? <Check size={11} className="text-vs-cyan" /> : <Copy size={11} />}
                        <span className="text-[9px]">{copied ? "Copied" : "Copy"}</span>
                      </button>
                    </div>
                    <pre className="p-3 text-[11px] text-vs-cyan leading-relaxed overflow-x-auto font-mono flex-1">
                      {p.code}
                    </pre>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap items-center gap-1.5 mt-5 pt-3 border-t border-vs-border">
                <Tag size={12} className="text-vs-muted shrink-0 mr-1" />
                {p.tags.map((tag) => (
                  <span key={tag} className="px-2 py-0.5 bg-vs-bg3 border border-vs-border text-vs-muted text-[10px] rounded hover:border-vs-accent transition-colors">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Complete Archive section */}
      <div className="mt-6 bg-vs-bg2 border border-vs-border rounded-lg p-4">
        <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
          <p className="text-vs-comment text-[12px] font-semibold">{"// Complete Project Archive (58 Total Delivered Projects)"}</p>
          <a
            href="https://github.com/WildDragonDot"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] text-vs-accent hover:underline flex items-center gap-1"
          >
            ⌥ Open All on GitHub ↗
          </a>
        </div>

        {/* Categories */}
        <div className="space-y-4">
          <div>
            <p className="text-vs-yellow text-[10px] mb-2 font-bold tracking-wider">WEB2 · COMPANY SAAS & PORTALS</p>
            <div className="flex flex-wrap gap-1.5">
              {allProjectsArchive
                .filter((x) => x.category === "Web2 SaaS")
                .map(({ name, url }) =>
                  url ? (
                    <a
                      key={name}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 bg-vs-bg3 border border-vs-border text-vs-cyan text-[11px] rounded hover:border-vs-accent hover:text-vs-accent transition-colors flex items-center gap-1"
                    >
                      {name} <Globe size={10} />
                    </a>
                  ) : (
                    <span
                      key={name}
                      className="px-2.5 py-1 bg-vs-bg3 border border-vs-border text-vs-muted text-[11px] rounded hover:border-vs-accent hover:text-vs-text transition-colors cursor-default"
                    >
                      {name}
                    </span>
                  )
                )}
            </div>
          </div>

          <div>
            <p className="text-vs-cyan text-[10px] mb-2 font-bold tracking-wider">WEB3 · ICP BLOCKCHAIN & DEXTS</p>
            <div className="flex flex-wrap gap-1.5">
              {allProjectsArchive
                .filter((x) => x.category === "Web3 Blockchain")
                .map(({ name, url }) =>
                  url ? (
                    <a
                      key={name}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 bg-vs-bg3 border border-vs-border text-vs-cyan text-[11px] rounded hover:border-vs-accent hover:text-vs-accent transition-colors flex items-center gap-1"
                    >
                      {name} <Globe size={10} />
                    </a>
                  ) : (
                    <span
                      key={name}
                      className="px-2.5 py-1 bg-vs-bg3 border border-vs-border text-vs-muted text-[11px] rounded hover:border-vs-accent hover:text-vs-text transition-colors cursor-default"
                    >
                      {name}
                    </span>
                  )
                )}
            </div>
          </div>

          <div>
            <p className="text-vs-purple text-[10px] mb-2 font-bold tracking-wider">MOBILE APPS & TOOLS</p>
            <div className="flex flex-wrap gap-1.5">
              {allProjectsArchive
                .filter((x) => x.category === "Mobile Apps" || x.category === "Tools & Self")
                .map(({ name, url }) =>
                  url ? (
                    <a
                      key={name}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 bg-vs-bg3 border border-vs-border text-vs-cyan text-[11px] rounded hover:border-vs-accent hover:text-vs-accent transition-colors flex items-center gap-1"
                    >
                      {name} <Globe size={10} />
                    </a>
                  ) : (
                    <span
                      key={name}
                      className="px-2.5 py-1 bg-vs-bg3 border border-vs-border text-vs-muted text-[11px] rounded hover:border-vs-accent hover:text-vs-text transition-colors cursor-default"
                    >
                      {name}
                    </span>
                  )
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
