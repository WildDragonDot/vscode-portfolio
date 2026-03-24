"use client";

const edu = [
  { degree: "Master of Computer Application", school: "Arunachal University of Studies", period: "08/2016 – 10/2019", loc: "Namsai, India", icon: "🎓" },
  { degree: "Bachelor of Science (Mathematics)", school: "Udai Pratap College", period: "06/2013 – 06/2016", loc: "Varanasi, India", icon: "📐" },
  { degree: "Secondary Education", school: "Subhash Inter College", period: "06/2011 – 06/2012", loc: "Varanasi, India", icon: "🏫" },
];

const certs = ["NDLM Certificate", "DCA Certificate", "CCC Certificate", "O Level", "PMKVY Certificate"];

export default function About() {
  return (
    <div className="p-3 sm:p-6 font-mono max-w-3xl">

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
        <p>{" * @role    Full Stack Developer & Technical Project Manager"}</p>
        <p>{" * @company QuadbTech, Ludhiana, Punjab"}</p>
        <p>{" */"}</p>
      </div>

      {/* Profile card */}
      <div className="flex items-center gap-4 bg-vs-bg2 border border-vs-border rounded-lg p-4 mb-4">
        <div className="w-16 h-16 rounded-full bg-vs-bg3 border-2 border-vs-accent flex items-center justify-center shrink-0">
          {/* Swap this span for an <img src="/profile.jpg" /> once you add your photo */}
          <span className="text-vs-accent font-bold text-xl select-none">CV</span>
        </div>
        <div>
          <p className="text-vs-text text-[14px] font-bold">Chandan Vishwakarma</p>
          <p className="text-vs-cyan text-[12px]">Full Stack Developer · Technical Project Manager</p>
          <p className="text-vs-muted text-[11px] mt-0.5">QuadbTech · Ludhiana, Punjab · Varanasi, India</p>
          <div className="flex items-center gap-1.5 mt-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-green-400 text-[10px]">Open to Work</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {/* Summary block */}
        <div className="bg-vs-bg2 border border-vs-border rounded-lg overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-2 bg-vs-bg3 border-b border-vs-border text-[11px] text-vs-muted">
            <span className="text-vs-blue">●</span>
            <span>summary.ts</span>
          </div>
          <div className="p-4 text-[13px] leading-relaxed space-y-1">
            <div className="flex">
              <span className="text-vs-lineNum w-6 text-right mr-4 text-[11px] shrink-0 select-none">1</span>
              <span><span className="text-vs-keyword">const </span><span className="text-vs-func">summary</span><span className="text-vs-text"> = `</span></span>
            </div>
            <div className="flex">
              <span className="text-vs-lineNum w-6 text-right mr-4 text-[11px] shrink-0 select-none">2</span>
              <span className="text-vs-string pl-2 leading-relaxed">
                Full Stack Developer with <span className="text-vs-num font-semibold">5 years</span> of experience in
                front-end, back-end, and blockchain development. Proven track record of delivering{" "}
                <span className="text-vs-num font-semibold">30 production-level projects</span> on time while
                optimizing performance and enhancing user experience.
              </span>
            </div>
            <div className="flex">
              <span className="text-vs-lineNum w-6 text-right mr-4 text-[11px] shrink-0 select-none">3</span>
              <span className="text-vs-string pl-2 leading-relaxed">
                Strong background in team leadership and project management, passionate about building
                scalable, high-performance applications using modern technologies.
              </span>
            </div>
            <div className="flex">
              <span className="text-vs-lineNum w-6 text-right mr-4 text-[11px] shrink-0 select-none">4</span>
              <span className="text-vs-text">`</span>
            </div>
          </div>
        </div>

        {/* Education */}
        <div className="bg-vs-bg2 border border-vs-border rounded-lg overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-2 bg-vs-bg3 border-b border-vs-border text-[11px] text-vs-muted">
            <span className="text-vs-yellow">●</span>
            <span className="text-vs-comment">{"// Education"}</span>
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

        {/* Certifications */}
        <div className="bg-vs-bg2 border border-vs-border rounded-lg p-4">
          <p className="text-vs-comment text-[11px] mb-3">{"// Certifications"}</p>
          <div className="flex flex-wrap gap-2">
            {certs.map((c) => (
              <span key={c} className="px-3 py-1 bg-vs-bg3 border border-vs-border text-vs-cyan text-[11px] rounded-sm hover:border-vs-accent transition-colors">
                {c}
              </span>
            ))}
          </div>
        </div>

        {/* Languages */}
        <div className="bg-vs-bg2 border border-vs-border rounded-lg p-4">
          <p className="text-vs-comment text-[11px] mb-3">{"// Languages"}</p>
          <div className="flex gap-8">
            {[
              { lang: "Hindi",   level: 5, label: "Native" },
              { lang: "English", level: 4, label: "Proficient" },
            ].map(({ lang, level, label }) => (
              <div key={lang}>
                <p className="text-vs-text text-[13px]">{lang} <span className="text-vs-muted text-[11px]">— {label}</span></p>
                <div className="flex gap-1 mt-1.5">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`w-2.5 h-2.5 rounded-full border ${i < level ? "bg-vs-accent border-vs-accent" : "bg-transparent border-vs-border"}`} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="bg-vs-bg2 border border-vs-border rounded-lg p-4">
          <p className="text-vs-comment text-[11px] mb-3">{"// Find Me Online"}</p>
          <div className="flex gap-4 text-[12px] flex-wrap">
            <a href="https://github.com/WildDragonDot" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-vs-muted hover:text-vs-accent transition-colors">
              <span>⌥</span> github.com/WildDragonDot
            </a>
            <a href="https://www.linkedin.com/in/chandanvishwakarma007" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-vs-muted hover:text-vs-accent transition-colors">
              <span>⌘</span> linkedin/chandanvishwakarma007
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
