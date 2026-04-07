import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-surface-container-lowest w-full py-16 sm:py-20 md:py-24 border-t border-outline-variant/5 mt-auto relative overflow-hidden pb-20 lg:pb-0">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 blur-[100px] rounded-full pointer-events-none translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 pb-12 sm:pb-16 border-b border-outline-variant/5">
          <div className="lg:col-span-4 space-y-8">
            <div className="flex items-center gap-3 group">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center rotate-45 group-hover:rotate-90 transition-transform duration-500">
                <span className="material-symbols-outlined text-on-primary -rotate-45 group-hover:-rotate-90 transition-transform duration-500 text-lg">bolt</span>
              </div>
              <span className="text-xl font-black tracking-tighter text-on-background font-headline ">
                KeywordIQ
              </span>
            </div>
            <p className="text-[10px] font-black font-body  text-on-background leading-relaxed max-w-sm">
              Precision Ledger Architecture. High-performance SEO discovery powered by real-time indexing and AI synthesis.
              <br /><br />
              © 2026   KeywordIQ. Protocol v4.2.8.
            </p>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-3 gap-12">
            <div className="space-y-6">
              <span className="text-[10px] font-black  text-primary">Discovery</span>
              <ul className="space-y-4">
                <li>
                  <Link href="/keyword-analysis" className="text-[10px] font-black  text-on-background hover:text-primary transition-colors">
                    Analysis
                  </Link>
                </li>
                <li>
                  <Link href="/youtube-finder" className="text-[10px] font-black  text-on-background hover:text-primary transition-colors">
                    YouTube
                  </Link>
                </li>
                <li>
                  <Link href="/instagram-finder" className="text-[10px] font-black  text-on-background hover:text-primary transition-colors">
                    Instagram
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-6">
              <span className="text-[10px] font-black  text-secondary">Utility</span>
              <ul className="space-y-4">
                <li>
                  <Link href="/hashtag-gen" className="text-[10px] font-black  text-on-background hover:text-secondary transition-colors">
                    Hashtags
                  </Link>
                </li>
                <li>
                  <Link href="/meta-tag-gen" className="text-[10px] font-black  text-on-background hover:text-secondary transition-colors">
                    Meta Tags
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-[10px] font-black  text-on-background hover:text-secondary transition-colors">
                    Intel
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-6 hidden sm:block">
              <span className="text-[10px] font-black  text-tertiary">Legal</span>
              <ul className="space-y-4">
                <li>
                  <Link href="/privacy" className="text-[10px] font-black  text-on-background hover:text-tertiary transition-colors">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-[10px] font-black  text-on-background hover:text-tertiary transition-colors">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-3 flex flex-col items-start lg:items-end gap-10">
            <div className="flex flex-col items-start lg:items-end gap-2">
              <span className="text-[10px] font-black text-secondary ">System Status</span>
              <div className="flex items-center gap-3 px-3 py-1.5 bg-surface-container-high rounded-lg border border-outline-variant/10">
                <div className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse shadow-[0_0_8px_rgba(var(--secondary),0.5)]" />
                <span className="text-[9px] font-mono text-on-background font-bold ">All Engines Nominal</span>
              </div>
            </div>

            <div className="flex gap-6">
              <a href="#" className="w-10 h-10 rounded-2xl bg-surface-container-high flex items-center justify-center cursor-pointer hover:bg-primary hover:text-on-primary transition-all duration-300 group">
                <span className="material-symbols-outlined text-lg opacity-40 group-hover:opacity-100">terminal</span>
              </a>
              <a href="#" className="w-10 h-10 rounded-2xl bg-surface-container-high flex items-center justify-center cursor-pointer hover:bg-secondary hover:text-on-secondary transition-all duration-300 group">
                <span className="material-symbols-outlined text-lg opacity-40 group-hover:opacity-100">monitoring</span>
              </a>
              <a href="#" className="w-10 h-10 rounded-2xl bg-surface-container-high flex items-center justify-center cursor-pointer hover:bg-tertiary hover:text-on-tertiary transition-all duration-300 group">
                <span className="material-symbols-outlined text-lg opacity-40 group-hover:opacity-100">hub</span>
              </a>
            </div>
          </div>
        </div>

        <div className="pt-16 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-12">
            <div className="flex items-center gap-2">
              <span className="text-[8px] font-black text-on-background/40 ">Global Latency</span>
              <span className="text-[8px] font-mono text-secondary font-bold">12ms</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[8px] font-black text-on-background/40 ">Index Buffer</span>
              <span className="text-[8px] font-mono text-secondary font-bold">OPTIMIZED</span>
            </div>
          </div>
          <span className="text-[8px] font-black text-on-background/40  italic font-headline">Designed for Precision // Engineered for Discovery</span>
        </div>
      </div>
    </footer>
  )
}
