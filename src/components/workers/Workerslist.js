import React, {useEffect,useState} from "react";
import {Link} from 'react-router-dom';
import SideBar from "./../layout/SideBar"
import axios from "axios"

import './vorder.css'
import vlogo from './vcart.svg'


const VendorOder = ()=>{

  const [result,setResult]  = useState([])
  const [show,setShow] = useState(false)
  



  useEffect(async ()=>{
    try{
      const vendorId = localStorage.getItem("vendorId");
      console.log(vendorId)
      const url  = `http://hackout.herokuapp.com/getAllOrders?vendorId=${vendorId}`
      const res  = await axios.get(url)
      console.log(res.data)
      setResult(res.data)
      setShow(true)
    }catch(err){
      console.error(err)
    }
    },[] )

 

   
  return (
    <div className="outer">
      <SideBar/>
    <div className="mainArea">
        <div className="vlogo"><img src={vlogo}  alt="vlogo" /></div>
<div className="bb-box">
  <div className="dropdown">
    <button class="btn2 btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      Select Category
    </button>
  <div style={{background:'white', cursor:'pointer'}} className="dropdown-menu" aria-labelledby="dropdownMenuButton">
    <a className="dropdown-item" href>All Labourers</a>
    <a className="dropdown-item" href>Plumbers</a>
    <a className="dropdown-item" href>Carpenters</a>
    <a className="dropdown-item" href>DailyWage Workers</a>
  </div>

</div>

 <div className="dropdown">
    <button class="btn2 btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      Select Region
    </button>
  <div style={{background:'white', cursor:'pointer'}} className="dropdown-menu" aria-labelledby="dropdownMenuButton">
    <a className="dropdown-item" href>Bangalore</a>
    <a className="dropdown-item" href>Chennai</a>
    <a className="dropdown-item" href>Mumbai</a>
    <a className="dropdown-item" href>Delhi</a>

  </div>
</div>
</div>

  <div className="orderCardBox">{ show && result.length > 0 ? result.map(item =>
    <div className="in" key ={item.orderId}>
    <div>order Id: {item.orderId}</div>
    { item.orderProcessed === false && <div>Not processed</div> }
    { item.orderProcessed === true && <div style={{color:'#2ecc71', fontWeight:'bolder'}}>processed</div> }
    <div>from : {item.orderPhoneNo}</div>
    <Link className="viewBtn" to={`/${item.orderId}`}>View</Link>

  </div>) : ""}</div>
    </div>
    </div>
  );

}


export default VendorOder;



//http://69d17dc235e9.ngrok.io/getAllLabourers

//http://69d17dc235e9.ngrok.io/getPlumbers

//http://69d17dc235e9.ngrok.io/getCarpenters

//http://69d17dc235e9.ngrok.io/getDailyWage





//http://69d17dc235e9.ngrok.io/getWorkersInCity?city=bangalore