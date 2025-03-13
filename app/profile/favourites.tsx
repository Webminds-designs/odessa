import React, { useState } from 'react'
import { FaHeart } from 'react-icons/fa';
import ProductCards from '../components/ProductCards';
import { motion, AnimatePresence } from 'framer-motion';

const initialFavorites = [
  {
    name: "Rounded Diamond",
    price: "1750.00 $",
    image: "/images/diamond2.png"
  },
  {
    name: "Rounded Diamond",
    price: "1750.00 $",
    image: "/images/diamond2.png"
  },
  {
    name: "Rounded Diamond",
    price: "1750.00 $",
    image: "/images/diamond2.png"
  },
  {
    name: "Rounded Diamond",
    price: "1750.00 $",
    image: "/images/diamond2.png"
  },
  {
    name: "Rounded Diamond",
    price: "1750.00 $",
    image: "/images/diamond2.png"
  },
];

const Favourites = () => {
  const [myFavourits, setMyFavourits] = useState(initialFavorites);

  const removeFromFavorites = (index: number) => {
    setMyFavourits(prevFavorites => 
      prevFavorites.filter((_, i) => i !== index)
    );
  };

  return (
    <div className='flex flex-wrap justify-center gap-5'>
      <AnimatePresence>
        {myFavourits.map((item, index) => (
          <ProductCards key={index} diamond={item} />
        ))}
      </AnimatePresence>
    </div>
  )
}

export default Favourites
