'use client';

import React, { useEffect, useRef } from 'react';
import { TruckIcon, ArrowPathIcon, ShieldCheckIcon, SparklesIcon } from '@heroicons/react/24/outline';
import Icon from '@/components/ui/AppIcon';


const stats = [
  { icon: TruckIcon, label: 'Free Shipping', sub: 'On orders over $50' },
  { icon: ArrowPathIcon, label: '30-Day Returns', sub: 'No questions asked' },
  { icon: ShieldCheckIcon, label: '2-Year Warranty', sub: 'On all footwear' },
  { icon: SparklesIcon, label: 'Premium Quality', sub: 'Crafted to last' },
];

export default function StatsStrip() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.querySelectorAll('.stat-item').forEach((item, i) => {
            const htmlItem = item as HTMLElement;
            htmlItem.style.transitionDelay = `${i * 80}ms`;
            htmlItem.classList.add('animate-fade-in-up');
          });
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="border-y border-border bg-card py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x lg:divide-border">
          {stats.map(({ icon: Icon, label, sub }, i) => (
            <div
              key={i}
              className="stat-item opacity-100 flex flex-col sm:flex-row items-center sm:items-start gap-3 lg:px-8 first:pl-0 last:pr-0"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 shrink-0">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <div className="text-center sm:text-left">
                <p className="font-bold text-sm text-foreground">{label}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}