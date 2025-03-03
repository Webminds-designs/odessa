"use client";

import React, { useState } from 'react'
import { GoArrowRight } from 'react-icons/go'
import diamond from '../asset/images/Ellipse 2.png'
import Image from 'next/image'

const ShopByShape = () => {
    return (
        <div className='flex flex-col gap-4 w-full'>

            {/* forst title */}
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
                    {/* First circle with label */}
                    <div className='flex flex-col items-center'>
                        <div className='rounded-full border bg-primary w-40 h-40 p-7 mb-10'>
                            <Image
                                src={diamond}
                                alt='diamond'
                            />
                        </div>
                        <p className='font-eurostyle font-bold text-2xl text-gray-500'>Oval</p>
                    </div>

                    {/* Second circle with label */}
                    <div className='flex flex-col items-center'>
                        <div className='rounded-full border bg-primary w-40 h-40 p-7 mb-10'>
                            <Image
                                src={diamond}
                                alt='diamond'
                            />
                        </div>
                        <p className='font-eurostyle font-bold text-2xl text-gray-500'>Cushion</p>
                    </div>

                    {/* Third circle with label (larger) */}
                    <div className='flex flex-col items-center'>
                        <div 
                            style={{ boxShadow: '0 0 10px 5px rgba(89, 89, 89, 0.5)' }}
                            className='rounded-full border bg-primary w-48 h-48 p-5 mb-6'
                        >
                            <Image
                                src={diamond}
                                alt='diamond'
                            />
                        </div>
                        <p className='font-eurostyle font-extrabold text-4xl'>Round</p>
                    </div>

                    {/* Fourth circle with label */}
                    <div className='flex flex-col items-center'>
                        <div className='rounded-full border bg-primary w-40 h-40 p-7 mb-10'>
                            <Image
                                src={diamond}
                                alt='diamond'
                            />
                        </div>
                        <p className='font-eurostyle font-bold text-2xl text-gray-500'>Princess</p>
                    </div>

                    {/* Fifth circle with label */}
                    <div className='flex flex-col items-center'>
                        <div className='rounded-full border bg-primary w-40 h-40 p-7 mb-10'>
                            <Image
                                src={diamond}
                                alt='diamond'
                            />
                        </div>
                        <p className='font-eurostyle font-bold text-2xl text-gray-500'>Pear</p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ShopByShape;
