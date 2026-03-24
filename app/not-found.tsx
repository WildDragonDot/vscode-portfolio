export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#1e1e1e] flex items-center justify-center font-mono">
      <div className="text-center max-w-md px-6">
        {/* Editor panel */}
        <div className="bg-[#252526] border border-[#3c3c3c] rounded-lg overflow-hidden mb-6">
          <div className="flex items-center gap-2 px-4 py-2 bg-[#2d2d2d] border-b border-[#3c3c3c] text-[11px] text-[#858585]">
            <span className="text-[#f44747]">●</span>
            <span>404.tsx</span>
          </div>
          <div className="p-6 text-left text-[13px] leading-7">
            <p><span className="text-[#569cd6]">const </span><span className="text-[#dcdcaa]">error</span><span className="text-[#d4d4d4]"> = {"{"}</span></p>
            <p className="pl-4"><span className="text-[#9cdcfe]">code</span><span className="text-[#d4d4d4]">:    </span><span className="text-[#b5cea8]">404</span><span className="text-[#d4d4d4]">,</span></p>
            <p className="pl-4"><span className="text-[#9cdcfe]">message</span><span className="text-[#d4d4d4]">: </span><span className="text-[#ce9178]">&quot;Page not found&quot;</span><span className="text-[#d4d4d4]">,</span></p>
            <p className="pl-4"><span className="text-[#9cdcfe]">hint</span><span className="text-[#d4d4d4]">:    </span><span className="text-[#ce9178]">&quot;This file doesn&apos;t exist&quot;</span></p>
            <p><span className="text-[#d4d4d4]">{"}"}</span></p>
            <p className="mt-2 text-[#6a9955]">{"// Navigate back to portfolio"}</p>
          </div>
        </div>

        <a
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#007acc] hover:bg-[#1a8ad4] text-white text-[13px] rounded transition-colors font-mono"
        >
          ← Go Home
        </a>
      </div>
    </div>
  );
}
