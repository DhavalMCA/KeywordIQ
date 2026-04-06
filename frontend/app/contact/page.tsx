"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useContact } from "@/features/contact/useContact"

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" })
  const { submit, isLoading, success, error } = useContact()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    await submit(form)
  }

  return (
    <div className="flex flex-col pt-[56px] bg-background min-h-screen">
      <section className="py-24 px-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-on-background mb-4">
          Contact Us
        </h1>
        <p className="text-sm text-on-background/60 max-w-md mx-auto">
          Have a question or feedback? Fill out the form below and we&apos;ll get back to you via email.
        </p>
      </section>

      <section className="py-8 px-8 max-w-lg mx-auto w-full">
        {success ? (
          <div className="bg-surface-container-low border border-outline-variant/10 rounded-xl p-8 text-center">
            <p className="text-primary font-semibold mb-2">Message sent!</p>
            <p className="text-sm text-on-background/60">We&apos;ll get back to you at your email address.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium text-on-background/60">Name</label>
              <Input
                name="name"
                placeholder="Your name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium text-on-background/60">Email</label>
              <Input
                name="email"
                type="email"
                placeholder="your@email.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium text-on-background/60">Message</label>
              <Textarea
                name="message"
                placeholder="Write your message..."
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                required
              />
            </div>
            {error && <p className="text-sm text-red-400">{error}</p>}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? "Sending..." : "Send Message"}
            </Button>
            <p className="text-xs text-center text-on-background/40">
              Messages are stored securely and replied to via email.
            </p>
          </form>
        )}
      </section>
    </div>
  )
}
