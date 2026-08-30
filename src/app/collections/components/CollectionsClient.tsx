'use client';

import React, { useState, useMemo } from 'react';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types';
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';

type CategoryFilter = 'all' | 'men' | 'women' | 'unisex';
type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating';

interface CollectionsClientProps {
  products: Product[];
}

export default function CollectionsClient({ products }: CollectionsClientProps) {
  const [category, setCategory] = useState<CategoryFilter>('all');
  const [sort, setSort] = useState<SortOption>('featured');

  const filtered = useMemo(() => {
    let result = [...products];
    if (category !== 'all') {
      result = result.filter((p) => p.category === category);
    }
    switch (sort) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        result.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
    }
    return result;
  }, [products, category, sort]);

  const categories: { key: CategoryFilter; label: string }[] = [
    { key: 'all', label: 'All Styles' },
    { key: 'men', label: "Men's" },
    { key: 'women', label: "Women's" },
    { key: 'unisex', label: 'Unisex' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
      {/* Header */}
      <div className="mb-10">
        <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">
          Browse
        </p>
        <h1 className="text-section-title font-bold text-foreground">
          All <span className="font-serif italic text-primary">Collections.</span>
        </h1>
        <p className="text-muted-foreground mt-3 max-w-lg">
          {products.length} premium styles — from performance runners to everyday classics.
        </p>
      </div>

      {/* Filters bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-border">
        {/* Category pills */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setCategory(cat.key)}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 ${
                category === cat.key
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'bg-card border border-border text-muted-foreground hover:border-primary/50 hover:text-foreground'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2">
          <AdjustmentsHorizontalIcon className="w-4 h-4 text-muted-foreground" />
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
      </div>

      {/* Results count */}
      <p className="text-sm text-muted-foreground mb-6 font-medium">
        Showing {filtered.length} result{filtered.length !== 1 ? 's' : ''}
      </p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-2xl font-bold text-foreground mb-2">No styles found</p>
          <p className="text-muted-foreground">Try a different filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}