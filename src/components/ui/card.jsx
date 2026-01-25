import React from 'react';

export const Card = React.forwardRef(({ className = '', ...props }, ref) => {
    return (
        <div
            ref={ref}
            className={`rounded-lg border border-gray-200 bg-white shadow-sm ${className}`}
            {...props}
        />
    );
});

Card.displayName = 'Card';

export const CardHeader = React.forwardRef(({ className = '', ...props }, ref) => {
    return (
        <div
            ref={ref}
            className={`flex flex-col space-y-1.5 p-6 ${className}`}
            {...props}
        />
    );
});

CardHeader.displayName = 'CardHeader';

export const CardTitle = React.forwardRef(({ className = '', children, ...props }, ref) => {
    return (
        <h3
            ref={ref}
            className={`text-2xl font-semibold leading-none tracking-tight ${className}`}
            {...props}
        >
            {children}
        </h3>
    );
});

CardTitle.displayName = 'CardTitle';

export const CardContent = React.forwardRef(({ className = '', ...props }, ref) => {
    return (
        <div
            ref={ref}
            className={`p-6 pt-0 ${className}`}
            {...props}
        />
    );
});

CardContent.displayName = 'CardContent';
