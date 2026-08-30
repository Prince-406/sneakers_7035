'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import LightboxModal from '@/components/LightboxModal';
import { HeartIcon, CheckIcon, ChevronLeftIcon, ChevronRightIcon, MagnifyingGlassPlusIcon,  } from '@heroicons/react/24/outline';
import { StarIcon as StarSolid } from '@heroicons/react/24/solid';
import { MinusIcon, PlusIcon, ShoppingBagIcon } from '@heroicons/react/24/solid';

interface Props {
  product: Product;
}

export default function ProductDetailClient({ product }: Props) {
  const { addItem } = useCart();
  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [added, setAdded] = useState(false);
  const [sizeError, setSizeError] = useState(false);

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true);
      setTimeout(() => setSizeError(false), 2000);
      return;
    }
    addItem(product, quantity, selectedSize, selectedColor);
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  const prevImage = () => setActiveImage((p) => (p - 1 + product.images.length) % product.images.length);
  const nextImage = () => setActiveImage((p) => (p + 1) % product.images.length);

  const savings = product.originalPrice - product.price;

  return (
    <>
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <span>/</span>
          <Link href="/collections" className="hover:text-foreground transition-colors">Collections</Link>
          <span>/</span>
          <span className="text-foreground font-medium truncate">{product.name}</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* === LEFT: Gallery === */}
          <div className="space-y-4">
            {/* Main image */}
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-muted group">
              <AppImage
                src={product.images[activeImage]}
                alt={`${product.name} - view ${activeImage + 1} of ${product.images.length}, premium sneaker detail shot`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-all duration-500"
              />

              {/* Discount badge */}
              {product.discount > 0 && (
                <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-primary text-primary-foreground text-sm font-bold">
                  {product.discount}% OFF
                </div>
              )}

              {/* Lightbox trigger */}
              <button
                onClick={() => setLightboxOpen(true)}
                className="absolute top-4 right-4 w-10 h-10 glass rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
                aria-label="Open fullscreen gallery"
              >
                <MagnifyingGlassPlusIcon className="w-5 h-5" />
              </button>

              {/* Prev/Next arrows */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 glass rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
                aria-label="Previous image"
              >
                <ChevronLeftIcon className="w-5 h-5" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 glass rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
                aria-label="Next image"
              >
                <ChevronRightIcon className="w-5 h-5" />
              </button>

              {/* Dot indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
                {product.images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`rounded-full transition-all duration-300 ${
                      i === activeImage
                        ? 'w-6 h-2 bg-primary' :'w-2 h-2 bg-primary-foreground/60'
                    }`}
                    aria-label={`View image ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                    i === activeImage
                      ? 'border-primary shadow-md'
                      : 'border-border hover:border-primary/50'
                  }`}
                  aria-label={`Select image ${i + 1}`}
                >
                  <AppImage
                    src={img}
                    alt={`${product.name} thumbnail ${i + 1}`}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Mobile swipe hint */}
            <p className="text-center text-xs text-muted-foreground lg:hidden">
              Tap arrows or thumbnails to browse
            </p>
          </div>

          {/* === RIGHT: Info === */}
          <div className="space-y-7">
            {/* Brand + badges */}
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold uppercase tracking-widest text-primary">
                {product.brand}
              </p>
              <div className="flex items-center gap-2">
                {product.isBestSeller && (
                  <span className="px-2.5 py-1 rounded-full bg-foreground text-secondary-foreground text-xs font-bold">
                    Bestseller
                  </span>
                )}
                {product.isNew && (
                  <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold">
                    New
                  </span>
                )}
              </div>
            </div>

            {/* Name */}
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarSolid
                    key={i}
                    className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-primary' : 'text-muted'}`}
                  />
                ))}
              </div>
              <span className="font-bold text-sm text-foreground">{product.rating}</span>
              <span className="text-sm text-muted-foreground">
                ({product.reviewCount.toLocaleString()} reviews)
              </span>
            </div>

            {/* Price block */}
            <div className="flex items-end gap-4 p-5 rounded-2xl bg-muted/50 border border-border">
              <div>
                <p className="text-xs text-muted-foreground font-semibold mb-1">Current Price</p>
                <p className="text-5xl font-bold text-foreground">${product.price}</p>
              </div>
              {product.originalPrice > product.price && (
                <div className="pb-1">
                  <p className="text-xl text-muted-foreground line-through font-medium">
                    ${product.originalPrice}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-md">
                      {product.discount}% off
                    </span>
                    <span className="text-sm text-primary font-semibold">
                      You save ${savings}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Color selector */}
            <div>
              <p className="text-sm font-bold text-foreground mb-3">
                Color: <span className="font-normal text-muted-foreground">{selectedColor}</span>
              </p>
              <div className="flex items-center gap-2.5">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-9 h-9 rounded-full border-2 transition-all duration-200 ${
                      selectedColor === color
                        ? 'border-foreground scale-110 shadow-md'
                        : 'border-border hover:border-foreground/40'
                    }`}
                    style={{ backgroundColor: color }}
                    aria-label={`Select color ${color}`}
                  />
                ))}
              </div>
            </div>

            {/* Size selector */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className={`text-sm font-bold ${sizeError ? 'text-red-500' : 'text-foreground'}`}>
                  {sizeError ? 'Please select a size' : 'Size (US)'}
                </p>
                <button className="text-xs font-semibold text-primary hover:underline">
                  Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => {
                  const available = product.availableSizes.includes(size);
                  return (
                    <button
                      key={size}
                      onClick={() => available && setSelectedSize(size)}
                      disabled={!available}
                      className={`size-btn w-14 h-11 rounded-xl border text-sm font-bold transition-all duration-200 ${
                        selectedSize === size
                          ? 'size-btn-active'
                          : !available
                          ? 'size-btn-disabled border-border text-muted-foreground'
                          : 'border-border text-foreground hover:border-primary hover:text-primary'
                      } ${sizeError && !selectedSize ? 'border-red-400' : ''}`}
                      aria-label={`Size ${size}${!available ? ' - unavailable' : ''}`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity + Add to Cart */}
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Quantity */}
              <div className="flex items-center gap-0 border border-border rounded-2xl overflow-hidden">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-12 h-14 flex items-center justify-center hover:bg-muted transition-colors"
                  aria-label="Decrease quantity"
                >
                  <MinusIcon className="w-4 h-4 text-foreground" />
                </button>
                <span className="w-14 text-center font-bold text-lg text-foreground border-x border-border h-14 flex items-center justify-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-12 h-14 flex items-center justify-center hover:bg-muted transition-colors"
                  aria-label="Increase quantity"
                >
                  <PlusIcon className="w-4 h-4 text-foreground" />
                </button>
              </div>

              {/* Add to cart */}
              <button
                onClick={handleAddToCart}
                className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-base transition-all duration-300 ${
                  added
                    ? 'bg-green-500 text-white' :'bg-primary text-primary-foreground hover:bg-accent'
                }`}
                style={{ boxShadow: added ? '0 8px 32px rgba(34,197,94,0.25)' : '0 8px 32px rgba(224,123,57,0.2)' }}
              >
                {added ? (
                  <>
                    <CheckIcon className="w-5 h-5" />
                    Added to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingBagIcon className="w-5 h-5" />
                    Add to Cart · ${(product.price * quantity).toFixed(2)}
                  </>
                )}
              </button>

              {/* Wishlist */}
              <button
                className="w-14 h-14 rounded-2xl border border-border flex items-center justify-center hover:bg-muted hover:border-primary/40 transition-all duration-200"
                aria-label="Add to wishlist"
              >
                <HeartIcon className="w-5 h-5 text-foreground" />
              </button>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              {['Free Shipping over $50', '30-Day Returns', '2-Year Warranty'].map((text) => (
                <div key={text} className="flex flex-col items-center gap-1 p-3 rounded-xl bg-muted/50 text-center">
                  <CheckIcon className="w-4 h-4 text-primary" />
                  <span className="text-xs font-semibold text-muted-foreground leading-tight">{text}</span>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="border-t border-border pt-6 space-y-4">
              <h2 className="font-bold text-base text-foreground">About this shoe</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{product.description}</p>
              <ul className="space-y-2">
                {product.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-2 text-sm text-foreground">
                    <CheckIcon className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    {feat}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <LightboxModal
          images={product.images}
          initialIndex={activeImage}
          productName={product.name}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </>
  );
}