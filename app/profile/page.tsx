"use client";
import React from "react";
import ComingSoon from "../components/ComingSoonProps";
import { FaUserAstronaut } from "react-icons/fa";
import userAccount from "./account";
import userFavourites from "./favourites";
import userOrderHistory from "./orderhistory";

const person = {
  firstname: "Emma",
  lastname: "Richardson",
  email: "emmarichardson@gmail.com",
  image: "/images/person1.png",
}

const ProfilePage = () => {
  return (
    <div>
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
    </div>
  );
};

export default ProfilePage;
