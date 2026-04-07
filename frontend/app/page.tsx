import Link from "next/link"
import { SearchBar } from "@/features/search/SearchBar"

export default function HomePage() {
  return (
    <div className="flex flex-col pt-[56px] min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex flex-col items-center justify-center py-16 sm:py-24 px-4 sm:px-6 text-center overflow-hidden hero-gradient">
        {/* Background Decorative Element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 max-w-5xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-container-low border border-outline-variant/30 rounded-full mb-10">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            <span className="text-[10px] font-bold tracking-[0.2em] font-body text-secondary uppercase">
               Engine: V4.0 Precision Active
            </span>
          </div>

          <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-8xl font-black font-headline tracking-tighter text-on-background leading-none mb-6 sm:mb-10 uppercase">
            Five tools.<br />
            <span className="text-primary select-none underline decoration-secondary/30 underline-offset-8">One search.</span>
          </h1>

          <p className="max-w-2xl mx-auto text-sm md:text-base font-medium font-body text-on-background/70 mb-14 leading-relaxed ">
            Real-time keyword intelligence from Google Trends, YouTube, and Instagram — high-performance SEO discovery.
          </p>

          <div className="w-full max-w-2xl mx-auto">
            <SearchBar />
          </div>

          {/* Quick suggestions */}
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            <span className="text-[10px] font-bold text-outline-variant  mr-2 self-center">Popular Probes:</span>
            {["bitcoin analysis", "local seo 2024", "saas marketing"].map((chip) => (
              <Link
                key={chip}
                href={`/results?q=${encodeURIComponent(chip)}`}
                className="px-4 py-1.5 text-[10px] font-bold  text-on-background/40 hover:text-primary bg-surface-container-low border border-outline-variant/10 rounded-lg hover:border-primary/30 transition-all hover:-translate-y-0.5"
              >
                {chip}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="bg-surface-container-lowest w-full py-16 sm:py-24 md:py-32 border-y border-outline-variant/10 px-4 sm:px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20">
             <div className="max-w-2xl">
                <span className="text-[10px] font-black text-primary uppercase block mb-4">The Stack</span>
                <h2 className="text-4xl md:text-5xl font-black font-headline text-on-background uppercase tracking-tight">
                  High-Velocity SEO<br />Deployment
                </h2>
             </div>
             <p className="text-xs font-medium font-body text-on-background/60  max-w-[300px] leading-relaxed">
               Comprehensive discovery modules across the entire digital ecosystem.
             </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group bg-surface-container-low hover:bg-surface-container border border-outline-variant/10 hover:border-primary/20 p-5 sm:p-6 md:p-8 rounded-xl transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-start justify-between mb-8">
                  <div className="w-12 h-12 bg-background border border-outline-variant/5 rounded-lg flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                    {tool.icon}
                  </div>
                  <span className="material-symbols-outlined text-outline-variant group-hover:text-primary transition-colors">
                    north_east
                  </span>
                </div>
                <h3 className="text-sm font-black font-headline text-on-background mb-3  leading-none">
                  {tool.title}
                </h3>
                <p className="text-[11px] font-medium font-body text-on-background/60 leading-relaxed ">
                  {tool.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-8 bg-background relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary/5 blur-[150px] rounded-full pointer-events-none translate-x-1/2 translate-y-1/2" />

        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16 md:mb-24">
            <span className="text-[10px] font-black text-secondary uppercase block mb-4">Protocol</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-headline text-on-background uppercase tracking-tight">
              Ingestion to Insight
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {steps.map((step, i) => (
              <div key={step.title} className="relative group">
                <div className="text-8xl font-black font-headline text-outline-variant/5 absolute -top-12 -left-4 select-none group-hover:text-primary/10 transition-colors">
                  0{i + 1}
                </div>
                <div className="relative z-10">
                  <h4 className="text-sm font-black font-headline text-on-background mb-4 ">
                    {step.title}
                  </h4>
                  <p className="text-[10px] font-medium font-body text-on-background/60 leading-relaxed ">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

const tools = [
  {
    href: "/keyword-analysis",
    title: "Keyword Analysis",
    description: "Get keyword trends, related queries, and search volume data from Google Trends.",
    icon: "📊",
  },
  {
    href: "/youtube-finder",
    title: "YouTube Explorer",
    description: "Extract keywords from YouTube videos to understand what makes content rank.",
    icon: "🎬",
  },
  {
    href: "/instagram-finder",
    title: "Instagram Finder",
    description: "Discover trending hashtags and keywords for Instagram and TikTok content.",
    icon: "📸",
  },
  {
    href: "/hashtag-gen",
    title: "Hashtag Generator",
    description: "Generate relevant hashtags for any topic using AI.",
    icon: "#",
  },
  {
    href: "/meta-tag-gen",
    title: "Meta Tag Generator",
    description: "Create SEO-optimized meta titles and descriptions for your content.",
    icon: "🏷️",
  },
  {
    href: "/about",
    title: "Precision Docs",
    description: "Learn about the KeywordIQ architecture and data sources.",
    icon: "📄",
  },
]

const steps = [
  {
    title: "Probe Key",
    description: "Initialize search sequence with any high-variance topic or term.",
  },
  {
    title: "Select Node",
    description: "Pivot between Google Trends, YouTube, or Instagram indexing engines.",
  },
  {
    title: "Process AI",
    description: "Vectorize ingestion data using advanced semantic enrichment protocols.",
  },
  {
    title: "Export Ledger",
    description: "Commit resulting artifacts to persistent CSV or JSON storage.",
  },
]
