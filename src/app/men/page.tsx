import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GenderCatalog from '../components/GenderCatalog';
import { getMensProducts } from '@/lib/products';

export default function MenPage() {
  const products = getMensProducts();
  return (
    <>
      <Navbar />
      <main className="pt-16 lg:pt-20 bg-background min-h-screen">
        <GenderCatalog
          products={products}
          gender="Men's"
          description="Performance-engineered and street-ready. Built for the man who moves with purpose."
          heroImage="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1400&auto=format&fit=crop&q=80"
          heroAlt="Men's premium sneakers collection - white athletic shoes with orange accent on dark moody background"
        />
      </main>
      <Footer />
    </>
  );
}