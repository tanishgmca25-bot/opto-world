import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="space-y-4">
                        <Link to="/" className="flex items-center space-x-2">
                            <Eye className="h-8 w-8 text-blue-500" />
                            <span className="text-xl font-bold text-white">Opto-World</span>
                        </Link>
                        <p className="text-sm">
                            Your trusted partner for premium eyewear. Quality vision care solutions for everyone.
                        </p>
                        <div className="flex space-x-4">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">
                                <Facebook className="h-5 w-5" />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">
                                <Instagram className="h-5 w-5" />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">
                                <Twitter className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link to="/" className="hover:text-blue-500 transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/products" className="hover:text-blue-500 transition-colors">
                                    Products
                                </Link>
                            </li>
                            <li>
                                <Link to="/eye-test-booking" className="hover:text-blue-500 transition-colors">
                                    Book Eye Test
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="hover:text-blue-500 transition-colors">
                                    Contact Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Customer Service</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link to="/shipping" className="hover:text-blue-500 transition-colors">
                                    Shipping & Delivery
                                </Link>
                            </li>
                            <li>
                                <Link to="/returns" className="hover:text-blue-500 transition-colors">
                                    Returns & Exchanges
                                </Link>
                            </li>
                            <li>
                                <Link to="/faqs" className="hover:text-blue-500 transition-colors">
                                    FAQs
                                </Link>
                            </li>
                            <li>
                                <Link to="/privacy" className="hover:text-blue-500 transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Contact Us</h3>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-start space-x-2">
                                <MapPin className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                                <span>123 Vision Street, Mumbai, Maharashtra 400001</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <Phone className="h-5 w-5 text-blue-500" />
                                <span>+91 1800-123-4567</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <Mail className="h-5 w-5 text-blue-500" />
                                <span>support@optoworld.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
                    <p>&copy; 2025 Opto-World. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
