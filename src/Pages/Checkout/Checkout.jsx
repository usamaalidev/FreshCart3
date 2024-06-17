import { useFormik } from "formik";
import { useContext, useState } from "react";
import { UserContext } from "../../Context/User.context";
import { CartContext } from "../../Context/Cart.context";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Checkout() {
  const { token } = useContext(UserContext);
  const { cartInfo } = useContext(CartContext);
  const [orderType, setOrderType] = useState(null);
  const navigate = useNavigate();

  async function createOrder(values) {
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/orders/${cartInfo.data._id}`,
        method: "POST",
        data: values,
        headers: {
          token,
        },
      };
      let { data } = await axios.request(options);
      if (data.status === "success") {
        toast.success("Orders have been created successfully");
        setTimeout(() => {
          navigate("/allorders");
        }, 1500);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function createOnlineOrder(values) {
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartInfo.data._id}?url=http://localhost:5173`,
        method: "POST",
        data: values,
        headers: {
          token,
        },
      };
      let { data } = await axios.request(options);
      if (data.status === "success") {
        toast.loading("redirecting you to stripe");
        setTimeout(() => {
          window.location.href = data.session.url;
        }, 1500);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const formik = useFormik({
    initialValues: {
      shippingAddress: {
        details: "",
        phone: "",
        city: "",
      },
    },
    onSubmit: (values) => {
      if (orderType == "cash") createOrder(values);
      else createOnlineOrder(values);
    },
  });

  return (
    <>
      <h1 className="font-bold text-2xl mb-4">Shipping Address</h1>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="city"
            name="shippingAddress.city"
            value={formik.values.shippingAddress.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>

        <div>
          <input
            type="tel"
            className="form-control mb-3"
            placeholder="phone"
            name="shippingAddress.phone"
            value={formik.values.shippingAddress.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>

        <div>
          <textarea
            className="form-control mb-3 max-h-52"
            placeholder="details"
            name="shippingAddress.details"
            value={formik.values.shippingAddress.details}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          ></textarea>
        </div>
        <div>
          <button
            type="submit"
            className="btn-primary bg-blue-500"
            onClick={() => {
              console.log("Button clicked");
              setOrderType("cash");
            }}
          >
            Cash Order
          </button>
          <button
            type="submit"
            className="btn-primary ml-3"
            onClick={() => {
              console.log("Button clicked");
              setOrderType("online");
            }}
          >
            Online Payment
          </button>
        </div>
      </form>
    </>
  );
}
