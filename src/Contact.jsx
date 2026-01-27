import React, { useState } from 'react';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { Textarea } from './components/ui/textarea';
import { Card, CardContent } from './components/ui/card';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { contactAPI } from './services/api';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateForm = () => {
        if (!formData.name || !formData.email || !formData.phone || !formData.subject || !formData.message) {
            setError('Please fill in all required fields');
            return false;
        }

        // Email validation
        const emailRegex = /^\w+([-.]?\w+)*@\w+([-.]?\w+)*(\.\w{2,3})+$/;
        if (!emailRegex.test(formData.email)) {
            setError('Please enter a valid email address');
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
            const response = await contactAPI.create(formData);

            if (response.success) {
                setSuccess(true);
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    subject: '',
                    message: ''
                });
                // Auto-hide success message after 5 seconds
                setTimeout(() => setSuccess(false), 5000);
            } else {
                setError(response.message || 'Failed to send message');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
            console.error('Contact error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-xl mx-auto mb-8">
                    <h1 className="text-2xl font-bold text-gray-900 mb-3">Get in Touch</h1>
                    <p className="text-gray-600 text-sm">
                        Have questions about our products or services? We're here to help.
                    </p>
                </div>

                {/* Success Message */}
                {success && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center max-w-3xl mx-auto">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                        <div>
                            <p className="text-green-800 font-medium">Message Sent!</p>
                            <p className="text-green-700 text-sm">We'll get back to you as soon as possible.</p>
                        </div>
                    </div>
                )}

                {/* Error Message */}
                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center max-w-3xl mx-auto">
                        <AlertCircle className="h-5 w-5 text-red-600 mr-3" />
                        <p className="text-red-800 text-sm">{error}</p>
                    </div>
                )}

                <div className="grid md:grid-cols-3 gap-6 items-start">
                    {/* Contact Info */}
                    <Card className="shadow-sm bg-white">
                        <CardContent className="p-6 pt-6 space-y-6">
                            <div className="flex items-start space-x-3">
                                <div className="bg-blue-100 p-2 rounded-lg text-blue-600 flex-shrink-0">
                                    <Phone className="h-5 w-5" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-0.5 text-sm">Phone</h3>
                                    <p className="text-gray-600 text-xs">Mon-Fri from 9am to 6pm</p>
                                    <p className="font-medium text-blue-600 mt-0.5 text-sm">+91 98765 43210</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-3">
                                <div className="bg-blue-100 p-2 rounded-lg text-blue-600 flex-shrink-0">
                                    <Mail className="h-5 w-5" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-0.5 text-sm">Email</h3>
                                    <p className="text-gray-600 text-xs">Our friendly team is here to help.</p>
                                    <p className="font-medium text-blue-600 mt-0.5 text-sm">support@optoworld.com</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-3">
                                <div className="bg-blue-100 p-2 rounded-lg text-blue-600 flex-shrink-0">
                                    <MapPin className="h-5 w-5" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-0.5 text-sm">Office</h3>
                                    <p className="text-gray-600 text-xs">Come say hello at our office HQ.</p>
                                    <p className="font-medium text-gray-900 mt-0.5 text-sm">
                                        202, Dharani Complex, BSK 1st Stage, 80 Feet Rd, Srinivasnagar, Banashankari, Bengaluru, Karnataka 560050
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Contact Form */}
                    <div className="md:col-span-2">
                        <Card className="shadow-sm bg-white">
                            <CardContent className="p-6 pt-6">
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div className="grid md:grid-cols-2 gap-5">
                                        <div className="space-y-1.5">
                                            <Label htmlFor="name" className="text-xs font-medium text-gray-700">Full Name *</Label>
                                            <Input
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                placeholder="John Doe"
                                                className="h-9"
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <Label htmlFor="email" className="text-xs font-medium text-gray-700">Email *</Label>
                                            <Input
                                                id="email"
                                                name="email"
                                                type="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="john@example.com"
                                                className="h-9"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-5">
                                        <div className="space-y-1.5">
                                            <Label htmlFor="phone" className="text-xs font-medium text-gray-700">Phone Number *</Label>
                                            <Input
                                                id="phone"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                placeholder="+91 98765 43210"
                                                className="h-9"
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <Label htmlFor="subject" className="text-xs font-medium text-gray-700">Subject *</Label>
                                            <Input
                                                id="subject"
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                placeholder="How can we help?"
                                                className="h-9"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label htmlFor="message" className="text-xs font-medium text-gray-700">Message *</Label>
                                        <Textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            placeholder="Tell us more about your inquiry..."
                                            rows={5}
                                        />
                                    </div>
                                    <Button
                                        type="submit"
                                        className="w-full md:w-auto min-w-[140px] h-9"
                                        disabled={loading}
                                    >
                                        <Send className="mr-2 h-4 w-4" />
                                        {loading ? 'Sending...' : 'Send Message'}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
