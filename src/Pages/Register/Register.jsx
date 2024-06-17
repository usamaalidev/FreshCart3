import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

export default function Register() {
  const [errorMsg, setErrorMsg] = useState(null);

  const navigate = useNavigate();

  async function signup(values) {
    let toastLoadingId;
    try {
      toastLoadingId = toast.loading("waiting...");
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/signup",
        method: "POST",
        data: values,
      };
      const { data } = await axios(options);
      if (data.message === "success") {
        toast.dismiss(toastLoadingId);
        toast.success("user created successfully");
        setTimeout(() => {
          navigate("/auth/login");
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      toast.dismiss(toastLoadingId);
      setErrorMsg(error.response.data.message);
    }
  }

  function handleSubmit(values) {
    signup(values);
  }

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("name is required")
      .min(3, "name must be at least 3 characters")
      .max(25, "name can not be more than 25 characters"),
    email: Yup.string()
      .required("email is required")
      .email("email is invalid. type another one"),
    phone: Yup.string()
      .required("phone is required")
      .matches(phoneRegex, "phone number is invalid"),
    password: Yup.string()
      .required("password is required")
      .matches(
        /^[A-Z][0-9A-Za-z]{7,24}$/,
        "password must start with uppercase letter with a length between 8 and 25 characters"
      ),
    rePassword: Yup.string()
      .required("repassword is required")
      .oneOf([Yup.ref("password")], "password and repassword must be the same"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      rePassword: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });
  return (
    <>
      <h1 className="text-2xl mb-6 text-primary">
        <i className="fa-regular fa-circle-user me-3"></i>
        <span className="font-semibold">Register Now</span>
      </h1>
      <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Username"
            className="form-control"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            autoComplete="off"
          />

          {formik.errors.name && formik.touched.name ? (
            <p className="alert-error">{formik.errors.name}</p>
          ) : (
            ""
          )}
        </div>

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
            type="tel"
            placeholder="phone number"
            className="form-control"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            autoComplete="off"
          />
          {formik.errors.phone && formik.touched.phone ? (
            <p className="alert-error">{formik.errors.phone}</p>
          ) : (
            ""
          )}
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

        <div>
          <input
            type="password"
            placeholder="type your password again"
            className="form-control"
            name="rePassword"
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            autoComplete="off"
          />
          {formik.errors.rePassword && formik.touched.rePassword ? (
            <p className="alert-error">{formik.errors.rePassword}</p>
          ) : (
            ""
          )}
        </div>

        <button type="submit" className="btn-primary self-start">
          Sign up
        </button>
      </form>
    </>
  );
}
