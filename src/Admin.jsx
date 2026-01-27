import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { Textarea } from './components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';
import { Plus, Trash2, Edit, Package, ShoppingBag, LayoutDashboard, Search, Calendar, CheckCircle, XCircle, Clock, Mail, MessageSquare } from 'lucide-react';
import { productAPI, bookingAPI, contactAPI } from './services/api';

const Admin = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const [activeTab, setActiveTab] = useState('products');
    const [searchTerm, setSearchTerm] = useState('');
    const [bookingSearchTerm, setBookingSearchTerm] = useState('');
    const [contactSearchTerm, setContactSearchTerm] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        brand: '',
        price: '',
        originalPrice: '',
        category: 'eyeglasses',
        frameType: 'rectangle',
        color: 'black',
        material: 'acetate',
        description: '',
        features: '',
        image: '',
        inStock: true,
        stock: 0
    });

    // Fetch products, bookings, and contacts on component mount
    useEffect(() => {
        const userRole = localStorage.getItem('userRole');
        if (userRole !== 'admin') {
            alert('Access denied. Admin only.');
            navigate('/');
            return;
        }
        fetchProducts();
        fetchBookings();
        fetchContacts();
    }, [navigate]);

    const fetchProducts = async () => {
        try {
            const data = await productAPI.getAll();
            if (data.success) {
                setProducts(data.products);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const fetchBookings = async () => {
        try {
            const data = await bookingAPI.getAll();
            if (data.success) {
                setBookings(data.bookings);
            }
        } catch (error) {
            console.error('Error fetching bookings:', error);
        }
    };

    const fetchContacts = async () => {
        try {
            const data = await contactAPI.getAll();
            if (data.success) {
                setContacts(data.contacts);
            }
        } catch (error) {
            console.error('Error fetching contacts:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setFormData({
                ...formData,
                image: file.name
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const productData = {
                name: formData.name,
                brand: formData.brand,
                price: parseFloat(formData.price),
                originalPrice: parseFloat(formData.originalPrice),
                category: formData.category,
                frameType: formData.frameType,
                color: formData.color,
                material: formData.material,
                description: formData.description,
                features: formData.features,
                inStock: formData.inStock,
                stock: parseInt(formData.stock) || 0
            };

            if (editingProduct) {
                const response = await productAPI.update(editingProduct._id, productData, imageFile);
                if (response.success) {
                    alert('Product updated successfully!');
                    fetchProducts();
                } else {
                    alert('Error: ' + response.message);
                }
            } else {
                const response = await productAPI.create(productData, imageFile);
                if (response.success) {
                    alert('Product added successfully!');
                    fetchProducts();
                } else {
                    alert('Error: ' + response.message);
                }
            }
            resetForm();
        } catch (error) {
            alert('Error: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            brand: '',
            price: '',
            originalPrice: '',
            category: '',
            frameType: '',
            color: '',
            material: '',
            description: '',
            features: '',
            image: '',
            inStock: true,
            stock: 0
        });
        setEditingProduct(null);
        setImageFile(null);
        setActiveTab('products');
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setFormData({
            name: product.name,
            brand: product.brand,
            price: product.price.toString(),
            originalPrice: product.originalPrice ? product.originalPrice.toString() : '',
            category: product.category,
            frameType: product.frameType,
            color: product.color,
            material: product.material,
            description: product.description,
            features: product.features.join(', '),
            image: product.image,
            inStock: product.inStock,
            stock: product.stock ? product.stock.toString() : '0'
        });
        setActiveTab('add');
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                const response = await productAPI.delete(id);
                if (response.success) {
                    alert('Product deleted successfully!');
                    fetchProducts();
                } else {
                    alert('Error: ' + response.message);
                }
            } catch (error) {
                alert('Error: ' + error.message);
            }
        }
    };

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredBookings = bookings.filter(booking =>
        booking.name.toLowerCase().includes(bookingSearchTerm.toLowerCase()) ||
        booking.email.toLowerCase().includes(bookingSearchTerm.toLowerCase()) ||
        booking.phone.includes(bookingSearchTerm)
    );

    const filteredContacts = contacts.filter(contact =>
        contact.name.toLowerCase().includes(contactSearchTerm.toLowerCase()) ||
        contact.email.toLowerCase().includes(contactSearchTerm.toLowerCase()) ||
        contact.subject.toLowerCase().includes(contactSearchTerm.toLowerCase())
    );

    const handleUpdateBookingStatus = async (id, status) => {
        try {
            const response = await bookingAPI.updateStatus(id, status);
            if (response.success) {
                alert('Booking status updated successfully!');
                fetchBookings();
            } else {
                alert('Error: ' + response.message);
            }
        } catch (error) {
            alert('Error: ' + error.message);
        }
    };

    const handleDeleteBooking = async (id) => {
        if (window.confirm('Are you sure you want to delete this booking?')) {
            try {
                const response = await bookingAPI.delete(id);
                if (response.success) {
                    alert('Booking deleted successfully!');
                    fetchBookings();
                } else {
                    alert('Error: ' + response.message);
                }
            } catch (error) {
                alert('Error: ' + error.message);
            }
        }
    };

    const handleUpdateContactStatus = async (id, status) => {
        try {
            const response = await contactAPI.updateStatus(id, status);
            if (response.success) {
                alert('Contact status updated successfully!');
                fetchContacts();
            } else {
                alert('Error: ' + response.message);
            }
        } catch (error) {
            alert('Error: ' + error.message);
        }
    };

    const handleDeleteContact = async (id) => {
        if (window.confirm('Are you sure you want to delete this contact message?')) {
            try {
                const response = await contactAPI.delete(id);
                if (response.success) {
                    alert('Contact deleted successfully!');
                    fetchContacts();
                } else {
                    alert('Error: ' + response.message);
                }
            } catch (error) {
                alert('Error: ' + error.message);
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="bg-white rounded-2xl p-8 mb-8 shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent mb-2">
                            Admin Dashboard
                        </h1>
                        <p className="text-gray-500">Manage your products and inventory</p>
                    </div>
                    <Button onClick={resetForm} className="bg-blue-600 hover:bg-blue-700">
                        <Plus className="mr-2 h-4 w-4" /> Add New Product
                    </Button>
                </div>

                {/* Stats */}
                <div className="grid md:grid-cols-5 gap-6 mb-8">
                    <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-500 text-sm font-medium">Total Products</p>
                                    <p className="text-3xl font-bold text-gray-900 mt-2">{products.length}</p>
                                </div>
                                <div className="p-4 bg-blue-50 rounded-xl text-blue-600">
                                    <Package className="h-6 w-6" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-500 text-sm font-medium">In Stock</p>
                                    <p className="text-3xl font-bold text-green-600 mt-2">{products.filter(p => p.inStock).length}</p>
                                </div>
                                <div className="p-4 bg-green-50 rounded-xl text-green-600">
                                    <ShoppingBag className="h-6 w-6" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-500 text-sm font-medium">Out of Stock</p>
                                    <p className="text-3xl font-bold text-red-600 mt-2">{products.filter(p => !p.inStock).length}</p>
                                </div>
                                <div className="p-4 bg-red-50 rounded-xl text-red-600">
                                    <LayoutDashboard className="h-6 w-6" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-500 text-sm font-medium">Total Bookings</p>
                                    <p className="text-3xl font-bold text-purple-600 mt-2">{bookings.length}</p>
                                </div>
                                <div className="p-4 bg-purple-50 rounded-xl text-purple-600">
                                    <Calendar className="h-6 w-6" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-500 text-sm font-medium">Contact Messages</p>
                                    <p className="text-3xl font-bold text-orange-600 mt-2">{contacts.length}</p>
                                </div>
                                <div className="p-4 bg-orange-50 rounded-xl text-orange-600">
                                    <MessageSquare className="h-6 w-6" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                    <TabsList className="bg-white p-1 border border-gray-100 rounded-lg">
                        <TabsTrigger value="products">Inventory</TabsTrigger>
                        <TabsTrigger value="bookings">Bookings</TabsTrigger>
                        <TabsTrigger value="contacts">Contacts</TabsTrigger>
                        <TabsTrigger value="add">
                            {editingProduct ? 'Edit Product' : 'Add New Product'}
                        </TabsTrigger>
                    </TabsList>

                    {/* Products List */}
                    <TabsContent value="products">
                        <Card className="border-none shadow-sm overflow-hidden">
                            <CardHeader className="border-b border-gray-100 bg-gray-50/50 flex flex-row items-center justify-between">
                                <CardTitle>Product Inventory</CardTitle>
                                <div className="relative w-64">
                                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                    <Input
                                        placeholder="Search products..."
                                        className="pl-10 h-9 bg-white"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="bg-gray-50/50">
                                            <tr>
                                                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Product</th>
                                                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Brand</th>
                                                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Price</th>
                                                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                                                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Stock</th>
                                                <th className="text-right py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {filteredProducts.map((product) => (
                                                <tr key={product._id} className="hover:bg-gray-50/50 transition-colors">
                                                    <td className="py-4 px-6">
                                                        <div className="flex items-center space-x-4">
                                                            <img
                                                                src={product.image}
                                                                alt={product.name}
                                                                className="w-12 h-12 object-cover rounded-lg border border-gray-100"
                                                            />
                                                            <span className="font-medium text-gray-900">{product.name}</span>
                                                        </div>
                                                    </td>
                                                    <td className="py-4 px-6 text-gray-600">{product.brand}</td>
                                                    <td className="py-4 px-6 font-medium">₹{product.price}</td>
                                                    <td className="py-4 px-6 capitalize text-gray-600">{product.category}</td>
                                                    <td className="py-4 px-6">
                                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${product.inStock
                                                            ? 'bg-green-100 text-green-800'
                                                            : 'bg-red-100 text-red-800'
                                                            }`}>
                                                            {product.inStock ? 'In Stock' : 'Out of Stock'}
                                                        </span>
                                                    </td>
                                                    <td className="py-4 px-6 text-right">
                                                        <div className="flex items-center justify-end space-x-2">
                                                            <Button
                                                                size="sm"
                                                                variant="outline"
                                                                className="h-8 w-8 p-0"
                                                                onClick={() => handleEdit(product)}
                                                            >
                                                                <Edit className="h-4 w-4" />
                                                            </Button>
                                                            <Button
                                                                size="sm"
                                                                variant="destructive"
                                                                className="h-8 w-8 p-0"
                                                                onClick={() => handleDelete(product._id)}
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                            </Button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Bookings List */}
                    <TabsContent value="bookings">
                        <Card className="border-none shadow-sm overflow-hidden">
                            <CardHeader className="border-b border-gray-100 bg-gray-50/50 flex flex-row items-center justify-between">
                                <CardTitle>Eye Test Bookings</CardTitle>
                                <div className="relative w-64">
                                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                    <Input
                                        placeholder="Search bookings..."
                                        className="pl-10 h-9 bg-white"
                                        value={bookingSearchTerm}
                                        onChange={(e) => setBookingSearchTerm(e.target.value)}
                                    />
                                </div>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="bg-gray-50/50">
                                            <tr>
                                                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date Booked</th>
                                                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
                                                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Contact</th>
                                                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Appointment</th>
                                                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Test Type</th>
                                                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                                <th className="text-right py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {filteredBookings.length === 0 ? (
                                                <tr>
                                                    <td colSpan="7" className="py-12 text-center text-gray-500">
                                                        No bookings found
                                                    </td>
                                                </tr>
                                            ) : (
                                                filteredBookings.map((booking) => (
                                                    <tr key={booking._id} className="hover:bg-gray-50/50 transition-colors">
                                                        <td className="py-4 px-6 text-sm text-gray-600">
                                                            {new Date(booking.createdAt).toLocaleDateString('en-IN', {
                                                                year: 'numeric',
                                                                month: 'short',
                                                                day: 'numeric'
                                                            })}
                                                        </td>
                                                        <td className="py-4 px-6">
                                                            <div className="font-medium text-gray-900">{booking.name}</div>
                                                            <div className="text-sm text-gray-500">{booking.email}</div>
                                                        </td>
                                                        <td className="py-4 px-6 text-sm text-gray-600">{booking.phone}</td>
                                                        <td className="py-4 px-6">
                                                            <div className="text-sm font-medium text-gray-900">
                                                                {new Date(booking.preferredDate).toLocaleDateString('en-IN', {
                                                                    year: 'numeric',
                                                                    month: 'short',
                                                                    day: 'numeric'
                                                                })}
                                                            </div>
                                                            <div className="text-xs text-gray-500">{booking.preferredTime} • {booking.location}</div>
                                                        </td>
                                                        <td className="py-4 px-6 text-sm text-gray-600 capitalize">{booking.testType}</td>
                                                        <td className="py-4 px-6">
                                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                                                                booking.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                                                                    booking.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                                                                        'bg-yellow-100 text-yellow-800'
                                                                }`}>
                                                                {booking.status === 'confirmed' && <CheckCircle className="h-3 w-3 mr-1" />}
                                                                {booking.status === 'cancelled' && <XCircle className="h-3 w-3 mr-1" />}
                                                                {booking.status === 'pending' && <Clock className="h-3 w-3 mr-1" />}
                                                                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                                            </span>
                                                        </td>
                                                        <td className="py-4 px-6 text-right">
                                                            <div className="flex items-center justify-end space-x-2">
                                                                {booking.status === 'pending' && (
                                                                    <Button
                                                                        size="sm"
                                                                        variant="outline"
                                                                        className="h-8 text-xs text-green-600 hover:text-green-700 hover:bg-green-50"
                                                                        onClick={() => handleUpdateBookingStatus(booking._id, 'confirmed')}
                                                                    >
                                                                        Confirm
                                                                    </Button>
                                                                )}
                                                                {booking.status === 'confirmed' && (
                                                                    <Button
                                                                        size="sm"
                                                                        variant="outline"
                                                                        className="h-8 text-xs text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                                                                        onClick={() => handleUpdateBookingStatus(booking._id, 'completed')}
                                                                    >
                                                                        Complete
                                                                    </Button>
                                                                )}
                                                                <Button
                                                                    size="sm"
                                                                    variant="destructive"
                                                                    className="h-8 w-8 p-0"
                                                                    onClick={() => handleDeleteBooking(booking._id)}
                                                                >
                                                                    <Trash2 className="h-4 w-4" />
                                                                </Button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Contacts List */}
                    <TabsContent value="contacts">
                        <Card className="border-none shadow-sm overflow-hidden">
                            <CardHeader className="border-b border-gray-100 bg-gray-50/50 flex flex-row items-center justify-between">
                                <CardTitle>Contact Messages</CardTitle>
                                <div className="relative w-64">
                                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                    <Input
                                        placeholder="Search contacts..."
                                        className="pl-10 h-9 bg-white"
                                        value={contactSearchTerm}
                                        onChange={(e) => setContactSearchTerm(e.target.value)}
                                    />
                                </div>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="bg-gray-50/50">
                                            <tr>
                                                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                                                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">From</th>
                                                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Subject</th>
                                                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Message</th>
                                                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                                <th className="text-right py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {filteredContacts.length === 0 ? (
                                                <tr>
                                                    <td colSpan="6" className="py-12 text-center text-gray-500">
                                                        No contact messages found
                                                    </td>
                                                </tr>
                                            ) : (
                                                filteredContacts.map((contact) => (
                                                    <tr key={contact._id} className="hover:bg-gray-50/50 transition-colors">
                                                        <td className="py-4 px-6 text-sm text-gray-600">
                                                            {new Date(contact.createdAt).toLocaleDateString('en-IN', {
                                                                year: 'numeric',
                                                                month: 'short',
                                                                day: 'numeric',
                                                                hour: '2-digit',
                                                                minute: '2-digit'
                                                            })}
                                                        </td>
                                                        <td className="py-4 px-6">
                                                            <div className="font-medium text-gray-900">{contact.name}</div>
                                                            <div className="text-sm text-gray-500">{contact.email}</div>
                                                            <div className="text-xs text-gray-500">{contact.phone}</div>
                                                        </td>
                                                        <td className="py-4 px-6 text-sm font-medium text-gray-900">{contact.subject}</td>
                                                        <td className="py-4 px-6 max-w-xs">
                                                            <p className="text-sm text-gray-600 line-clamp-2">{contact.message}</p>
                                                        </td>
                                                        <td className="py-4 px-6">
                                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${contact.status === 'replied' ? 'bg-green-100 text-green-800' :
                                                                contact.status === 'archived' ? 'bg-gray-100 text-gray-800' :
                                                                    contact.status === 'read' ? 'bg-blue-100 text-blue-800' :
                                                                        'bg-yellow-100 text-yellow-800'
                                                                }`}>
                                                                {contact.status === 'replied' && <CheckCircle className="h-3 w-3 mr-1" />}
                                                                {contact.status === 'read' && <Mail className="h-3 w-3 mr-1" />}
                                                                {contact.status === 'new' && <XCircle className="h-3 w-3 mr-1" />}
                                                                {contact.status.charAt(0).toUpperCase() + contact.status.slice(1)}
                                                            </span>
                                                        </td>
                                                        <td className="py-4 px-6 text-right">
                                                            <div className="flex items-center justify-end space-x-2">
                                                                {contact.status === 'new' && (
                                                                    <Button
                                                                        size="sm"
                                                                        variant="outline"
                                                                        className="h-8 text-xs text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                                                                        onClick={() => handleUpdateContactStatus(contact._id, 'read')}
                                                                    >
                                                                        Mark Read
                                                                    </Button>
                                                                )}
                                                                {contact.status === 'read' && (
                                                                    <Button
                                                                        size="sm"
                                                                        variant="outline"
                                                                        className="h-8 text-xs text-green-600 hover:text-green-700 hover:bg-green-50"
                                                                        onClick={() => handleUpdateContactStatus(contact._id, 'replied')}
                                                                    >
                                                                        Mark Replied
                                                                    </Button>
                                                                )}
                                                                <Button
                                                                    size="sm"
                                                                    variant="destructive"
                                                                    className="h-8 w-8 p-0"
                                                                    onClick={() => handleDeleteContact(contact._id)}
                                                                >
                                                                    <Trash2 className="h-4 w-4" />
                                                                </Button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Add/Edit Product Form */}
                    <TabsContent value="add">
                        <Card className="border-none shadow-sm">
                            <CardHeader className="border-b border-gray-100 bg-gray-50/50">
                                <CardTitle>
                                    {editingProduct ? 'Edit Product Details' : 'Add New Product'}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-8">
                                <form onSubmit={handleSubmit} className="space-y-8">
                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div className="space-y-4">
                                            <h3 className="font-semibold text-gray-900 pb-2 border-b border-gray-100">Basic Information</h3>
                                            <div className="space-y-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="name">Product Name *</Label>
                                                    <Input
                                                        id="name"
                                                        name="name"
                                                        value={formData.name}
                                                        onChange={handleChange}
                                                        required
                                                        placeholder="e.g. Classic Aviator Gold"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="brand">Brand *</Label>
                                                    <Input
                                                        id="brand"
                                                        name="brand"
                                                        value={formData.brand}
                                                        onChange={handleChange}
                                                        required
                                                        placeholder="e.g. OptoLux"
                                                    />
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <Label htmlFor="price">Price (₹) *</Label>
                                                        <Input
                                                            id="price"
                                                            name="price"
                                                            type="number"
                                                            value={formData.price}
                                                            onChange={handleChange}
                                                            required
                                                            placeholder="2499"
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label htmlFor="originalPrice">Original Price (₹)</Label>
                                                        <Input
                                                            id="originalPrice"
                                                            name="originalPrice"
                                                            type="number"
                                                            value={formData.originalPrice}
                                                            onChange={handleChange}
                                                            placeholder="Optional"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <h3 className="font-semibold text-gray-900 pb-2 border-b border-gray-100">Specifications</h3>
                                            <div className="space-y-4">
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <Label htmlFor="category">Category *</Label>
                                                        <Select
                                                            value={formData.category}
                                                            onValueChange={(value) => setFormData({ ...formData, category: value })}
                                                        >
                                                            <SelectTrigger>
                                                                <SelectValue />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="eyeglasses">Eyeglasses</SelectItem>
                                                                <SelectItem value="sunglasses">Sunglasses</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label htmlFor="frameType">Frame Type *</Label>
                                                        <Select
                                                            value={formData.frameType}
                                                            onValueChange={(value) => setFormData({ ...formData, frameType: value })}
                                                        >
                                                            <SelectTrigger>
                                                                <SelectValue />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="aviator">Aviator</SelectItem>
                                                                <SelectItem value="rectangle">Rectangle</SelectItem>
                                                                <SelectItem value="round">Round</SelectItem>
                                                                <SelectItem value="square">Square</SelectItem>
                                                                <SelectItem value="cat-eye">Cat Eye</SelectItem>
                                                                <SelectItem value="wayfarer">Wayfarer</SelectItem>
                                                                <SelectItem value="wrap">Wrap</SelectItem>
                                                                <SelectItem value="rimless">Rimless</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <Label htmlFor="color">Color *</Label>
                                                        <Input
                                                            id="color"
                                                            name="color"
                                                            value={formData.color}
                                                            onChange={handleChange}
                                                            required
                                                            placeholder="e.g. black"
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label htmlFor="material">Material *</Label>
                                                        <Select
                                                            value={formData.material}
                                                            onValueChange={(value) => setFormData({ ...formData, material: value })}
                                                        >
                                                            <SelectTrigger>
                                                                <SelectValue />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="acetate">Acetate</SelectItem>
                                                                <SelectItem value="metal">Metal</SelectItem>
                                                                <SelectItem value="titanium">Titanium</SelectItem>
                                                                <SelectItem value="polycarbonate">Polycarbonate</SelectItem>
                                                                <SelectItem value="stainless-steel">Stainless Steel</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <h3 className="font-semibold text-gray-900 pb-2 border-b border-gray-100">Details & Media</h3>

                                        <div className="space-y-2">
                                            <Label htmlFor="image">Product Image *</Label>
                                            <div className="flex gap-4 items-center">
                                                <Input
                                                    id="image"
                                                    name="image"
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleImageChange}
                                                    className="cursor-pointer"
                                                    required={!editingProduct}
                                                />
                                                {(imageFile || formData.image) && (
                                                    <div className="w-12 h-12 rounded border border-gray-200 overflow-hidden flex-shrink-0">
                                                        <img src={imageFile ? URL.createObjectURL(imageFile) : formData.image} alt="Preview" className="w-full h-full object-cover" />
                                                    </div>
                                                )}
                                            </div>
                                            <p className="text-xs text-gray-500">Upload a product image (JPG, PNG, etc.)</p>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="description">Description *</Label>
                                            <Textarea
                                                id="description"
                                                name="description"
                                                value={formData.description}
                                                onChange={handleChange}
                                                required
                                                placeholder="Detailed product description..."
                                                rows={3}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="features">Features (comma-separated) *</Label>
                                            <Input
                                                id="features"
                                                name="features"
                                                value={formData.features}
                                                onChange={handleChange}
                                                required
                                                placeholder="UV Protection, Lightweight, Scratch Resistant"
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="stock">Stock Quantity</Label>
                                                <Input
                                                    id="stock"
                                                    name="stock"
                                                    type="number"
                                                    value={formData.stock}
                                                    onChange={handleChange}
                                                    placeholder="0"
                                                    min="0"
                                                />
                                            </div>
                                            <div className="flex items-end">
                                                <div className="flex items-center space-x-2 w-full">
                                                    <input
                                                        type="checkbox"
                                                        id="inStock"
                                                        name="inStock"
                                                        checked={formData.inStock}
                                                        onChange={handleChange}
                                                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                                    />
                                                    <Label htmlFor="inStock" className="cursor-pointer">
                                                        Available in Stock
                                                    </Label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-100">
                                        {editingProduct && (
                                            <Button type="button" variant="ghost" onClick={resetForm}>
                                                Cancel
                                            </Button>
                                        )}
                                        <Button type="submit" disabled={loading} className="min-w-[150px] bg-blue-600 hover:bg-blue-700">
                                            <Plus className="h-4 w-4 mr-2" />
                                            {loading ? 'Uploading...' : (editingProduct ? 'Update Product' : 'Add Product')}
                                        </Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
};

export default Admin;
