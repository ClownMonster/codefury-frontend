import React, {useEffect,useState} from "react";
import {Link} from 'react-router-dom';
import SideBar from "./../layout/SideBar"
import axios from "axios"

import './vorder.css'
import vlogo from './vcart.svg'


const WorkerList = ()=>{

  const [showCarepenter,setShowCarpenter] = useState(false)
  const [showPlumber,setShowPlumber] = useState(false)
  const [showDaily,setShowDaily] = useState(false)
  const [showHouse,setShowHouse] = useState(false)

  const [labourers,setLabourers]  = useState([])
  const [show,setShow] = useState(false)
  



  useEffect(async ()=>{
    try{
      // const vendorId = localStorage.getItem("vendorId");
      // console.log(vendorId)
      const url  = `http://69d17dc235e9.ngrok.io/getAllLabourers`
      const res  = await axios.get(url)
      console.log(res.data)
      setLabourers(res.data)
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
  <div className="orderCardBox">{ show && labourers.length > 0 ? labourers.map(item =>
    <div className="in" key ={item.workId}>
    <div>Name : {item.name}</div>
    <div>Phone No : {item.phone}</div>
    <div>Pay/Per Day : {item.perDaySalary}</div>
    <div>Place : {item.place}</div>
    <Link className="viewBtn" to={`/${item.workId}`}>View</Link>

  </div>) : ""}</div>
    </div>
    </div>
  );

}


export default WorkerList;