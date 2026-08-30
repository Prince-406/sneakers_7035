'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elements = [
    { el: badgeRef?.current, delay: 100 },
    { el: headlineRef?.current, delay: 250 },
    { el: ctaRef?.current, delay: 450 }];


    elements?.forEach(({ el, delay }) => {
      if (!el) return;
      el.style.opacity = '0';
      el.style.transform = 'translateY(40px)';
      setTimeout(() => {
        if (!el) return;
        el.style.transition = 'opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, delay);
    });

    if (imageRef?.current) {
      imageRef.current.style.opacity = '0';
      imageRef.current.style.transform = 'translateX(60px)';
      setTimeout(() => {
        if (!imageRef?.current) return;
        imageRef.current.style.transition = 'opacity 1.1s cubic-bezier(0.16,1,0.3,1), transform 1.1s cubic-bezier(0.16,1,0.3,1)';
        imageRef.current.style.opacity = '1';
        imageRef.current.style.transform = 'translateX(0)';
      }, 200);
    }
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-background pt-16 lg:pt-20">
      
      {/* Animated background blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute blob-primary animate-blob"
          style={{ width: '600px', height: '600px', top: '-100px', left: '-150px' }} />
        
        <div
          className="absolute blob-secondary animate-blob"
          style={{
            width: '400px',
            height: '400px',
            bottom: '0',
            right: '-100px',
            animationDelay: '4s'
          }} />
        
        <div
          className="absolute"
          style={{
            width: '300px',
            height: '300px',
            top: '40%',
            left: '40%',
            background: 'radial-gradient(ellipse, #F0954D 0%, transparent 70%)',
            filter: 'blur(60px)',
            opacity: '0.06'
          }} />
        
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Text */}
          <div className="space-y-8 relative z-10">
            {/* Badge */}
            <div ref={badgeRef}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/8 backdrop-blur-sm">
                <span className="flex h-2 w-2 rounded-full bg-primary animate-ping" />
                <span className="text-xs font-bold tracking-widest uppercase text-primary">
                  New Collection 2026
                </span>
              </div>
            </div>

            {/* Headline */}
            <div ref={headlineRef}>
              <h1 className="text-hero-xl font-bold text-foreground">
                Move in
                <br />
                <span className="font-serif italic text-primary">style.</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-lg">
                Handcrafted for those who refuse to stand still. Premium sneakers
                built for life at full speed — from studio to street.
              </p>
            </div>

            {/* CTAs */}
            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/collections"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-primary text-primary-foreground font-bold text-base hover:bg-accent transition-all duration-300 shadow-lg group"
                style={{ boxShadow: '0 8px 32px rgba(224,123,57,0.25)' }}>
                
                Shop Collection
                <ArrowRightIcon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl border border-border bg-card/60 backdrop-blur-sm font-bold text-base text-foreground hover:bg-muted transition-all duration-300">
                
                Our Story
              </Link>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-4 pt-2">
              <div className="flex -space-x-2">
                {[
                'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
                'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop&crop=face',
                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&h=40&fit=crop&crop=face',
                'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=40&h=40&fit=crop&crop=face']?.
                map((src, i) =>
                <div
                  key={i}
                  className="w-8 h-8 rounded-full overflow-hidden border-2 border-card">
                  
                    <AppImage
                    src={src}
                    alt={`Happy Sneakers customer ${i + 1}`}
                    width={32}
                    height={32}
                    className="object-cover w-full h-full" />
                  
                  </div>
                )}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 })?.map((_, i) =>
                  <StarIcon key={i} className="w-3.5 h-3.5 text-primary" />
                  )}
                </div>
                <p className="text-xs text-muted-foreground font-medium mt-0.5">
                  Loved by <strong className="text-foreground">12,400+</strong> sneaker fans
                </p>
              </div>
            </div>
          </div>

          {/* Right: Image */}
          <div ref={imageRef} className="relative z-10">
            {/* Spinning ring */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div
                className="w-full h-full rounded-full border-2 border-dashed border-primary/20 animate-spin-slow"
                style={{ transform: 'scale(1.05)' }} />
              
            </div>

            {/* Main image */}
            <div className="relative aspect-square rounded-3xl overflow-hidden border border-border shadow-2xl group">
              <AppImage
                src="https://img.rocket.new/generatedImages/rocket_gen_img_11c25a2e8-1772814222399.png"
                alt="Air Nova Pro - premium orange and white sneaker on dark background, hero product shot"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-1000 group-hover:scale-105" />
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent" />

              {/* Floating glass card */}
              <div className="absolute bottom-6 left-6 right-6 glass rounded-2xl p-4 animate-float">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-serif italic text-primary text-xl">Air Nova Pro</p>
                    <p className="font-bold text-foreground text-sm mt-0.5">
                      Limited Edition 2026
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground line-through">$250</p>
                    <p className="font-bold text-xl text-foreground">$125</p>
                    <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                      50% OFF
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Side stat card */}
            <div className="absolute -right-4 top-1/3 glass rounded-2xl p-4 shadow-xl hidden xl:block">
              <p className="text-2xl font-bold text-foreground">2.8k</p>
              <p className="text-xs text-muted-foreground font-semibold mt-0.5">Reviews</p>
              <div className="flex items-center gap-0.5 mt-1">
                {Array.from({ length: 5 })?.map((_, i) =>
                <StarIcon key={i} className="w-3 h-3 text-primary" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);

}