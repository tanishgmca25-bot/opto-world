import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { User, Package, Heart, LogOut, MapPin, Phone, Mail, Edit, Save, X, Calendar, Clock, CheckCircle, XCircle, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { bookingAPI } from './services/api';

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
    const [bookings, setBookings] = useState([]);
    const [loadingBookings, setLoadingBookings] = useState(false);

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

        // Fetch user bookings
        fetchBookings();
    }, [navigate]);

    const fetchBookings = async () => {
        setLoadingBookings(true);
        try {
            const response = await bookingAPI.getUserBookings();
            if (response.success) {
                setBookings(response.bookings);
            }
        } catch (error) {
            console.error('Error fetching bookings:', error);
        } finally {
            setLoadingBookings(false);
        }
    };

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

                        {/* My Bookings Card */}
                        <Card className="border-none shadow-sm">
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle className="flex items-center gap-2">
                                    <Calendar className="h-5 w-5 text-blue-600" />
                                    My Bookings
                                </CardTitle>
                                {bookings.filter(b => b.status === 'pending').length > 0 && (
                                    <div className="flex items-center gap-2 text-orange-600">
                                        <Bell className="h-4 w-4" />
                                        <span className="text-sm font-medium">
                                            {bookings.filter(b => b.status === 'pending').length} pending
                                        </span>
                                    </div>
                                )}
                            </CardHeader>
                            <CardContent>
                                {loadingBookings ? (
                                    <div className="text-center py-12">
                                        <p className="text-gray-500">Loading bookings...</p>
                                    </div>
                                ) : bookings.length === 0 ? (
                                    <div className="text-center py-12">
                                        <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                                        <p className="text-gray-500 text-lg mb-2">No bookings yet</p>
                                        <p className="text-gray-400 text-sm mb-6">Book an eye test to see your appointments here</p>
                                        <Button onClick={() => navigate('/eye-test-booking')}>
                                            Book Eye Test
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {bookings.filter(b => b.status === 'confirmed').length > 0 && (
                                            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                                <div className="flex items-center gap-2 text-green-800">
                                                    <CheckCircle className="h-5 w-5" />
                                                    <p className="font-semibold">Your booking is confirmed!</p>
                                                </div>
                                            </div>
                                        )}
                                        {bookings.map((booking) => (
                                            <div
                                                key={booking._id}
                                                className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
                                            >
                                                <div className="flex items-start justify-between mb-3">
                                                    <div>
                                                        <h3 className="font-semibold text-gray-900 capitalize">
                                                            {booking.testType}
                                                        </h3>
                                                        <p className="text-sm text-gray-500">{booking.location}</p>
                                                    </div>
                                                    <span
                                                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${booking.status === 'confirmed'
                                                                ? 'bg-green-100 text-green-800'
                                                                : booking.status === 'cancelled'
                                                                    ? 'bg-red-100 text-red-800'
                                                                    : booking.status === 'completed'
                                                                        ? 'bg-blue-100 text-blue-800'
                                                                        : 'bg-yellow-100 text-yellow-800'
                                                            }`}
                                                    >
                                                        {booking.status === 'confirmed' && <CheckCircle className="h-3 w-3 mr-1" />}
                                                        {booking.status === 'cancelled' && <XCircle className="h-3 w-3 mr-1" />}
                                                        {booking.status === 'pending' && <Clock className="h-3 w-3 mr-1" />}
                                                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                                    </span>
                                                </div>
                                                <div className="space-y-2 text-sm text-gray-600">
                                                    <div className="flex items-center gap-2">
                                                        <Calendar className="h-4 w-4 text-gray-400" />
                                                        <span>
                                                            {new Date(booking.preferredDate).toLocaleDateString('en-IN', {
                                                                weekday: 'long',
                                                                year: 'numeric',
                                                                month: 'long',
                                                                day: 'numeric'
                                                            })}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Clock className="h-4 w-4 text-gray-400" />
                                                        <span>{booking.preferredTime}</span>
                                                    </div>
                                                    {booking.notes && (
                                                        <p className="text-gray-500 italic mt-2">"{booking.notes}"</p>
                                                    )}
                                                    {booking.status === 'cancelled' && booking.rejectedReason && (
                                                        <div className="mt-2 p-2 bg-red-50 rounded text-red-700 text-xs">
                                                            <strong>Reason:</strong> {booking.rejectedReason}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
