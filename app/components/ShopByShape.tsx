"use client";

import React, { useState, useEffect } from 'react'
import { GoArrowRight } from 'react-icons/go'

const shapesData = [
    { id: 0, name: "Oval", src: '/images/diamond1.png' },
    { id: 1, name: "Cushion", src: '/images/diamond2.png' },
    { id: 2, name: "Round", src: '/images/diamond2.png' },
    { id: 3, name: "Princess", src: '/images/diamond1.png' },
    { id: 4, name: "Pear", src: '/images/diamond1.png' },
];

const ShopByShape = () => {
    const [currentShapes, setCurrentShapes] = useState(shapesData);
    const [isTransitioning, setIsTransitioning] = useState(false);
    
    useEffect(() => {
        const interval = setInterval(() => {
            setIsTransitioning(true);
            
            // Wait longer before changing shapes
            setTimeout(() => {
                setCurrentShapes(prevShapes => {
                    const newShapes = [...prevShapes];
                    const lastItem = newShapes.pop();
                    if (lastItem) newShapes.unshift(lastItem);
                    return newShapes;
                });
                
                // Allow more time for the transition to complete
                setTimeout(() => {
                    setIsTransitioning(false);
                }, 600);
            }, 100);
        }, 5000); // Longer interval for better user experience
        
        return () => clearInterval(interval);
    }, []);

    return (
        <div className='flex flex-col gap-4 w-full'>

            {/* first title */}
            <div className='flex justify-between items-center w-full'>
                <p className='font-vasion text-7xl lg:text-9xl'>Shop Diamond</p>

                <div className='flex'>
                    <div className='flex items-center justify-center rounded-full lg:h-20 lg:w-20 h-16 w-16 bg-brown hover:bg-primary hover:border transition-colors duration-300 cursor-pointer'>
                        <GoArrowRight className='text-white text-4xl lg:text-6xl' />
                    </div>
                    <div className='flex items-center justify-center lg:h-20 md:h-16 lg:px-10 px-8 border rounded-full hover:scale-95 transition-all duration-300 cursor-pointer'>
                        <p className='font-aeonikregularitalic lg:text-2xl text-xl'>try it now!</p>
                    </div>
                </div>
            </div>

            {/* second title */}
            <div className='flex justify-end items-center gap-10'>
                <p className='flex flex-col font-aeonikregularitalic text-lg lg:text-2xl text-gray-300'>
                    <span>EXPLORE THE POSSIBILITIES OF TAILORED </span>
                    <span>CREAFTMANSHIP AND UNLIMITED </span>
                    <span>CAPABILITIES</span>
                </p>

                <p className='font-vasion text-7xl lg:text-9xl'>by Shape</p>
            </div>

            {/* diamond slider */}
            <div className='relative mt-16 md:mt-30 h-auto md:h-80 overflow-hidden'>
                
                <div className='relative flex items-center z-10 translate-y-10 md:translate-y-23 px-4 md:px-0'>
                    <div className='h-2 md:h-3 w-2 md:w-3 rounded-full bg-white' />
                    <div className='h-0.5 md:h-1 w-full bg-white' />
                    <div className='h-2 md:h-3 w-2 md:w-3 rounded-full bg-white' />
                </div>

                <div className='absolute top-0 left-0 right-0 flex flex-wrap md:flex-nowrap justify-center md:justify-evenly items-center z-10 bg-transparent px-2 md:px-6'>
                    {currentShapes.map((shape, index) => {
                        return (
                            <div 
                                key={shape.id} 
                                className={`
                                    flex flex-col items-center mx-1 sm:mx-2 md:mx-0
                                    transition-all duration-700 ease-out
                                    ${isTransitioning ? 'transform-gpu' : ''}
                                `}
                            >
                                <div 
                                    className={`
                                        rounded-full border bg-primary p-3 sm:p-5 md:p-7 mb-4 md:mb-10
                                        transition-all duration-700 ease-out
                                        hover:shadow-lg hover:shadow-amber-100/20
                                        ${index === 2 ? 
                                            `w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48` : 
                                            `w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40`}
                                        ${index === 2 ? 'hover:scale-105' : 'hover:scale-110'}
                                    `}
                                >
                                    <img
                                        src={shape.src}
                                        alt={shape.name}
                                        className={`
                                            transition-all duration-700 ease-out w-full h-full object-contain
                                            ${index === 2 ? 'animate-[spin_30s_linear_infinite]' : ''}
                                        `}
                                    />
                                </div>
                                <p 
                                    className={`
                                        font-eurostyle text-center
                                        transition-all duration-700 ease-in-out
                                        transform
                                        ${index === 2 ? 
                                            `font-extrabold text-2xl md:text-4xl` : 
                                            `font-bold text-lg md:text-2xl text-gray-500`}
                                        ${isTransitioning ? '-translate-x-2' : 'opacity-100'}
                                    `}
                                >
                                    {shape.name}
                                </p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default ShopByShape;
