import React from 'react';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { Textarea } from './components/ui/textarea';
import { Card, CardContent } from './components/ui/card';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Get in Touch</h1>
                    <p className="text-gray-600">
                        Have questions about our products or services? We're here to help.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Contact Info */}
                    <div className="space-y-6">
                        <Card className="border-none shadow-sm h-full">
                            <CardContent className="p-8 space-y-8">
                                <div className="flex items-start space-x-4">
                                    <div className="bg-blue-100 p-3 rounded-lg text-blue-600">
                                        <Phone className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                                        <p className="text-gray-600 text-sm">Mon-Fri from 9am to 6pm</p>
                                        <p className="font-medium text-blue-600 mt-1">+91 98765 43210</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-4">
                                    <div className="bg-blue-100 p-3 rounded-lg text-blue-600">
                                        <Mail className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                                        <p className="text-gray-600 text-sm">Our friendly team is here to help.</p>
                                        <p className="font-medium text-blue-600 mt-1">support@optoworld.com</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-4">
                                    <div className="bg-blue-100 p-3 rounded-lg text-blue-600">
                                        <MapPin className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 mb-1">Office</h3>
                                        <p className="text-gray-600 text-sm">Come say hello at our office HQ.</p>
                                        <p className="font-medium text-gray-900 mt-1">
                                            123 Vision Street, Mumbai, Maharashtra 400001
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Contact Form */}
                    <div className="md:col-span-2">
                        <Card className="border-none shadow-sm">
                            <CardContent className="p-8">
                                <form className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="firstName">First name</Label>
                                            <Input id="firstName" placeholder="John" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="lastName">Last name</Label>
                                            <Input id="lastName" placeholder="Doe" />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input id="email" type="email" placeholder="john@example.com" />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="message">Message</Label>
                                        <Textarea
                                            id="message"
                                            placeholder="How can we help you?"
                                            className="min-h-[150px]"
                                        />
                                    </div>

                                    <Button type="submit" className="w-full md:w-auto">
                                        <Send className="mr-2 h-4 w-4" />
                                        Send Message
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
