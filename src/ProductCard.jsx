import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';

const ProductCard = ({ product }) => {
    const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

    const addToCart = (e) => {
        e.preventDefault();
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const existingItem = cart.find(item => item.id === product.id);

        if (!existingItem) {
            cart.push({ ...product, quantity: 1 });
            localStorage.setItem('cart', JSON.stringify(cart));
            alert('Added to cart!');
        } else {
            alert('Already in cart!');
        }
    };

    const toggleWishlist = (e) => {
        e.preventDefault();
        const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
        const index = wishlist.indexOf(product.id);

        if (index === -1) {
            wishlist.push(product.id);
            alert('Added to wishlist!');
        } else {
            wishlist.splice(index, 1);
            alert('Removed from wishlist!');
        }
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    };

    return (
        <Link to={`/products/${product.id}`}>
            <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-gray-200 h-full">
                <div className="relative overflow-hidden bg-gray-50">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {discount > 0 && (
                        <Badge className="absolute top-3 left-3 bg-red-500 hover:bg-red-600">
                            {discount}% OFF
                        </Badge>
                    )}
                    {!product.inStock && (
                        <Badge className="absolute top-3 right-3 bg-gray-600">
                            Out of Stock
                        </Badge>
                    )}
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                            onClick={toggleWishlist}
                            className="p-2 bg-white rounded-full shadow-lg hover:bg-red-50 transition-colors"
                        >
                            <Heart className="h-5 w-5 text-red-500" />
                        </button>
                    </div>
                </div>
                <CardContent className="p-4">
                    <div className="space-y-2">
                        <p className="text-sm text-gray-500 font-medium">{product.brand}</p>
                        <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                            {product.name}
                        </h3>
                        <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">{product.rating}</span>
                            <span className="text-sm text-gray-500">({product.reviews})</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="text-lg font-bold text-gray-900">₹{product.price}</span>
                            {product.originalPrice && (
                                <span className="text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
                            )}
                        </div>
                        <Button
                            onClick={addToCart}
                            className="w-full mt-2"
                            disabled={!product.inStock}
                        >
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
};

export default ProductCard;
