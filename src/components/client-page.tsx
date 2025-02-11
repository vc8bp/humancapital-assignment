'use client';

import { useState } from 'react';
import { FilterState, Product } from '@/lib/types';
import { ProductFilters } from '@/components/product-filters';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import Image from 'next/image';
import { Star } from 'lucide-react';
import Link from 'next/link';

interface ClientPageProps {
    products: Product[];
    categories: string[];
    maxPrice: number;
}

export function ClientPage({ products, categories, maxPrice }: ClientPageProps) {
    const [filters, setFilters] = useState<FilterState>({
        search: '',
        category: '',
        minPrice: 0,
        maxPrice: maxPrice,
        sort: 'price-asc',
    });

    const filteredProducts = products
        .filter((product) => {
            const matchesSearch = product.title.toLowerCase().includes(filters.search.toLowerCase());
            const matchesCategory = !filters.category || product.category === filters.category;
            const matchesPrice = product.price >= filters.minPrice && product.price <= filters.maxPrice;
            return matchesSearch && matchesCategory && matchesPrice;
        })
        .sort((a, b) => {
            switch (filters.sort) {
                case 'price-asc':
                    return a.price - b.price;
                case 'price-desc':
                    return b.price - a.price;
                case 'rating-desc':
                    return b.rating.rate - a.rating.rate;
                default:
                    return 0;
            }
        });

    return (
        <>
            <ProductFilters
                categories={categories}
                filters={filters}
                onFilterChange={setFilters}
                maxPrice={maxPrice}
            />
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredProducts.map((product) => (
                    <Link href={`/product/${product.id}`} key={product.id}>
                        <Card className="h-full transition-all hover:shadow-lg">
                            <CardHeader className="p-4">
                                <div className="w-full relative pt-[100%]">
                                    <Image
                                        src={product.image}
                                        alt={product.title}
                                        objectFit="cover"
                                        fill
                                        className="w-full h-full top-0 left-0 object-cover rounded-2xl"
                                    />
                                </div>
                            </CardHeader>
                            <CardContent className="p-4 pt-0">
                                <h3 className="line-clamp-2 text-lg font-semibold">{product.title}</h3>
                                <p className="mt-2 text-2xl font-bold">${product.price.toFixed(2)}</p>
                                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                                    {product.description}
                                </p>
                            </CardContent>
                            <CardFooter className="p-4 pt-0">
                                <div className="flex items-center gap-2">
                                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                    <span className="text-sm font-medium">
                                        {product.rating.rate} ({product.rating.count} reviews)
                                    </span>
                                </div>
                            </CardFooter>
                        </Card>
                    </Link>
                ))}
            </div>
            {filteredProducts.length === 0 && (
                <div className="mt-8 text-center text-muted-foreground">
                    No products found matching your criteria.
                </div>
            )}
        </>
    );
}