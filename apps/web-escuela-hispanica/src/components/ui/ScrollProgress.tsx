'use client';

import React, { useState, useEffect } from 'react';

export default function ScrollProgress() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPos = window.scrollY;
            if (totalHeight > 0) {
                setProgress((scrollPos / totalHeight) * 100);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="fixed top-0 left-0 w-full h-[2px] z-[100] bg-white/5">
            <div
                className="h-full bg-[#c5a059] transition-all duration-300 shadow-[0_0_10px_#c5a059]"
                style={{ width: `${progress}%` }}
            />
        </div>
    );
}
