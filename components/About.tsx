"use client";
import { useState } from "react";
import Image from "next/image";
import { FileDown, Copy, Check, ExternalLink, Award, GraduationCap, Globe, Languages } from "lucide-react";

const edu = [
  { degree: "Master of Computer Application", school: "Arunachal University of Studies", period: "08/2016 – 10/2019", loc: "Namsai, India", icon: "🎓" },
  { degree: "Bachelor of Science (Mathematics)", school: "Udai Pratap College", period: "06/2013 – 06/2016", loc: "Varanasi, India", icon: "📐" },
  { degree: "Secondary Education", school: "Subhash Inter College", period: "06/2011 – 06/2012", loc: "Varanasi, India", icon: "🏫" },
];

const certs = ["NDLM Certificate", "DCA Certificate", "CCC Certificate", "O Level", "PMKVY Certificate"];

export default function About() {
  const [copiedBio, setCopiedBio] = useState(false);

  const copyBio = () => {
    const bio = "Chandan Vishwakarma — Technical Project Manager & Full Stack Developer (~6 years experience). Delivered 58+ production projects across React, Next.js, Node.js, and ICP Blockchain.";
    navigator.clipboard?.writeText(bio);
    setCopiedBio(true);
    setTimeout(() => setCopiedBio(false), 1500);
  };

  return (
    <div className="p-3 sm:p-6 font-mono max-w-4xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1 text-[11px] text-vs-muted mb-5">
        <span>chandan-portfolio</span>
        <span className="text-vs-border mx-0.5">›</span>
        <span className="text-vs-text">about.tsx</span>
      </div>

      {/* JSDoc comment */}
      <div className="text-vs-comment text-[12px] mb-5 leading-relaxed">
        <p>{"/**"}</p>
        <p>{" * @author  Chandan Vishwakarma"}</p>
        <p>{" * @role    Technical Project Manager & Full Stack Developer"}</p>
        <p>{" * @company QuadbTech, Ludhiana, Punjab & Varanasi, India"}</p>
        <p>{" */"}</p>
      </div>

      {/* Profile card */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-vs-bg2 border border-vs-border rounded-lg p-4 sm:p-5 mb-4 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-vs-accent shrink-0 bg-vs-bg3 flex items-center justify-center shadow-glow">
            <Image
              src="/avatar.svg"
              alt="Chandan Vishwakarma"
              width={80}
              height={80}
              className="w-full h-full object-cover"
              priority
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-vs-text text-[16px] sm:text-[18px] font-bold">Chandan Vishwakarma</h2>
            </div>
            <p className="text-vs-cyan text-[12px] sm:text-[13px] font-medium">Technical Project Manager & Full Stack Dev</p>
            <p className="text-vs-muted text-[11px] mt-0.5">QuadbTech · Ludhiana, Punjab · Varanasi, India</p>
            <div className="flex items-center gap-1.5 mt-2">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-green-400 text-[11px] font-medium">Open to Work (Full-Time & Consulting)</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-vs-border">
          <a
            href="/Chandan_Vishwakarma_Resume.pdf"
            download
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-2 bg-green-600 hover:bg-green-500 text-white text-[11px] rounded transition-colors shadow-glow font-medium"
          >
            <FileDown size={13} />
            <span>Resume PDF</span>
          </a>
          <button
            onClick={copyBio}
            className="flex items-center gap-1 px-3 py-2 bg-vs-bg3 border border-vs-border text-vs-text hover:border-vs-accent text-[11px] rounded transition-colors"
            title="Copy Summary"
          >
            {copiedBio ? <Check size={12} className="text-vs-cyan" /> : <Copy size={12} />}
            <span>{copiedBio ? "Copied" : "Copy Bio"}</span>
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {/* Summary block */}
        <div className="bg-vs-bg2 border border-vs-border rounded-lg overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2 bg-vs-bg3 border-b border-vs-border text-[11px] text-vs-muted">
            <div className="flex items-center gap-2">
              <span className="text-vs-blue">●</span>
              <span className="text-vs-text font-semibold">summary.ts</span>
            </div>
            <span className="text-[10px]">TypeScript</span>
          </div>

          <div className="p-4 text-[13px] leading-relaxed space-y-1 select-text">
            <div className="flex">
              <span className="text-vs-lineNum w-6 text-right mr-4 text-[11px] shrink-0 select-none">1</span>
              <span><span className="text-vs-keyword">const </span><span className="text-vs-func">executiveSummary</span><span className="text-vs-text"> = `</span></span>
            </div>
            <div className="flex">
              <span className="text-vs-lineNum w-6 text-right mr-4 text-[11px] shrink-0 select-none">2</span>
              <span className="text-vs-string pl-2 leading-relaxed">
                Full Stack Developer & Technical Project Manager with <span className="text-vs-num font-bold">~6 years</span> of
                hands-on experience leading engineering teams and building high-performance web and blockchain architectures.
              </span>
            </div>
            <div className="flex">
              <span className="text-vs-lineNum w-6 text-right mr-4 text-[11px] shrink-0 select-none">3</span>
              <span className="text-vs-string pl-2 leading-relaxed">
                Proven track record of architecting and shipping <span className="text-vs-num font-bold">58+ production projects</span> on schedule,
                including multi-tenant SaaS platforms (OWR), decentralized applications on the Internet Computer (Indonesia On Chain, Begods),
                and scalable enterprise systems.
              </span>
            </div>
            <div className="flex">
              <span className="text-vs-lineNum w-6 text-right mr-4 text-[11px] shrink-0 select-none">4</span>
              <span className="text-vs-string pl-2 leading-relaxed">
                Passionate about Agile methodologies, mentoring engineers, zero-downtime releases, and building intuitive user experiences.
              </span>
            </div>
            <div className="flex">
              <span className="text-vs-lineNum w-6 text-right mr-4 text-[11px] shrink-0 select-none">5</span>
              <span className="text-vs-text">`</span>
            </div>
          </div>
        </div>

        {/* Education Section */}
        <div className="bg-vs-bg2 border border-vs-border rounded-lg overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-2 bg-vs-bg3 border-b border-vs-border text-[11px] text-vs-muted">
            <GraduationCap size={14} className="text-vs-yellow" />
            <span className="text-vs-text font-semibold">{"// Education & Academics"}</span>
          </div>
          <div className="divide-y divide-vs-border">
            {edu.map((e, i) => (
              <div key={i} className="flex items-start gap-3 px-4 py-3 hover-row transition-colors">
                <span className="text-xl mt-0.5">{e.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-vs-text text-[13px] font-semibold">{e.degree}</p>
                  <p className="text-vs-cyan text-[12px]">{e.school}</p>
                  <p className="text-vs-muted text-[11px] mt-0.5">{e.period} · {e.loc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications Section */}
        <div className="bg-vs-bg2 border border-vs-border rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <Award size={14} className="text-vs-cyan" />
            <p className="text-vs-comment text-[11px] font-semibold">{"// Certifications & Accreditations"}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {certs.map((c) => (
              <span key={c} className="px-3 py-1 bg-vs-bg3 border border-vs-border text-vs-cyan text-[11px] rounded hover:border-vs-accent transition-colors">
                {c}
              </span>
            ))}
          </div>
        </div>

        {/* Languages & Online Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Languages */}
          <div className="bg-vs-bg2 border border-vs-border rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <Languages size={14} className="text-vs-accent" />
              <p className="text-vs-comment text-[11px] font-semibold">{"// Languages"}</p>
            </div>
            <div className="space-y-2.5">
              {[
                { lang: "Hindi", level: 5, label: "Native Speaker" },
                { lang: "English", level: 4, label: "Professional Working Proficiency" },
              ].map(({ lang, level, label }) => (
                <div key={lang}>
                  <div className="flex items-center justify-between text-[12px]">
                    <span className="text-vs-text font-medium">{lang}</span>
                    <span className="text-vs-muted text-[10px]">{label}</span>
                  </div>
                  <div className="flex gap-1.5 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`h-1.5 flex-1 rounded-full ${i < level ? "bg-vs-accent" : "bg-vs-border"}`} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Social Profiles */}
          <div className="bg-vs-bg2 border border-vs-border rounded-lg p-4">
            <p className="text-vs-comment text-[11px] font-semibold mb-3">{"// Online Profiles & Repositories"}</p>
            <div className="space-y-2 text-[12px]">
              <a
                href="https://github.com/WildDragonDot"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2 rounded bg-vs-bg3 hover:bg-vs-border text-vs-text transition-colors"
              >
                <span>⌥ GitHub / WildDragonDot</span>
                <ExternalLink size={12} className="text-vs-muted" />
              </a>
              <a
                href="https://www.linkedin.com/in/chandanvishwakarma007"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2 rounded bg-vs-bg3 hover:bg-vs-border text-vs-text transition-colors"
              >
                <span>⌘ LinkedIn / chandanvishwakarma007</span>
                <ExternalLink size={12} className="text-vs-muted" />
              </a>
              <a
                href="https://chandandev.online/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2 rounded bg-vs-bg3 hover:bg-vs-border text-vs-text transition-colors"
              >
                <span>⌃ Website / chandandev.online</span>
                <ExternalLink size={12} className="text-vs-muted" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
