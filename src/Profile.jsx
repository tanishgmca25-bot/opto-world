import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Button } from './components/ui/button';
import { mockUser } from './mock/mockData';
import { User, Package, Heart, LogOut, MapPin, Phone, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const navigate = useNavigate();
    const user = mockUser; // In real app, get from context/state

    const handleLogout = () => {
        // Clear auth logic here
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar */}
                    <div className="w-full md:w-80 space-y-6">
                        <Card className="border-none shadow-sm">
                            <CardContent className="p-6 text-center">
                                <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600">
                                    <User className="h-12 w-12" />
                                </div>
                                <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
                                <p className="text-sm text-gray-500">{user.email}</p>
                                <Button
                                    variant="outline"
                                    className="mt-6 w-full text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                                    onClick={handleLogout}
                                >
                                    <LogOut className="mr-2 h-4 w-4" />
                                    Logout
                                </Button>
                            </CardContent>
                        </Card>

                        <nav className="bg-white rounded-lg shadow-sm p-2">
                            <Button variant="ghost" className="w-full justify-start text-blue-600 bg-blue-50">
                                <User className="mr-2 h-4 w-4" />
                                Profile Information
                            </Button>
                            <Button variant="ghost" className="w-full justify-start">
                                <Package className="mr-2 h-4 w-4" />
                                My Orders
                            </Button>
                            <Button variant="ghost" className="w-full justify-start">
                                <Heart className="mr-2 h-4 w-4" />
                                Wishlist
                            </Button>
                        </nav>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 space-y-6">
                        {/* Personal Info */}
                        <Card className="border-none shadow-sm">
                            <CardHeader>
                                <CardTitle>Profile Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium text-gray-500">Full Name</label>
                                        <p className="text-gray-900 font-medium">{user.name}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium text-gray-500">Email Address</label>
                                        <div className="flex items-center text-gray-900">
                                            <Mail className="h-4 w-4 mr-2 text-gray-400" />
                                            {user.email}
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium text-gray-500">Phone Number</label>
                                        <div className="flex items-center text-gray-900">
                                            <Phone className="h-4 w-4 mr-2 text-gray-400" />
                                            {user.phone}
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium text-gray-500">Address</label>
                                        <div className="flex items-start text-gray-900">
                                            <MapPin className="h-4 w-4 mr-2 text-gray-400 mt-1" />
                                            {user.address}
                                        </div>
                                    </div>
                                </div>
                                <div className="pt-4">
                                    <Button>Edit Profile</Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Recent Orders */}
                        <Card className="border-none shadow-sm">
                            <CardHeader>
                                <CardTitle>Recent Orders</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-6">
                                    {user.orders.map((order) => (
                                        <div key={order.id} className="border rounded-lg p-4 hover:border-blue-200 transition-colors">
                                            <div className="flex flex-col md:flex-row justify-between md:items-center mb-4 pb-4 border-b border-gray-100">
                                                <div>
                                                    <p className="font-semibold text-gray-900">Order #{order.id}</p>
                                                    <p className="text-sm text-gray-500">{order.date}</p>
                                                </div>
                                                <div className="mt-2 md:mt-0 text-right">
                                                    <p className="font-bold text-gray-900">₹{order.total}</p>
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                        {order.status}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                {order.items.map((item, idx) => (
                                                    <div key={idx} className="flex justify-between text-sm">
                                                        <span className="text-gray-600">
                                                            {item.quantity}x {item.name}
                                                        </span>
                                                        <span className="text-gray-900 font-medium">₹{item.price}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
