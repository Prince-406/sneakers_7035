import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CollectionsClient from './components/CollectionsClient';
import { products } from '@/lib/products';

export default function CollectionsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16 lg:pt-20 bg-background min-h-screen">
        <CollectionsClient products={products} />
      </main>
      <Footer />
    </>
  );
}