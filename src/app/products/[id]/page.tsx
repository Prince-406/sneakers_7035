import React from 'react';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductDetailClient from './components/ProductDetailClient';
import RelatedProducts from './components/RelatedProducts';
import { getProductById, getRelatedProducts } from '@/lib/products';

interface ProductPageProps {
  params: { id: string };
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductById(params.id);
  if (!product) notFound();
  const related = getRelatedProducts(product.id, 4);

  return (
    <>
      <Navbar />
      <main className="pt-16 lg:pt-20 bg-background min-h-screen">
        <ProductDetailClient product={product} />
        <RelatedProducts products={related} />
      </main>
      <Footer />
    </>
  );
}

export function generateStaticParams() {
  const { products } = require('@/lib/products');
  return (products as { id: string }[]).map((p) => ({ id: p.id }));
}