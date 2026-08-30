import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GenderCatalog from '../components/GenderCatalog';
import { getWomensProducts } from '@/lib/products';

export default function WomenPage() {
  const products = getWomensProducts();
  return (
    <>
      <Navbar />
      <main className="pt-16 lg:pt-20 bg-background min-h-screen">
        <GenderCatalog
          products={products}
          gender="Women's"
          description="Crafted for style and motion. Every step is a statement."
          heroImage="https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=1400&auto=format&fit=crop&q=80"
          heroAlt="Women's premium sneakers collection - pink athletic shoes in bright airy studio with warm natural lighting"
        />
      </main>
      <Footer />
    </>
  );
}