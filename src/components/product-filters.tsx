import { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { FilterState, SortOption } from '@/lib/types';

interface ProductFiltersProps {
    categories: string[];
    filters: FilterState;
    onFilterChange: (newFilters: FilterState) => void;
    maxPrice: number;
}

export function ProductFilters({ categories, filters, onFilterChange, maxPrice }: ProductFiltersProps) {
    const [priceRange, setPriceRange] = useState([filters.minPrice, filters.maxPrice]);

    const handlePriceChange = (newValues: number[]) => {
        setPriceRange(newValues);
        onFilterChange({ ...filters, minPrice: newValues[0], maxPrice: newValues[1] });
    };

    return (
        <div className="mb-6 flex gap-3">
            <Input
                type="text"
                placeholder="Search products..."
                value={filters.search}
                onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
                className="mb-4 flex-grow-1"
            />
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline" className="">Open Filters</Button>
                </SheetTrigger>
                <SheetContent className="p-6 space-y-4">
                    <h2 className="text-lg font-semibold">Filter Products</h2>
                    <Select
                        onValueChange={(value) => onFilterChange({ ...filters, category: value !== "all" ? value : "" })}
                        defaultValue={filters.category || 'all'}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Categories</SelectItem>
                            {categories.map((category) => (
                                <SelectItem key={category} value={category}>
                                    {category}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">Price Range</p>
                        <Slider
                            min={0}
                            max={maxPrice}
                            step={1}
                            value={priceRange}
                            onValueChange={handlePriceChange}
                            className="mt-2"
                        />
                        <div className="flex justify-between text-sm text-muted-foreground mt-2">
                            <span>${priceRange[0]}</span>
                            <span>${priceRange[1]}</span>
                        </div>
                    </div>
                    <Select
                        onValueChange={(value: SortOption) => onFilterChange({ ...filters, sort: value })}
                        defaultValue={filters.sort}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="price-asc">Price: Low to High</SelectItem>
                            <SelectItem value="price-desc">Price: High to Low</SelectItem>
                            <SelectItem value="rating-desc">Rating: High to Low</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => onFilterChange({ search: '', category: '', minPrice: 0, maxPrice, sort: 'price-asc' })}
                    >
                        Reset Filters
                    </Button>
                </SheetContent>
            </Sheet>
        </div>
    );
}
