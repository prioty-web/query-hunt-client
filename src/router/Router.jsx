import {
    createBrowserRouter,
  } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import ProductDetails from "../pages/ProductDetails";
import Login from "../auth/Login";
import Register from "../auth/Register";
import AddProducts from "../pages/AddProduct";
import Products from "../pages/Products";




  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      errorElement: <h2 className="text-6xl text-red-600 text-center my-auto">ROUTE NOT FOUND</h2>,
      children:[
        {
            path:'/',
            element:<Home></Home>,            
        },
        {
          path:'/products/:id',
          element:<ProductDetails></ProductDetails>,
          loader: ({params}) => fetch(`http://localhost:5000/products/${params.id}`)
        },
        {
          path:'/add-products',
          element:<AddProducts></AddProducts>,
          loader: () => (document.title = "add-product"),
        },
        {
          path:'/all-products',
          element:<Products></Products>,
          loader: () => (document.title = "add-product"),
        },
        {
          path:'login',
          element:<Login></Login>,
          loader: () => (document.title = "login"),
        },
        {
          path:'register',
          element:<Register></Register>,
          loader: () => (document.title = "register"),
      
        },
      ]}])


        export default router