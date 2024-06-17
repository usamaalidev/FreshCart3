import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { UserContext } from "../../Context/User.context.jsx";

const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

export default function Login() {
  const [errorMsg, setErrorMsg] = useState(null);
  const { setToken } = useContext(UserContext);

  const navigate = useNavigate();

  async function sendDataToLogin(values) {
    let toastLoadingId;
    try {
      toastLoadingId = toast.loading("waiting...");
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/signin",
        method: "POST",
        data: values,
      };
      const { data } = await axios(options);
      if (data.message === "success") {
        toast.dismiss(toastLoadingId);
        toast.success("user logged in successfully");
        setToken(data.token);
        localStorage.setItem("token", data.token);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      toast.dismiss(toastLoadingId);
      setErrorMsg(error.response.data.message);
    }
  }

  function handleSubmit(values) {
    sendDataToLogin(values);
  }

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("email is required")
      .email("email is invalid. type another one"),
    password: Yup.string()
      .required("password is required")
      .matches(
        /^[A-Z][0-9A-Za-z]{7,24}$/,
        "password must start with uppercase letter with a length between 8 and 25 characters"
      ),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });
  return (
    <>
      <h1 className="text-2xl mb-6 text-primary">
        <i className="fa-regular fa-circle-user me-3"></i>
        <span className="font-semibold">Login</span>
      </h1>
      <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
        <div>
          <input
            type="email"
            placeholder="Email"
            className="form-control"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            autoComplete="off"
          />

          {formik.errors.email && formik.touched.email ? (
            <p className="alert-error">{formik.errors.email}</p>
          ) : (
            ""
          )}

          {errorMsg && <p className="alert-error">{errorMsg}</p>}
        </div>

        <div>
          <input
            type="password"
            placeholder="password"
            className="form-control"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            autoComplete="off"
          />
          {formik.errors.password && formik.touched.password ? (
            <p className="alert-error">{formik.errors.password}</p>
          ) : (
            ""
          )}
        </div>

        <button type="submit" className="btn-primary self-start">
          Login
        </button>
      </form>
    </>
  );
}
