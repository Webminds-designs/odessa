"use client";

import React, { useState, useEffect } from 'react'
import { GoArrowRight } from 'react-icons/go'
import diamond from '../asset/images/Ellipse 2.png'
import Image from 'next/image'

const shapesData = [
    { id: 0, name: "Oval", src: diamond },
    { id: 1, name: "Cushion", src: diamond },
    { id: 2, name: "Round", src: diamond },
    { id: 3, name: "Princess", src: diamond },
    { id: 4, name: "Pear", src: diamond },
];

const ShopByShape = () => {
    const [currentShapes, setCurrentShapes] = useState(shapesData);
    
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentShapes(prevShapes => {
                // Create a copy of the array
                const newShapes = [...prevShapes];
                // Take the last item
                const lastItem = newShapes.pop();
                // Put it at the beginning
                if (lastItem) newShapes.unshift(lastItem);
                return newShapes;
            });
        }, 3000);
        
        // Clean up interval on component unmount
        return () => clearInterval(interval);
    }, []);

    return (
        <div className='flex flex-col gap-4 w-full'>

            {/* first title */}
            <div className='flex justify-between items-center w-full'>
                <p className='font-vasion text-9xl'>Shop Diamond</p>

                <div className='flex'>
                    <div className='flex items-center justify-center rounded-full h-20 w-20 bg-brown'>
                        <GoArrowRight className='text-white text-6xl' />
                    </div>
                    <div className='flex items-center justify-center h-20 px-10 border rounded-full'>
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
            <div className='relative mt-56'>
                {/* single line */}
                <div className='relative flex items-center z-0 translate-y-20'>
                    <div className='h-3 w-3 rounded-full bg-white' />
                    <div className='h-1 w-full bg-white' />
                    <div className='h-3 w-3 rounded-full bg-white' />
                </div>

                {/* circles container */}
                <div className='absolute top-0 left-0 right-0 flex justify-evenly items-center z-10'>
                    {currentShapes.map((shape, index) => {
                        return (
                            <div key={shape.id} className='flex flex-col items-center'>
                                <div className={`rounded-full border bg-primary p-7 mb-10 ${index === 2 ? `w-48 h-48` : `w-40 h-40`}`}>
                                    <Image
                                        src={shape.src}
                                        alt='diamond'
                                    />
                                </div>
                                <p className={`font-eurostyle ${index === 2 ? `font-extrabold text-4xl` : `font-bold text-2xl text-gray-500`}`}>{shape.name}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default ShopByShape;
