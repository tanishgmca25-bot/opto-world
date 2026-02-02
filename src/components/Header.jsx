import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, Search, Heart, ShoppingCart, Menu, X, User, LogOut } from 'lucide-react';
import { Button } from './ui/button';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import { productAPI } from '../services/api';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState('');
    const [userRole, setUserRole] = useState('');
    const navigate = useNavigate();
    const { getCartCount } = useCart();
    const { getWishlistCount } = useWishlist();

    // Search state
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showSearchDropdown, setShowSearchDropdown] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const searchRef = useRef(null);

    // Check authentication status
    useEffect(() => {
        const token = localStorage.getItem('token');
        const name = localStorage.getItem('userName');
        const role = localStorage.getItem('userRole');

        if (token) {
            setIsLoggedIn(true);
            setUserName(name || 'User');
            setUserRole(role || 'user');
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    // Listen for storage changes (when user logs in/out in another tab)
    useEffect(() => {
        const handleStorageChange = () => {
            const token = localStorage.getItem('token');
            const name = localStorage.getItem('userName');
            const role = localStorage.getItem('userRole');

            if (token) {
                setIsLoggedIn(true);
                setUserName(name || 'User');
                setUserRole(role || 'user');
            } else {
                setIsLoggedIn(false);
            }
        };

        window.addEventListener('storage', handleStorageChange);

        // Also listen for custom event when login happens in same tab
        window.addEventListener('loginStatusChanged', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('loginStatusChanged', handleStorageChange);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userName');
        localStorage.removeItem('userEmail');
        setIsLoggedIn(false);
        window.dispatchEvent(new Event('loginStatusChanged'));
        navigate('/');
        setIsMenuOpen(false);
    };

    // Handle search
    useEffect(() => {
        const searchProducts = async () => {
            if (searchQuery.trim().length < 2) {
                setSearchResults([]);
                setShowSearchDropdown(false);
                return;
            }

            setIsSearching(true);
            try {
                const response = await productAPI.getAll();
                if (response.success) {
                    const filtered = response.products.filter(product =>
                        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        product.brand.toLowerCase().includes(searchQuery.toLowerCase())
                    ).slice(0, 5); // Limit to 5 results
                    setSearchResults(filtered);
                    setShowSearchDropdown(true);
                }
            } catch (error) {
                console.error('Search error:', error);
            } finally {
                setIsSearching(false);
            }
        };

        const debounceTimer = setTimeout(() => {
            searchProducts();
        }, 300);

        return () => clearTimeout(debounceTimer);
    }, [searchQuery]);

    // Close search dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowSearchDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2 group">
                        <Eye className="h-8 w-8 text-blue-600 group-hover:text-blue-700 transition-colors" />
                        <span className="text-2xl font-bold bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent">
                            Opto-World
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <Link to="/" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                            Home
                        </Link>
                        <Link to="/products" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                            Products
                        </Link>
                        <Link to="/eye-test-booking" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                            Book Eye Test
                        </Link>
                        <Link to="/contact" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                            Contact
                        </Link>
                        {isLoggedIn && userRole === 'admin' && (
                            <Link to="/admin" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                                Dashboard
                            </Link>
                        )}
                    </nav>

                    {/* Desktop Actions */}
                    <div className="hidden md:flex items-center space-x-4">
                        {/* Search */}
                        <div ref={searchRef} className="relative">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-52 pl-9 pr-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <Search className="absolute left-2.5 top-2 h-4 w-4 text-gray-400" />
                            </div>

                            {/* Search Dropdown */}
                            {showSearchDropdown && (
                                <div className="absolute top-full mt-2 w-full bg-white rounded-lg shadow-xl border border-gray-200 z-50 max-h-96 overflow-auto">
                                    {isSearching ? (
                                        <div className="p-6 text-center text-gray-500">
                                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
                                        </div>
                                    ) : searchResults.length > 0 ? (
                                        <div className="divide-y divide-gray-100">
                                            {searchResults.map((product) => (
                                                <Link
                                                    key={product._id}
                                                    to={`/product/${product._id}`}
                                                    onClick={() => {
                                                        setSearchQuery('');
                                                        setShowSearchDropdown(false);
                                                    }}
                                                    className="flex items-center p-3 hover:bg-gray-50 transition-colors"
                                                >
                                                    <img
                                                        src={product.image}
                                                        alt={product.name}
                                                        className="w-12 h-12 object-cover rounded"
                                                    />
                                                    <div className="ml-3 flex-1 min-w-0">
                                                        <p className="text-sm font-medium text-gray-900 truncate">{product.name}</p>
                                                        <p className="text-xs text-gray-500">{product.brand}</p>
                                                    </div>
                                                    <p className="ml-2 text-sm font-semibold text-gray-900">₹{product.price}</p>
                                                </Link>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="p-6 text-center text-gray-500">
                                            No products found
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        <Link to="/wishlist" className="text-gray-500 hover:text-red-500 transition-colors p-1 relative">
                            <Heart className="h-5 w-5" />
                            {getWishlistCount() > 0 && (
                                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full">
                                    {getWishlistCount()}
                                </span>
                            )}
                        </Link>
                        <Link to="/cart" className="text-gray-500 hover:text-blue-600 transition-colors p-1 relative">
                            <ShoppingCart className="h-5 w-5" />
                            {getCartCount() > 0 && (
                                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full">
                                    {getCartCount()}
                                </span>
                            )}
                        </Link>

                        {/* Authentication Buttons */}
                        <div className="flex items-center space-x-2 pl-4 border-l border-gray-200">
                            {isLoggedIn ? (
                                <>
                                    <Link to="/profile">
                                        <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                                            <User className="h-4 w-4" />
                                            <span className="hidden lg:inline">{userName}</span>
                                        </Button>
                                    </Link>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={handleLogout}
                                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                    >
                                        <LogOut className="h-4 w-4" />
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Link to="/login">
                                        <Button variant="ghost" size="sm" className="hidden lg:flex">
                                            Login
                                        </Button>
                                    </Link>
                                    <Link to="/signup">
                                        <Button size="sm" className="bg-gray-900 hover:bg-gray-800 text-white">
                                            Sign Up
                                        </Button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-md"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden border-t border-gray-100 bg-white absolute w-full shadow-lg">
                    <div className="px-4 pt-2 pb-6 space-y-2">
                        <Link
                            to="/"
                            className="block px-3 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600 rounded-md"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Home
                        </Link>
                        <Link
                            to="/products"
                            className="block px-3 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600 rounded-md"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Products
                        </Link>
                        <Link
                            to="/eye-test-booking"
                            className="block px-3 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600 rounded-md"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Book Eye Test
                        </Link>
                        <Link
                            to="/contact"
                            className="block px-3 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600 rounded-md"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Contact
                        </Link>
                        {isLoggedIn && userRole === 'admin' && (
                            <Link
                                to="/admin"
                                className="block px-3 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600 rounded-md"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Dashboard
                            </Link>
                        )}

                        {/* Mobile Auth Buttons */}
                        <div className="border-t border-gray-100 mt-4 pt-4 flex flex-col space-y-3 px-3">
                            {isLoggedIn ? (
                                <>
                                    <Link to="/profile" onClick={() => setIsMenuOpen(false)}>
                                        <Button variant="outline" className="w-full justify-center">
                                            <User className="mr-2 h-4 w-4" />
                                            {userName}
                                        </Button>
                                    </Link>
                                    <Button
                                        onClick={handleLogout}
                                        variant="outline"
                                        className="w-full justify-center text-red-600 hover:bg-red-50 border-red-200"
                                    >
                                        <LogOut className="mr-2 h-4 w-4" />
                                        Logout
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                                        <Button variant="outline" className="w-full justify-center">
                                            Login
                                        </Button>
                                    </Link>
                                    <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                                        <Button className="w-full justify-center bg-gray-900">
                                            Sign Up
                                        </Button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
