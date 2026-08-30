'use client';

import React, { useState, useMemo } from 'react';
import ProductCard from '@/components/ProductCard';
import AppImage from '@/components/ui/AppImage';
import { Product } from '@/types';

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating';

interface GenderCatalogProps {
  products: Product[];
  gender: string;
  description: string;
  heroImage: string;
  heroAlt: string;
}

export default function GenderCatalog({
  products,
  gender,
  description,
  heroImage,
  heroAlt,
}: GenderCatalogProps) {
  const [sort, setSort] = useState<SortOption>('featured');

  const sorted = useMemo(() => {
    const result = [...products];
    switch (sort) {
      case 'price-asc': return result.sort((a, b) => a.price - b.price);
      case 'price-desc': return result.sort((a, b) => b.price - a.price);
      case 'rating': return result.sort((a, b) => b.rating - a.rating);
      default: return result.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
    }
  }, [products, sort]);

  return (
    <div>
      {/* Category Hero Banner */}
      <div className="relative h-56 sm:h-72 lg:h-80 overflow-hidden">
        <AppImage
          src={heroImage}
          alt={heroAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-6 sm:px-10 lg:px-16 pb-8">
          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-1">
            {products.length} Styles
          </p>
          <h1 className="text-4xl lg:text-5xl font-bold text-primary-foreground">
            {gender}{' '}
            <span className="font-serif italic">Collection.</span>
          </h1>
          <p className="text-primary-foreground/80 text-sm mt-1 max-w-md">{description}</p>
        </div>
      </div>

      {/* Catalog */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Sort bar */}
        <div className="flex items-center justify-between mb-8">
          <p className="text-sm text-muted-foreground font-medium">
            {sorted.length} style{sorted.length !== 1 ? 's' : ''}
          </p>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="text-sm font-semibold text-foreground bg-card border border-border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/40 cursor-pointer"
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sorted.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}