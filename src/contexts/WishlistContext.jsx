import React, { createContext, useContext, useState, useEffect } from 'react';
import { wishlistAPI } from '../services/api';

const WishlistContext = createContext();

export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (!context) {
        throw new Error('useWishlist must be used within WishlistProvider');
    }
    return context;
};

export const WishlistProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch wishlist on mount
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            fetchWishlist();
        } else {
            setLoading(false);
        }
    }, []);

    // Listen for login status changes
    useEffect(() => {
        const handleLoginChange = () => {
            const token = localStorage.getItem('token');
            if (token) {
                fetchWishlist();
            } else {
                setWishlist(null);
            }
        };

        window.addEventListener('loginStatusChanged', handleLoginChange);
        return () => window.removeEventListener('loginStatusChanged', handleLoginChange);
    }, []);

    const fetchWishlist = async () => {
        try {
            const response = await wishlistAPI.getAll();
            if (response.success) {
                setWishlist(response.wishlist);
            }
        } catch (error) {
            console.error('Error fetching wishlist:', error);
        } finally {
            setLoading(false);
        }
    };

    const addToWishlist = async (productId) => {
        try {
            const response = await wishlistAPI.add(productId);
            if (response.success) {
                setWishlist(response.wishlist);
                return { success: true, message: 'Added to wishlist' };
            }
            return { success: false, message: response.message || 'Failed to add to wishlist' };
        } catch (error) {
            console.error('Error adding to wishlist:', error);
            return { success: false, message: 'Error adding to wishlist' };
        }
    };

    const removeFromWishlist = async (productId) => {
        try {
            const response = await wishlistAPI.remove(productId);
            if (response.success) {
                setWishlist(response.wishlist);
                return { success: true, message: 'Removed from wishlist' };
            }
            return { success: false, message: response.message || 'Failed to remove from wishlist' };
        } catch (error) {
            console.error('Error removing from wishlist:', error);
            return { success: false, message: 'Error removing from wishlist' };
        }
    };

    const clearWishlist = async () => {
        try {
            const response = await wishlistAPI.clear();
            if (response.success) {
                setWishlist(response.wishlist);
                return { success: true, message: 'Wishlist cleared' };
            }
            return { success: false, message: response.message || 'Failed to clear wishlist' };
        } catch (error) {
            console.error('Error clearing wishlist:', error);
            return { success: false, message: 'Error clearing wishlist' };
        }
    };

    const isInWishlist = (productId) => {
        if (!wishlist || !wishlist.items) return false;
        return wishlist.items.some(item =>
            (typeof item === 'object' ? item._id : item) === productId
        );
    };

    const getWishlistCount = () => {
        return wishlist?.items?.length || 0;
    };

    const value = {
        wishlist,
        loading,
        fetchWishlist,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
        isInWishlist,
        getWishlistCount
    };

    return (
        <WishlistContext.Provider value={value}>
            {children}
        </WishlistContext.Provider>
    );
};
