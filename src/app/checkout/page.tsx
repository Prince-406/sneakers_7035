import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CheckoutClient from './components/CheckoutClient';

export default function CheckoutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16 lg:pt-20 bg-background min-h-screen">
        <CheckoutClient />
      </main>
      <Footer />
    </>
  );
}