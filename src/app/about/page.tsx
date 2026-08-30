import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AppImage from '@/components/ui/AppImage';
import Link from 'next/link';
import { CheckIcon } from '@heroicons/react/24/outline';

export default function AboutPage() {
  const values = [
  {
    title: 'Crafted for Motion',
    body: 'Every sneaker is engineered with biomechanics research at its core. We partner with athletes and everyday movers to test each design across thousands of miles before it reaches you.'
  },
  {
    title: 'Sustainably Made',
    body: 'Over 60% of our materials come from recycled sources. Our factories run on renewable energy and we offset 100% of shipping emissions on every order.'
  },
  {
    title: 'Designed to Last',
    body: 'We back every pair with a 2-year warranty. If your sneakers fail due to manufacturing defects, we replace them. No questions, no receipts needed.'
  }];


  const milestones = [
  { year: '2018', event: 'Founded in Brooklyn, NY with 3 styles' },
  { year: '2020', event: 'Launched sustainable material program' },
  { year: '2022', event: 'Reached 500,000 happy customers' },
  { year: '2024', event: 'Opened flagship store in Manhattan' },
  { year: '2026', event: 'Expanding to 12 new global markets' }];


  return (
    <>
      <Navbar />
      <main className="pt-16 lg:pt-20 bg-background">
        {/* Hero */}
        <section className="py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
                    Our Story
                  </p>
                  <h1 className="text-display font-bold text-foreground">
                    Built for those who{' '}
                    <span className="font-serif italic text-primary">never stop.</span>
                  </h1>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Sneakers was born from a simple frustration: premium footwear that looked great but fell apart after three months. We set out to build sneakers that move with you — not against you — for years, not seasons.
                </p>
                <p className="text-base text-muted-foreground leading-relaxed">
                  From a tiny Brooklyn workshop in 2018, we've grown into a brand trusted by over 500,000 people across 40 countries. Every pair we make carries that same founding obsession: quality you can feel with every step.
                </p>
                <Link
                  href="/collections"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-primary text-primary-foreground font-bold hover:bg-accent transition-colors">
                  
                  Shop the Collection
                </Link>
              </div>

              <div className="relative">
                {/* Spinning ring */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-full h-full rounded-full border-2 border-dashed border-primary/20 animate-spin-slow" />
                </div>
                <div className="aspect-square rounded-3xl overflow-hidden border border-border shadow-2xl relative z-10">
                  <AppImage
                    src="https://img.rocket.new/generatedImages/rocket_gen_img_1e0c6bcfa-1784810807674.png"
                    alt="Sneakers brand workshop - craftspeople hand-finishing premium sneakers in bright Brooklyn studio with natural light"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover" />
                  
                </div>
                {/* Floating stat */}
                <div className="absolute -bottom-6 -left-6 glass rounded-2xl p-5 shadow-xl z-20 hidden lg:block">
                  <p className="text-3xl font-bold text-foreground">500k+</p>
                  <p className="text-xs text-muted-foreground font-semibold mt-0.5">Happy Customers</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 lg:py-24 bg-secondary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
                What We Stand For
              </p>
              <h2 className="text-section-title font-bold text-secondary-foreground">
                Our <span className="font-serif italic text-primary">Values.</span>
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {values?.map((v, i) =>
              <div
                key={i}
                className="p-8 rounded-3xl border border-secondary-foreground/10 bg-secondary-foreground/5">
                
                  <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center mb-5">
                    <CheckIcon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-bold text-xl text-secondary-foreground mb-3">{v?.title}</h3>
                  <p className="text-secondary-foreground/70 text-sm leading-relaxed">{v?.body}</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-16 lg:py-24 bg-background">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
                Since 2018
              </p>
              <h2 className="text-section-title font-bold text-foreground">
                Our <span className="font-serif italic text-primary">Journey.</span>
              </h2>
            </div>
            <div className="relative">
              <div className="absolute left-6 top-0 bottom-0 w-px bg-border" />
              <div className="space-y-10">
                {milestones?.map((m, i) =>
                <div key={i} className="flex items-start gap-6 pl-14 relative">
                    <div className="absolute left-0 top-0 w-12 h-12 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center shrink-0">
                      <span className="text-[10px] font-bold text-primary">{m?.year}</span>
                    </div>
                    <div className="pt-2">
                      <p className="font-bold text-foreground">{m?.event}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-16 lg:py-24 bg-muted/30 border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
                The People Behind the Pair
              </p>
              <h2 className="text-section-title font-bold text-foreground">
                Meet the <span className="font-serif italic text-primary">Team.</span>
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-10">
              {[
              {
                name: 'Marcus Reid',
                role: 'Founder & CEO',
                img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face'
              },
              {
                name: 'Priya Nair',
                role: 'Head of Design',
                img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face'
              },
              {
                name: 'Damon Carter',
                role: 'Lead Engineer',
                img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop&crop=face'
              },
              {
                name: 'Sofia Reyes',
                role: 'Sustainability Director',
                img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face'
              }]?.
              map((member) =>
              <div key={member?.name} className="text-center group">
                  <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted mb-4 img-zoom">
                    <AppImage
                    src={member?.img}
                    alt={`${member?.name}, ${member?.role} at Sneakers — professional headshot`}
                    fill
                    sizes="(max-width: 640px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  
                  </div>
                  <p className="font-bold text-foreground">{member?.name}</p>
                  <p className="text-xs text-muted-foreground font-medium mt-0.5">{member?.role}</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>);

}