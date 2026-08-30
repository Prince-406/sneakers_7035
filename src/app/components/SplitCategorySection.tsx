'use client';

import React from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import { Product } from '@/types';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

interface SplitCategorySectionProps {
  mens: Product[];
  womens: Product[];
}

export default function SplitCategorySection({ mens, womens }: SplitCategorySectionProps) {
  return (
    <section className="py-8 lg:py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Men */}
          <CategoryCard
            href="/men"
            label="Men's Collection"
            title="Built for the Bold."
            image="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80"
            alt="Men's premium sneakers - white and orange athletic shoes on dark background with dramatic lighting"
            accent="from-foreground/70 via-foreground/30 to-transparent"
          />
          {/* Women */}
          <CategoryCard
            href="/women"
            label="Women's Collection"
            title="Designed to Move."
            image="https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&auto=format&fit=crop&q=80"
            alt="Women's premium sneakers - pink and white athletic shoes on light neutral background, bright airy studio lighting"
            accent="from-foreground/60 via-foreground/25 to-transparent"
          />
        </div>
      </div>
    </section>
  );
}

function CategoryCard({
  href,
  label,
  title,
  image,
  alt,
  accent,
}: {
  href: string;
  label: string;
  title: string;
  image: string;
  alt: string;
  accent: string;
}) {
  return (
    <Link
      href={href}
      className="group relative aspect-[4/3] rounded-3xl overflow-hidden block border border-border"
    >
      <AppImage
        src={image}
        alt={alt}
        fill
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="object-cover transition-transform duration-1000 group-hover:scale-105"
      />
      {/* Scrim */}
      <div className={`absolute inset-0 bg-gradient-to-t ${accent}`} />

      {/* Text */}
      <div className="absolute bottom-0 left-0 right-0 p-8">
        <p className="text-xs font-bold uppercase tracking-widest text-primary-foreground/80 mb-1">
          {label}
        </p>
        <h3 className="text-3xl font-bold text-primary-foreground mb-4">{title}</h3>
        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-bold text-sm group-hover:bg-accent transition-colors duration-300">
          Shop Now
          <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}