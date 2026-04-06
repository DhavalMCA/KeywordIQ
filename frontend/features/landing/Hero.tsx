import { SearchBar } from "@/features/search/SearchBar"

export function Hero() {
  return (
    <section className="flex flex-col items-center justify-center py-24 px-4 text-center">
      <h1 className="text-5xl font-bold tracking-tight mb-4 font-headline text-[#F0EFF5]">
        Free SEO Keyword Research
      </h1>
      <p className="text-xl text-[#CAC4D5] max-w-2xl mb-8">
        Powered by Google Trends, YouTube, Instagram, and AI. No login, no account — just results.
      </p>
      <SearchBar />
    </section>
  )
}
