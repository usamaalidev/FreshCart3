import React, { useContext, useEffect, useState } from "react";
import logo from "../../assets/images/freshcart-logo.svg";
import { Link, NavLink } from "react-router-dom";
import { UserContext } from "../../Context/User.context";
import { CartContext } from "../../Context/Cart.context";

export default function Navbar() {
  const [collapsed, setCollapsed] = useState(true);
  const { token, logOut } = useContext(UserContext);
  const { cartInfo, getCartData } = useContext(CartContext);

  useEffect(() => {
    getCartData();
  }, []);

  console.log({ cartInfo });

  return (
    <>
      <nav className="bg-slate-100  fixed top-0 z-50 left-0 w-full ">
        <div className="container flex items-center gap-12  px-2 py-3 relative ">
          <h1>
            <Link to="/">
              <img src={logo} alt="Fresh Cart Logo" />
            </Link>
          </h1>

          <button
            className="lg:hidden ms-auto text-2xl"
            onClick={() => {
              setCollapsed(!collapsed);
            }}
          >
            {collapsed ? (
              <i className="fa-solid fa-bars fa-3xl"></i>
            ) : (
              <i className="fa-solid fa-xmark"></i>
            )}
          </button>

          {token ? (
            <>
              <ul
                className={`${
                  collapsed
                    ? "hidden"
                    : "absolute bg-white w-full left-0 top-full p-2"
                } lg:flex lg:items-center lg:gap-6`}
              >
                <li>
                  <NavLink
                    className={({ isActive }) => {
                      return `relative before:absolute before:w-0  before:h-[2px] before:transition-[width] before:duration-300 before:-bottom-1 before:left-0 before:bg-primary hover:before:w-full hover:font-semibold ${
                        isActive ? " font-semibold before:w-full" : ""
                      }`;
                    }}
                    to="/"
                  >
                    Home
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    className={({ isActive }) => {
                      return `relative before:absolute before:w-0  before:h-[2px] before:transition-[width] before:duration-300 before:-bottom-1 before:left-0 before:bg-primary hover:before:w-full hover:font-semibold ${
                        isActive ? " font-semibold before:w-full" : ""
                      }`;
                    }}
                    to="/products"
                  >
                    Products
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) => {
                      return `relative before:absolute before:w-0  before:h-[2px] before:transition-[width] before:duration-300 before:-bottom-1 before:left-0 before:bg-primary hover:before:w-full hover:font-semibold ${
                        isActive
                          ? isActive && " font-semibold before:w-full"
                          : ""
                      }`;
                    }}
                    to="/categories"
                  >
                    Categories
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) => {
                      return `relative before:absolute before:w-0  before:h-[2px] before:transition-[width] before:duration-300 before:-bottom-1 before:left-0 before:bg-primary hover:before:w-full hover:font-semibold ${
                        isActive
                          ? isActive && " font-semibold before:w-full"
                          : ""
                      }`;
                    }}
                    to="/brands"
                  >
                    Brands
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) => {
                      return `relative before:absolute before:w-0  before:h-[2px] before:transition-[width] before:duration-300 before:-bottom-1 before:left-0 before:bg-primary hover:before:w-full hover:font-semibold ${
                        isActive
                          ? isActive && " font-semibold before:w-full"
                          : ""
                      }`;
                    }}
                    to="/allorders"
                  >
                    Orders
                  </NavLink>
                </li>
              </ul>

              <ul className="hidden ms-auto lg:flex lg:items-center gap-4">
                <li className="relative">
                  <Link to="/cart">
                    <span className="absolute right-0 top-0 translate-x-1/2 -translate-y-1/2 bg-primary text-white w-5 h-5 text-xs font-bold flex justify-center items-center rounded-full">
                      {cartInfo ? (
                        cartInfo.numOfCartItems || 0
                      ) : (
                        <i className="fa-solid fa-spinner fa-spin"></i>
                      )}
                    </span>
                    <i className="fa-solid fa-cart-shopping text-xl"></i>
                  </Link>
                </li>
              </ul>
            </>
          ) : (
            ""
          )}

          <ul
            className={`hidden ${
              !token ? "ms-auto" : ""
            } lg:flex lg:items-center  gap-4`}
          >
            <li>
              <a href="https://instagram.com">
                <i className="fa-brands fa-instagram"></i>
              </a>
            </li>

            <li>
              <a href="https://facebook.com">
                <i className="fa-brands fa-facebook"></i>
              </a>
            </li>

            <li>
              <a href="https://tiktok.com">
                <i className="fa-brands fa-tiktok"></i>
              </a>
            </li>

            <li>
              <a href="https://twitter.com">
                <i className="fa-brands fa-twitter"></i>
              </a>
            </li>

            <li>
              <a href="https://linkedin.com">
                <i className="fa-brands fa-linkedin"></i>
              </a>
            </li>

            <li>
              <a href="https://youtube.com">
                <i className="fa-brands fa-youtube"></i>
              </a>
            </li>
          </ul>

          <ul className="hidden lg:flex  lg:items-center lg:gap-6">
            {!token ? (
              <>
                <li>
                  <NavLink
                    to="/auth/login"
                    className={({ isActive }) => {
                      return `relative before:absolute before:w-0  before:h-[2px] before:transition-[width] before:duration-300 before:-bottom-1 before:left-0 before:bg-primary hover:before:w-full hover:font-semibold ${
                        isActive
                          ? isActive && " font-semibold before:w-full"
                          : ""
                      }`;
                    }}
                  >
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/auth/signup"
                    className={({ isActive }) => {
                      return `relative before:absolute before:w-0  before:h-[2px] before:transition-[width] before:duration-300 before:-bottom-1 before:left-0 before:bg-primary hover:before:w-full hover:font-semibold ${
                        isActive
                          ? isActive && " font-semibold before:w-full"
                          : ""
                      }`;
                    }}
                  >
                    Sign up
                  </NavLink>
                </li>
              </>
            ) : (
              <li>
                <span className="cursor-pointer" onClick={logOut}>
                  <i className="fa-solid fa-right-from-bracket text-2xl"></i>
                </span>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
}
