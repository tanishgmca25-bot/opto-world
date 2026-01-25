import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Eye, Shield, Truck, HeadphonesIcon, Star } from 'lucide-react';
import { Button } from './components/ui/button';
import { Card, CardContent } from './components/ui/card';
import ProductCard from './components/ProductCard';
import { mockProducts, mockCategories, mockTestimonials } from './mock/mockData';

const Home = () => {
    const featuredProducts = mockProducts.slice(0, 4);

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-blue-50 via-white to-blue-50 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8 z-10">
                            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight">
                                See the World
                                <span className="block text-blue-600">
                                    in Perfect Clarity
                                </span>
                            </h1>
                            <p className="text-xl text-gray-600 max-w-lg leading-relaxed">
                                Discover premium eyewear that combines style, comfort, and cutting-edge technology. Your vision deserves the best.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Link to="/products">
                                    <Button size="lg" className="rounded-full px-8 py-6 text-lg shadow-lg shadow-blue-200">
                                        Shop Now
                                        <ArrowRight className="ml-2 h-5 w-5" />
                                    </Button>
                                </Link>
                                <Link to="/eye-test-booking">
                                    <Button size="lg" variant="outline" className="rounded-full px-8 py-6 text-lg border-2">
                                        Book Eye Test
                                    </Button>
                                </Link>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="relative z-10 transform translate-x-12 scale-110">
                                <img
                                    src="https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=800"
                                    alt="Premium Eyewear"
                                    className="rounded-3xl shadow-2xl rotate-[-5deg] hover:rotate-0 transition-all duration-500"
                                />
                            </div>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-100 rounded-full blur-3xl opacity-50 -z-10"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-4 gap-8">
                        {mockCategories.map((category) => (
                            <Link key={category.id} to={`/products?category=${category.id}`}>
                                <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer border hover:border-blue-200 overflow-hidden h-full">
                                    <CardContent className="p-8 text-center flex flex-col items-center justify-center h-full space-y-4">
                                        <div className="text-5xl transform group-hover:scale-110 transition-transform duration-300">
                                            {category.icon}
                                        </div>
                                        <h3 className="font-bold text-xl text-gray-900 group-hover:text-blue-600 transition-colors">
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
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Products</h2>
                            <p className="text-gray-600 text-lg">Trending eyewear picked just for you</p>
                        </div>
                        <Link to="/products">
                            <Button variant="outline" className="hidden md:flex rounded-full">
                                View All
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                    </div>
                    <div className="grid md:grid-cols-4 gap-8">
                        {featuredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
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
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-4 gap-12">
                        <div className="text-center space-y-4">
                            <div className="mx-auto w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                                <Eye className="h-8 w-8" />
                            </div>
                            <h3 className="font-bold text-lg">Premium Quality</h3>
                            <p className="text-gray-600">Handpicked collection of world-class eyewear</p>
                        </div>
                        <div className="text-center space-y-4">
                            <div className="mx-auto w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center text-green-600">
                                <Shield className="h-8 w-8" />
                            </div>
                            <h3 className="font-bold text-lg">100% Authentic</h3>
                            <p className="text-gray-600">Guaranteed genuine products</p>
                        </div>
                        <div className="text-center space-y-4">
                            <div className="mx-auto w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600">
                                <Truck className="h-8 w-8" />
                            </div>
                            <h3 className="font-bold text-lg">Fast Delivery</h3>
                            <p className="text-gray-600">Quick and secure shipping</p>
                        </div>
                        <div className="text-center space-y-4">
                            <div className="mx-auto w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600">
                                <HeadphonesIcon className="h-8 w-8" />
                            </div>
                            <h3 className="font-bold text-lg">24/7 Support</h3>
                            <p className="text-gray-600">Always here to help you</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-20 bg-blue-900 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center mb-16">Trusted by thousands of happy customers</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {mockTestimonials.map((testimonial) => (
                            <Card key={testimonial.id} className="bg-blue-800 border-none text-white p-6">
                                <div className="flex items-center space-x-1 mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                                    ))}
                                </div>
                                <p className="text-blue-100 mb-6 text-lg leading-relaxed">"{testimonial.text}"</p>
                                <div className="flex items-center space-x-4">
                                    <img
                                        src={testimonial.avatar}
                                        alt={testimonial.name}
                                        className="w-12 h-12 rounded-full border-2 border-blue-400"
                                    />
                                    <div>
                                        <p className="font-bold">{testimonial.name}</p>
                                        <p className="text-sm text-blue-300">Verified Customer</p>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-gradient-to-br from-blue-50 to-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                        Ready to improve your vision?
                    </h2>
                    <p className="text-xl text-gray-600">
                        Book an appointment with our expert optometrists today and get personalized recommendations suitable for your lifestyle.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/eye-test-booking">
                            <Button size="lg" className="rounded-full px-10 py-7 text-lg w-full sm:w-auto">
                                Book Free Eye Test
                            </Button>
                        </Link>
                        <Link to="/products">
                            <Button size="lg" variant="outline" className="rounded-full px-10 py-7 text-lg w-full sm:w-auto bg-white">
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
