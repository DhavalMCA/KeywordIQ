import Link from "next/link"

interface FeatureCardsProps {
  onToolClick?: (href: string) => void
}

export function FeatureCards({ onToolClick }: FeatureCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {tools.map((tool) => (
        <Link
          key={tool.href}
          href={tool.href}
          className="group border border-[#2A292F] rounded-sm p-6 hover:border-[#6E56CF] transition-colors bg-[#131318]"
        >
          <div className="mb-3 text-3xl">{tool.icon}</div>
          <h3 className="font-semibold text-lg mb-1 text-[#F0EFF5]">{tool.title}</h3>
          <p className="text-sm text-[#CAC4D5]">{tool.description}</p>
        </Link>
      ))}
    </div>
  )
}

const tools = [
  {
    href: "/keyword-analysis",
    title: "Keyword Analysis",
    description: "Google Trends, autocomplete, YouTube tags, and AI meta suggestions.",
    icon: "&#128269;",
  },
  {
    href: "/youtube-finder",
    title: "YouTube Finder",
    description: "Find YouTube video keywords with view counts, tags, and channel data.",
    icon: "&#128250;",
  },
  {
    href: "/instagram-finder",
    title: "Instagram Finder",
    description: "Discover trending and niche hashtags for Instagram growth.",
    icon: "&#128247;",
  },
  {
    href: "/hashtag-gen",
    title: "Hashtag Generator",
    description: "AI-generated hashtag bundles for Instagram, Twitter/X, and LinkedIn.",
    icon: "#",
  },
  {
    href: "/meta-tag-gen",
    title: "Meta Tag Generator",
    description: "Generate SEO meta tags, Open Graph, and Twitter card tags with AI.",
    icon: "&#127991;",
  },
]
