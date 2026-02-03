import React, { useState } from 'react';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { Textarea } from './components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';
import { Calendar, CheckCircle, AlertCircle } from 'lucide-react';
import { bookingAPI } from './services/api';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const EyeTestBooking = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        location: '',
        testType: '',
        preferredDate: '',
        preferredTime: '',
        notes: ''
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    // Check login status and pre-fill user data
    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            // Not logged in - redirect to login
            navigate('/login', { state: { from: '/eye-test-booking' } });
            return;
        }

        // Pre-fill user data from localStorage
        const userName = localStorage.getItem('userName');
        const userEmail = localStorage.getItem('userEmail');
        const userPhone = localStorage.getItem('userPhone');

        setFormData(prev => ({
            ...prev,
            name: userName || '',
            email: userEmail || '',
            phone: userPhone || ''
        }));
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSelectChange = (name, value) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateForm = () => {
        if (!formData.name || !formData.email || !formData.phone || !formData.location ||
            !formData.testType || !formData.preferredDate || !formData.preferredTime) {
            setError('Please fill in all required fields');
            return false;
        }

        // Email validation
        const emailRegex = /^\w+([-.]?\w+)*@\w+([-.]?\w+)*(\.\w{2,3})+$/;
        if (!emailRegex.test(formData.email)) {
            setError('Please enter a valid email address');
            return false;
        }

        // Phone validation
        const phoneRegex = /^[0-9]{10}$/;
        const cleanedPhone = formData.phone.replace(/\D/g, '');
        if (!phoneRegex.test(cleanedPhone)) {
            setError('Please enter a valid 10-digit phone number');
            return false;
        }

        // Date validation - ensure date is in the future
        const selectedDate = new Date(formData.preferredDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (selectedDate < today) {
            setError('Please select a future date');
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);

        if (!validateForm()) {
            return;
        }

        setLoading(true);

        try {
            // Check slot availability first
            const availabilityResponse = await bookingAPI.checkAvailability(
                formData.preferredDate,
                formData.preferredTime,
                formData.location
            );

            if (!availabilityResponse.available) {
                setError('This time slot is already booked. Please select another date or time.');
                setLoading(false);
                return;
            }

            const response = await bookingAPI.create(formData);

            if (response.success) {
                setSuccess(true);
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    location: '',
                    testType: '',
                    preferredDate: '',
                    preferredTime: '',
                    notes: ''
                });
                // Auto-hide success message after 5 seconds
                setTimeout(() => setSuccess(false), 5000);
            } else {
                setError(response.message || 'Failed to create booking');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
            console.error('Booking error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Book Your Eye Test</h1>
                    <p className="text-gray-600 text-sm">
                        Professional eye examination by certified optometrists.
                    </p>
                </div>

                {/* Success Message */}
                {success && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                        <div>
                            <p className="text-green-800 font-medium">Booking Confirmed!</p>
                            <p className="text-green-700 text-sm">We'll contact you shortly to confirm your appointment.</p>
                        </div>
                    </div>
                )}

                {/* Error Message */}
                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
                        <AlertCircle className="h-5 w-5 text-red-600 mr-3" />
                        <p className="text-red-800 text-sm">{error}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Appointment Details Card */}
                    <Card className="border border-gray-200 shadow-sm bg-white">
                        <CardHeader className="border-b border-gray-100 py-4 px-6">
                            <CardTitle className="flex items-center text-base font-semibold">
                                <Calendar className="mr-2 h-4 w-4 text-blue-600" />
                                Appointment Details
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 pt-6">
                            <div className="grid grid-cols-2 gap-6 mb-6">
                                <div className="flex flex-col">
                                    <Label className="text-xs font-medium text-gray-700 mb-2">Preferred Location *</Label>
                                    <Select value={formData.location} onValueChange={(value) => handleSelectChange('location', value)}>
                                        <SelectTrigger className="h-10">
                                            <SelectValue placeholder="Select Clinic" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="banashankari">Banashankari</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="flex flex-col">
                                    <Label className="text-xs font-medium text-gray-700 mb-2">Test Type *</Label>
                                    <Select value={formData.testType} onValueChange={(value) => handleSelectChange('testType', value)}>
                                        <SelectTrigger className="h-10">
                                            <SelectValue placeholder="Select Service" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="comprehensive">Comprehensive Eye Exam (₹999)</SelectItem>
                                            <SelectItem value="contact-lens">Contact Lens Fitting (₹799)</SelectItem>
                                            <SelectItem value="driver-vision">Driving Vision Test (₹499)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="flex flex-col">
                                    <Label htmlFor="preferredDate" className="text-xs font-medium text-gray-700 mb-2">Preferred Date *</Label>
                                    <div className="relative">
                                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                                        <Input
                                            type="date"
                                            id="preferredDate"
                                            name="preferredDate"
                                            value={formData.preferredDate}
                                            onChange={handleChange}
                                            className="pl-10 h-10"
                                            min={new Date().toISOString().split('T')[0]}
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <Label className="text-xs font-medium text-gray-700 mb-2">Preferred Time *</Label>
                                    <Select value={formData.preferredTime} onValueChange={(value) => handleSelectChange('preferredTime', value)}>
                                        <SelectTrigger className="h-10">
                                            <SelectValue placeholder="Select Time" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="09:00">09:00 AM</SelectItem>
                                            <SelectItem value="10:00">10:00 AM</SelectItem>
                                            <SelectItem value="11:00">11:00 AM</SelectItem>
                                            <SelectItem value="14:00">02:00 PM</SelectItem>
                                            <SelectItem value="15:00">03:00 PM</SelectItem>
                                            <SelectItem value="16:00">04:00 PM</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Personal Information Card */}
                    <Card className="border border-gray-200 shadow-sm bg-white">
                        <CardHeader className="border-b border-gray-100 py-4 px-6">
                            <CardTitle className="text-base font-semibold">Personal Information</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 pt-6">
                            <div className="grid grid-cols-2 gap-6 mb-6">
                                <div className="flex flex-col">
                                    <Label htmlFor="name" className="text-xs font-medium text-gray-700 mb-2">Full Name *</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Enter your name"
                                        className="h-10"
                                        readOnly
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Auto-filled from your profile</p>
                                </div>
                                <div className="flex flex-col">
                                    <Label htmlFor="phone" className="text-xs font-medium text-gray-700 mb-2">Phone Number *</Label>
                                    <Input
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="+91 98765 43210"
                                        className="h-10"
                                        readOnly={!!formData.phone}
                                    />
                                    {formData.phone && <p className="text-xs text-gray-500 mt-1">Auto-filled from your profile</p>}
                                </div>
                            </div>

                            <div className="flex flex-col mb-6">
                                <Label htmlFor="email" className="text-xs font-medium text-gray-700 mb-2">Email Address *</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="your.email@example.com"
                                    className="h-10"
                                    readOnly
                                />
                                <p className="text-xs text-gray-500 mt-1">Auto-filled from your profile</p>
                            </div>

                            <div className="flex flex-col mb-6">
                                <Label htmlFor="notes" className="text-xs font-medium text-gray-700 mb-2">Additional Notes (Optional)</Label>
                                <Textarea
                                    id="notes"
                                    name="notes"
                                    value={formData.notes}
                                    onChange={handleChange}
                                    placeholder="Any specific concerns or medical history..."
                                    className="min-h-[100px]"
                                />
                            </div>

                            <div>
                                <Button
                                    type="submit"
                                    size="lg"
                                    className="w-full md:w-auto min-w-[180px] h-10 text-sm"
                                    disabled={loading}
                                >
                                    {loading ? 'Booking...' : 'Confirm Booking'}
                                </Button>
                                <p className="text-xs text-gray-500 mt-3">
                                    By booking, you agree to receive appointment reminders via SMS/Email.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </form>
            </div>
        </div>
    );
};

export default EyeTestBooking;
