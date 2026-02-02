import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import { WishlistProvider } from './contexts/WishlistContext';
import Home from './home';
import Products from './Products';
import ProductDetails from './ProductDetails';
import Cart from './Cart';
import Wishlist from './Wishlist';
import Login from './Login';
import SignUp from './SignUp';
import Profile from './Profile';
import Admin from './Admin';
import Contact from './Contact';
import EyeTestBooking from './EyeTestBooking';
import Footer from './footer';
import './App.css';

import Header from './components/Header';

function App() {
    return (
        <Router>
            <CartProvider>
                <WishlistProvider>
                    <div className="App min-h-screen bg-white font-sans text-gray-900">
                        <Header />
                        <main className="pt-20">
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/products" element={<Products />} />
                                <Route path="/product/:id" element={<ProductDetails />} />
                                <Route path="/cart" element={<Cart />} />
                                <Route path="/wishlist" element={<Wishlist />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/signup" element={<SignUp />} />
                                <Route path="/profile" element={<Profile />} />
                                <Route path="/admin" element={<Admin />} />
                                <Route path="/contact" element={<Contact />} />
                                <Route path="/eye-test-booking" element={<EyeTestBooking />} />
                            </Routes>
                        </main>
                        <Footer />
                    </div>
                </WishlistProvider>
            </CartProvider>
        </Router>
    );
}

export default App;