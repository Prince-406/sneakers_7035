import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from './components/HeroSection';
import StatsStrip from './components/StatsStrip';
import FeaturedSection from './components/FeaturedSection';
import SplitCategorySection from './components/SplitCategorySection';
import CTABanner from './components/CTABanner';
import { getFeaturedProducts, getMensProducts, getWomensProducts } from '@/lib/products';

export default function HomePage() {
  const featured = getFeaturedProducts();
  const mens = getMensProducts()?.slice(0, 2);
  const womens = getWomensProducts()?.slice(0, 2);

  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <StatsStrip />
        <FeaturedSection products={featured} />
        <SplitCategorySection mens={mens} womens={womens} />
        <CTABanner />
      </main>
      <Footer />
    </>
  );
}