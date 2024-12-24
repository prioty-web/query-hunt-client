import {
    createBrowserRouter,
  } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import ProductDetails from "../pages/ProductDetails";




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
      ]}])


        export default router