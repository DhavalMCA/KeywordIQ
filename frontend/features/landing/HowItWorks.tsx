export function HowItWorks() {
  const steps = [
    { number: "01", title: "Search", description: "Enter any keyword or topic into your chosen tool." },
    { number: "02", title: "Analyze", description: "Get real-time data from Google, YouTube, Instagram, and AI." },
    { number: "03", title: "Export", description: "Download results as JSON, CSV, or TXT — no signup required." },
  ]

  return (
    <section className="max-w-4xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center mb-12 font-headline text-[#F0EFF5]">How It Works</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((step) => (
          <div key={step.number} className="text-center">
            <div className="text-4xl font-bold text-[#6E56CF]/20 mb-2 font-headline">{step.number}</div>
            <h3 className="font-semibold text-lg mb-2 text-[#F0EFF5]">{step.title}</h3>
            <p className="text-sm text-[#CAC4D5]">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
