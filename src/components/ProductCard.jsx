import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { ShoppingCart, Check } from 'lucide-react';
import { Badge } from './ui/badge';
import { useCart } from '../contexts/CartContext';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    const [isAdding, setIsAdding] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    // Calculate percentage off if original price exists
    const discount = product.originalPrice
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : 0;

    const handleAddToCart = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (isAdding) return;

        setIsAdding(true);
        const result = await addToCart(product._id, 1);
        setIsAdding(false);

        if (result.success) {
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 2000);
        }
    };

    return (
        <Card className="group border-none shadow-none hover:shadow-xl transition-all duration-300 overflow-hidden">
            <Link to={`/product/${product._id}`} className="block relative">
                {product.originalPrice && (
                    <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600 text-white border-0 z-10 px-2 py-1">
                        {discount}% OFF
                    </Badge>
                )}
                <div className="aspect-[4/3] overflow-hidden bg-gray-50 relative">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Quick Add Overlay */}
                    <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex justify-center">
                        <Button
                            onClick={handleAddToCart}
                            disabled={isAdding || !product.inStock}
                            className={`w-full backdrop-blur-sm text-white shadow-lg ${showSuccess
                                ? 'bg-green-600 hover:bg-green-600'
                                : 'bg-gray-900/90 hover:bg-gray-900'
                                }`}
                        >
                            {isAdding ? (
                                <>
                                    <div className="h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Adding...
                                </>
                            ) : showSuccess ? (
                                <>
                                    <Check className="h-4 w-4 mr-2" />
                                    Added to Cart!
                                </>
                            ) : (
                                <>
                                    <ShoppingCart className="h-4 w-4 mr-2" />
                                    {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </Link>
            <CardContent className="pt-4 px-2">
                <p className="text-xs font-medium text-gray-500 mb-1">{product.brand}</p>
                <Link to={`/product/${product._id}`}>
                    <h3 className="font-medium text-gray-900 mb-2 truncate group-hover:text-blue-600 transition-colors">
                        {product.name}
                    </h3>
                </Link>
                <div className="flex items-baseline space-x-2">
                    <span className="text-lg font-bold text-gray-900">₹{product.price}</span>
                    {product.originalPrice && (
                        <span className="text-sm text-gray-400 line-through">₹{product.originalPrice}</span>
                    )}
                    {product.originalPrice && (
                        <span className="text-xs font-medium text-green-600">Save ₹{product.originalPrice - product.price}</span>
                    )}
                </div>
                {/* Rating - optional */}
                <div className="flex items-center mt-2">
                    <div className="flex text-yellow-400 text-xs">
                        {'★'.repeat(Math.round(product.rating || 4))}
                        <span className="text-gray-300">{'★'.repeat(5 - Math.round(product.rating || 4))}</span>
                    </div>
                    <span className="text-xs text-gray-500 ml-1">
                        ({Array.isArray(product.reviews) ? product.reviews.length : (product.reviewCount || 0)})
                    </span>
                </div>
            </CardContent>
        </Card>
    );
};

export default ProductCard;
