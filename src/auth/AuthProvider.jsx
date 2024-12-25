import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut,sendPasswordResetEmail,
    updateProfile,
    GoogleAuthProvider,
    signInWithPopup, } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../../firebase.init';

export const AuthContext = createContext(null) ;

 
const AuthProvider = ({children}) => {
    const [loading, setLoading]= useState(true);
    
    // create user
    const createUser =(email, password) =>  {
        return createUserWithEmailAndPassword (auth , email, password)
    }
    // login user
    const signInUsers= (email, password)=>{
        return signInWithEmailAndPassword(auth, email, password)
    };
    // login with google
    const googleProvider = new GoogleAuthProvider();
    const signInWithGoogle =()=>{
        return signInWithPopup(auth, googleProvider)
    }

    // update profile
    const updateUser = (updateData) => {
        return updateProfile(auth.currentUser, updateData)
    }
    // update pass
    const updatePass = (email) => {
        return sendPasswordResetEmail(auth, email)
    }


    // hiring guard
    const [user,setUser]= useState(null)
    useEffect(()=>{
        const userData = onAuthStateChanged(auth, currentUser=>{
            setUser(currentUser) ;
            console.log(currentUser) 
            setLoading(false)
        })
        return()=>{userData()}

    },[]);
    // signout user
    const signOutUser = ()=>{
        return signOut(auth);
    };
     // Update user profile
  const updateUserProfile = (updates) => {
    return updateProfile(auth.currentUser, updates);
  };
   // Send password reset email
   const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };
    
    const authInfo={
        user,
        setUser,
        createUser,
        signInUsers,
        signOutUser,
        resetPassword,
    updateUserProfile,
    updateUser,
    updatePass,
    loading,
    signInWithGoogle
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;