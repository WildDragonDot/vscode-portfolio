"use client";
import { X, Clock, Calendar, Tag, BookOpen, Share2, Check } from "lucide-react";
import { useState } from "react";

export type Article = {
  id: string;
  title: string;
  subtitle: string;
  summary: string;
  tags: string[];
  date: string;
  readTime: string;
  accent: string;
  border: string;
  dot: string;
  icon: string;
  content: string[];
};

export default function ArticleModal({
  article,
  onClose,
}: {
  article: Article | null;
  onClose: () => void;
}) {
  const [copied, setCopied] = useState(false);

  if (!article) return null;

  const copyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      <div
        className="relative w-full max-w-3xl max-h-[88vh] bg-vs-bg2 border border-vs-border2 rounded-xl shadow-2xl overflow-hidden flex flex-col font-mono"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Editor tab header */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-vs-bg3 border-b border-vs-border shrink-0">
          <div className="flex items-center gap-2 text-[12px] min-w-0">
            <span className={article.accent}>●</span>
            <span className="text-vs-text font-semibold truncate">{article.id}.md</span>
            <span className="text-vs-muted text-[11px] hidden sm:inline">— Markdown Preview</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={copyLink}
              title="Share Article Link"
              className="flex items-center gap-1 px-2 py-1 bg-vs-bg rounded border border-vs-border text-vs-muted hover:text-vs-text text-[11px] transition-colors"
            >
              {copied ? <Check size={12} className="text-vs-cyan" /> : <Share2 size={12} />}
              <span className="hidden sm:inline">{copied ? "Copied" : "Share"}</span>
            </button>
            <button onClick={onClose} className="text-vs-muted hover:text-vs-text transition-colors p-1">
              <X size={15} />
            </button>
          </div>
        </div>

        {/* Article scrollable content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-6 text-[13px] leading-relaxed select-text">
          {/* Article Header */}
          <div className="border-b border-vs-border pb-6">
            <div className="flex items-center gap-3 text-[11px] text-vs-muted mb-2">
              <span className="flex items-center gap-1"><Calendar size={12} /> {article.date}</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Clock size={12} /> {article.readTime}</span>
              <span>•</span>
              <span className="text-vs-cyan flex items-center gap-1"><BookOpen size={12} /> Technical Article</span>
            </div>

            <h1 className={`text-xl sm:text-2xl font-bold ${article.accent} leading-snug`}>
              {article.title}
            </h1>
            <p className="text-vs-text text-[14px] mt-2 font-medium">
              {article.subtitle}
            </p>

            <div className="flex flex-wrap gap-1.5 mt-4">
              <Tag size={12} className="text-vs-muted mt-0.5" />
              {article.tags.map((t) => (
                <span key={t} className="px-2 py-0.5 bg-vs-bg3 border border-vs-border text-vs-muted text-[10px] rounded">
                  #{t}
                </span>
              ))}
            </div>
          </div>

          {/* Body paragraphs */}
          <div className="space-y-4">
            {article.content.map((block, idx) => {
              if (block.startsWith("### ")) {
                return (
                  <h3 key={idx} className="text-[16px] font-bold text-vs-cyan pt-4 border-t border-vs-border/50">
                    {block.replace("### ", "")}
                  </h3>
                );
              }
              if (block.startsWith("```")) {
                const code = block.replace(/```[a-z]*\n?/g, "").trim();
                return (
                  <div key={idx} className="bg-vs-bg border border-vs-border rounded-lg p-4 font-mono text-[12px] text-[#9cdcfe] overflow-x-auto my-3">
                    <pre>{code}</pre>
                  </div>
                );
              }
              if (block.startsWith("> ")) {
                return (
                  <blockquote key={idx} className="border-l-2 border-vs-accent pl-3 py-1 text-vs-string italic bg-vs-accent/5 rounded-r">
                    {block.replace("> ", "")}
                  </blockquote>
                );
              }
              if (block.startsWith("- ")) {
                return (
                  <div key={idx} className="flex gap-2 text-vs-text">
                    <span className="text-vs-accent">▸</span>
                    <span>{block.replace("- ", "")}</span>
                  </div>
                );
              }
              return (
                <p key={idx} className="text-vs-text leading-relaxed">
                  {block}
                </p>
              );
            })}
          </div>

          {/* Author footer */}
          <div className="border-t border-vs-border pt-6 mt-8 flex items-center justify-between flex-wrap gap-4 bg-vs-bg3/50 p-4 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-vs-accent text-white font-bold flex items-center justify-center text-sm">
                CV
              </div>
              <div>
                <p className="text-vs-text font-bold text-[12px]">Written by Chandan Vishwakarma</p>
                <p className="text-vs-muted text-[11px]">Technical Project Manager & Full Stack Developer</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="px-3 py-1.5 bg-vs-accent text-white rounded text-[11px] hover:bg-vs-accentHov transition-colors"
            >
              Back to Articles
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
