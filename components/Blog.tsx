"use client";

const posts = [
  {
    title: "Building Multi-Tenant SaaS with React & Node.js",
    summary: "How I architected the OWR platform to support unlimited merchants with isolated data, custom storefronts, and Redis caching for sub-100ms response times.",
    tags: ["React", "Node.js", "Redis", "SaaS"],
    date: "Jan 2025",
    readTime: "8 min read",
    accent: "text-vs-accent",
    border: "border-vs-accent",
    dot: "bg-vs-accent",
    icon: "📦",
    url: "",   // TODO: add your Dev.to / Medium article URL
  },
  {
    title: "NFT Certificates on ICP Blockchain — A Deep Dive",
    summary: "Lessons learned from integrating Internet Computer Protocol (ICP) blockchain for issuing tamper-proof NFT certificates on the Indonesia On Chain learning platform.",
    tags: ["ICP", "Blockchain", "NFT", "Motoko"],
    date: "Sep 2024",
    readTime: "10 min read",
    accent: "text-vs-cyan",
    border: "border-vs-cyan",
    dot: "bg-vs-cyan",
    icon: "🔗",
    url: "",
  },
  {
    title: "Scaling Teams with Agile: From Developer to TPM",
    summary: "My journey from Full Stack Developer to Technical Project Manager — how I implemented Agile/Scrum to improve delivery speed by 30% and manage cross-functional teams.",
    tags: ["Agile", "Scrum", "Leadership", "Project Management"],
    date: "Jun 2024",
    readTime: "6 min read",
    accent: "text-[#dcdcaa]",
    border: "border-[#dcdcaa]",
    dot: "bg-[#dcdcaa]",
    icon: "🚀",
    url: "",
  },
  {
    title: "Smart Contracts on Ethereum vs Solana vs ICP",
    summary: "A practical comparison of writing and deploying smart contracts across three major blockchains — gas fees, developer experience, and production considerations.",
    tags: ["Ethereum", "Solana", "ICP", "Smart Contracts"],
    date: "Mar 2024",
    readTime: "12 min read",
    accent: "text-[#c586c0]",
    border: "border-[#c586c0]",
    dot: "bg-[#c586c0]",
    icon: "⛓",
    url: "",
  },
];

export default function Blog() {
  return (
    <div className="p-6 font-mono max-w-3xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1 text-[11px] text-vs-muted mb-5">
        <span>chandan-portfolio</span>
        <span className="text-vs-border mx-0.5">›</span>
        <span className="text-vs-text">blog.tsx</span>
      </div>

      <p className="text-vs-comment text-[12px] mb-5">{"// Articles & Technical Writing"}</p>

      <div className="space-y-3">
        {posts.map((post, i) => {
          const Tag = post.url ? "a" : "div";
          const linkProps = post.url
            ? { href: post.url, target: "_blank", rel: "noopener noreferrer" }
            : {};
          return (
          <Tag
            key={i}
            {...linkProps}
            className={`block bg-vs-bg2 border ${post.border} rounded-lg p-4 transition-colors group ${post.url ? "hover:bg-vs-bg3 cursor-pointer" : "opacity-80 cursor-default"}`}
          >
            {/* File tab header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-[10px] text-vs-muted">
                <span className={post.dot + " w-2 h-2 rounded-full shrink-0"} />
                <span>article_{String(i + 1).padStart(2, "0")}.md</span>
                {!post.url && (
                  <span className="px-1.5 py-0.5 bg-vs-bg3 border border-vs-border text-vs-muted rounded text-[9px]">
                    coming soon
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3 text-[10px] text-vs-muted">
                <span>{post.date}</span>
                <span>·</span>
                <span>{post.readTime}</span>
                {post.url && <span className={`${post.accent} opacity-0 group-hover:opacity-100 transition-opacity`}>↗</span>}
              </div>
            </div>

            {/* Content */}
            <div className="flex gap-3">
              <span className="text-2xl shrink-0 mt-0.5">{post.icon}</span>
              <div>
                <h3 className={`text-[13px] font-semibold ${post.accent} mb-1`}>{post.title}</h3>
                <p className="text-vs-muted text-[12px] leading-relaxed">{post.summary}</p>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {post.tags.map((tag) => (
                    <span key={tag} className="px-2 py-0.5 bg-vs-bg border border-vs-border text-vs-muted text-[10px] rounded-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Tag>
          );
        })}
      </div>

      {/* CTA */}
      <div className="mt-4 bg-vs-bg2 border border-vs-border rounded-lg p-4 flex items-center justify-between flex-wrap gap-3">
        <div>
          <p className="text-vs-text text-[12px] font-semibold">More articles coming soon</p>
          <p className="text-vs-muted text-[11px]">Follow on Dev.to & Medium for updates</p>
        </div>
        <div className="flex gap-2">
          <a href="https://dev.to" target="_blank" rel="noopener noreferrer"
            className="px-3 py-1.5 bg-vs-bg3 border border-vs-border text-vs-muted text-[11px] rounded hover:border-vs-accent hover:text-vs-accent transition-colors">
            Dev.to
          </a>
          <a href="https://medium.com" target="_blank" rel="noopener noreferrer"
            className="px-3 py-1.5 bg-vs-bg3 border border-vs-border text-vs-muted text-[11px] rounded hover:border-vs-accent hover:text-vs-accent transition-colors">
            Medium
          </a>
        </div>
      </div>
    </div>
  );
}
