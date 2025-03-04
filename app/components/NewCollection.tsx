"use client";

import React, { useState, useEffect } from 'react'
import { GoArrowRight, GoArrowLeft } from 'react-icons/go'
import diamond from '../asset/Images/Ellipse 1.png'
import bgimg from '../asset/Images/bgimg1.png'
import gem from '../asset/Images/gem1.png'
import Image from 'next/image'

const NewCollection = () => {
    // Add state to track current slide
    const [currentIndex, setCurrentIndex] = useState(0);
    // Add state for transitions
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [fadeState, setFadeState] = useState('fade-in');

    const diamonds = [
        { 
            id: 0, 
            title: 'Introducing Pear Diamond Cluster', 
            subtitle: 'Subtitle of the item', 
            description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. ',
            image: gem
        },
        { 
            id: 1, 
            title: 'Introducing Pear Diamond Cluster', 
            subtitle: 'Subtitle of the item', 
            description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. ',
            image: gem
        },
        { 
            id: 2, 
            title: 'Introducing Pear Diamond Cluster', 
            subtitle: 'Subtitle of the item', 
            description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. ',
            image: gem
        },
        { 
            id: 3, 
            title: 'Introducing Pear Diamond Cluster', 
            subtitle: 'Subtitle of the item', 
            description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. ',
            image: gem
        },
        { 
            id: 4, 
            title: 'Introducing Pear Diamond Cluster', 
            subtitle: 'Subtitle of the item', 
            description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. ',
            image: gem
        },
    ]

    // Navigation functions with animation handling
    const goToPrevious = () => {
        if (isTransitioning) return;
        
        setFadeState('fade-out');
        setIsTransitioning(true);
        
        setTimeout(() => {
            setCurrentIndex((prevIndex) => 
                prevIndex === 0 ? diamonds.length - 1 : prevIndex - 1
            );
            setFadeState('fade-in');
            setTimeout(() => setIsTransitioning(false), 500);
        }, 300);
    };

    const goToNext = () => {
        if (isTransitioning) return;
        
        setFadeState('fade-out');
        setIsTransitioning(true);
        
        setTimeout(() => {
            setCurrentIndex((prevIndex) => 
                prevIndex === diamonds.length - 1 ? 0 : prevIndex + 1
            );
            setFadeState('fade-in');
            setTimeout(() => setIsTransitioning(false), 500);
        }, 300);
    };

    // Get current diamond data
    const currentDiamond = diamonds[currentIndex];

    return (
        <div className='flex flex-col w-full gap-10'>

            {/* Title 1 */}
            <div className='flex justify-between items-end'>

                <div className='flex gap-10 items-end'>

                    <p className='font-vasion text-9xl'>NEW</p>

                    <p className='font-aeonikregularitalic text-2xl text-gray-300 flex flex-col'>
                        <span>EXPLORE THE POSSIBILITIES OF </span>
                        <span>TAILORED CREAFTMANSHIP AND </span>
                        <span>UNLIMITED CAPABILITIES</span>
                    </p>

                </div>

                <div className='flex'>

                    <div className='flex relative'>
                        <div className='flex items-center justify-center rounded-full h-20 w-20 border absolute right-0'></div>
                        <div className='flex items-center justify-center rounded-full h-20 w-20 border absolute right-16 p-3'>
                            <Image
                                src={diamond}
                                alt='diamond'
                            />
                        </div>
                        <div className='flex items-center justify-center rounded-full h-20 w-20 border absolute right-32'></div>
                    </div>

                    <div className='flex items-center justify-center rounded-full h-20 w-20 bg-brown hover:bg-primary hover:border transition-colors duration-300 cursor-pointer'>
                        <GoArrowRight className='text-white text-6xl' />
                    </div>

                    <div className='flex items-center justify-center h-20 px-10 border rounded-full hover:scale-95 transition-all duration-300 cursor-pointer'>
                        <p className='font-aeonikregularitalic text-2xl'>try it now!</p>
                    </div>

                </div>

            </div>

            {/* Title 2 */}
            <div className='flex justify-end'>
                <p className='font-vasion text-9xl'>COLLECTION</p>
            </div>

            {/* Full-width carousel without padding */}
            <div className="relative w-full mx-[-5vw]"> {/* Negative margin to break out of container */}
                <div
                    className="flex w-[calc(100%+10vw)] h-[40vw] bg-cover bg-center"
                    style={{ backgroundImage: `url(${bgimg.src})` }}
                >
                    
                    <div className='w-3/5 relative overflow-hidden'>
                        <div className={`transition-all duration-500 ${fadeState === 'fade-out' ? 'opacity-0 scale-105' : 'opacity-100 scale-100'}`}>
                            <Image 
                                src={currentDiamond.image}
                                alt={currentDiamond.title}
                                className='w-full h-full'
                                key={`image-${currentIndex}`}
                            />
                        </div>
                        <GoArrowLeft 
                            onClick={goToPrevious}
                            className='absolute bottom-5 right-2 text-white text-2xl cursor-pointer hover:-translate-x-2 transform transition-transform duration-300'
                        />
                    </div>

                    <div className='flex flex-col relative gap-5 w-2/5 bg-zinc-900 opacity-70 py-10 px-20'>
                        <div className='flex justify-end'>
                            <div className='flex justify-center items-center py-1 px-5 border rounded-full cursor-pointer hover:scale-105 transition-transform duration-500'>
                                <GoArrowRight className='text-white text-3xl' />
                            </div>
                        </div>
                        
                        <div className={`transition-all duration-500 ${fadeState === 'fade-out' ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'}`}>
                            <p className='font-vasion text-4xl'>{currentDiamond.title}</p>
                        </div>
                        
                        <div className={`transition-all duration-500 delay-100 ${fadeState === 'fade-out' ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'}`}>
                            <p className='font-vasion text-xl text-brown'>{currentDiamond.subtitle}</p>
                        </div>
                        
                        <div className={`transition-all duration-500 delay-200 ${fadeState === 'fade-out' ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'}`}>
                            <p className='font-vasion text-xl'>
                                <span>{currentDiamond.description}</span>
                                <span className='text-brown'>See More...</span>
                            </p>
                        </div>
                        
                        <GoArrowRight 
                            onClick={goToNext}
                            className='absolute bottom-5 left-2 text-brown text-2xl cursor-pointer hover:translate-x-2 transform transition-transform duration-300' 
                        />
                    </div>
                    
                </div>
                
            </div>

        </div>
    )
}

export default NewCollection
