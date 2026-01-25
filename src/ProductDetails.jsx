import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from './components/ui/button';

import { Badge } from './components/ui/badge';
import { mockProducts } from './mock/mockData';
import { Star, Truck, Shield, RotateCcw, Plus, Minus, ShoppingCart, Heart } from 'lucide-react';

const ProductDetails = () => {
    const { id } = useParams();
    const product = mockProducts.find(p => p.id === id) || mockProducts[0];
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);

    const images = product.images || [product.image];

    // Calculate discount
    const discount = product.originalPrice
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : 0;

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="grid md:grid-cols-2 gap-0">
                        {/* Image Gallery */}
                        <div className="p-8 bg-gray-50/50">
                            <div className="relative aspect-square rounded-2xl overflow-hidden bg-white mb-6 p-8 flex items-center justify-center border border-gray-100">
                                {discount > 0 && (
                                    <Badge className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 text-sm">
                                        {discount}% OFF
                                    </Badge>
                                )}
                                <img
                                    src={images[selectedImage]}
                                    alt={product.name}
                                    className="max-w-full max-h-full object-contain mix-blend-multiply hover:scale-110 transition-transform duration-500"
                                />
                            </div>
                            <div className="grid grid-cols-4 gap-4">
                                {images.map((img, index) => (
                                    <div
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        className={`aspect-square rounded-xl bg-white p-2 border cursor-pointer transition-all ${selectedImage === index
                                            ? 'border-blue-600 ring-2 ring-blue-100'
                                            : 'border-gray-200 hover:border-blue-300'
                                            }`}
                                    >
                                        <img
                                            src={img}
                                            alt={`${product.name} ${index + 1}`}
                                            className="w-full h-full object-contain mix-blend-multiply"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Product Info */}
                        <div className="p-8 md:p-12 flex flex-col h-full bg-white">
                            <div className="flex-1">
                                <div className="flex items-center space-x-2 text-sm text-blue-600 font-medium mb-2">
                                    <span className="uppercase">{product.brand}</span>
                                    <span>•</span>
                                    <span className="capitalize">{product.category}</span>
                                </div>
                                <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>

                                <div className="flex items-center space-x-4 mb-6">
                                    <div className="flex">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`h-5 w-5 ${i < Math.round(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-gray-500 text-sm">
                                        {product.rating} ({product.reviews} reviews)
                                    </span>
                                </div>

                                <div className="flex items-baseline space-x-4 mb-8">
                                    <span className="text-4xl font-bold text-gray-900">₹{product.price}</span>
                                    {product.originalPrice && (
                                        <>
                                            <span className="text-xl text-gray-400 line-through">₹{product.originalPrice}</span>
                                            <span className="text-green-600 font-medium bg-green-50 px-2 py-1 rounded">
                                                Save ₹{product.originalPrice - product.price}
                                            </span>
                                        </>
                                    )}
                                </div>

                                <p className="text-gray-600 leading-relaxed mb-8 border-b border-gray-100 pb-8">
                                    {product.description}
                                </p>

                                <div className="grid grid-cols-2 gap-y-4 text-sm mb-8">
                                    <div>
                                        <span className="text-gray-500 block">Frame Type</span>
                                        <span className="font-medium capitalize">{product.frameType}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-500 block">Material</span>
                                        <span className="font-medium capitalize">{product.material}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-500 block">Color</span>
                                        <span className="font-medium capitalize">{product.color}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-500 block">Availability</span>
                                        <span className={`font-medium ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                                            {product.inStock ? 'In Stock' : 'Out of Stock'}
                                        </span>
                                    </div>
                                </div>

                                <div className="mb-8">
                                    <h3 className="font-semibold mb-3">Key Features</h3>
                                    <ul className="grid grid-cols-2 gap-2">
                                        {product.features.map((feature, index) => (
                                            <li key={index} className="flex items-center text-sm text-gray-600">
                                                <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mr-2"></div>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="space-y-4 pt-4 border-t border-gray-100">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="font-medium text-gray-700">Quantity</span>
                                    <div className="flex items-center border border-gray-200 rounded-md">
                                        <button
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            className="p-2 hover:bg-gray-100 text-gray-600"
                                        >
                                            <Minus className="h-4 w-4" />
                                        </button>
                                        <span className="w-12 text-center font-medium">{quantity}</span>
                                        <button
                                            onClick={() => setQuantity(quantity + 1)}
                                            className="p-2 hover:bg-gray-100 text-gray-600"
                                        >
                                            <Plus className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <Button size="lg" className="flex-1 bg-gray-900 hover:bg-black h-14 text-lg">
                                        <ShoppingCart className="mr-2 h-5 w-5" />
                                        Add to Cart
                                    </Button>
                                    <Button size="lg" variant="outline" className="h-14 px-4 border-gray-300">
                                        <Heart className="h-6 w-6 text-gray-600" />
                                    </Button>
                                </div>

                                <div className="grid grid-cols-3 gap-4 pt-6 text-center text-xs text-gray-500">
                                    <div className="flex flex-col items-center">
                                        <Shield className="h-5 w-5 mb-1 text-gray-400" />
                                        <span>2 Year Warranty</span>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <RotateCcw className="h-5 w-5 mb-1 text-gray-400" />
                                        <span>30 Day Returns</span>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <Truck className="h-5 w-5 mb-1 text-gray-400" />
                                        <span>Free Shipping</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
