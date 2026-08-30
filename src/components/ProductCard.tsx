'use client';

import React from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import { Product } from '@/types';
import { StarIcon } from '@heroicons/react/24/solid';
import { HeartIcon } from '@heroicons/react/24/outline';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export default function ProductCard({ product, className = '' }: ProductCardProps) {
  return (
    <Link
      href={`/products/${product.id}`}
      className={`group block bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 ${className}`}
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-muted img-zoom">
        <AppImage
          src={product.images[0]}
          alt={`${product.name} - ${product.brand} sneaker in ${product.colors[0]} color`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold">
            {product.badge}
          </div>
        )}
        {!product.badge && product.isNew && (
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-foreground text-secondary-foreground text-xs font-bold">
            New
          </div>
        )}

        {/* Wishlist */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full glass flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
          aria-label="Add to wishlist"
        >
          <HeartIcon className="w-4 h-4" />
        </button>

        {/* Quick view overlay */}
        <div className="absolute inset-x-0 bottom-0 py-3 px-4 glass opacity-0 group-hover:opacity-100 translate-y-full group-hover:translate-y-0 transition-all duration-500">
          <span className="text-xs font-bold text-foreground tracking-wide">Quick View →</span>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-1">
          {product.brand}
        </p>
        <h3 className="font-bold text-base text-foreground mb-2 group-hover:text-primary transition-colors duration-200">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <StarIcon
                key={i}
                className={`w-3 h-3 ${
                  i < Math.floor(product.rating)
                    ? 'text-primary' :'text-muted'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground font-medium">
            ({product.reviewCount.toLocaleString()})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="font-bold text-lg text-foreground">${product.price}</span>
          {product.originalPrice > product.price && (
            <>
              <span className="text-sm text-muted-foreground line-through">
                ${product.originalPrice}
              </span>
              <span className="text-xs font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded-md">
                {product.discount}% off
              </span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}