'use client';

import React, { useState, useEffect, useCallback } from 'react';
import AppImage from '@/components/ui/AppImage';
import { XMarkIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface LightboxModalProps {
  images: string[];
  initialIndex: number;
  productName: string;
  onClose: () => void;
}

export default function LightboxModal({
  images,
  initialIndex,
  productName,
  onClose,
}: LightboxModalProps) {
  const [current, setCurrent] = useState(initialIndex);

  const prev = useCallback(() =>
    setCurrent((c) => (c - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() =>
    setCurrent((c) => (c + 1) % images.length), [images.length]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose, prev, next]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/95 backdrop-blur-md"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Product image gallery"
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 w-11 h-11 glass-dark rounded-full flex items-center justify-center text-secondary-foreground hover:bg-primary transition-colors z-10"
        aria-label="Close gallery"
      >
        <XMarkIcon className="w-5 h-5" />
      </button>

      {/* Counter */}
      <div className="absolute top-5 left-1/2 -translate-x-1/2 glass-dark rounded-full px-4 py-2 text-xs font-bold text-secondary-foreground z-10">
        {current + 1} / {images.length}
      </div>

      {/* Prev */}
      <button
        onClick={(e) => { e.stopPropagation(); prev(); }}
        className="absolute left-5 top-1/2 -translate-y-1/2 w-11 h-11 glass-dark rounded-full flex items-center justify-center text-secondary-foreground hover:bg-primary transition-colors z-10"
        aria-label="Previous image"
      >
        <ChevronLeftIcon className="w-5 h-5" />
      </button>

      {/* Main image */}
      <div
        className="relative w-full max-w-3xl max-h-[80vh] aspect-square mx-16 rounded-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <AppImage
          src={images[current]}
          alt={`${productName} - fullscreen view ${current + 1}`}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 800px"
          className="object-contain"
        />
      </div>

      {/* Next */}
      <button
        onClick={(e) => { e.stopPropagation(); next(); }}
        className="absolute right-5 top-1/2 -translate-y-1/2 w-11 h-11 glass-dark rounded-full flex items-center justify-center text-secondary-foreground hover:bg-primary transition-colors z-10"
        aria-label="Next image"
      >
        <ChevronRightIcon className="w-5 h-5" />
      </button>

      {/* Thumbnails */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 z-10" onClick={(e) => e.stopPropagation()}>
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`relative w-14 h-14 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
              i === current ? 'border-primary scale-110' : 'border-secondary-foreground/20 hover:border-primary/50'
            }`}
            aria-label={`View image ${i + 1}`}
          >
            <AppImage
              src={img}
              alt={`${productName} thumbnail ${i + 1}`}
              fill
              sizes="56px"
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}