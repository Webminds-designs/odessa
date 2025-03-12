import React, { useState } from 'react'
import { FaHeart } from 'react-icons/fa';
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
          <motion.div
            key={index}
            initial={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="relative flex flex-col justify-center items-center h-[450px] w-[350px] bg-[#292929] rounded-2xl font-aeonikregular">

            <div 
              className="absolute right-4 top-4 hover:cursor-pointer"
              onClick={() => removeFromFavorites(index)}>
              <FaHeart size={20} />
            </div>

            <div className="flex items-center object-cover justify-center h-[270px] w-[250px]">
              <img
                src={item.image}
                alt='diamond'
              />
            </div>

            <div className="h-12 w-[300px] px-10 bg-primary flex justify-center items-center mb-5 rounded-xl border border-black">
              <div className="text-white">Add to cart</div>
            </div>

            <div className="flex justify-between items-center p-2 h-12 w-[300px] bg-primary border border-black rounded-xl">
              <div className="text-gray-400">{item.name}</div>
              <div className="text-white">{item.price}</div>
            </div>

          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

export default Favourites
