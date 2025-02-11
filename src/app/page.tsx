import { getCategories, getProducts } from '@/lib/api';
import { Suspense } from 'react';
import { ClientPage } from '@/components/client-page';

export const revalidate = 3600;

export default async function Home() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  const maxPrice = Math.max(...products.map((p) => p.price));

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-4xl font-bold">Product Catalog</h1>
      <Suspense fallback={<div>Loading filters...</div>}>
        <ClientPage products={products} categories={categories} maxPrice={maxPrice} />
      </Suspense>
    </main>
  );
}