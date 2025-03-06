import React from "react";

const diamonds = [
  {
    id: 1,
    name: "Round Diamond",
    price: "1,750.00 $",
    image: "/diamond.png", // Replace with actual image path
  },
  {
    id: 2,
    name: "Round Diamond",
    price: "1,750.00 $",
    image: "/diamond.png", // Replace with actual image path
  },
  {
    id: 3,
    name: "Round Diamond",
    price: "1,750.00 $",
    image: "/diamond.png", // Replace with actual image path
  },
];

const DiamondCard: React.FC<{ diamond: typeof diamonds[0] }> = ({ diamond }) => {
  return (
    <div className="bg-gray-900 p-4 rounded-xl text-white w-72">
      <img src={diamond.image} alt={diamond.name} className="w-full rounded-lg" />
      <div className="flex justify-center gap-2 py-2">
        <button className="p-2 bg-gray-700 rounded-full">💎</button>
        <button className="p-2 bg-gray-700 rounded-full">💎</button>
        <button className="p-2 bg-gray-700 rounded-full">💎</button>
      </div>
      <button className="w-full bg-white text-black py-2 rounded-lg mt-2">Add to cart</button>
      <div className="flex justify-between mt-2">
        <span>{diamond.name}</span>
        <span>{diamond.price}</span>
      </div>
    </div>
  );
};

const ProductView = () => {
  return (
    <div className="bg-black min-h-screen text-white p-10">
      <div className="flex gap-10">
        <div className="w-1/2">
          <img src="/diamond.png" alt="Diamond" className="w-full rounded-lg" />
          <div className="flex gap-2 mt-4">
            <button className="p-2 bg-gray-700 rounded-lg">💎</button>
            <button className="p-2 bg-gray-700 rounded-lg">💎</button>
            <button className="p-2 bg-gray-700 rounded-lg border border-yellow-500">💎</button>
          </div>
        </div>
        <div className="w-1/2 space-y-4">
          <h2 className="text-2xl">Round Diamond</h2>
          <p className="text-gray-400">
            Round Diamond is the epitome of elegance and brilliance, crafted with 58 precision-cut facets to maximize sparkle and fire.
          </p>
          <div className="text-xl font-bold">Price: 1,750.00 $</div>
          <button className="w-full bg-yellow-600 py-3 rounded-lg text-black font-bold">Add to cart</button>
        </div>
      </div>
      <div className="mt-10 flex gap-4">
        {diamonds.map((diamond) => (
          <DiamondCard key={diamond.id} diamond={diamond} />
        ))}
      </div>
    </div>
  );
};

export default ProductView;