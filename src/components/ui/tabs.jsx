import React, { createContext, useContext, useState } from 'react';

const TabsContext = createContext();

export const Tabs = ({ defaultValue, className = '', children }) => {
    const [activeTab, setActiveTab] = useState(defaultValue);

    return (
        <TabsContext.Provider value={{ activeTab, setActiveTab }}>
            <div className={className}>{children}</div>
        </TabsContext.Provider>
    );
};

export const TabsList = ({ className = '', children }) => {
    return (
        <div className={`inline-flex h-10 items-center justify-center rounded-md bg-gray-100 p-1 ${className}`}>
            {children}
        </div>
    );
};

export const TabsTrigger = ({ value, className = '', children }) => {
    const { activeTab, setActiveTab } = useContext(TabsContext);
    const isActive = activeTab === value;

    return (
        <button
            onClick={() => setActiveTab(value)}
            className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 ${isActive
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                } ${className}`}
        >
            {children}
        </button>
    );
};

export const TabsContent = ({ value, className = '', children }) => {
    const { activeTab } = useContext(TabsContext);

    if (activeTab !== value) return null;

    return <div className={className}>{children}</div>;
};
