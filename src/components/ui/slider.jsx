import React from 'react';

export const Slider = React.forwardRef(({
    className = '',
    min = 0,
    max = 100,
    step = 1,
    value = [0, 100],
    onValueChange,
    ...props
}, ref) => {
    const handleChange = (e, index) => {
        const newValue = [...value];
        newValue[index] = Number(e.target.value);
        if (onValueChange) {
            onValueChange(newValue);
        }
    };

    return (
        <div className={`relative flex items-center ${className}`}>
            <input
                ref={ref}
                type="range"
                min={min}
                max={max}
                step={step}
                value={value[0]}
                onChange={(e) => handleChange(e, 0)}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                {...props}
            />
        </div>
    );
});

Slider.displayName = 'Slider';
