import { Product } from "./types";

export async function getProducts(): Promise<Product[]> {
    const res = await fetch('https://fakestoreapi.com/products');
    if (!res.ok) throw new Error('Failed to fetch products');
    return res.json();
}

export async function getProduct(id: string): Promise<Product> {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);
    if (!res.ok) throw new Error('Failed to fetch product');
    return res.json();
}

export async function getCategories(): Promise<string[]> {
    const res = await fetch('https://fakestoreapi.com/products/categories');
    if (!res.ok) throw new Error('Failed to fetch categories');
    return res.json();
}