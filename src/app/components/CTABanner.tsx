import React from 'react';
import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

export default function CTABanner() {
  return (
    <section className="py-20 lg:py-28 bg-secondary overflow-hidden relative">
      {/* Decorative background text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <span
          className="font-serif italic text-secondary-foreground/[0.03] whitespace-nowrap select-none"
          style={{ fontSize: 'clamp(80px, 18vw, 260px)' }}
        >
          Sneakers
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-primary mb-4">
          Limited Time Offer
        </p>
        <h2 className="text-display font-bold text-secondary-foreground mb-6">
          Up to{' '}
          <span className="font-serif italic text-primary">50% off</span>
          <br />
          select styles.
        </h2>
        <p className="text-lg text-secondary-foreground/70 max-w-md mx-auto mb-10">
          Premium footwear at prices that move as fast as you do. Sale ends August 31, 2026.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/collections"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-primary text-primary-foreground font-bold text-base hover:bg-accent transition-all duration-300 group"
            style={{ boxShadow: '0 8px 32px rgba(224,123,57,0.3)' }}
          >
            Shop the Sale
            <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/men"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl border border-secondary-foreground/20 text-secondary-foreground font-bold text-base hover:bg-secondary-foreground/10 transition-all duration-300"
          >
            Men's Picks
          </Link>
        </div>
      </div>
    </section>
  );
}