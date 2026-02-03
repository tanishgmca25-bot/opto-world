import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from './components/ui/button';
import { Badge } from './components/ui/badge';
import { Card, CardContent } from './components/ui/card';
import { productAPI, reviewAPI } from './services/api';
import { Star, Truck, Shield, RotateCcw, Plus, Minus, ShoppingCart, Heart, Check, ThumbsUp, MessageSquare } from 'lucide-react';
import { useCart } from './contexts/CartContext';
import { useWishlist } from './contexts/WishlistContext';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
    const [isAdding, setIsAdding] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    // Review states
    const [reviews, setReviews] = useState([]);
    const [reviewsLoading, setReviewsLoading] = useState(true);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [comment, setComment] = useState('');
    const [submittingReview, setSubmittingReview] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await productAPI.getById(id);
                if (response.success) {
                    setProduct(response.product);
                }
            } catch (error) {
                console.error('Error fetching product:', error);
            } finally {
                setLoading(false);
            }
        };

        const fetchReviews = async () => {
            try {
                const response = await reviewAPI.getAll(id);
                if (response.success) {
                    // Ensure reviews is always an array
                    const reviewsData = response.reviews || [];
                    setReviews(Array.isArray(reviewsData) ? reviewsData : []);
                }
            } catch (error) {
                console.error('Error fetching reviews:', error);
                setReviews([]); // Set to empty array on error
            } finally {
                setReviewsLoading(false);
            }
        };

        fetchProduct();
        fetchReviews();
    }, [id]);

    const handleAddToCart = async () => {
        if (isAdding || !product.inStock) return;

        setIsAdding(true);
        const result = await addToCart(product._id, quantity);
        setIsAdding(false);

        if (result.success) {
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 2000);
        } else if (result.error && result.error.includes('stock')) {
            // Show stock limit error
            alert(result.error);
        }
    };

    const handleWishlistToggle = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login', { state: { from: `/product/${id}` } });
            return;
        }

        if (isInWishlist(id)) {
            await removeFromWishlist(id);
        } else {
            await addToWishlist(id);
        }
    };

    const handleSubmitReview = async (e) => {
        e.preventDefault();

        // Check if user is logged in
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login', { state: { from: `/product/${id}` } });
            return;
        }

        if (rating === 0) {
            alert('Please select a rating');
            return;
        }

        setSubmittingReview(true);
        try {
            const response = await reviewAPI.create(id, rating, comment);
            if (response.success) {
                // Refresh reviews
                const reviewsResponse = await reviewAPI.getAll(id);
                if (reviewsResponse.success) {
                    // Ensure reviews is always an array
                    const reviewsData = reviewsResponse.reviews || [];
                    setReviews(Array.isArray(reviewsData) ? reviewsData : []);
                }
                // Reset form
                setRating(0);
                setComment('');
                setShowReviewForm(false);
                alert('Review submitted successfully!');
            } else {
                alert(response.message || 'Failed to submit review');
            }
        } catch (error) {
            console.error('Error submitting review:', error);
            alert('Failed to submit review');
        } finally {
            setSubmittingReview(false);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading product...</p>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-xl text-gray-600 mb-4">Product not found</p>
                    <Button onClick={() => window.history.back()}>Go Back</Button>
                </div>
            </div>
        );
    }

    const images = product.images || [product.image];

    // Calculate discount
    const discount = product.originalPrice
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : 0;

    // Parse features if it's a string
    const features = typeof product.features === 'string'
        ? product.features.split(',').map(f => f.trim())
        : product.features || [];

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                {/* Product Section */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="grid md:grid-cols-2 gap-0">
                        {/* Image Gallery */}
                        <div className="p-6 bg-gray-50/50">
                            <div className="relative aspect-square rounded-2xl overflow-hidden bg-white mb-4 p-6 flex items-center justify-center border border-gray-100">
                                {discount > 0 && (
                                    <Badge className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 text-sm">
                                        {discount}% OFF
                                    </Badge>
                                )}
                                <img
                                    src={images[selectedImage]}
                                    alt={product.name}
                                    className="max-w-full max-h-full object-contain mix-blend-multiply hover:scale-110 transition-transform duration-500"
                                />
                            </div>
                            {images.length > 1 && (
                                <div className="grid grid-cols-4 gap-3">
                                    {images.map((img, index) => (
                                        <div
                                            key={index}
                                            onClick={() => setSelectedImage(index)}
                                            className={`aspect-square rounded-xl bg-white p-2 border cursor-pointer transition-all ${selectedImage === index
                                                ? 'border-blue-600 ring-2 ring-blue-100'
                                                : 'border-gray-200 hover:border-blue-300'
                                                }`}
                                        >
                                            <img
                                                src={img}
                                                alt={`${product.name} ${index + 1}`}
                                                className="w-full h-full object-contain mix-blend-multiply"
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Product Info */}
                        <div className="p-6 md:p-8 flex flex-col h-full bg-white">
                            <div className="flex-1">
                                <div className="flex items-center space-x-2 text-sm text-blue-600 font-medium mb-1">
                                    <span className="uppercase">{product.brand}</span>
                                    <span>•</span>
                                    <span className="capitalize">{product.category}</span>
                                </div>
                                <h1 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h1>

                                <div className="flex items-center space-x-4 mb-4">
                                    <div className="flex">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`h-4 w-4 ${i < Math.round(product.rating || 0) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-gray-500 text-sm">
                                        {product.rating || 0} ({reviews.length} reviews)
                                    </span>
                                </div>

                                <div className="flex items-baseline space-x-4 mb-6">
                                    <span className="text-3xl font-bold text-gray-900">₹{product.price}</span>
                                    {product.originalPrice && (
                                        <>
                                            <span className="text-lg text-gray-400 line-through">₹{product.originalPrice}</span>
                                            <span className="text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded text-sm">
                                                Save ₹{product.originalPrice - product.price}
                                            </span>
                                        </>
                                    )}
                                </div>

                                <p className="text-gray-600 text-sm leading-relaxed mb-6 border-b border-gray-100 pb-6">
                                    {product.description}
                                </p>

                                <div className="grid grid-cols-2 gap-y-4 text-sm mb-6">
                                    <div>
                                        <span className="text-gray-500 block text-xs">Frame Type</span>
                                        <span className="font-medium capitalize">{product.frameType}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-500 block text-xs">Material</span>
                                        <span className="font-medium capitalize">{product.material}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-500 block text-xs">Color</span>
                                        <span className="font-medium capitalize">{product.color}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-500 block text-xs">Availability</span>
                                        <span className={`font-medium ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                                            {product.inStock ? 'In Stock' : 'Out of Stock'}
                                        </span>
                                    </div>
                                </div>

                                {features.length > 0 && (
                                    <div className="mb-6">
                                        <h3 className="font-semibold mb-2 text-sm">Key Features</h3>
                                        <ul className="grid grid-cols-2 gap-2">
                                            {features.map((feature, index) => (
                                                <li key={index} className="flex items-center text-xs text-gray-600">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mr-2"></div>
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>

                            <div className="space-y-4 pt-4 border-t border-gray-100">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="font-medium text-gray-700 text-sm">Quantity</span>
                                    <div className="flex items-center border border-gray-200 rounded-md h-9">
                                        <button
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            disabled={quantity <= 1}
                                            className="px-2 hover:bg-gray-100 text-gray-600 h-full disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <Minus className="h-3 w-3" />
                                        </button>
                                        <span className="w-10 text-center font-medium text-sm">{quantity}</span>
                                        <button
                                            onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                                            disabled={quantity >= product.stock}
                                            className="px-2 hover:bg-gray-100 text-gray-600 h-full disabled:opacity-50 disabled:cursor-not-allowed"
                                            title={quantity >= product.stock ? 'Maximum stock reached' : ''}
                                        >
                                            <Plus className="h-3 w-3" />
                                        </button>
                                    </div>
                                </div>

                                {/* Stock availability message */}
                                {product.stock > 0 && product.stock < 10 && (
                                    <div className="mb-4 text-orange-600 text-sm font-medium">
                                        ⚠️ Only {product.stock} left in stock!
                                    </div>
                                )}
                                {product.stock === 0 && (
                                    <div className="mb-4 text-red-600 text-sm font-medium">
                                        Out of stock
                                    </div>
                                )}

                                <div className="flex gap-3">
                                    <Button
                                        size="lg"
                                        onClick={handleAddToCart}
                                        disabled={!product.inStock || isAdding}
                                        className={`flex-1 h-11 text-base ${showSuccess
                                            ? 'bg-green-600 hover:bg-green-700'
                                            : 'bg-gray-900 hover:bg-black'
                                            }`}
                                    >
                                        {isAdding ? (
                                            <>
                                                <div className="h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                Adding...
                                            </>
                                        ) : showSuccess ? (
                                            <>
                                                <Check className="mr-2 h-4 w-4" />
                                                Added to Cart!
                                            </>
                                        ) : (
                                            <>
                                                <ShoppingCart className="mr-2 h-4 w-4" />
                                                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                                            </>
                                        )}
                                    </Button>
                                    <Button
                                        size="lg"
                                        variant="outline"
                                        onClick={handleWishlistToggle}
                                        className="h-11 px-4 border-gray-300"
                                    >
                                        <Heart className={`h-5 w-5 transition-colors ${product && isInWishlist(product._id)
                                            ? 'fill-red-500 text-red-500'
                                            : 'text-gray-600'
                                            }`} />
                                    </Button>
                                </div>

                                <div className="grid grid-cols-3 gap-4 pt-6 text-center text-xs text-gray-500">
                                    <div className="flex flex-col items-center">
                                        <Shield className="h-5 w-5 mb-1 text-gray-400" />
                                        <span>2 Year Warranty</span>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <RotateCcw className="h-5 w-5 mb-1 text-gray-400" />
                                        <span>30 Day Returns</span>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <Truck className="h-5 w-5 mb-1 text-gray-400" />
                                        <span>Free Shipping</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Reviews Section */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden p-6 md:p-8">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-3">
                            <MessageSquare className="h-6 w-6 text-blue-600" />
                            <h2 className="text-2xl font-bold text-gray-900">Customer Reviews</h2>
                            <span className="text-gray-500">({reviews.length})</span>
                        </div>
                        <Button onClick={() => setShowReviewForm(!showReviewForm)}>
                            Write a Review
                        </Button>
                    </div>

                    {/* Review Form */}
                    {showReviewForm && (
                        <Card className="mb-6 border-blue-100 bg-blue-50/30">
                            <CardContent className="p-6">
                                <h3 className="font-semibold text-lg mb-4">Write Your Review</h3>
                                <form onSubmit={handleSubmitReview} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">
                                            Rating<span className="text-red-500">*</span>
                                        </label>
                                        <div className="flex space-x-2">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <button
                                                    key={star}
                                                    type="button"
                                                    onClick={() => setRating(star)}
                                                    onMouseEnter={() => setHoverRating(star)}
                                                    onMouseLeave={() => setHoverRating(0)}
                                                    className="transition-colors"
                                                >
                                                    <Star
                                                        className={`h-8 w-8 ${star <= (hoverRating || rating)
                                                            ? 'fill-yellow-400 text-yellow-400'
                                                            : 'text-gray-300'
                                                            }`}
                                                    />
                                                </button>
                                            ))}
                                            <span className="ml-2 text-sm text-gray-600 self-center">
                                                {rating > 0 && `${rating} star${rating > 1 ? 's' : ''}`}
                                            </span>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">
                                            Comment<span className="text-red-500">*</span>
                                        </label>
                                        <textarea
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                            placeholder="Share your experience with this product..."
                                            rows={4}
                                            minLength={10}
                                            maxLength={500}
                                            required
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                        <p className="text-xs text-gray-500 mt-1">{comment.length}/500 characters</p>
                                    </div>
                                    <div className="flex gap-3">
                                        <Button type="submit" disabled={submittingReview || rating === 0 || comment.length < 10}>
                                            {submittingReview ? 'Submitting...' : 'Submit Review'}
                                        </Button>
                                        <Button type="button" variant="outline" onClick={() => setShowReviewForm(false)}>
                                            Cancel
                                        </Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    )}

                    {/* Reviews List */}
                    <div className="space-y-4">
                        {reviewsLoading ? (
                            <div className="text-center py-8">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                                <p className="text-gray-500 text-sm">Loading reviews...</p>
                            </div>
                        ) : reviews.length === 0 ? (
                            <div className="text-center py-12 bg-gray-50 rounded-lg">
                                <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                                <p className="text-gray-500 text-lg font-medium">No reviews yet</p>
                                <p className="text-gray-400 text-sm mt-1">Be the first to review this product!</p>
                            </div>
                        ) : (
                            reviews.map((review) => (
                                <Card key={review._id} className="border-gray-200">
                                    <CardContent className="p-5">
                                        <div className="flex justify-between items-start mb-3">
                                            <div>
                                                <div className="flex items-center space-x-2 mb-1">
                                                    <span className="font-semibold text-gray-900">{review.userName}</span>
                                                    <span className="text-xs text-gray-400">•</span>
                                                    <span className="text-xs text-gray-500">{formatDate(review.createdAt)}</span>
                                                </div>
                                                <div className="flex">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star
                                                            key={i}
                                                            className={`h-4 w-4 ${i < review.rating
                                                                ? 'fill-yellow-400 text-yellow-400'
                                                                : 'text-gray-300'
                                                                }`}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-gray-700 text-sm leading-relaxed mb-3">{review.comment}</p>
                                        <div className="flex items-center space-x-4 text-xs">
                                            <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-600 transition-colors">
                                                <ThumbsUp className="h-3 w-3" />
                                                <span>Helpful ({review.helpful || 0})</span>
                                            </button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
