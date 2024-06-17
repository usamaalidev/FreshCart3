import React, { useContext } from "react";
import { CartContext } from "../../Context/Cart.context";
import { Link, useNavigate } from "react-router-dom";

export default function CartCard({ productInfo }) {
  const { updateCartCount, deleteCartItem } = useContext(CartContext);
  const { count, price, product } = productInfo;
  const { title, category, imageCover, _id } = product;

  const navigate = useNavigate();
  return (
    <>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-1">
          <Link to={`/product/${_id}`}>
            <img src={imageCover} className="w-full" alt="" />
          </Link>
        </div>
        <div className="col-span-11 flex justify-between items-center">
          <div>
            <h2
              className="text-lg cursor-pointer"
              onClick={() => {
                navigate(`/product/${_id}`);
              }}
            >
              {title}
            </h2>
            <h3 className="text-primary">Price: {price} L.E</h3>
            <button
              onClick={() => {
                deleteCartItem({ id: _id });
              }}
              className="btn-primary bg-red-500 mt-3"
            >
              <i className="fa-solid fa-trash me-1  "></i> Remove
            </button>
          </div>
          <div className="flex gap-8 items-center">
            <div
              onClick={() => {
                updateCartCount({ id: _id, count: count - 1 });
              }}
              className="icon border-2 border-primary rounded-md text-sm px-2 py-3 hover:bg-primary hover:text-white transition-colors duration-300 cursor-pointer"
            >
              <i className="fa-solid fa-minus"></i>
            </div>
            <span className="text-lg">{count}</span>
            <div
              onClick={() => {
                updateCartCount({ id: _id, count: count + 1 });
              }}
              className="icon border-2 border-primary rounded-md text-sm px-2 py-3 hover:bg-primary hover:text-white transition-colors duration-300 cursor-pointer"
            >
              <i className="fa-solid fa-plus"></i>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
