"use client";
import { useState } from "react";
import ArticleModal, { Article } from "./ArticleModal";
import { BookOpen, Clock, ArrowRight } from "lucide-react";

const articles: Article[] = [
  {
    id: "multi-tenant-saas-architecture",
    title: "Building Multi-Tenant SaaS with React & Node.js",
    subtitle: "Architecting the OWR platform to support unlimited merchants with isolated data & sub-100ms response times",
    summary: "How I architected the OWR platform to support unlimited merchants with isolated schemas, custom dynamic storefronts, and multi-tier Redis caching for ultra-low latency.",
    tags: ["React", "Node.js", "Redis", "PostgreSQL", "SaaS", "Multi-Tenant"],
    date: "Jan 2025",
    readTime: "8 min read",
    accent: "text-vs-accent",
    border: "border-vs-accent",
    dot: "bg-vs-accent",
    icon: "📦",
    content: [
      "Building a scalable multi-tenant e-commerce architecture requires balancing isolation, cost-efficiency, and lightning-fast storefront rendering. When architecting the OWR platform, we needed to support independent stores for merchants with distinct themes, custom domains, and localized inventory.",
      "### Key Architectural Decisions",
      "- Tenant Isolation Strategy: We adopted a shared-database, tenant-identifier indexed approach with row-level security in PostgreSQL. This reduced infrastructure costs by 60% compared to database-per-tenant while ensuring 100% data partition safety.",
      "- Redis Layering: Dynamic storefront lookups, pricing rules, and catalogs are cached with smart cache invalidation keys mapped by tenant UUID.",
      "### Multi-Tenant Request Pipeline",
      "```typescript\n// Example tenant resolution middleware\nexport async function resolveTenant(req: Request, res: Response, next: NextFunction) {\n  const host = req.headers['host'] || '';\n  const tenant = await redis.get(`tenant:${host}`) ?? await db.tenants.findByDomain(host);\n  if (!tenant) return res.status(404).json({ error: 'Storefront Not Found' });\n  req.tenant = tenant;\n  next();\n}\n```",
      "### Performance Results",
      "> By combining Next.js static generation with on-demand ISR and Redis distributed caching, we achieved sub-85ms average response times across 30+ active merchant storefronts.",
      "### Summary & Lessons Learned",
      "- Always decouple business logic from tenant identification.",
      "- Implement aggressive edge caching for catalog reads while keeping checkout operations strictly transactional.",
      "- Provide merchants with instant WhatsApp / Webhook order updates to boost end-user retention.",
    ],
  },
  {
    id: "nft-certificates-icp-blockchain",
    title: "NFT Certificates on ICP Blockchain — A Deep Dive",
    subtitle: "Issuing tamper-proof educational credentials on the Internet Computer using Motoko smart contracts",
    summary: "Lessons learned from building Indonesia On Chain: issuing tamper-proof NFT certificates, handling high-volume course enrollments, and integrating Motoko smart contracts.",
    tags: ["ICP", "Blockchain", "NFT", "Motoko", "Web3", "EdTech"],
    date: "Sep 2024",
    readTime: "10 min read",
    accent: "text-vs-cyan",
    border: "border-vs-cyan",
    dot: "bg-vs-cyan",
    icon: "🔗",
    content: [
      "Traditional educational certificates are prone to forgery and require manual verification. For the Indonesia On Chain LMS platform, we integrated the Internet Computer Protocol (ICP) to automatically issue on-chain NFT credentials upon quiz completion.",
      "### Why ICP & Motoko?",
      "- Zero gas fees for end users via the reverse-gas canister model.",
      "- True web-speed finality without needing expensive Layer-2 bridge overhead.",
      "- Seamless integration of canister smart contracts written directly in Motoko.",
      "### Certificate Canister Code Concept",
      "```motoko\n// Motoko canister for credential minting\nimport Principal \"mo:base/Principal\";\nimport Nat \"mo:base/Nat\";\n\nactor CertificateAuthority {\n  public shared({ caller }) func mintCertificate(\n    recipient: Principal,\n    courseId: Text,\n    grade: Nat\n  ) : async Result<Nat, Text> {\n    // Verify student completion & mint immutable NFT badge\n    let certId = generateUniqueId(courseId, recipient);\n    certificates.set(certId, { recipient; courseId; grade; timestamp = Time.now() });\n    return #ok(certId);\n  };\n};\n```",
      "### Scalability & Video Delivery",
      "> By combining Google Cloud for scalable video chunk streaming with ICP canisters for immutable grading records, the system currently handles over 150+ course uploads monthly with 99.98% reliability.",
    ],
  },
  {
    id: "scaling-agile-developer-to-tpm",
    title: "Scaling Teams with Agile: From Developer to TPM",
    subtitle: "Transitioning from hands-on engineer to engineering leader while maintaining technical excellence",
    summary: "My journey from Full Stack Developer to Technical Project Manager — how implementing Agile/Scrum and clear sprint visibility boosted delivery speeds by 30% across cross-functional teams.",
    tags: ["Agile", "Scrum", "Leadership", "Team Management", "TPM"],
    date: "Jun 2024",
    readTime: "6 min read",
    accent: "text-vs-yellow",
    border: "border-vs-yellow",
    dot: "bg-vs-yellow",
    icon: "🚀",
    content: [
      "Transitioning from writing code 10 hours a day to coordinating teams, scoping milestones, and aligning stakeholders requires shifting mindset from individual output to team velocity.",
      "### 3 Principles That Accelerated Delivery by 30%",
      "- 1. Technical Empathy in Estimation: Having built the stack myself gives me the ability to challenge arbitrary estimates, uncover edge cases early, and break monolithic epics into testable 2-day user stories.",
      "- 2. Automated Release Tracking: Replacing manual status emails with transparent Jira/Notion sprint burndown dashboards and automated CI/CD notifications gave all stakeholders real-time visibility.",
      "- 3. Unblocking Over Micromanaging: Daily standups are focused entirely on what's blocking engineers, allowing them to remain in deep focus mode.",
      "```bash\n# Sprint Health Formula\nVelocity = Completed_Story_Points / Sprint_Days\nDefect_Escape_Rate = Production_Bugs / Total_Release_Features\n```",
      "> Leadership is not about having all the answers — it's about removing obstacles so great engineers can do their best work on time.",
    ],
  },
  {
    id: "smart-contracts-ethereum-solana-icp",
    title: "Smart Contracts on Ethereum vs Solana vs ICP",
    subtitle: "A practical developer comparison of writing and deploying production smart contracts across ecosystems",
    summary: "A practical, battle-tested comparison of Solidity (Ethereum), Rust (Solana), and Motoko (ICP) — gas models, dev tooling, execution latency, and security trade-offs.",
    tags: ["Ethereum", "Solana", "ICP", "Smart Contracts", "Rust", "Solidity"],
    date: "Mar 2024",
    readTime: "12 min read",
    accent: "text-vs-purple",
    border: "border-vs-purple",
    dot: "bg-[#c586c0]",
    icon: "⛓",
    content: [
      "Over the past 4 years, I have architected smart contracts across EVM (Ethereum), SVM (Solana), and Canister architectures (Internet Computer). Each ecosystem carries distinct design philosophies.",
      "### Architectural Comparison",
      "- Ethereum (Solidity): High decentralization and massive liquidity, but constrained by EVM gas fees and transaction throughput.",
      "- Solana (Rust / Anchor): Sub-second finality and high TPS; account model requires explicit rent and memory management.",
      "- ICP (Motoko / Rust): Canisters serve actual web pages and APIs directly with reverse gas (developer pays cycles, user pays $0).",
      "### Takeaway Matrix",
      "- Choose Ethereum for DeFi protocols requiring established composability.",
      "- Choose Solana for high-frequency trading and low-cost micro-transactions.",
      "- Choose ICP for fully on-chain web apps, serverless compute, and zero-friction onboarding.",
    ],
  },
];

export default function Blog() {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  return (
    <div className="p-3 sm:p-6 font-mono max-w-4xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1 text-[11px] text-vs-muted mb-5">
        <span>chandan-portfolio</span>
        <span className="text-vs-border mx-0.5">›</span>
        <span className="text-vs-text">blog.tsx</span>
      </div>

      <div className="flex items-center justify-between mb-5 flex-wrap gap-2">
        <p className="text-vs-comment text-[12px]">{"// Technical Articles & Architecture Notes"}</p>
        <span className="text-[11px] text-vs-muted bg-vs-bg2 px-2.5 py-1 rounded border border-vs-border">
          4 Full Articles Available
        </span>
      </div>

      <div className="space-y-3">
        {articles.map((post, i) => (
          <div
            key={post.id}
            onClick={() => setSelectedArticle(post)}
            className={`block bg-vs-bg2 border ${post.border} rounded-lg p-4 transition-all duration-150 cursor-pointer hover:bg-vs-bg3 hover:shadow-card group`}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-3 text-[11px]">
              <div className="flex items-center gap-2 text-vs-muted">
                <span className={`${post.dot} w-2 h-2 rounded-full shrink-0`} />
                <span className="text-vs-text font-semibold">{post.id}.md</span>
                <span className="px-1.5 py-0.2 bg-vs-accent/10 border border-vs-accent/30 text-vs-accent rounded text-[9px]">
                  Read Article
                </span>
              </div>
              <div className="flex items-center gap-3 text-vs-muted text-[10px]">
                <span>{post.date}</span>
                <span>•</span>
                <span className="flex items-center gap-1"><Clock size={10} /> {post.readTime}</span>
              </div>
            </div>

            {/* Content */}
            <div className="flex gap-3 items-start">
              <span className="text-2xl shrink-0 mt-0.5 bg-vs-bg p-2 rounded-lg border border-vs-border">{post.icon}</span>
              <div className="flex-1 min-w-0">
                <h3 className={`text-[14px] sm:text-[15px] font-bold ${post.accent} mb-1 flex items-center justify-between gap-2`}>
                  <span>{post.title}</span>
                  <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-vs-accent shrink-0" />
                </h3>
                <p className="text-vs-text text-[12px] leading-relaxed line-clamp-2">{post.summary}</p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {post.tags.map((tag) => (
                    <span key={tag} className="px-2 py-0.5 bg-vs-bg border border-vs-border text-vs-muted text-[10px] rounded">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Banner */}
      <div className="mt-5 bg-vs-bg2 border border-vs-border rounded-lg p-4 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <BookOpen className="text-vs-cyan shrink-0" size={20} />
          <div>
            <p className="text-vs-text text-[12px] font-semibold">Writing regularly about Web Architecture & Blockchain</p>
            <p className="text-vs-muted text-[11px]">Follow on LinkedIn & Dev.to for upcoming breakdowns</p>
          </div>
        </div>
        <div className="flex gap-2">
          <a
            href="https://www.linkedin.com/in/chandanvishwakarma007"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 bg-vs-bg3 border border-vs-border text-vs-text text-[11px] rounded hover:border-vs-accent hover:text-vs-accent transition-colors"
          >
            LinkedIn Articles
          </a>
          <a
            href="https://github.com/WildDragonDot"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 bg-vs-accent hover:bg-vs-accentHov text-white text-[11px] rounded transition-colors"
          >
            GitHub Repos
          </a>
        </div>
      </div>

      {/* Reader Modal */}
      <ArticleModal article={selectedArticle} onClose={() => setSelectedArticle(null)} />
    </div>
  );
}
