"use client";
import { useState } from "react";
import { ExternalLink, Calendar, Tag, Globe } from "lucide-react";

const projects = [
  {
    name: "OWR",
    file: "owr.ts",
    period: "04/2023 – 06/2025",
    url: "https://owr.app/",
    desc: "Fully customizable e-commerce platform — Shopify-like multi-tenant store management for merchants",
    tags: ["React.js", "Node.js", "PostgreSQL", "Tailwind CSS", "Redis", "Multi-Tenant"],
    accent: "text-vs-accent",
    border: "border-vs-accent",
    dotBg: "bg-vs-accent",
    metrics: [{ v: "+30%", l: "Merchant Presence" }, { v: "+30%", l: "User Engagement" }],
    points: [
      "Super Admin Panel with full control over platform, stores, and users.",
      "Dynamic storefront designs, delivery partner management, and multi-gateway payment integrations.",
      "Real-time WhatsApp order updates, in-app notifications, and communication tools.",
      "Redis caching to optimize product data retrieval, reducing page load times significantly.",
    ],
    code: `const owr = new MultiTenantStore({
  merchants: "unlimited",
  ui: "React + Tailwind",
  cache: "Redis",
  db: "PostgreSQL",
  payments: "multi-gateway",
});`,
  },
  {
    name: "Indonesia On Chain",
    file: "indonesia-on-chain.ts",
    period: "04/2024 – 06/2024",
    url: "https://rqy52-yyaaa-aaaak-qloeq-cai.icp0.io/",
    desc: "Decentralized LMS on ICP blockchain — course tracking, quizzes, and NFT certificate issuance",
    tags: ["React.js", "ICP Blockchain", "Motoko", "Web3", "NFT", "Google Cloud"],
    accent: "text-vs-cyan",
    border: "border-vs-cyan",
    dotBg: "bg-vs-cyan",
    metrics: [{ v: "+150/mo", l: "Course Uploads" }, { v: "+30%", l: "User Satisfaction" }],
    points: [
      "Admin dashboard to upload courses and track user data and performance.",
      "User dashboard to monitor course progress, quizzes, and mint certificates as NFTs.",
      "Integrated ICP Blockchain (Motoko) for issuing tamper-proof NFT certificates.",
      "Google Cloud for video storage and streaming, enabling scalable delivery.",
    ],
    code: `const platform = new LearningPlatform({
  blockchain: "ICP",
  contracts: "Motoko",
  certificates: "NFT",
  storage: "Google Cloud",
});`,
  },
  {
    name: "Begods",
    file: "begods.ts",
    period: "06/2022 – 09/2023",
    url: "https://ljk2g-uyaaa-aaaak-qi3hq-cai.icp0.io/",
    desc: "Web3 NFT collector platform on ICP — collect, buy, sell and trade game character NFTs with rare editions",
    tags: ["ICP Blockchain", "EXTv2 Smart Contracts", "React.js", "NFT", "Web3"],
    accent: "text-vs-yellow",
    border: "border-vs-yellow",
    dotBg: "bg-vs-yellow",
    metrics: [{ v: "10", l: "Dev Team Size" }, { v: "+30%", l: "Faster Delivery" }],
    points: [
      "Users can collect favorite character NFTs as single items or rare cards.",
      "Buy, sell, and trade NFTs with rare editions via EXTv2 smart contracts on ICP.",
      "Admin panel to upload cards, set prices, and list them for sale.",
      "Smooth gaming-style UI with interactive animations and secure transactions.",
    ],
    code: `const begods = new NFTCollector({
  chain: "ICP",
  contracts: "EXTv2",
  features: ["collect","buy","sell","trade"],
  rarity: "rare editions",
});`,
  },
  {
    name: "BlockseBlock",
    file: "blockseblock.ts",
    period: "2023 – 2024",
    url: "https://blockseblock.com/",
    desc: "Complete hackathon platform — browse, participate, upload projects, earn prizes and certificates",
    tags: ["React.js", "Node.js", "MongoDB", "Security", "Hackathon"],
    accent: "text-vs-purple",
    border: "border-vs-purple",
    dotBg: "bg-[#c586c0]",
    metrics: [{ v: "Secure", l: "Encrypted Data" }, { v: "3-Role", l: "Dashboard" }],
    points: [
      "Users browse live hackathons (free & paid), upload projects, and earn prizes and certificates.",
      "Organizer dashboard to manage hackathons and track participants.",
      "Secure judging dashboard for evaluating submissions.",
      "All sensitive user data encrypted to ensure privacy and protection.",
    ],
    code: `const blockseblock = new HackathonPlatform({
  roles: ["participant","organizer","judge"],
  security: "encrypted",
  db: "MongoDB",
  features: ["prizes","certificates"],
});`,
  },
  {
    name: "SipNPlay",
    file: "sipnplay.ts",
    period: "2023 – 2024",
    url: "https://sipnplay.io/",
    desc: "ICP-based gaming platform — play HTML5 games with SIPNPLAY tokens and earn leaderboard rewards",
    tags: ["ICP Blockchain", "Rust", "React.js", "Web3", "Gaming", "Tokens"],
    accent: "text-vs-blue",
    border: "border-vs-blue",
    dotBg: "bg-vs-blue",
    metrics: [{ v: "Token", l: "Based Gameplay" }, { v: "Auto", l: "Reward Distribution" }],
    points: [
      "Connect wallets and pay SIPNPLAY tokens to play HTML5 games.",
      "Compete on leaderboards and receive token rewards automatically.",
      "Admin dashboard to track user activity, distribute rewards, and airdrop tokens.",
      "Fully secure ICP-based platform with smooth wallet integration.",
    ],
    code: `const sipnplay = new GamingPlatform({
  chain: "ICP",
  contracts: "Rust",
  tokens: "SIPNPLAY",
  rewards: "leaderboard-auto",
});`,
  },
  {
    name: "Finstreet",
    file: "finstreet.ts",
    period: "2021 – 2022",
    url: "https://finstreet.in/",
    desc: "India's leading financial education platform — learning modules, market analysis, and crypto content",
    tags: ["React.js", "Node.js", "PostgreSQL", "Finance", "Education"],
    accent: "text-vs-accent",
    border: "border-vs-accent",
    dotBg: "bg-vs-accent",
    metrics: [{ v: "1000s", l: "Users Onboarded" }, { v: "Top", l: "Finance Platform" }],
    points: [
      "Education-focused platform for financial markets and cryptocurrencies.",
      "Combining learning modules, market analysis, and community-driven content.",
      "Recognized as one of India's leading financial education platforms.",
      "Successfully onboarded thousands of users interested in finance and crypto.",
    ],
    code: `const finstreet = new FinancePlatform({
  stack: "React + Node.js",
  db: "PostgreSQL",
  focus: "financial education",
  users: "thousands",
});`,
  },
  {
    name: "Xpedition",
    file: "xpedition.ts",
    period: "2023 – 2024",
    url: "https://xpedition.club/",
    desc: "Task & reward platform — complete micro-tasks, track social media engagement, and earn real money",
    tags: ["React.js", "Node.js", "Express.js", "PostgreSQL", "Docker", "CI/CD"],
    accent: "text-vs-cyan",
    border: "border-vs-cyan",
    dotBg: "bg-vs-cyan",
    metrics: [{ v: "Real $", l: "Earnings" }, { v: "Verified", l: "Task Tracking" }],
    points: [
      "Users complete daily tasks, earn points after verification, and track social media activity.",
      "Tracks YouTube, Twitter, and Instagram engagement accurately.",
      "Admin panel to upload tasks, verify completions, and monitor performance.",
      "Built MVP first for validation, then full-featured platform after client approval.",
    ],
    code: `const xpedition = new TaskPlatform({
  stack: "React + Node + Express",
  db: "PostgreSQL",
  infra: "Docker + CI/CD",
  tracking: ["YouTube","Twitter","Instagram"],
});`,
  },
  {
    name: "Heebee Coffee",
    file: "heebee.ts",
    period: "2022 – 2023",
    url: "https://heebee.in/",
    desc: "Full POS & ordering system — QR table ordering, kitchen OT management, and franchise-ready admin",
    tags: ["React.js", "Node.js", "PostgreSQL", "POS", "QR Ordering"],
    accent: "text-vs-yellow",
    border: "border-vs-yellow",
    dotBg: "bg-vs-yellow",
    metrics: [{ v: "30s", l: "Order Time (was 15min)" }, { v: "Franchise", l: "Ready System" }],
    points: [
      "Order-taking time reduced from 15 minutes to just 30 seconds.",
      "QR-based table ordering, kitchen OT management, and automated invoicing.",
      "Admin reporting dashboards for branch-wise sales and franchise management.",
      "Transparent money tallying removed inconsistencies with baristas.",
    ],
    code: `const heebee = new POSSystem({
  stack: "React + Node.js",
  db: "PostgreSQL",
  features: ["QR ordering","kitchen OT","invoicing"],
  orderTime: "30 seconds",
});`,
  },
  {
    name: "Valueswap",
    file: "valueswap.ts",
    period: "2022 – 2023",
    url: "https://ibd5w-gqaaa-aaaac-aadda-cai.icp0.io/",
    desc: "Decentralized multi-chain swap platform on ICP — Balancer-like liquidity pool for token conversions",
    tags: ["ICP Blockchain", "Rust", "React.js", "DeFi", "Multi-chain", "DEX"],
    accent: "text-vs-purple",
    border: "border-vs-purple",
    dotBg: "bg-[#c586c0]",
    metrics: [{ v: "Multi", l: "Chain Swaps" }, { v: "DEX", l: "Balancer-like" }],
    points: [
      "Swap tokens across multiple chains seamlessly on ICP blockchain.",
      "Balancer-like liquidity pool system for efficient trading.",
      "Track swaps and balances in real-time with full transparency.",
      "High security, smooth UX, and transparent token management.",
    ],
    code: `const valueswap = new DEXPlatform({
  chain: "ICP",
  contracts: "Rust",
  model: "Balancer liquidity pool",
  swaps: "multi-chain",
});`,
  },
  {
    name: "Codestep",
    file: "codestep.ts",
    period: "2023 – 2024",
    url: "https://codestep.kaifoundry.com/",
    desc: "Developer mentorship & collaboration platform — real projects, rewards, certificates, and hiring opportunities",
    tags: ["React.js", "Node.js", "Express.js", "PostgreSQL", "Mentorship"],
    accent: "text-vs-blue",
    border: "border-vs-blue",
    dotBg: "bg-vs-blue",
    metrics: [{ v: "Rewards", l: "& Certificates" }, { v: "Hiring", l: "Opportunities" }],
    points: [
      "Developers and interns collaborate on real projects with mentors.",
      "Track contributions, earn rewards, certificates, and potential hiring opportunities.",
      "Secure, fast, and interactive platform with team communication tools.",
      "Clear pathways for recognition, rewards, and employment for top contributors.",
    ],
    code: `const codestep = new MentorshipPlatform({
  stack: "React + Node + Express",
  db: "PostgreSQL",
  features: ["mentorship","rewards","certificates"],
  outcome: "hiring opportunities",
});`,
  },
];

export default function Projects() {
  const [active, setActive] = useState(0);
  const p = projects[active];

  return (
    <div className="p-3 sm:p-6 font-mono max-w-4xl">

      {/* Breadcrumb */}
      <div className="flex items-center gap-1 text-[11px] text-vs-muted mb-5">
        <span>chandan-portfolio</span>
        <span className="text-vs-border mx-0.5">›</span>
        <span className="text-vs-text">projects.tsx</span>
      </div>

      <p className="text-vs-comment text-[12px] mb-5">{"// Featured Projects — 58 total projects (2020–2025)"}</p>

      <div className="flex gap-4 flex-col lg:flex-row">

        {/* Project tabs (left) — horizontal scroll on mobile */}
        <div className="flex flex-row lg:flex-col gap-1 lg:w-52 shrink-0 overflow-x-auto pb-1 lg:pb-0 lg:overflow-visible">
          {projects.map((proj, i) => (
            <button
              key={proj.name}
              onClick={() => setActive(i)}
              className={`text-left px-3 py-2.5 rounded border text-[12px] transition-all shrink-0 ${
                active === i
                  ? `${proj.border} bg-vs-bg2 ${proj.accent}`
                  : "border-transparent text-vs-muted hover:text-vs-text hover:bg-vs-bg2"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className={`w-1.5 h-1.5 rounded-full ${active === i ? proj.dotBg : "bg-vs-border"} shrink-0`} />
                <span className="truncate">{proj.name}</span>
              </div>
              <p className="text-[10px] text-vs-muted mt-0.5 pl-3.5 truncate hidden lg:block">{proj.period}</p>
            </button>
          ))}
        </div>

        {/* Detail panel */}
        <div className={`flex-1 bg-vs-bg2 border ${p.border} rounded-lg overflow-hidden`} key={active}>

          {/* File tab */}
          <div className="flex items-center justify-between px-4 py-2 bg-vs-bg3 border-b border-vs-border text-[11px]">
            <div className="flex items-center gap-2 text-vs-muted">
              <span className={p.accent}>●</span>
              <span className="text-vs-text">{p.file}</span>
            </div>
            {p.url ? (
              <a href={p.url} target="_blank" rel="noopener noreferrer" title="View Live Project">
                <Globe size={13} className="text-vs-muted hover:text-white cursor-pointer" />
              </a>
            ) : (
              <ExternalLink size={13} className="text-vs-muted opacity-30" />
            )}
          </div>

          <div className="p-4">
            {/* Title + desc */}
            <div className="mb-4">
              <h3 className={`text-xl font-bold ${p.accent}`}>{p.name}</h3>
              <p className="text-vs-muted text-[11px] flex items-center gap-1 mt-1">
                <Calendar size={11} /> {p.period}
              </p>
              <p className="text-vs-text text-[12px] mt-1">{p.desc}</p>
            </div>

            {/* Metrics */}
            <div className="flex gap-2 mb-4">
              {p.metrics.map((m) => (
                <div key={m.l} className="bg-vs-bg3 border border-vs-border rounded px-3 py-2 text-center min-w-[80px]">
                  <p className="text-vs-cyan font-bold text-lg leading-none">{m.v}</p>
                  <p className="text-vs-muted text-[10px] mt-1">{m.l}</p>
                </div>
              ))}
            </div>

            {/* Two column: points + code */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Points */}
              <div className="space-y-2">
                {p.points.map((pt, i) => (
                  <div key={i} className="flex gap-2 text-[12px] leading-relaxed">
                    <span className={`${p.accent} shrink-0 mt-0.5`}>▸</span>
                    <span className="text-vs-text">{pt}</span>
                  </div>
                ))}
              </div>

              {/* Code snippet — hidden on mobile */}
              <div className="hidden md:block bg-vs-bg rounded border border-vs-border overflow-hidden">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-vs-bg3 border-b border-vs-border text-[10px] text-vs-muted">
                  <span className={p.accent}>●</span>
                  <span>snippet.ts</span>
                </div>
                <pre className="p-3 text-[11px] text-vs-cyan leading-relaxed overflow-x-auto">
                  {p.code}
                </pre>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-vs-border">
              <Tag size={11} className="text-vs-muted mt-0.5 shrink-0" />
              {p.tags.map((tag) => (
                <span key={tag} className="px-2 py-0.5 bg-vs-bg3 border border-vs-border text-vs-muted text-[10px] rounded-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 bg-vs-bg2 border border-vs-border rounded-lg p-4">
        <p className="text-vs-comment text-[11px] mb-4">{"// All Projects (2020–2025) — 58 total"}</p>

        {/* Web2 Company Projects */}
        <div className="mb-4">
          <p className="text-vs-yellow text-[10px] mb-2 font-bold tracking-wider">WEB2 · COMPANY</p>
          <div className="flex flex-wrap gap-2">
            {[
              { name: "YSchool",               url: "" },
              { name: "SIM",                   url: "" },
              { name: "VCF Convertor",         url: "" },
              { name: "Arctic Buying Co",      url: "" },
              { name: "Finstreet 2021",        url: "https://finstreet.in/" },
              { name: "Quadb Sample",          url: "" },
              { name: "Quadbtech Ecommerce",   url: "" },
              { name: "Quadbtech Ecom Admin",  url: "" },
              { name: "Quadbtech Investment",  url: "" },
              { name: "Blog CMS",              url: "" },
              { name: "Finflix OTT",           url: "" },
              { name: "Cryptic Entertainment", url: "" },
              { name: "Shop Quadb",            url: "" },
              { name: "Spicy Punks",           url: "" },
              { name: "React CMS",             url: "" },
              { name: "Finflix 2021",          url: "" },
              { name: "Dank Thrift",           url: "" },
              { name: "Qworks",                url: "" },
              { name: "Kaifoundry 2.0",        url: "" },
              { name: "SigLab",                url: "https://siglabs.xyz/" },
              { name: "Nek Punjabi Estate",    url: "" },
              { name: "Quadbtech 2.0",         url: "" },
              { name: "BlockseBlock",          url: "https://blockseblock.com/" },
              { name: "Xpedition",             url: "https://xpedition.club/" },
              { name: "Codestep",              url: "https://codestep.kaifoundry.com/" },
              { name: "NIFD Login",            url: "" },
              { name: "Qtech 2.0",             url: "" },
              { name: "Heebee Coffee",         url: "https://heebee.in/" },
              { name: "Learn Blockseblock",    url: "https://learn.blockseblock.com/" },
              { name: "Jio HTML5 Games",       url: "" },
              { name: "Game Distribution",     url: "" },
              { name: "Game Monetized",        url: "" },
              { name: "Crazy Games",           url: "" },
              { name: "16 Goti Games",         url: "" },
              { name: "Royal Multiplayer Chess", url: "" },
            ].map(({ name, url }) =>
              url ? (
                <a key={name} href={url} target="_blank" rel="noopener noreferrer"
                  className="px-2.5 py-1 bg-vs-bg3 border border-vs-border text-vs-cyan text-[11px] rounded-sm hover:border-vs-accent hover:text-vs-accent transition-colors flex items-center gap-1">
                  {name} <Globe size={9} />
                </a>
              ) : (
                <span key={name} className="px-2.5 py-1 bg-vs-bg3 border border-vs-border text-vs-muted text-[11px] rounded-sm hover:border-vs-accent hover:text-vs-accent transition-colors cursor-default">
                  {name}
                </span>
              )
            )}
          </div>
        </div>

        {/* Web3 Company Projects */}
        <div className="mb-4">
          <p className="text-vs-cyan text-[10px] mb-2 font-bold tracking-wider">WEB3 · COMPANY</p>
          <div className="flex flex-wrap gap-2">
            {[
              { name: "PinkPaper",             url: "http://165.227.164.81/" },
              { name: "UniqArt",               url: "http://143.244.138.172/" },
              { name: "Ethereum Shop",         url: "" },
              { name: "Attendee Reward System",url: "" },
              { name: "GrowTown",              url: "https://7ynkd-kiaaa-aaaac-ahmfq-cai.icp0.io/" },
              { name: "Valueswap",             url: "https://ibd5w-gqaaa-aaaac-aadda-cai.icp0.io/" },
              { name: "SipNPlay",              url: "https://sipnplay.io/" },
              { name: "Indonesia On Chain",    url: "https://rqy52-yyaaa-aaaak-qloeq-cai.icp0.io/" },
              { name: "Begods",                url: "https://ljk2g-uyaaa-aaaak-qi3hq-cai.icp0.io/" },
              { name: "Ddate",                 url: "" },
            ].map(({ name, url }) =>
              url ? (
                <a key={name} href={url} target="_blank" rel="noopener noreferrer"
                  className="px-2.5 py-1 bg-vs-bg3 border border-vs-border text-vs-cyan text-[11px] rounded-sm hover:border-vs-accent hover:text-vs-accent transition-colors flex items-center gap-1">
                  {name} <Globe size={9} />
                </a>
              ) : (
                <span key={name} className="px-2.5 py-1 bg-vs-bg3 border border-vs-border text-vs-muted text-[11px] rounded-sm hover:border-vs-accent hover:text-vs-accent transition-colors cursor-default">
                  {name}
                </span>
              )
            )}
          </div>
        </div>

        {/* App Projects */}
        <div className="mb-4">
          <p className="text-vs-purple text-[10px] mb-2 font-bold tracking-wider">MOBILE APPS · COMPANY</p>
          <div className="flex flex-wrap gap-2">
            {[
              { name: "Crypto Trainer", url: "" },
              { name: "Plant Vs Alien", url: "" },
            ].map(({ name, url }) =>
              url ? (
                <a key={name} href={url} target="_blank" rel="noopener noreferrer"
                  className="px-2.5 py-1 bg-vs-bg3 border border-vs-border text-vs-cyan text-[11px] rounded-sm hover:border-vs-accent hover:text-vs-accent transition-colors flex items-center gap-1">
                  {name} <Globe size={9} />
                </a>
              ) : (
                <span key={name} className="px-2.5 py-1 bg-vs-bg3 border border-vs-border text-vs-muted text-[11px] rounded-sm hover:border-vs-accent hover:text-vs-accent transition-colors cursor-default">
                  {name}
                </span>
              )
            )}
          </div>
        </div>

        {/* Self Projects */}
        <div className="mb-4">
          <p className="text-vs-accent text-[10px] mb-2 font-bold tracking-wider">SELF PROJECTS</p>
          <div className="flex flex-wrap gap-2">
            {[
              { name: "MakeMySNAP",                    url: "" },
              { name: "Multi Downloader",              url: "" },
              { name: "Envato Downloader",             url: "" },
              { name: "WhatsTool",                     url: "" },
              { name: "BMI Motoko",                    url: "" },
              { name: "URL Shortener",                 url: "" },
              { name: "Resume Portfolio",              url: "" },
              { name: "Expense Manager",               url: "" },
              { name: "Smart Kitchen Management",      url: "" },
              { name: "Corpow (Productivity Suite)",   url: "" },
            ].map(({ name, url }) =>
              url ? (
                <a key={name} href={url} target="_blank" rel="noopener noreferrer"
                  className="px-2.5 py-1 bg-vs-bg3 border border-vs-border text-vs-cyan text-[11px] rounded-sm hover:border-vs-accent hover:text-vs-accent transition-colors flex items-center gap-1">
                  {name} <Globe size={9} />
                </a>
              ) : (
                <span key={name} className="px-2.5 py-1 bg-vs-bg3 border border-vs-border text-vs-muted text-[11px] rounded-sm hover:border-vs-accent hover:text-vs-accent transition-colors cursor-default">
                  {name}
                </span>
              )
            )}
          </div>
        </div>

        <a
          href="https://github.com/WildDragonDot"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 bg-vs-accent hover:bg-vs-accentHov text-white text-[12px] rounded transition-colors"
        >
          <span>⌥</span> View All on GitHub
        </a>
      </div>
    </div>
  );
}
