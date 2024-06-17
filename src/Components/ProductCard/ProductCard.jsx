import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/Cart.context";

export default function ProductCard({ productInfo }) {
  const { images, price, category, title, ratingsAverage, id } = productInfo;
  const { addToCart } = useContext(CartContext);
  return (
    <>
      <div className="relative group/card col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-2 rounded-lg overflow-hidden ">
        <img
          src={images[0]}
          className="w-full h-72 object-cover"
          alt={`image for ${title}`}
        />
        <div className="p-4">
          <h3 className="text-sm font-semibold text-primary ">
            {category.name}
          </h3>
          <h2 className="font-bold text-lg line-clamp-2">{title}</h2>
          <div className="flex justify-between items-center mt-4">
            <span>{price} EGP</span>
            <div className="rating flex items-center gap-1">
              <i className="fa-solid fa-star text-yellow-500"></i>
              <span>{ratingsAverage}</span>
            </div>
          </div>
        </div>

        <div className="layer group-hover/card:opacity-100 transition-opacity duration-300 opacity-0 absolute start-0 top-0 w-full h-full bg-black bg-opacity-10 flex gap-3 justify-center items-center">
          <div className="icon cursor-pointer hover:scale-110 hover:rotate-6 transition-transform duration-300 p-1 text-sm w-8 h-8 rounded-full bg-primary text-white flex justify-center items-center">
            <i className="fa-solid fa-heart"></i>
          </div>
          <div
            onClick={() => {
              addToCart({ id });
            }}
            className="icon cursor-pointer hover:scale-110 hover:rotate-6 transition-transform duration-300 p-1 text-sm w-8 h-8 rounded-full bg-primary text-white flex justify-center items-center"
          >
            <i className="fa-solid fa-cart-shopping"></i>
          </div>
          <Link
            to={`/product/${id}`}
            className="icon cursor-pointer hover:scale-110 hover:rotate-6 transition-transform duration-300 p-1 text-sm w-8 h-8 rounded-full bg-primary text-white flex justify-center items-center"
          >
            <i className="fa-solid fa-eye"></i>
          </Link>
        </div>
      </div>
    </>
  );
}
