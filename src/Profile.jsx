import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { User, Package, Heart, LogOut, MapPin, Phone, Mail, Edit, Save, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [user, setUser] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        role: ''
    });
    const [editedUser, setEditedUser] = useState({
        name: '',
        phone: '',
        address: ''
    });

    useEffect(() => {
        // Get user info from localStorage
        const userName = localStorage.getItem('userName');
        const userEmail = localStorage.getItem('userEmail');
        const userRole = localStorage.getItem('userRole');
        const token = localStorage.getItem('token');

        // Redirect to login if not authenticated
        if (!token) {
            navigate('/login');
            return;
        }

        const userData = {
            name: userName || 'User',
            email: userEmail || '',
            phone: localStorage.getItem('userPhone') || 'Not provided',
            address: localStorage.getItem('userAddress') || 'Not provided',
            role: userRole || 'user'
        };

        setUser(userData);
        setEditedUser({
            name: userData.name,
            phone: userData.phone,
            address: userData.address
        });
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userName');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userPhone');
        localStorage.removeItem('userAddress');
        window.dispatchEvent(new Event('loginStatusChanged'));
        navigate('/login');
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
        // Reset to original values
        setEditedUser({
            name: user.name,
            phone: user.phone,
            address: user.address
        });
    };

    const handleSave = () => {
        // Update localStorage
        localStorage.setItem('userName', editedUser.name);
        localStorage.setItem('userPhone', editedUser.phone);
        localStorage.setItem('userAddress', editedUser.address);

        // Update state
        setUser({
            ...user,
            name: editedUser.name,
            phone: editedUser.phone,
            address: editedUser.address
        });

        // Dispatch event to update header
        window.dispatchEvent(new Event('loginStatusChanged'));

        setIsEditing(false);
        alert('Profile updated successfully!');
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedUser({
            ...editedUser,
            [name]: value
        });
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
                                {user.role === 'admin' && (
                                    <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                                        Admin
                                    </span>
                                )}
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
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle>Profile Information</CardTitle>
                                {!isEditing && (
                                    <Button variant="outline" size="sm" onClick={handleEdit}>
                                        <Edit className="mr-2 h-4 w-4" />
                                        Edit
                                    </Button>
                                )}
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label className="text-sm font-medium text-gray-500">Full Name</Label>
                                        {isEditing ? (
                                            <Input
                                                name="name"
                                                value={editedUser.name}
                                                onChange={handleInputChange}
                                                placeholder="Enter your name"
                                            />
                                        ) : (
                                            <p className="text-gray-900 font-medium">{user.name}</p>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-sm font-medium text-gray-500">Email Address</Label>
                                        <div className="flex items-center text-gray-900">
                                            <Mail className="h-4 w-4 mr-2 text-gray-400" />
                                            <span>{user.email}</span>
                                        </div>
                                        {isEditing && (
                                            <p className="text-xs text-gray-500">Email cannot be changed</p>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-sm font-medium text-gray-500">Phone Number</Label>
                                        {isEditing ? (
                                            <div className="relative">
                                                <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                                <Input
                                                    name="phone"
                                                    value={editedUser.phone}
                                                    onChange={handleInputChange}
                                                    placeholder="+91 98765 43210"
                                                    className="pl-10"
                                                />
                                            </div>
                                        ) : (
                                            <div className="flex items-center">
                                                <Phone className="h-4 w-4 mr-2 text-gray-400" />
                                                <span className={user.phone === 'Not provided' ? 'text-gray-500 italic' : 'text-gray-900'}>
                                                    {user.phone}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-sm font-medium text-gray-500">Address</Label>
                                        {isEditing ? (
                                            <div className="relative">
                                                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                                <Input
                                                    name="address"
                                                    value={editedUser.address}
                                                    onChange={handleInputChange}
                                                    placeholder="Enter your address"
                                                    className="pl-10"
                                                />
                                            </div>
                                        ) : (
                                            <div className="flex items-start">
                                                <MapPin className="h-4 w-4 mr-2 text-gray-400 mt-1" />
                                                <span className={user.address === 'Not provided' ? 'text-gray-500 italic' : 'text-gray-900'}>
                                                    {user.address}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-sm font-medium text-gray-500">Account Type</Label>
                                        <p className="text-gray-900 font-medium capitalize">{user.role}</p>
                                    </div>
                                </div>
                                {isEditing && (
                                    <div className="pt-4 flex gap-3">
                                        <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
                                            <Save className="mr-2 h-4 w-4" />
                                            Save Changes
                                        </Button>
                                        <Button variant="outline" onClick={handleCancel}>
                                            <X className="mr-2 h-4 w-4" />
                                            Cancel
                                        </Button>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Orders Info Card */}
                        <Card className="border-none shadow-sm">
                            <CardHeader>
                                <CardTitle>Recent Orders</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-center py-12">
                                    <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                                    <p className="text-gray-500 text-lg mb-2">No orders yet</p>
                                    <p className="text-gray-400 text-sm mb-6">Start shopping to see your orders here</p>
                                    <Button onClick={() => navigate('/products')}>
                                        Browse Products
                                    </Button>
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
