import React from 'react'
import Image from 'next/image'
import { GoArrowRight } from 'react-icons/go'
const diamond = require('../asset/Images/Ellipse 1.png').default
const person1 = require('../asset/Images/person1.png').default
const person2 = require('../asset/Images/person2.png').default
const person3 = require('../asset/Images/person3.png').default
const person4 = require('../asset/Images/person4.png').default

const persons = [
    { src: person1, right: "right-24 sm:right-30" },
    { src: person2, right: "right-16 sm:right-20" },
    { src: person3, right: "right-8 sm:right-10" },
    { src: person4, right: "right-0" },
]

const Highlight = () => {
    return (
        <div className='flex flex-col lg:flex-row gap-4 lg:gap-7 w-full bg-primary'>
            {/* First Card */}
            <div className='flex flex-col sm:flex-row bg-zinc-900 px-4 sm:px-10 py-6 sm:py-8 rounded-xl gap-5 sm:gap-10 w-full'>
                {/* diamond image */}
                <div className='relative w-24 sm:w-40 mx-auto sm:mx-0'>
                    <Image
                        src={diamond}
                        alt='diamond'
                        width={130}
                        height={130}
                        className='absolute top-5 w-full h-auto'
                    />
                    <div className='bg-brown h-8 w-8 sm:h-10 sm:w-10 rounded-full absolute -right-4 top-20 flex items-center justify-center'>
                        <GoArrowRight className='text-white text-xl sm:text-2xl' />
                    </div>
                </div>

                <div className='flex flex-col space-y-2 text-center sm:text-left'>
                    <h2 className='font-aeonikbolditalic text-gray-400 text-sm sm:text-xl'>Discover brilliance in every facet</h2>
                    <p className='flex flex-col font-vasion text-xl sm:text-2xl lg:text-5xl'>
                        <span>Shop exquisitely </span>
                        <span>finished and finely cut </span>
                        <span>diamonds</span>
                    </p>
                </div>
            </div>

            {/* Second Card */}
            <div className='bg-brown px-4 sm:px-10 py-6 sm:py-8 rounded-xl flex flex-col gap-5 sm:gap-10 w-full lg:w-auto'>
                <p className='font-aeonikbolditalic flex flex-col text-center sm:text-left text-sm sm:text-xl'>
                    <span>Users and Supportive</span>
                    <span>Community</span>
                </p>

                <div className='flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0'>
                    <p className='font-vasion text-3xl sm:text-4xl lg:text-5xl'>4.8K</p>
                    <div className='flex relative w-40 sm:w-52 h-12 sm:h-16'>
                        {persons.map((person, index) => (
                            <div
                                key={index}
                                className={`rounded-full border-2 w-10 h-10 sm:w-15 sm:h-15 hover:scale-110 hover:-translate-y-2 transition-transform absolute ${person.right}`}
                            >
                                <Image
                                    src={person.src}
                                    alt='person'
                                    className='object-cover'
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Highlight
