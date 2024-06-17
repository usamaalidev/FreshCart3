import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import NotFound from "./Pages/NotFound/NotFound";
import Home from "./Pages/Home/Home";
import { Toaster } from "react-hot-toast";
import UserContextProvider from "./Context/User.context.jsx";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute.jsx";
import ProductDetails, {
  loader as detailsLoader,
} from "./Pages/ProductDetails/ProductDetails.jsx";
import CartContextProvider from "./Context/Cart.context.jsx";
import Cart from "./Pages/Cart/Cart.jsx";
import Checkout from "./Pages/Checkout/Checkout.jsx";
import Orders from "./Pages/Orders/Orders.jsx";
import { Offline, Online } from "react-detect-offline";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const client = new QueryClient({});

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        { index: true, element: <Home /> },
        {
          path: "/product/:id",
          element: <ProductDetails />,
          loader: detailsLoader,
        },
        { path: "/category/:id", element: <h2>Category Details</h2> },
        { path: "/cart", element: <Cart /> },
        { path: "/checkout", element: <Checkout /> },
        { path: "/allorders", element: <Orders /> },
        { path: "*", element: <NotFound /> },
      ],
    },
    {
      path: "/auth",
      element: <Layout />,
      children: [
        { path: "login", element: <Login /> },
        { path: "signup", element: <Register /> },
        { path: "forget_password", element: <Register /> },
      ],
    },
  ]);

  return (
    <>
      <QueryClientProvider client={client}>
        <UserContextProvider>
          <CartContextProvider>
            <RouterProvider router={router}></RouterProvider>
            <ReactQueryDevtools buttonPosition="bottom-left" position="right" />
          </CartContextProvider>
        </UserContextProvider>
      </QueryClientProvider>

      <Toaster />
      <Offline>
        <div className="fixed right-10 bottom-10 bg-gray-200 px-2 py-1 rounded-md z-[60]">
          <i className="fa-solid fa-wifi me-2"></i>
          check your internet connection
        </div>
      </Offline>
    </>
  );
}

export default App;
