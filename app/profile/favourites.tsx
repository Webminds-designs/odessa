import React, { useState, useEffect } from 'react';
import ProductCards from '../components/ProductCards';
import { AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const Favourites = () => {
  const [favorites, setFavorites] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const user = JSON.parse(localStorage?.getItem("user") || "{}");

  useEffect(() => {
    const fetchFavorites = async () => {
      setIsLoading(true);
      try {
        // Step 1: Fetch user's favorite product IDs
        const res = await fetch("/api/favorites", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          }
        });

        if (!res.ok) {
          throw new Error("Failed to fetch favorites");
        }

        const data = await res.json();

        // Check where the user's favorites are in the response
        // If your API returns all users' favorites
        const userFavorite = data.favourites.find((fav: { userId: any; }) => fav.userId === user.id);

        if (!userFavorite || !userFavorite.products || userFavorite.products.length === 0) {
          setFavorites([]);
          setIsLoading(false);
          return;
        }

        // Step 2: Fetch details for each product ID
        const productPromises = userFavorite.products.map(async (productId: any) => {
          const productRes = await fetch(`/api/product/${productId}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            }
          });

          if (!productRes.ok) {
            console.error(`Failed to fetch product ${productId}`);
            return null;
          }

          const productData = await productRes.json();
          return productData.product;
        });

        // Wait for all product details to be fetched
        const productDetails = await Promise.all(productPromises);

        // Filter out any null values (failed fetches)
        const validProducts = productDetails.filter(product => product !== null);

        // Update state with product details
        setFavorites(validProducts);
      } catch (error) {
        console.error("Error fetching favorites:", error);
        toast.error("Error fetching favorites", {
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (user.id) {
      fetchFavorites();
    }
  }, [user.id]);

  // Handle favorite toggle
  const handleFavoriteToggle = async (productId: string) => {
    // Fix the check to look for the product ID in the array of product objects
    const isCurrentlyFavorite = favorites.some(product => product._id === productId);
    const method = isCurrentlyFavorite ? "DELETE" : "POST";

    try {
        const res = await fetch("/api/favorites", {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                user: user.id,
                product: productId,
            }),
        });

        if (!res.ok) throw new Error("Failed to update favorites");

        if (isCurrentlyFavorite) {
            // Filter out the removed product using _id
            setFavorites(prev => prev.filter(product => product._id !== productId));
            toast.success("Removed from favorites!", {
              style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
              },
            });
        } else {
            // Need to fetch the new product details before adding
            const productRes = await fetch(`/api/product/${productId}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            });
            
            if (!productRes.ok) throw new Error("Failed to fetch product details");
            
            const productData = await productRes.json();
            setFavorites(prev => [...prev, productData.product]);
            toast.success("Added to favorites!", {
              style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
              },
            });
        }
    } catch (error) {
        console.error("Error updating favorites:", error);
        toast.error("Error updating favorites", {
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        });
    }
};

  return (
    <div className='flex flex-col items-center'>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-xl">Loading your favorites...</p>
        </div>
      ) : favorites.length > 0 ? (
        <div className='flex flex-wrap justify-center gap-5'>
          <AnimatePresence>
            {favorites.map((item, index) => (
              <ProductCards 
                key={index} 
                diamond={item} 
                isFavourited={true}
                onFavouriteToggle={handleFavoriteToggle}
              />
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="flex justify-center items-center h-64">
          <p className="text-xl">You don&apos;t have any favorites yet.</p>
        </div>
      )}
    </div>
  );
};

export default Favourites;
