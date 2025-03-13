"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ComingSoon from "../components/ComingSoonProps";
import { FaUserAstronaut } from "react-icons/fa";
import UserAccount from "./account";
import UserFavourites from "./favourites";
import UserOrderHistory from "./orderhistory";

const person = {
  firstname: "Emma",
  lastname: "Richardson",
  email: "emmarichardson@gmail.com",
  image: "/images/person1.png",
}

const tabs = ['Account Settings', 'Order History', 'My Favourites'];

const ProfilePage: React.FC = () => {

  const [selected, setSelected] = React.useState(0);

  return (
    <div className="md:px-24">

      {/* main title */}
      <div className="font-vasion">
        <p className="text-5xl md:text-7xl lg:text-9xl">Your Brilliance</p>
        <p>
          <span className="text-5xl md:text-7xl lg:text-9xl mr-5 md:mr-7 lg:mr-10">Begins</span>
          <span className="text-sm md:text-xl lg:text-4xl">– The Journey of Crafting Brilliance</span>
        </p>
      </div>

      {/* profile pic | Name | Email */}
      <div className="flex items-center gap-7 md:gap-10 mt-20">
        <div className="flex rounded-full h-32 w-32 md:h-40 md:w-40 lg:h-52 lg:w-52 bg-white/50">
          <img
            src={person.image}
            alt="person"
            className="rounded-full h-32 w-32 md:h-40 md:w-40 lg:h-52 lg:w-52"
          />
        </div>
        <div className="flex flex-col">
          <p className="font-vasion text-2xl md:text-5xl lg:text-7xl">{person.firstname}</p>
          <p className="font-vasion text-2xl md:text-5xl lg:text-7xl">{person.lastname}</p>
          <p className="font-aeonikregular text-xs md:text-sm text-gray-400">{person.email}</p>
        </div>
      </div>

      {/* user info */}
      <div>

        {/* toggle buttons */}
        <div 
          className="relative flex justify-between my-20"
        >
          {tabs.map((tab, index) => (
            <motion.button
              key={tab}
              onTap={() => setSelected(index)}
              whileTap={{ scale: 0.95 }}
              whileFocus={{ scale: 1.05 }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setSelected(index);
                }
              }}
              className="px-5 py-2.5 border-none w-full relative cursor-pointer outline-none font-aeonikregular text-base"
            >
              {tab}
              {selected === index && (
                <motion.div
                  layoutId="underline"
                  className="absolute h-1 bg-brown rounded-[2px] w-full -bottom-1 left-0"
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* content */}
        <div className="relative min-h-[400px]">
          <AnimatePresence mode="wait">
            {selected === 0 && (
              <motion.div
                key="account"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="absolute w-full"
              >
                <UserAccount />
              </motion.div>
            )}
            {selected === 1 && (
              <motion.div
                key="history"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="absolute w-full"
              >
                <UserOrderHistory />
              </motion.div>
            )}
            {selected === 2 && (
              <motion.div
                key="favorites"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="absolute w-full"
              >
                <UserFavourites />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

    </div>
  );
};

export default ProfilePage;
