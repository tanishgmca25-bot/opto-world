import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { Button } from './components/ui/button';
import { Card, CardContent } from './components/ui/card';
import { useWishlist } from './contexts/WishlistContext';
import { useCart } from './contexts/CartContext';

const Wishlist = () => {
    const { wishlist, loading, removeFromWishlist } = useWishlist();
    const { addToCart } = useCart();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        }
    }, [navigate]);

    const handleRemove = async (productId) => {
        await removeFromWishlist(productId);
    };

    const handleAddToCart = async (product) => {
        const result = await addToCart(product._id, 1);
        if (result.success) {
            // Optionally remove from wishlist after adding to cart
            // await removeFromWishlist(product._id);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading wishlist...</p>
                </div>
            </div>
        );
    }

    const items = wishlist?.items || [];

    return (
        <div className="min-h-screen bg-gray-50 pb-12">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 mb-8">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex items-center space-x-3 mb-2">
                        <Heart className="h-8 w-8 text-red-500 fill-red-500" />
                        <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
                    </div>
                    <p className="text-gray-600">
                        {items.length} {items.length === 1 ? 'item' : 'items'} saved
                    </p>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {items.length === 0 ? (
                    <div className="text-center py-20">
                        <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Your wishlist is empty</h2>
                        <p className="text-gray-600 mb-6">Start adding products you love!</p>
                        <Link to="/products">
                            <Button className="bg-blue-600 hover:bg-blue-700">
                                Browse Products
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {items.map((product) => (
                            <Card key={product._id} className="group border-none shadow-none hover:shadow-xl transition-all duration-300 overflow-hidden">
                                <Link to={`/product/${product._id}`} className="block relative">
                                    <div className="aspect-[4/3] overflow-hidden bg-gray-50">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                </Link>
                                <CardContent className="pt-4 px-2">
                                    <p className="text-xs font-medium text-gray-500 mb-1">{product.brand}</p>
                                    <Link to={`/product/${product._id}`}>
                                        <h3 className="font-medium text-gray-900 mb-2 truncate group-hover:text-blue-600 transition-colors">
                                            {product.name}
                                        </h3>
                                    </Link>
                                    <div className="flex items-baseline space-x-2 mb-4">
                                        <span className="text-lg font-bold text-gray-900">₹{product.price}</span>
                                        {product.originalPrice && (
                                            <span className="text-sm text-gray-400 line-through">₹{product.originalPrice}</span>
                                        )}
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex space-x-2">
                                        <Button
                                            onClick={() => handleAddToCart(product)}
                                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                                            size="sm"
                                            disabled={!product.inStock}
                                        >
                                            <ShoppingCart className="h-4 w-4 mr-2" />
                                            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                                        </Button>
                                        <Button
                                            onClick={() => handleRemove(product._id)}
                                            variant="outline"
                                            size="sm"
                                            className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Wishlist;
