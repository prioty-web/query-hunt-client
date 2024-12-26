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
import MyQueries from "../pages/MyQueries";
import MyQuery from "../pages/MyQuery";
import UpdateQuery from "../pages/UpdateQuery";
import PrivateRoutes from "../auth/Privateroutes";





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
          element:<PrivateRoutes><ProductDetails></ProductDetails></PrivateRoutes>,
          loader: ({params}) => fetch(`http://localhost:5000/products/${params.id}`)
        },
        {
          path:'/add-products',
          element:<PrivateRoutes><AddProducts></AddProducts></PrivateRoutes>,
          loader: () => (document.title = "add-product"),
        },
        {
          path:'/all-products',
          element:<Products></Products>,
          loader: () => (document.title = "all-product"),
        },
        {
          path:'/my-queries',
          element:<PrivateRoutes><MyQueries></MyQueries></PrivateRoutes>,
          loader: () => (document.title = "MyQueries"),
        },
        {
          path:'/query-details/:id',
          element:<PrivateRoutes><MyQuery></MyQuery></PrivateRoutes> ,
          loader: ({params}) => fetch(`http://localhost:5000/my-quries/${params.id}`),
        },
        {
          path:'/update-query/:id',
          element:<PrivateRoutes><UpdateQuery></UpdateQuery></PrivateRoutes> ,
          loader: ({params}) => fetch(`http://localhost:5000/my-quries/${params.id}`),
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