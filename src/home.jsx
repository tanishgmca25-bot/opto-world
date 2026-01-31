import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Eye, Shield, HeadphonesIcon, Star } from 'lucide-react';
import { Button } from './components/ui/button';
import { Card, CardContent } from './components/ui/card';
import ProductCard from './components/ProductCard';
import { mockCategories, mockTestimonials } from './mock/mockData';
import { productAPI } from './services/api';

const Home = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch products from API
    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await productAPI.getAll();
            if (response.success) {
                // Get first 4 products for featured section
                setFeaturedProducts(response.products.slice(0, 4));
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-blue-50 via-white to-blue-50 overflow-hidden">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div className="space-y-6 z-10">
                            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                                See the World
                                <span className="block text-blue-600">
                                    in Perfect Clarity
                                </span>
                            </h1>
                            <p className="text-lg text-gray-600 max-w-lg leading-relaxed">
                                Discover premium eyewear that combines style, comfort, and cutting-edge technology. Your vision deserves the best.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Link to="/products">
                                    <Button size="lg" className="rounded-full px-6 py-5 text-base shadow-lg shadow-blue-200">
                                        Shop Now
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </Link>
                                <Link to="/eye-test-booking">
                                    <Button size="lg" variant="outline" className="rounded-full px-6 py-5 text-base border-2">
                                        Book Eye Test
                                    </Button>
                                </Link>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="relative z-10 transform translate-x-12 scale-105">
                                <img
                                    src="https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=800"
                                    alt="Premium Eyewear"
                                    className="rounded-3xl shadow-2xl"
                                />
                            </div>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-100 rounded-full blur-3xl opacity-50 -z-10"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories */}
            <section className="py-12 bg-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-4 gap-6">
                        {mockCategories.map((category) => (
                            <Link key={category.id} to={`/products?category=${category.id}`}>
                                <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer border hover:border-blue-200 overflow-hidden h-full">
                                    <CardContent className="p-6 text-center flex flex-col items-center justify-center h-full space-y-3">
                                        <div className="text-4xl transform group-hover:scale-110 transition-transform duration-300">
                                            {category.icon}
                                        </div>
                                        <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
                                            {category.name}
                                        </h3>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="py-12 bg-gray-50">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-end mb-8">
                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Featured Products</h2>
                            <p className="text-gray-600 text-base">Trending eyewear picked just for you</p>
                        </div>
                        <Link to="/products">
                            <Button variant="outline" className="hidden md:flex rounded-full text-sm">
                                View All
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                    </div>

                    {loading ? (
                        <div className="grid md:grid-cols-4 gap-6">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="bg-white rounded-lg p-4 shadow-sm">
                                    <div className="animate-pulse">
                                        <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
                                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : featuredProducts.length > 0 ? (
                        <div className="grid md:grid-cols-4 gap-6">
                            {featuredProducts.map((product) => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                            <p className="text-gray-500">No products available at the moment.</p>
                        </div>
                    )}

                    <div className="mt-8 text-center md:hidden">
                        <Link to="/products">
                            <Button variant="outline" className="w-full rounded-full">
                                View All Products
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-12 bg-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-4 gap-8">
                        <div className="text-center space-y-3">
                            <div className="mx-auto w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                                <Eye className="h-6 w-6" />
                            </div>
                            <h3 className="font-bold text-base">Premium Quality</h3>
                            <p className="text-gray-600 text-sm">Handpicked collection of world-class eyewear</p>
                        </div>
                        <div className="text-center space-y-3">
                            <div className="mx-auto w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-600">
                                <Shield className="h-6 w-6" />
                            </div>
                            <h3 className="font-bold text-base">100% Authentic</h3>
                            <p className="text-gray-600 text-sm">Guaranteed genuine products</p>
                        </div>

                        <div className="text-center space-y-3">
                            <div className="mx-auto w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600">
                                <HeadphonesIcon className="h-6 w-6" />
                            </div>
                            <h3 className="font-bold text-base">24/7 Support</h3>
                            <p className="text-gray-600 text-sm">Always here to help you</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-16 bg-blue-900 text-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl font-bold text-center mb-10">Trusted by thousands of happy customers</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {mockTestimonials.map((testimonial) => (
                            <Card key={testimonial.id} className="bg-blue-800 border-none text-white p-5">
                                <div className="flex items-center space-x-1 mb-3">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                    ))}
                                </div>
                                <p className="text-blue-100 mb-4 text-base leading-relaxed">"{testimonial.text}"</p>
                                <div className="flex items-center space-x-3">
                                    <img
                                        src={testimonial.avatar}
                                        alt={testimonial.name}
                                        className="w-10 h-10 rounded-full border-2 border-blue-400"
                                    />
                                    <div>
                                        <p className="font-bold text-sm">{testimonial.name}</p>
                                        <p className="text-xs text-blue-300">Verified Customer</p>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-gradient-to-br from-blue-50 to-white">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                        Ready to improve your vision?
                    </h2>
                    <p className="text-lg text-gray-600">
                        Book an appointment with our expert optometrists today and get personalized recommendations suitable for your lifestyle.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/eye-test-booking">
                            <Button size="lg" className="rounded-full px-8 py-6 text-base w-full sm:w-auto">
                                Book Free Eye Test
                            </Button>
                        </Link>
                        <Link to="/products">
                            <Button size="lg" variant="outline" className="rounded-full px-8 py-6 text-base w-full sm:w-auto bg-white">
                                Explore Collection
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
