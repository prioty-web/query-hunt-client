


import React, {useContext, useState} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import lottieReg from '../assets/Animation - 1735076750884.json'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Lottie from 'lottie-react';
import { AuthContext } from './AuthProvider';

const Register = () => {
// showing error
    const [errorMssg, setErrorMssg] = useState('');
    const [success, setSuccess] = useState(false);
    const [showPass, setShowPass] = useState(false)

//  handle register
    const {createUser , updateUserProfile} = useContext(AuthContext)
    const navigate = useNavigate()
    const handleRegister= event =>{
        
        event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const photo = event.target.photo.value;
    const terms = event.target.terms.checked;

    

    // Password validation logic
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    if (!passwordRegex.test(password)) {
        setErrorMssg("Add the necessary special characters");
        return;
    }
    if (!terms) {
        setErrorMssg("Please agree to the terms.");
        return;
    }
    if (password.length < 6) {
        setErrorMssg("Password should be at least 6 characters long");
        return;
    }

    // Reset error messages and proceed with user creation
    setErrorMssg('');
    setSuccess(false);

    // Create user
    createUser(email, password)
        .then((result) => {
           
            setSuccess(true);
            updateUserProfile({displayName:name, photoURL:photo})
            .then(()=> navigate('/'))
         // Show success toast
      toast.success('Account registered successfully!', {
        position: "top-center",
        autoClose: 3000,        
      });navigate("/")
    })
    .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          toast.error('This email is already used!', {
            position: "top-center",
            autoClose: 3000,        
          });
        } else if (error.code === 'auth/wrong-password') {
          toast.error('Incorrect password. Please try again.', {
            position: "top-center",
            autoClose: 3000,        
          });
        } else {
          toast.error('Check your email and password & try again!!!', {
            position: "top-center",
            autoClose: 3000,        
          });
        }
      });
};


    return (
        <div className='md:flex  space-x-14 items-center justify-center my-[10vw]'>
            <div>
                <Lottie animationData={lottieReg}></Lottie>
            </div>
           <div>
           <h1 className='text-3xl font-serif text-slate-600 text-center mb-4'>Register Now</h1>
            <div className="card bg-base-100  shadow-2xl">
      <form onSubmit={handleRegister} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input name='name' type="text" placeholder="name" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Photo URL</span>
          </label>
          <input name='photo' type="text" placeholder="Upload your photo here" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input name='email' type="email" placeholder="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input name='password' type={showPass ? 'text' : 'password'} placeholder="password" className="input input-bordered " required />
          <button onClick={()=>setShowPass(!showPass)} type='button' className='absolute right-2 mr-8 mt-12 btn btn-xs' >{
            showPass? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}</button>
        </div>
        <label className="label cursor-pointer justify-start gap-3">
  <input type="checkbox" name='terms'  className="checkbox checkbox-primary " />
    <span className="label-text">Accept our terms</span>   
  </label>
  
        <div className="form-control mt-6">
          <button className="btn bg-slate-600 text-white">Register</button>
        </div>
      </form>
      {
        errorMssg && <p className='text-red-500 text-xs p-4'>{errorMssg}</p>
      }
      {
        success && <p className='text-green-500 text-xs p-4'>Successfully account Created!!!</p>
      }
    <p className='text-sm p-5 text-gray-500'>Already have an account! <NavLink to='/login' className='text-slate-900 font-semibold'>Login</NavLink></p>
    </div>
           </div>
        </div>
    );
};

export default Register;