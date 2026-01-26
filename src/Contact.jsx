import React from 'react';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { Textarea } from './components/ui/textarea';
import { Card, CardContent } from './components/ui/card';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-xl mx-auto mb-8">
                    <h1 className="text-2xl font-bold text-gray-900 mb-3">Get in Touch</h1>
                    <p className="text-gray-600 text-sm">
                        Have questions about our products or services? We're here to help.
                    </p>
                </div>

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
                                <form className="space-y-4">
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <Label htmlFor="firstName">First name</Label>
                                            <Input id="firstName" placeholder="John" className="h-9" />
                                        </div>
                                        <div className="space-y-1.5">
                                            <Label htmlFor="lastName">Last name</Label>
                                            <Input id="lastName" placeholder="Doe" className="h-9" />
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <Label htmlFor="email">Email</Label>
                                        <Input id="email" type="email" placeholder="john@example.com" className="h-9" />
                                    </div>

                                    <div className="space-y-1.5">
                                        <Label htmlFor="message">Message</Label>
                                        <Textarea
                                            id="message"
                                            placeholder="How can we help you?"
                                            className="min-h-[120px]"
                                        />
                                    </div>

                                    <Button type="submit" className="w-full md:w-auto h-9 px-6 text-sm">
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
