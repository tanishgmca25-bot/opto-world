import React, { createContext, useContext, useState } from 'react';

const SelectContext = createContext();

export const Select = ({ value, onValueChange, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <SelectContext.Provider value={{ value, onValueChange, isOpen, setIsOpen }}>
            <div className="relative">{children}</div>
        </SelectContext.Provider>
    );
};

export const SelectTrigger = ({ className = '', children }) => {
    const { isOpen, setIsOpen } = useContext(SelectContext);

    return (
        <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className={`flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
        >
            {children}
            <svg
                className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
        </button>
    );
};

export const SelectValue = () => {
    const { value } = useContext(SelectContext);
    return <span>{value}</span>;
};

export const SelectContent = ({ className = '', children }) => {
    const { isOpen, setIsOpen } = useContext(SelectContext);

    if (!isOpen) return null;

    return (
        <>
            <div
                className="fixed inset-0 z-40"
                onClick={() => setIsOpen(false)}
            />
            <div className={`absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border border-gray-200 bg-white py-1 shadow-lg ${className}`}>
                {children}
            </div>
        </>
    );
};

export const SelectItem = ({ value, className = '', children }) => {
    const { onValueChange, setIsOpen } = useContext(SelectContext);

    return (
        <div
            onClick={() => {
                onValueChange(value);
                setIsOpen(false);
            }}
            className={`relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-gray-100 focus:bg-gray-100 ${className}`}
        >
            {children}
        </div>
    );
};
