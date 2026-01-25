import React, { useState } from 'react';
import ProductCard from './components/ProductCard';
import { Button } from './components/ui/button';
import { Checkbox } from './components/ui/checkbox';
import { Label } from './components/ui/label';
import { Slider } from './components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';
import { mockProducts, brands, colors, frameTypes } from './mock/mockData';
import { Filter, X } from 'lucide-react';

const Products = () => {
    // State for filters
    const [priceRange, setPriceRange] = useState([0, 5000]);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [selectedColors, setSelectedColors] = useState([]);
    const [selectedFrameTypes, setSelectedFrameTypes] = useState([]);
    const [showMobileFilters, setShowMobileFilters] = useState(false);
    const [sortBy, setSortBy] = useState('featured');

    // Handle filter changes
    const toggleFilter = (item, selected, setSelected) => {
        if (selected.includes(item)) {
            setSelected(selected.filter(i => i !== item));
        } else {
            setSelected([...selected, item]);
        }
    };

    // Filter products
    const filteredProducts = mockProducts.filter(product => {
        const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
        const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
        const matchesColor = selectedColors.length === 0 || selectedColors.includes(product.color);
        const matchesFrameType = selectedFrameTypes.length === 0 || selectedFrameTypes.includes(product.frameType);
        return matchesPrice && matchesBrand && matchesColor && matchesFrameType;
    });

    // Sort products
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0; // Featured/Default
    });

    return (
        <div className="bg-gray-50 min-h-screen pb-20">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 mb-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 text-center md:text-left">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Our Collection</h1>
                    <p className="text-gray-600">Explore our wide range of premium eyewear</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Mobile Filter Button */}
                    <div className="md:hidden">
                        <Button onClick={() => setShowMobileFilters(true)} className="w-full flex items-center justify-center">
                            <Filter className="mr-2 h-4 w-4" /> Filters
                        </Button>
                    </div>

                    {/* Sidebar Filters */}
                    <div className={`md:w-64 flex-shrink-0 ${showMobileFilters ? 'fixed inset-0 z-50 bg-white p-6 overflow-y-auto' : 'hidden md:block'}`}>
                        {/* Mobile Header */}
                        <div className="md:hidden flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold">Filters</h2>
                            <Button variant="ghost" size="sm" onClick={() => setShowMobileFilters(false)}>
                                <X className="h-5 w-5" />
                            </Button>
                        </div>

                        <div className="space-y-8 bg-white md:bg-transparent rounded-lg">
                            {/* Price Range */}
                            <div>
                                <h3 className="font-semibold mb-4">Price Range</h3>
                                <Slider
                                    min={0}
                                    max={10000}
                                    step={100}
                                    value={priceRange}
                                    onValueChange={setPriceRange}
                                    className="mb-2"
                                />
                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>₹{priceRange[0]}</span>
                                    <span>₹{priceRange[1]}</span>
                                </div>
                            </div>

                            {/* Brands */}
                            <div>
                                <h3 className="font-semibold mb-4">Brand</h3>
                                <div className="space-y-3">
                                    {brands.map(brand => (
                                        <div key={brand} className="flex items-center space-x-2">
                                            <Checkbox
                                                id={`brand-${brand}`}
                                                checked={selectedBrands.includes(brand)}
                                                onChange={() => toggleFilter(brand, selectedBrands, setSelectedBrands)}
                                            />
                                            <Label htmlFor={`brand-${brand}`} className="text-sm font-normal cursor-pointer">
                                                {brand}
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Frame Type */}
                            <div>
                                <h3 className="font-semibold mb-4">Frame Type</h3>
                                <div className="space-y-3">
                                    {frameTypes.map(type => (
                                        <div key={type} className="flex items-center space-x-2">
                                            <Checkbox
                                                id={`type-${type}`}
                                                checked={selectedFrameTypes.includes(type)}
                                                onChange={() => toggleFilter(type, selectedFrameTypes, setSelectedFrameTypes)}
                                            />
                                            <Label htmlFor={`type-${type}`} className="text-sm font-normal cursor-pointer capitalize">
                                                {type.replace('-', ' ')}
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Colors */}
                            <div>
                                <h3 className="font-semibold mb-4">Color</h3>
                                <div className="space-y-3">
                                    {colors.map(color => (
                                        <div key={color} className="flex items-center space-x-2">
                                            <Checkbox
                                                id={`color-${color}`}
                                                checked={selectedColors.includes(color)}
                                                onChange={() => toggleFilter(color, selectedColors, setSelectedColors)}
                                            />
                                            <div className={`w-4 h-4 rounded-full border border-gray-300`} style={{ backgroundColor: color }}></div>
                                            <Label htmlFor={`color-${color}`} className="text-sm font-normal cursor-pointer capitalize">
                                                {color}
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Product Grid */}
                    <div className="flex-1">
                        {/* Toolbar */}
                        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
                            <p className="text-gray-500 mb-4 sm:mb-0">
                                Showing <span className="font-semibold text-gray-900">{sortedProducts.length}</span> products
                            </p>
                            <div className="flex items-center space-x-4">
                                <span className="text-sm text-gray-500">Sort by:</span>
                                <div className="w-48">
                                    <Select value={sortBy} onValueChange={setSortBy}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Featured" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="featured">Featured</SelectItem>
                                            <SelectItem value="price-low">Price: Low to High</SelectItem>
                                            <SelectItem value="price-high">Price: High to Low</SelectItem>
                                            <SelectItem value="rating">Top Rated</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>

                        {/* Grid */}
                        {sortedProducts.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {sortedProducts.map(product => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-white rounded-lg border border-dashed border-gray-300">
                                <p className="text-lg text-gray-500">No products found matching your filters.</p>
                                <Button
                                    variant="link"
                                    onClick={() => {
                                        setPriceRange([0, 10000]);
                                        setSelectedBrands([]);
                                        setSelectedColors([]);
                                        setSelectedFrameTypes([]);
                                    }}
                                    className="mt-2 text-blue-600"
                                >
                                    Clear all filters
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Products;
