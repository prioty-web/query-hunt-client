

import React,{ useContext, useState} from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaGoogle } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from './AuthProvider';
import loginLottie from '../assets/Animation - 1735076608592.json'
import Lottie from 'lottie-react';



const Login = () => {
    const [showPass, setShowPass] = useState(false);
    const{signInUsers, signInWithGoogle}= useContext(AuthContext)
    const [inputValue, setInputValue] = useState("");
    const location = useLocation()
    const navigate = useNavigate()
    const handleInputChange = (event) => {
      event.preventDefault();
      const email = event.target.value
      setInputValue(email)
  };
  const handleForgetPass = () => {
    navigate("/login/resetpass", { state: { inputValue } });

}
      const handleLogin= event =>{
           event.preventDefault(); 
           const email = event.target.email.value;
           const password = event.target.password.value;


           signInUsers(email, password)
           .then((result) => {
        toast.success(`Welcome back, ${result.user.email}!`, {
            position: "top-center",
            autoClose: 3000,        
          });
          navigate(location?.state ? location.state : '/')
      })
      .catch((error) => {
        if (error.code === 'auth/user-not-found') {
          toast.error('User not found! Please register first.', {
            position: "top-center",
            autoClose: 3000,        
          });
        } else if (error.code === 'auth/wrong-password') {
          toast.error('Incorrect password. Please try again.', {
            position: "top-center",
            autoClose: 3000,        
          });
        } else {
          toast.error('Something is wrong !!!', {
            position: "top-center",
            autoClose: 3000,        
          });
        }
      });

      
  };
  
  // google sign in 
  const handleGoogleSignIn = () => {
    signInWithGoogle()
        .then((result) => {
            
            navigate('/');
        })
        .catch((error) => {
            // console.error('Error with Google Sign-In:', error.message);
            alert(error.message);
        });
};



    return (
        <div className='md:flex space-x-14 mx-auto items-center justify-center my-[10vw]'>
            <div>
            <Lottie animationData={loginLottie}></Lottie>
            </div>
            <div>
            <h1 className='text-3xl font-serif text-slate-500 text-center mb-4'>Login Now</h1>
            

            <div className="card bg-base-100   shadow-2xl">
      <form onSubmit={handleLogin} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input onChange={handleInputChange}  name='email' type="email" placeholder="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input name='password' type={showPass ? 'text' : 'password'} placeholder="password" className="input input-bordered " required />
          <button onClick={()=>setShowPass(!showPass)} type='button' className='absolute right-6 mt-12 mr-4 btn btn-xs' >{
            showPass? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}</button>
          
        </div>
        <div className="form-control mt-6">
          <button onSubmit={handleLogin} className="btn bg-slate-500 hover:bg-slate-800  text-white">Login</button>
        </div>
      </form>
       <button onClick={handleForgetPass} className='text-sm' >Forgot Password?</button>
       <br />
       <div className='text-center mt-4'>
                    <button
                        className='btn btn-outline btn-primary flex items-center justify-center gap-2 w-11/12  mx-auto'
                        onClick={handleGoogleSignIn}>
                        <FaGoogle /> Sign in with Google
                    </button>
                </div>
    <p className='text-sm p-5 text-gray-500'>Have not Register yet!  <NavLink to='/register' className='text-slate-700 font-semibold'>Register Now</NavLink></p>
    </div>
            </div>
        </div>
    );
};

export default Login;