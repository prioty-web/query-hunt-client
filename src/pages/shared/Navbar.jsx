
import {  NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../auth/AuthProvider";
import { useContext } from "react";




const Navbar = () => {
  const { user,setUser, signOutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    signOutUser()
      .then(() => {
        setUser(null)
        navigate('/'); 
      })
      .catch((error) => {
        // console.error(error))
      });
  };
  const links = (
    <>
      <li><NavLink to='/'>Home</NavLink></li>
      <li><NavLink to='/all-products'>Queries</NavLink></li>
      {user?.email && (
        <>
          <li><NavLink to='/add-products'>Add Queries</NavLink></li>
          <li><NavLink to='/my-queries'>My Queries</NavLink></li>
          <li><NavLink to='/my-recommendation'>My Recommendation </NavLink></li>
          <li><NavLink to='/recommendation-for-me'>Recommendation For me</NavLink></li>
        </>
      )}
    </>
  );
  
    return (
        <div className="navbar bg-base-100 md:w-11/12 mx-auto">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
       {links}
      </ul>
    </div>
   <div className="flex"> 
   
   <img className="w-11" src="/public/icons8-reviewing-68.png"  />
   <a className="btn btn-ghost text-xl">Query Hunt</a>
   </div>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
     {links}
    </ul>
  </div>
  <div className="navbar-end">
    
  {!user ? (
          <NavLink to="login">
            <button className="btn  bg-slate-500 hover:bg-slate-800  text-white font-semibold rounded-lg shadow-lg hover:bg-gradient-to-l hover:scale-105 hover:shadow-xl transition duration-300">
              Login
            </button>
          </NavLink>
        ) : (
          <>
            <button
              onClick={handleLogout}
              className="btn  bg-slate-500 hover:bg-slate-800 mr-4 text-white font-semibold rounded-lg shadow-lg hover:bg-gradient-to-l hover:scale-105 hover:shadow-xl transition duration-300">
              Logout
            </button>
            <div className="w-10 rounded-full relative group ">
              <div><img className=' rounded-full' src={user?.photoURL
                } /></div> 
              <div className="absolute right-0  bg-gray-800 text-white text-xs rounded-md p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {user?.displayName || "No User Name"}
                    </div>
              
            </div>
          </>
        )}
    
    

  </div>
</div>
    );
};

export default Navbar;