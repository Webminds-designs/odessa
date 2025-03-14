"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

import { useRouter } from "next/navigation";

// Define types for the product and cart item
type Product = {
  _id: string;
  id: string;
  name: string;
  price: number | string; // API may return a string; we'll parse it
  images?: string[]; // images is optional to handle missing data
};

type CartItem = {
  product: Product;
  quantity: number;
};

type Cart = {
  _id: string;
  user: string;
  items: CartItem[];
};

const CartPage: React.FC = () => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  const router = useRouter();

  // Fetch the cart for a fixed user from your API
  useEffect(() => {
    // Get the user from localStorage
    if (typeof window !== 'undefined' && window.localStorage) {      
      const userData = JSON.parse(localStorage?.getItem("user") || "{}");
      setUser(userData);
      console.log("user", userData);
    }
  }, []);

  // Fetch cart when user is available
  useEffect(() => {
    if (!user || !user.id) return;
    
    const fetchCart = async () => {
      try {        
        const res = await fetch(
          `/api/cart?userId=${user.id}`
        );
        const data = await res.json();
        // Assuming your API returns an object with a "cart" property
        if (data.cart) {
          setCart(data.cart);
          // console.log("Fetched cart:", data.cart);
        } else {
          setError("Cart not found");
        }
      } catch (err) {
        console.error("Error fetching cart:", err);
        setError("Failed to fetch cart");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [user]);

  // Local functions to update the cart state
  const handleIncrement = (productId: string): void => {
    if (!cart) return;
    const updatedItems = cart.items.map((item) =>
      item.product._id === productId
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    setCart({ ...cart, items: updatedItems });

    const increase = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/cart/increase", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user: user.id,
            product: productId,
          }),
        });

        if (!res.ok) {
          const data = await res.json();
          setError(data.error);
        }
      } catch (err) {
        console.error("Error increment", err);
        setError("Failed to increment");
      } finally {
        setLoading(false);
      }
    };

    increase();
  };

  const handleDecrement = (productId: string): void => {
    if (!cart) return;
    const updatedItems = cart.items.map((item) =>
      item.product._id === productId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCart({ ...cart, items: updatedItems });

    const decrease = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/cart/decrease", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user: user.id,
            product: productId,
          }),
        });

        if (!res.ok) {
          const data = await res.json();
          setError(data.error);
        }
      } catch (err) {
        console.error("Error decrement", err);
        setError("Failed to decrement");
      } finally {
        setLoading(false);
      }
    };
    decrease();
  };

  const handleRemove = (productId: string): void => {
    if (!cart) return;
    const updatedItems = cart.items.filter(
      (item) => item.product._id !== productId
    );
    setCart({ ...cart, items: updatedItems });

    const remove = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/cart/remove", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user: user.id,
            product: productId,
          }),
        });

        if (!res.ok) {
          const data = await res.json();
          setError(data.error);
        }
      } catch (err) {
        console.error("Error remove", err);
        setError("Failed to remove");
      } finally {
        setLoading(false);
      }
    };
    remove();
  };

  if (loading) return <div className="p-4 text-center">Loading cart...</div>;
  if (error || !cart)
    return <div className="p-4 text-center">{error || "Cart not found"}</div>;

  // Helper to parse price with a fallback to 0
  const parsePrice = (price: number | string | undefined): number => {
    if (price === undefined || price === null) return 0;
    if (typeof price === "string") {
      const parsed = parseFloat(price.replace(/,/g, ""));
      return isNaN(parsed) ? 0 : parsed;
    }
    return price;
  };

  // Calculate overall subtotal
  const subtotal = cart.items.reduce(
    (acc, item) => acc + parsePrice(item.product.price) * item.quantity,
    0
  );

  const handleCheckout = () => {
    if (!cart) return;

    // Extract relevant cart data
    const checkoutData = cart.items.map((item) => ({
      productId: item.product._id,
      name: item.product.name,
      quantity: item.quantity,
      price: parsePrice(item.product.price),
      total: parsePrice(item.product.price) * item.quantity,
    }));

    // Store checkout data in localStorage?
    localStorage?.setItem("checkoutData", JSON.stringify(checkoutData));

    // Navigate to the billing page
    router.push("/bill");
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="font-vasion text-3xl md:text-4xl mb-6 text-center">
        Shopping Cart
      </h2>
      <div className="flex flex-col md:flex-row justify-between gap-6">
        {/* Products Section */}
        <div className="w-full md:w-2/3 bg-dark p-4 rounded-lg shadow-md">
          {cart.items.map((item) => {
            const priceNum = parsePrice(item.product.price);
            const total = priceNum * item.quantity;
            return (
              <div
                key={item.product._id}
                className="flex flex-col lg:flex-row gap-4 mb-6 border-b border-gray-700 pb-4"
              >
                {/* Image Section (Left Side) */}
                <div className="w-full lg:w-1/3">
                  <div className="relative bg-[#292929] p-4 rounded-2xl">
                    <div className="text-center">
                      {item.product.images && item.product.images.length > 0 ? (
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="mx-auto object-cover rounded"
                          width={150}
                          height={150}
                          priority
                        />
                      ) : (
                        <div className="w-[150px] h-[150px] bg-gray-300 mx-auto" />
                      )}
                    </div>
                    <button
                      onClick={() => handleRemove(item.product._id)}
                      className="absolute top-2 right-2 p-2 rounded-full text-white"
                    >
                      ✕
                    </button>
                  </div>
                </div>
                {/* Product Info (Right Side) */}
                <div className="w-full lg:w-2/3 flex flex-col justify-between">
                  <div className="flex justify-between mb-2">
                    <h2 className="text-xl text-gray-200 font-medium">
                      {item.product.name}
                    </h2>
                    <span className="text-lg font-bold text-amber-400">
                      {priceNum.toLocaleString()} £
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center space-x-2  px-3 py-1 rounded-full">
                      <button
                        onClick={() => handleDecrement(item.product._id)}
                        className="px-2 py-1 bg-gray-700 text-white rounded"
                      >
                        -
                      </button>
                      <span className="text-lg">{item.quantity}</span>
                      <button
                        onClick={() => handleIncrement(item.product._id)}
                        className="px-2 py-1 bg-gray-700 text-white rounded"
                      >
                        +
                      </button>
                    </div>
                    <div className="text-lg font-bold text-gray-300">
                      {total.toLocaleString()} £
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {/* Checkout Section */}
        <div className="w-full md:w-1/3 h-fit p-6 rounded-lg shadow-md flex flex-col justify-between">
          <div>
            <h2 className="text-center mb-5 text-2xl font-bold">
              Order Summary
            </h2>
            <div className="flex justify-between text-lg mb-6">
              <div className="space-y-1 text-gray-300">
                <div>Item subtotal</div>
                <div>Shipping fee</div>
                <div>Tax</div>
                <div className="font-bold">Total</div>
              </div>
              <div className="space-y-1 text-right text-gray-300">
                <div>{subtotal.toLocaleString()} £</div>
                <div>0 £</div>
                <div>0 £</div>
                <div className="font-bold">{subtotal.toLocaleString()} £</div>
              </div>
            </div>
          </div>

          <button
            className="bg-brown text-white py-3 px-6 rounded-md font-bold transition-all duration-300 hover:scale-105 w-full mt-auto"
            onClick={handleCheckout}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
