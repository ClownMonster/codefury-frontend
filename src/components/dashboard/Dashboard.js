import React,{useEffect,useState} from "react";
import './dashboard.css';
import dashLogo from './dashboard.svg';
import SideBar from "../layout/SideBar";

  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const Dashboardvendor = () => {


  const [result,setResult]  = useState([])
  const [show,setShow] = useState(false)
  
  const notify = () => toast("Wow so easy !");

  useEffect( ()=>{
    fetch('http://hackout.herokuapp.com/getAllOrders?vendorId=2334333',{
    }).then(
      res => res.json()
    ).then(data => {
    console.log(data) 
    setResult(data)
    setShow(true) })
    .catch(
      err=> console.error(err)
    )
    },[] )



  return (
    <div className="outer">
   <SideBar/>
    <div className="mainArea">
      <div className="welcomeHeadText">
        <h3>Hello! Mohan Welcome </h3>
      </div>
      <div className="dashlogo"><img src={dashLogo} alt="dashLogo" /></div>
      <div className="cards">
        <div className="orderCard">
          <h3>Workers Near By </h3>
          <h3>200</h3>
        </div>
        <div className="orderCard">
          <h3>Available</h3>
          <h3>400</h3>
        </div>
        <div className="orderProcessed">
          <h3>Invited</h3>
          <h3>18</h3>
          <button onClick={notify}>click Me</button>
          <ToastContainer />
        </div>
      </div>
    </div>
    </div>
  );
}

export default Dashboardvendor;
