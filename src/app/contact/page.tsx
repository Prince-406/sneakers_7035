'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { EnvelopeIcon, PhoneIcon, MapPinIcon, CheckIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import Icon from '@/components/ui/AppIcon';


const faqs = [
  {
    q: 'How do I find my correct shoe size?',
    a: 'We recommend measuring your foot length in centimeters and comparing it to our size guide. When in doubt, size up — our sneakers have a snug fit. You can find the full size guide on any product page.',
  },
  {
    q: 'What is your return policy?',
    a: 'We offer free 30-day returns on all unworn items in original packaging. Simply initiate a return from your order confirmation email and we\'ll send a prepaid label within 24 hours.',
  },
  {
    q: 'How long does shipping take?',
    a: 'Standard shipping takes 3–5 business days within the US. Express shipping (1–2 days) is available at checkout. International orders typically arrive in 7–14 business days.',
  },
  {
    q: 'Are your sneakers true to size?',
    a: 'Most of our styles run true to size. However, some performance models run slightly narrow. We note fit specifics on each product page under "About this shoe."',
  },
  {
    q: 'Do you offer a warranty?',
    a: 'Yes — every pair comes with a 2-year manufacturing defect warranty. If the sole separates, stitching fails, or materials degrade abnormally, we replace the pair at no cost.',
  },
];

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <Navbar />
      <main className="pt-16 lg:pt-20 bg-background min-h-screen">
        {/* Header */}
        <section className="py-16 lg:py-20 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
              Get in Touch
            </p>
            <h1 className="text-display font-bold text-foreground">
              We&apos;re here to{' '}
              <span className="font-serif italic text-primary">help.</span>
            </h1>
            <p className="text-muted-foreground mt-4 max-w-lg mx-auto text-lg">
              Questions about sizing, orders, or returns? Our team typically responds within 2 hours on business days.
            </p>
          </div>
        </section>

        {/* Contact cards + form */}
        <section className="py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
              {/* Left: contact info */}
              <div className="lg:col-span-2 space-y-6">
                <h2 className="text-2xl font-bold text-foreground">Contact Info</h2>
                {[
                  {
                    icon: EnvelopeIcon,
                    label: 'Email Us',
                    value: 'hello@sneakers.com',
                    sub: 'Response within 2 hours',
                  },
                  {
                    icon: PhoneIcon,
                    label: 'Call Us',
                    value: '+1 (646) 555-0182',
                    sub: 'Mon–Fri, 9am–6pm EST',
                  },
                  {
                    icon: MapPinIcon,
                    label: 'Visit Us',
                    value: '247 Fulton St, Brooklyn, NY 11201',
                    sub: 'Flagship store & HQ',
                  },
                ].map(({ icon: Icon, label, value, sub }) => (
                  <div key={label} className="flex gap-4 p-5 bg-card rounded-2xl border border-border">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-0.5">
                        {label}
                      </p>
                      <p className="font-bold text-foreground text-sm">{value}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right: form */}
              <div className="lg:col-span-3">
                {submitted ? (
                  <div className="flex flex-col items-center justify-center h-full py-16 text-center">
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                      <CheckIcon className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">Message Sent!</h3>
                    <p className="text-muted-foreground">
                      Thanks, {form.name}. We&apos;ll get back to you at{' '}
                      <strong className="text-foreground">{form.email}</strong> within 2 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          required
                          value={form.name}
                          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                          placeholder="Jordan Williams"
                          className="w-full px-4 py-3.5 rounded-xl border border-border bg-card text-foreground text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          required
                          value={form.email}
                          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                          placeholder="jordan@example.com"
                          className="w-full px-4 py-3.5 rounded-xl border border-border bg-card text-foreground text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">
                        Subject
                      </label>
                      <select
                        value={form.subject}
                        onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
                        className="w-full px-4 py-3.5 rounded-xl border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all cursor-pointer"
                      >
                        <option value="">Select a topic…</option>
                        <option value="order">Order Status</option>
                        <option value="return">Return / Exchange</option>
                        <option value="sizing">Sizing Help</option>
                        <option value="warranty">Warranty Claim</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">
                        Message
                      </label>
                      <textarea
                        required
                        rows={5}
                        value={form.message}
                        onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                        placeholder="Tell us how we can help…"
                        className="w-full px-4 py-3.5 rounded-xl border border-border bg-card text-foreground text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-bold text-base hover:bg-accent transition-colors"
                      style={{ boxShadow: '0 8px 32px rgba(224,123,57,0.2)' }}
                    >
                      Send Message
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 lg:py-20 bg-muted/30 border-t border-border">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
                FAQ
              </p>
              <h2 className="text-section-title font-bold text-foreground">
                Common <span className="font-serif italic text-primary">Questions.</span>
              </h2>
            </div>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-card rounded-2xl border border-border overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                    aria-expanded={openFaq === i}
                  >
                    <span className="font-bold text-sm text-foreground">{faq.q}</span>
                    <ChevronDownIcon
                      className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform duration-300 ${
                        openFaq === i ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openFaq === i ? 'max-h-48' : 'max-h-0'
                    }`}
                  >
                    <p className="px-6 pb-5 text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}