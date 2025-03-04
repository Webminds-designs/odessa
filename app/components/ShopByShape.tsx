"use client";

import React, { useState, useEffect } from 'react'
import { GoArrowRight } from 'react-icons/go'
import diamond2 from '../asset/images/Ellipse 2.png'
import diamond1 from '../asset/images/Ellipse 1.png'
import Image from 'next/image'

const shapesData = [
    { id: 0, name: "Oval", src: diamond2 },
    { id: 1, name: "Cushion", src: diamond1 },
    { id: 2, name: "Round", src: diamond2 },
    { id: 3, name: "Princess", src: diamond1 },
    { id: 4, name: "Pear", src: diamond2 },
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
                <p className='font-vasion text-9xl'>Shop Diamond</p>

                <div className='flex'>
                    <div className='flex items-center justify-center rounded-full h-20 w-20 bg-brown hover:bg-primary hover:border transition-colors duration-300 cursor-pointer'>
                        <GoArrowRight className='text-white text-6xl' />
                    </div>
                    <div className='flex items-center justify-center h-20 px-10 border rounded-full hover:scale-95 transition-all duration-300 cursor-pointer'>
                        <p className='font-aeonikregularitalic text-2xl'>try it now!</p>
                    </div>
                </div>
            </div>

            {/* second title */}
            <div className='flex justify-end items-center gap-10'>
                <p className='flex flex-col font-aeonikregularitalic text-2xl text-gray-300'>
                    <span>EXPLORE THE POSSIBILITIES OF TAILORED </span>
                    <span>CREAFTMANSHIP AND UNLIMITED </span>
                    <span>CAPABILITIES</span>
                </p>

                <p className='font-vasion text-9xl'>by Shape</p>
            </div>

            {/* diamond slider */}
            <div className='relative mt-30 h-80'>
                {/* single line - lowered z-index */}
                <div className='relative flex items-center z-[-1] translate-y-23'>
                    <div className='h-3 w-3 rounded-full bg-white' />
                    <div className='h-1 w-full bg-white' />
                    <div className='h-3 w-3 rounded-full bg-white' />
                </div>

                {/* circles container - add a parent container with background */}
                <div className='absolute top-0 left-0 right-0 flex justify-evenly items-center z-10 bg-transparent'>
                    {currentShapes.map((shape, index) => {
                        return (
                            <div 
                                key={shape.id} 
                                className={`
                                    flex flex-col items-center
                                    transition-all duration-700 ease-out
                                    ${isTransitioning ? 'transform-gpu' : ''}
                                `}
                            >
                                <div 
                                    className={`
                                        rounded-full border bg-primary p-7 mb-10
                                        transition-all duration-700 ease-out
                                        hover:shadow-lg hover:shadow-amber-100/20
                                        ${index === 2 ? `w-48 h-48` : `w-40 h-40`}
                                        ${index === 2 ? 'hover:scale-105' : 'hover:scale-110'}
                                    `}
                                >
                                    <Image
                                        src={shape.src}
                                        alt={shape.name}
                                        className={`
                                            transition-all duration-700 ease-out
                                            ${index === 2 ? 'animate-[spin_30s_linear_infinite]' : ''}
                                        `}
                                    />
                                </div>
                                <p 
                                    className={`
                                        font-eurostyle 
                                        transition-all duration-700 ease-in-out
                                        transform
                                        ${index === 2 ? `font-extrabold text-4xl` : `font-bold text-2xl text-gray-500`}
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
