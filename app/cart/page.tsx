"use client";

import { useState } from "react";
import Image from "next/image";

import diomondimg from "../../public/images/diamond2.png"

import diamonds from "@/public/images/diamonds";

// Sample products array (you can replace this with dynamic data)
const products = [
  {
    id: 1,
    name: "Round Diamond",
    image: diamonds[1].images[0],
    price: 175000,
    quantity: 1,
  },
  {
    id: 2,
    name: "Emerald Cut Diamond",
    image: diamonds[3].images[0],
    price: 200000,
    quantity: 1,
  },
  {
    id: 3,
    name: "Emerald Cut Diamond",
    image: diamonds[6].images[0],
    price: 150000,
    quantity: 1,
  },
];

const CartPage: React.FC = () => {
  const [cart, setCart] = useState(products);

  // Increment and Decrement functions
  const handleIncrement = (id: number) => {
    setCart((prevCart) =>
      prevCart.map((product) =>

        product.id === id ? { ...product, quantity: product.quantity + 1 } : product

        product.id === id
          ? { ...product, quantity: product.quantity + 1 }
          : product

      )
    );
  };

  const handleDecrement = (id: number) => {
    setCart((prevCart) =>
      prevCart.map((product) =>
        product.id === id && product.quantity > 1
          ? { ...product, quantity: product.quantity - 1 }
          : product
      )
    );
  };

  // Handle remove product (close function)
  const handleRemove = (id: number) => {
    setCart((prevCart) => prevCart.filter((product) => product.id !== id));
  };

  return (
    <div className="mx-30">
      <h2 className="font-vasion text-3xl ml-6">Shopping Cart</h2>
      <div className="flex flex-col md:flex-row  justify-between gap-6">
        {/* Products Section */}
        <div className="w-full lg:w-2/3  text-white p-6 AeonikRegular ">
          {cart.map((product) => {
            const total = product.price * product.quantity;
            return (

              <div
                key={product.id}
                className="flex flex-col lg:flex-row gap-6 mb-6"
              >

                {/* Image Section (Left Side) */}
                <div className="w-full lg:w-1/2  relative">
                  <div className="relative bg-[#292929] p-4 rounded-2xl w-full ">
                    <div className="text-center">
                      <Image
                        src={diomondimg}
                        alt={product.name}
                        className="w-[150px] h-[150px] object-cover mx-auto"
                        width={600}
                        height={600}
                        priority
                      />
                    </div>

                    <button
                      onClick={() => handleRemove(product.id)} // remove button
                      className="absolute top-2 right-2 p-2 rounded-full"
                    >
                      ✕
                    </button>
                    <div className="flex justify-between w-full  p-2 mt-3 bg-[#1d1d1d] rounded-2xl border-1 border-primary">
                      <div className="text-sm font-light text-gray-300 text-center content-center">
                        {product.name}
                      </div>

                      <span className="text-lg font-bold">{product.price.toLocaleString()} $</span>

                    </div>
                  </div>
                </div>

                {/* Product Info (Right Side) */}
                <div className="w-full lg:w-1/2 space-y-8 mx-15">
                  <div className="flex justify-between mb-6">

                    <h2 className="text-2xl content-center  text-gray-300 font-light">
                      {product.name}
                    </h2>
                    <span className="text-lg font-bold">
                      {product.price.toLocaleString()} £
                    </span>

                  </div>
                  {/* Quantity Selector */}
                  <div className=" flex justify-between mt-20">
                    <span className="text-md">Quantity</span>
                    <div className="flex items-center space-x-3 mt-2 px-2 bg-[#1d1d1d] rounded-3xl">
                      <button
                        onClick={() => handleDecrement(product.id)}
                        className="p-1 rounded-lg cursor-pointer"
                      >
                        -
                      </button>
                      <span className="text-lg p-1">{product.quantity}</span>
                      <button
                        onClick={() => handleIncrement(product.id)}
                        className="p-1 rounded-lg cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Total Price */}
                  <div className="mt-4 flex justify-between">
                    <span className="font-bold text-xl">Total</span>

                    <div className="text-lg font-bold">{total.toLocaleString()} $</div>

                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Checkout Section */}
        <div className="w-full lg:w-1/3 md:w-1/2  text-white p-6">
          <div className="bg-[#292929] p-5 rounded-2xl">
            <h2 className="text-center mb-5 text-xl">Order Summary</h2>
            <div className="flex justify-between">
              <div className="text-start space-y-1">
                <div>Item subtotal</div>
                <div>Shipping fee</div>
                <div>Tax</div>
                <div className="font-bold">Total</div>
              </div>
              <div className="text-end space-y-1">
                {/* Calculate total for all products */}
                <div>

                  {cart
                    .reduce(
                      (acc, product) => acc + product.price * product.quantity,
                      0
                    )
                    .toLocaleString()}{" "}
                  £
                </div>
                <div>0 £</div>
                <div>0 £</div>
                <div className="font-bold">
                  {cart
                    .reduce(
                      (acc, product) => acc + product.price * product.quantity,
                      0
                    )
                    .toLocaleString()}{" "}
                  £

                </div>
              </div>
            </div>
            <div className="flex justify-center mt-5">
              <button className="bg-brown text-white text-center p-2 rounded-md font-bold px-6">
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
