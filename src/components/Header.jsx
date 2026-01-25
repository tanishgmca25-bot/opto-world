import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, Search, Heart, ShoppingCart, Menu, X } from 'lucide-react';
import { Button } from './ui/button';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
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
                    </nav>

                    {/* Desktop Actions */}
                    <div className="hidden md:flex items-center space-x-6">
                        <button className="text-gray-500 hover:text-blue-600 transition-colors p-1">
                            <Search className="h-5 w-5" />
                        </button>
                        <Link to="/wishlist" className="text-gray-500 hover:text-red-500 transition-colors p-1">
                            <Heart className="h-5 w-5" />
                        </Link>
                        <Link to="/cart" className="text-gray-500 hover:text-blue-600 transition-colors p-1 relative">
                            <ShoppingCart className="h-5 w-5" />
                            <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full">
                                0
                            </span>
                        </Link>

                        <div className="flex items-center space-x-2 pl-4 border-l border-gray-200">
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
                        <div className="border-t border-gray-100 mt-4 pt-4 flex flex-col space-y-3 px-3">
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
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
