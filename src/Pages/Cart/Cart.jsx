import { useContext, useEffect } from "react";
import CartCard from "../../Components/CartCard/CartCard";
import { CartContext } from "../../Context/Cart.context";
import Loading from "../../Components/Loading/Loading";
import { Link } from "react-router-dom";

export default function Cart() {
  const { getCartData, cartInfo, clearUserCart } = useContext(CartContext);
  console.log(cartInfo);

  useEffect(() => {
    getCartData();
  }, []);

  return (
    <>
      <div>
        {cartInfo ? (
          <>
            <section className="bg-slate-100 p-4 rounded-md">
              <h2 className="text-xl font-black">
                Shop Cart{" "}
                <span className="ms-1">
                  <i className="fa-solid  fa-cart-shopping "></i>
                </span>
              </h2>

              {cartInfo.length === 0 ? (
                <div className="py-16">
                  <h3 className=" text-center text-lg mb-3">
                    there are not items yet.
                  </h3>
                  <Link to="/" className="btn-primary block w-fit mx-auto">
                    Add your first product to cart
                  </Link>
                </div>
              ) : (
                <>
                  <h3 className="text-primary mt-2 font-bold mb-4">
                    Total Cart Price: {cartInfo.data.totalCartPrice} EGP
                  </h3>
                  <div className="flex flex-col gap-4">
                    {cartInfo.data.products.map((product) => (
                      <CartCard productInfo={product} key={product._id} />
                    ))}
                  </div>
                </>
              )}

              {cartInfo.length === 0 ? (
                ""
              ) : (
                <button
                  onClick={clearUserCart}
                  className="btn-primary block ms-auto bg-red-500"
                >
                  Clear Cart
                </button>
              )}
            </section>
            <Link
              to="/checkout"
              className="btn-primary mt-3 w-fit ms-auto block"
            >
              next Step <i className="fa-solid fa-angle-right ml-2 text-lg"></i>
            </Link>
          </>
        ) : (
          <Loading />
        )}
      </div>
    </>
  );
}
