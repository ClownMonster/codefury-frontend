import React, { useState,useEffect } from "react";
import {Redirect} from "react-router-dom";
import registerImg from './images/img1.svg';
import signInImg from "./images/img2.svg";
import "./register.css"
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const RegisterRetailer = () => {

    const [registerData,setRegisterData] = useState({
      vendorName:"",
      vendorId: "",
      vendorGovRegsNumber: "",
      vendorPassword:"",
      vendorAddress:"",
      vendorEmail:"",
      vendorNumber: ""
    }) 

    const [signInData,setSignInData] = useState({
      vendor_id  : "",
      password : ""
    })

    const [form,setForm] = useState(false);
    const [loggedIn ,setLoggedIn] = useState(false)

    useEffect(() => {
      const loggedInUser = localStorage.getItem("log");
      if (loggedInUser) {
        setLoggedIn(true)
      }
    }, []);


      if(loggedIn){
        return <Redirect to="/dashboard" />
      }
  
  
    let divClass = ["container1"];
    if(form) {
      divClass.push('sign-up-mode');
    }

   

    const notify =(msg ) =>  toast.info(msg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        });

    const signUp = () => { 
         setForm(true)
         let id = Math.floor(100000 + Math.random() * 900000)
         setRegisterData({ ...registerData, vendorId : id })
   } 

   const signIn = () => { 
     setForm(false)
    }

    const {vendorName,vendorAddress, vendorEmail, vendorPassword, vendorGovRegsNumber,vendorNumber} = registerData;
    const {vendor_id , password} = signInData

    const onRegister = e => setRegisterData({ ...registerData, [e.target.name]: e.target.value })
    const onSingIn = e => setSignInData({ ...signInData, [e.target.name]: e.target.value })

    const onRegisterSubmit =async (e)  =>{
      try {
        e.preventDefault();
        const config = {
          headers: {
          'content-type': 'application/json'
        }}
        const res  = await axios.post("#",registerData,config)
        if(res.data.success === true){
          localStorage.setItem('vendorId',registerData.vendorId)
          localStorage.setItem('log', true)
          setLoggedIn(true)
        }  
      }catch(err){
        console.error(err)
      }}
  

    const onSignInSubmit =async (e) => {
      try {  
        console.log(signInData)
        e.preventDefault();
        const config = {
          headers: {
          'content-type': 'application/json'
        }}
        const res  = await axios.post("#",signInData,config)
        console.log(res)
        if(res.data.success === true){
          localStorage.setItem('vendorId',signInData.vendor_id)
          localStorage.setItem('log', true)
          setLoggedIn(true)
        }  
      }catch(err){
        console.error(err)
        notify("Invaild Credentials")
      }
    }
     

  return (
    <div className={divClass.join(" ")}>
    <ToastContainer
    position="top-right"
    autoClose={5000}
    hideProgressBar
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    />
      <div className="forms-container">
        <div className="signin-signup">
          <form onSubmit = {e => onSignInSubmit(e)} className="sign-in-form">
            <h2 className="title">Sign in</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input  value={vendor_id} onChange={e => onSingIn(e)} name ="Email" type="email" placeholder="Email" />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input value={password} onChange={e => onSingIn(e)} name ="password" type="password" placeholder="Password" />
            </div>
            <input type="submit" value="Sign In" className="btn solid" />
          </form>

          <form  onSubmit={e => onRegisterSubmit(e)} className="sign-up-form">
            <h2 className="title">Sign up</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input value={vendorName} onChange={e => onRegister(e)} name ="vendorName" type="text" placeholder="User Name" />
            </div>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input value={vendorEmail} onChange={e => onRegister(e)} name ="vendorEmail" type="email" placeholder="Email" />
            </div>
            <div className="input-field">
            <i class="fa fa-mobile" aria-hidden="true"></i>
              <input value={vendorNumber} onChange={e => onRegister(e)} name ="vendorNumber" type="text" placeholder="Mobile Number" />
            </div>
            <div className="input-field" >
            <i class="fa fa-map-marker" aria-hidden="true"></i>
              <input onChange={e => onRegister(e)} value={vendorAddress}   placeholder= "Address" type="text" name="Address" cols="20" rows="6"></input>
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input value={vendorPassword} onChange={e => onRegister(e)} name ="vendorPassword" type="password" placeholder="Password" />
            </div>
            <input  type="submit" className="btn" value="Sign up" />
          </form>
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>New here ?</h3>
            <button onClick = {() => signUp()} style={{margin : "1rem"}} className="btn transparent" id="sign-up-btn">
              Sign up
            </button>
          </div>
          <img src={registerImg} className="image" alt="" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>One of us ?</h3>
            <button onClick = {() => signIn()}  style={{margin : "1rem"}} className="btn transparent" id="sign-in-btn">
              Sign in
            </button>
          </div>
          <img src={signInImg} className="image" alt="" />
        </div>
      </div>
    </div>
  );
}

export default RegisterRetailer;