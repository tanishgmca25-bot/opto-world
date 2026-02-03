import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from './contexts/CartContext';
import { Button } from './components/ui/button';
import { Card, CardContent } from './components/ui/card';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';

const Cart = () => {
    const { cart, loading, updateQuantity, removeFromCart, getCartTotal, isLoggedIn } = useCart();

    if (!isLoggedIn) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
                <Card className="max-w-md w-full text-center p-8">
                    <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Login Required</h2>
                    <p className="text-gray-600 mb-6">
                        Please login to view your shopping cart.
                    </p>
                    <Link to="/login">
                        <Button className="w-full">
                            Login to Continue
                        </Button>
                    </Link>
                </Card>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading cart...</p>
                </div>
            </div>
        );
    }

    const cartItems = cart?.items || [];
    const isEmpty = cartItems.length === 0;

    const handleQuantityChange = async (productId, newQuantity, maxStock) => {
        if (newQuantity < 1) return;
        if (newQuantity > maxStock) {
            alert(`Cannot add more items. Only ${maxStock} available in stock.`);
            return;
        }
        await updateQuantity(productId, newQuantity);
    };

    const handleRemove = async (productId) => {
        await removeFromCart(productId);
    };

    if (isEmpty) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
                <Card className="max-w-md w-full text-center p-8">
                    <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Cart is Empty</h2>
                    <p className="text-gray-600 mb-6">
                        Looks like you haven't added any items to your cart yet.
                    </p>
                    <Link to="/products">
                        <Button className="w-full">
                            Continue Shopping
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
                    <p className="text-gray-600">{cart.totalItems} items in your cart</p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {cartItems.map((item) => (
                            <Card key={item.product._id} className="overflow-hidden">
                                <CardContent className="p-4">
                                    <div className="flex gap-4">
                                        {/* Product Image */}
                                        <Link to={`/product/${item.product._id}`} className="flex-shrink-0">
                                            <img
                                                src={item.product.image}
                                                alt={item.product.name}
                                                className="w-24 h-24 object-cover rounded-lg"
                                            />
                                        </Link>

                                        {/* Product Details */}
                                        <div className="flex-1 min-w-0">
                                            <Link to={`/product/${item.product._id}`}>
                                                <h3 className="font-semibold text-gray-900 hover:text-blue-600 transition-colors truncate">
                                                    {item.product.name}
                                                </h3>
                                            </Link>
                                            <p className="text-sm text-gray-500 mt-1">{item.product.brand}</p>
                                            <p className="text-sm text-gray-500">
                                                {item.product.color} • {item.product.frameType}
                                            </p>
                                            <div className="mt-2">
                                                <p className="text-lg font-bold text-gray-900">₹{item.price}</p>
                                            </div>
                                        </div>

                                        {/* Quantity Controls */}
                                        <div className="flex flex-col items-end justify-between">
                                            <button
                                                onClick={() => handleRemove(item.product._id)}
                                                className="text-red-500 hover:text-red-600 transition-colors p-1"
                                                title="Remove item"
                                            >
                                                <Trash2 className="h-5 w-5" />
                                            </button>

                                            <div className="flex items-center space-x-2 border border-gray-200 rounded-lg">
                                                <button
                                                    onClick={() => handleQuantityChange(item.product._id, item.quantity - 1, item.product.stock)}
                                                    disabled={item.quantity <= 1}
                                                    className="p-2 hover:bg-gray-100 rounded-l-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    <Minus className="h-4 w-4" />
                                                </button>
                                                <span className="px-4 font-medium">{item.quantity}</span>
                                                <button
                                                    onClick={() => handleQuantityChange(item.product._id, item.quantity + 1, item.product.stock)}
                                                    disabled={item.quantity >= item.product.stock}
                                                    className="p-2 hover:bg-gray-100 rounded-r-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                                    title={item.quantity >= item.product.stock ? `Max stock: ${item.product.stock}` : ''}
                                                >
                                                    <Plus className="h-4 w-4" />
                                                </button>
                                            </div>

                                            {/* Stock availability */}
                                            <p className="text-xs text-gray-500 mt-1">
                                                {item.product.stock > 0 ? `${item.product.stock} available` : 'Out of stock'}
                                            </p>

                                            <p className="text-sm font-semibold text-gray-700">
                                                ₹{(item.price * item.quantity).toFixed(2)}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <Card className="sticky top-24">
                            <CardContent className="p-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>

                                <div className="space-y-3 mb-4 pb-4 border-b border-gray-200">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Subtotal ({cart.totalItems} items)</span>
                                        <span>₹{getCartTotal().toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Shipping</span>
                                        <span className="text-green-600 font-medium">FREE</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Tax (estimated)</span>
                                        <span>₹{(getCartTotal() * 0.18).toFixed(2)}</span>
                                    </div>
                                </div>

                                <div className="flex justify-between text-lg font-bold text-gray-900 mb-6">
                                    <span>Total</span>
                                    <span>₹{(getCartTotal() * 1.18).toFixed(2)}</span>
                                </div>

                                <Button className="w-full mb-3">
                                    Proceed to Checkout
                                </Button>

                                <Link to="/products">
                                    <Button variant="outline" className="w-full">
                                        Continue Shopping
                                    </Button>
                                </Link>

                                {/* Additional Info */}
                                <div className="mt-6 pt-6 border-t border-gray-200">
                                    <div className="flex items-start space-x-2 text-sm text-gray-600">
                                        <ShoppingBag className="h-5 w-5 flex-shrink-0 mt-0.5" />
                                        <p>Free shipping on all orders. Estimated delivery in 3-5 business days.</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
