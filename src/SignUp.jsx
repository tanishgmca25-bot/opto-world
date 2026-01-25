import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Eye, Mail, Lock, User } from 'lucide-react';

const SignUp = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        // Validation
        if (!formData.name || !formData.email || !formData.password) {
            setError('All fields are required');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        // Mock signup - Store in localStorage
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const userExists = users.find(u => u.email === formData.email);

        if (userExists) {
            setError('Email already registered');
            return;
        }

        const newUser = {
            id: Date.now().toString(),
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            password: formData.password,
            role: 'user',
            createdAt: new Date().toISOString()
        };

        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        alert('Account created successfully! Please login.');
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center pt-20 pb-12 px-4">
            <Card className="w-full max-w-md shadow-xl">
                <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">
                        <div className="p-3 bg-blue-100 rounded-full">
                            <Eye className="h-8 w-8 text-blue-600" />
                        </div>
                    </div>
                    <CardTitle className="text-2xl font-bold">Create Your Account</CardTitle>
                    <p className="text-gray-600 text-sm">Join Opto-World today</p>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                                {error}
                            </div>
                        )}

                        <div>
                            <Label htmlFor="name">Full Name</Label>
                            <div className="relative">
                                <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                <Input
                                    id="name"
                                    name="name"
                                    type="text"
                                    placeholder="John Doe"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="pl-10"
                                />
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="email">Email Address</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="john@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="pl-10"
                                />
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input
                                id="phone"
                                name="phone"
                                type="tel"
                                placeholder="+91 9876543210"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <Label htmlFor="password">Password</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="pl-10"
                                />
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                <Input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    placeholder="••••••••"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="pl-10"
                                />
                            </div>
                        </div>

                        <Button type="submit" className="w-full" size="lg">
                            Sign Up
                        </Button>

                        <p className="text-center text-sm text-gray-600">
                            Already have an account?{' '}
                            <Link to="/login" className="text-blue-600 hover:underline font-medium">
                                Login
                            </Link>
                        </p>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default SignUp;
