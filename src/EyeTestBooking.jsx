import React from 'react';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { Textarea } from './components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';
import { Calendar, Clock } from 'lucide-react';

const EyeTestBooking = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Book Your Eye Test</h1>
                    <p className="text-gray-600 text-sm">
                        Professional eye examination by certified optometrists.
                    </p>
                </div>

                <div className="grid gap-5">
                    <Card className="border-none shadow-md">
                        <CardHeader className="border-b border-gray-100 bg-gray-50/50 py-4">
                            <CardTitle className="flex items-center text-base font-semibold">
                                <Calendar className="mr-2 h-4 w-4 text-blue-600" />
                                Appointment Details
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-5 space-y-5">
                            <div className="grid md:grid-cols-2 gap-5">
                                <div className="space-y-1.5">
                                    <Label className="text-xs">Preferred Location</Label>
                                    <Select>
                                        <SelectTrigger className="h-9">
                                            <SelectValue placeholder="Select Clinic" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="mumbai-central">Mumbai Central Clinic</SelectItem>
                                            <SelectItem value="bandra-west">Bandra West Clinic</SelectItem>
                                            <SelectItem value="andheri-east">Andheri East Clinic</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-1.5">
                                    <Label className="text-xs">Test Type</Label>
                                    <Select>
                                        <SelectTrigger className="h-9">
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

                            <div className="grid md:grid-cols-2 gap-5">
                                <div className="space-y-1.5">
                                    <Label className="text-xs">Preferred Date</Label>
                                    <div className="relative">
                                        <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                        <Input type="date" className="pl-9 h-9" />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <Label className="text-xs">Preferred Time</Label>
                                    <div className="relative">
                                        <Clock className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                        <Select>
                                            <SelectTrigger className="pl-9 h-9">
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
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-md">
                        <CardHeader className="border-b border-gray-100 bg-gray-50/50 py-4">
                            <CardTitle className="text-base font-semibold">Personal Information</CardTitle>
                        </CardHeader>
                        <CardContent className="p-5 space-y-5">
                            <div className="grid md:grid-cols-2 gap-5">
                                <div className="space-y-1.5">
                                    <Label htmlFor="name" className="text-xs">Full Name</Label>
                                    <Input id="name" placeholder="Enter your name" className="h-9" />
                                </div>
                                <div className="space-y-1.5">
                                    <Label htmlFor="phone" className="text-xs">Phone Number</Label>
                                    <Input id="phone" placeholder="+91 98765 43210" className="h-9" />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <Label htmlFor="notes" className="text-xs">Additional Notes (Optional)</Label>
                                <Textarea
                                    id="notes"
                                    placeholder="Any specific concerns or medical history..."
                                    className="min-h-[80px]"
                                />
                            </div>

                            <div className="pt-2">
                                <Button size="lg" className="w-full md:w-auto min-w-[180px] h-10 text-sm">
                                    Confirm Booking
                                </Button>
                                <p className="text-xs text-gray-500 mt-3 text-center md:text-left">
                                    By booking, you agree to receive appointment reminders via SMS/Email.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default EyeTestBooking;
