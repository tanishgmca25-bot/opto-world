import React, { createContext, useState, useContext, useEffect } from 'react';
import { cartAPI } from '../services/api';
import { useNavigate } from 'react-router-dom';

const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Check if user is logged in
    const isLoggedIn = () => {
        return !!localStorage.getItem('token');
    };

    // Fetch cart on mount and when user logs in
    useEffect(() => {
        if (isLoggedIn()) {
            fetchCart();
        } else {
            setCart(null);
            setLoading(false);
        }

        // Listen for login status changes
        const handleLoginChange = () => {
            if (isLoggedIn()) {
                fetchCart();
            } else {
                setCart(null);
            }
        };

        window.addEventListener('loginStatusChanged', handleLoginChange);
        return () => window.removeEventListener('loginStatusChanged', handleLoginChange);
    }, []);

    const fetchCart = async () => {
        try {
            setLoading(true);
            const response = await cartAPI.getCart();
            if (response.success) {
                setCart(response.cart);
            }
        } catch (error) {
            console.error('Error fetching cart:', error);
        } finally {
            setLoading(false);
        }
    };

    const addToCart = async (productId, quantity = 1) => {
        if (!isLoggedIn()) {
            // Redirect to login if not logged in
            navigate('/login', { state: { from: window.location.pathname } });
            return { success: false, message: 'Please login to add items to cart' };
        }

        try {
            const response = await cartAPI.addToCart(productId, quantity);
            if (response.success) {
                setCart(response.cart);
                return { success: true, message: 'Product added to cart!' };
            }
            return { success: false, message: response.message || 'Failed to add to cart' };
        } catch (error) {
            console.error('Error adding to cart:', error);
            return { success: false, message: 'Failed to add to cart' };
        }
    };

    const updateQuantity = async (productId, quantity) => {
        if (!isLoggedIn()) {
            navigate('/login');
            return { success: false };
        }

        try {
            const response = await cartAPI.updateItem(productId, quantity);
            if (response.success) {
                setCart(response.cart);
                return { success: true };
            }
            return { success: false };
        } catch (error) {
            console.error('Error updating cart:', error);
            return { success: false };
        }
    };

    const removeFromCart = async (productId) => {
        if (!isLoggedIn()) {
            navigate('/login');
            return { success: false };
        }

        try {
            const response = await cartAPI.removeItem(productId);
            if (response.success) {
                setCart(response.cart);
                return { success: true, message: 'Product removed from cart' };
            }
            return { success: false };
        } catch (error) {
            console.error('Error removing from cart:', error);
            return { success: false };
        }
    };

    const clearCart = async () => {
        if (!isLoggedIn()) {
            return { success: false };
        }

        try {
            const response = await cartAPI.clearCart();
            if (response.success) {
                setCart(response.cart);
                return { success: true };
            }
            return { success: false };
        } catch (error) {
            console.error('Error clearing cart:', error);
            return { success: false };
        }
    };

    const getCartCount = () => {
        return cart?.totalItems || 0;
    };

    const getCartTotal = () => {
        return cart?.totalPrice || 0;
    };

    const value = {
        cart,
        loading,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        fetchCart,
        getCartCount,
        getCartTotal,
        isLoggedIn: isLoggedIn()
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
