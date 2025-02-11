import { getProduct } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export const revalidate = 3600;

export default async function ProductPage({ params }: { params: Promise<{ id: string}>}) {
  const { id } = await params
  if(!id) return redirect("/")
  const product = await getProduct(id);

  return (
    <main className="container mx-auto px-6 py-10">
      <Link href="/" className="inline-block mb-6">
        <Button variant="ghost">← Back to Products</Button>
      </Link>

      <div className="grid gap-12 md:grid-cols-2">
        <div className="relative flex justify-center items-center max-w-lg overflow-hidden rounded-lg border bg-white p-6">
          <Image
            src={product.image}
            alt={product.title}
            width={400}
            height={400}
            className="object-cover"
            priority
          />
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-4xl font-semibold">{product.title}</h1>
            <p className="mt-2 text-lg text-gray-500">{product.category}</p>
          </div>

          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
            <span className="text-lg font-medium" aria-hidden="true">
              {product.rating.rate} ({product.rating.count} reviews)
            </span>
          </div>

          <p className="text-3xl font-bold text-gray-900">${product.price.toFixed(2)}</p>

          <p className="text-lg text-gray-500 leading-relaxed">{product.description}</p>

          <Button size="lg" className="mt-6 w-full md:w-auto">
            Add to Cart
          </Button>
        </div>
      </div>
    </main>
  );
}

export async function generateStaticParams() {
  const products = await fetch('https://fakestoreapi.com/products').then((res) =>
    res.json()
  );

  return products.map((product: { id: number }) => ({
    id: product.id.toString(),
  }));
}
