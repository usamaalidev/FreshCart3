import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Context/User.context";
import { jwtDecode } from "jwt-decode";
import Loading from "../../Components/Loading/Loading";
import { Helmet } from "react-helmet";

export default function Orders() {
  const { token } = useContext(UserContext);
  const { id } = jwtDecode(token);
  const [orders, setOrders] = useState(null);

  async function getUserOrders() {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`
    );
    console.log(data);
    setOrders(data);
  }

  useEffect(() => {
    getUserOrders();
  }, []);

  return (
    <>
      <Helmet>
        <title>Orders</title>
      </Helmet>
      {orders ? (
        <>
          {orders.map((order) => (
            <div className="mt-4 border border-gray-300 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-gray-400 text-sm">Order ID</h3>
                  <span className="text-lg font-bold">#{order.id}</span>
                </div>
                <div>
                  {order.isDelivered ? (
                    <span className="font-cairo inline-block badge bg-lime-500 text-lime-100">
                      تم التوصيل
                    </span>
                  ) : (
                    <span className="font-cairo inline-block badge bg-blue-500 text-lime-100">
                      قيد التوصيل
                    </span>
                  )}
                  {order.isPaid ? (
                    <span className="font-cairo inline-block ml-3 badge bg-lime-500 text-lime-100">
                      تم الدفع
                    </span>
                  ) : (
                    <span className="font-cairo inline-block ml-3 badge bg-red-500 text-lime-100">
                      غير مدفوع
                    </span>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-12 mt-4 gap-6">
                {order.cartItems.map((product) => (
                  <div className="product border border-gray-200 p-3 col-span-2">
                    <img
                      src={product.product.imageCover}
                      className="w-full h-40 object-cover"
                      alt=""
                    />
                    <div className="mt-2">
                      <h4 className="font-bold">{product.product.title}</h4>
                      <span>{product.price} L.E</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}
