import React from 'react'
import { GoArrowRight, GoArrowLeft } from 'react-icons/go'
import diamond from '../asset/Images/Ellipse 1.png'
import bgimg from '../asset/Images/bgimg1.png'
import gem from '../asset/Images/gem1.png'
import Image from 'next/image'

const NewCollection = () => {
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
                    
                    <div className='w-3/5'>
                        <Image 
                            src={gem}
                            alt='gem'
                            className='w-full h-full'
                        />
                    </div>

                    <div className='flex flex-col gap-5 w-2/5 bg-zinc-900 opacity-70 py-10 px-20'>
                        <div className='flex justify-end'>
                            <div className='flex justify-center items-center py-1 px-5 border rounded-full'>
                                <GoArrowRight className='text-white text-3xl' />
                            </div>
                        </div>
                        <p className='font-vasion text-4xl'>Introducing Pear Diamond Cluster</p>
                        <p className='font-vasion text-xl text-brown'>Subtitle of the item</p>
                        <p className='font-vasion text-xl'>
                            <span>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. </span>
                            <span className='text-brown'>See More...</span>
                        </p>
                    </div>
                    
                </div>
            </div>

        </div>
    )
}

export default NewCollection
