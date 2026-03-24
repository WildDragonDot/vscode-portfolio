"use client";
import { useState } from "react";

const testimonials = [
  {
    name: "Rahul Sharma",
    role: "CTO",
    company: "QuadbTech",
    avatar: "RS",
    color: "bg-vs-accent",
    text: "Chandan is one of the most reliable developers I've worked with. He delivered the OWR multi-tenant platform on time and with exceptional quality. His ability to lead a team of 10 developers while still writing clean, production-ready code is rare.",
    rating: 5,
    platform: "LinkedIn",
  },
  {
    name: "Priya Mehta",
    role: "Product Manager",
    company: "Indonesia On Chain",
    avatar: "PM",
    color: "bg-vs-cyan",
    text: "Chandan's blockchain expertise was instrumental in launching our NFT certification platform. He integrated ICP blockchain seamlessly and the platform now handles 150+ course uploads per month. Highly recommend him for any Web3 project.",
    rating: 5,
    platform: "LinkedIn",
  },
  {
    name: "Arjun Kapoor",
    role: "Lead Developer",
    company: "QuadbTech",
    avatar: "AK",
    color: "bg-[#dcdcaa]",
    text: "Working under Chandan as Team Lead was a great experience. He introduced agile methodologies that improved our delivery speed by 30%. His technical knowledge across the full stack — from React to smart contracts — is impressive.",
    rating: 5,
    platform: "LinkedIn",
  },
  {
    name: "Sneha Gupta",
    role: "UI/UX Designer",
    company: "QuadbTech",
    avatar: "SG",
    color: "bg-[#c586c0]",
    text: "Chandan has a great eye for translating designs into pixel-perfect implementations. He always goes the extra mile to ensure the UI is not just functional but also performant. A true full-stack professional.",
    rating: 5,
    platform: "LinkedIn",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <span key={i} className={i < count ? "text-yellow-400" : "text-vs-border"} style={{ fontSize: 12 }}>★</span>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [active, setActive] = useState(0);

  return (
    <div className="p-3 sm:p-6 font-mono max-w-3xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1 text-[11px] text-vs-muted mb-5">
        <span>chandan-portfolio</span>
        <span className="text-vs-border mx-0.5">›</span>
        <span className="text-vs-text">testimonials.tsx</span>
      </div>

      <p className="text-vs-comment text-[12px] mb-5">{"// Testimonials & Recommendations"}</p>

      {/* Nav dots */}
      <div className="flex gap-2 mb-4">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`w-2 h-2 rounded-full transition-all ${i === active ? "bg-vs-accent scale-125" : "bg-vs-border hover:bg-vs-muted"}`}
          />
        ))}
      </div>

      {/* Active card */}
      <div className="bg-vs-bg2 border border-vs-border rounded-lg p-5 mb-4" key={active}>
        <div className="flex items-start gap-4">
          <div className={`w-10 h-10 rounded-full ${testimonials[active].color} flex items-center justify-center text-white text-[12px] font-bold shrink-0`}>
            {testimonials[active].avatar}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <p className="text-vs-text text-[13px] font-semibold">{testimonials[active].name}</p>
                <p className="text-vs-muted text-[11px]">{testimonials[active].role} · {testimonials[active].company}</p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <Stars count={testimonials[active].rating} />
                <span className="text-vs-muted text-[10px]">via {testimonials[active].platform}</span>
              </div>
            </div>
            <div className="mt-3 text-vs-string text-[12px] leading-relaxed border-l-2 border-vs-accent pl-3">
              <span className="text-vs-comment">{"// "}</span>
              {testimonials[active].text}
            </div>
          </div>
        </div>
      </div>

      {/* All cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {testimonials.map((t, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`text-left bg-vs-bg2 border rounded-lg p-3 transition-all hover:border-vs-accent ${
              i === active ? "border-vs-accent" : "border-vs-border"
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-7 h-7 rounded-full ${t.color} flex items-center justify-center text-white text-[10px] font-bold shrink-0`}>
                {t.avatar}
              </div>
              <div>
                <p className="text-vs-text text-[11px] font-semibold">{t.name}</p>
                <p className="text-vs-muted text-[10px]">{t.role}</p>
              </div>
              <Stars count={t.rating} />
            </div>
            <p className="text-vs-muted text-[11px] leading-relaxed line-clamp-2">{t.text}</p>
          </button>
        ))}
      </div>

      {/* LinkedIn CTA */}
      <div className="mt-4 bg-vs-bg2 border border-vs-border rounded-lg p-4 flex items-center justify-between flex-wrap gap-3">
        <div>
          <p className="text-vs-text text-[12px] font-semibold">See all recommendations on LinkedIn</p>
          <p className="text-vs-muted text-[11px]">linkedin.com/in/chandanvishwakarma007</p>
        </div>
        <a
          href="https://www.linkedin.com/in/chandanvishwakarma007"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-[#0077b5] hover:bg-[#006097] text-white text-[12px] rounded transition-colors"
        >
          ⌘ View LinkedIn
        </a>
      </div>
    </div>
  );
}
