import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { useState } from 'react';
import { clearErrors, newExprience, userProductDetails } from '../../actions/profileAction';
import { CREATE_EXPRIENCE_RESET } from '../../constants/profileConstants';

const AddExprience = () => {
  const data=useForm();
  const dispatch=useDispatch();
  const {success,error}=useSelector(e=>e.exprience)
  const { profile }=useSelector((e)=>e.profileDetails)

  const alert=useAlert();
  const nav=useNavigate();
const [current,setCurrent]=useState(false)
function onSubmit(myData) {
  myData.productId=profile._id
console.log(myData);
dispatch(newExprience(myData))
}
useEffect(()=>{
  dispatch(userProductDetails())
  if (error) {
    alert.error(error);
    dispatch(clearErrors())
}

  if (success) {
    alert.success("Exprience adds to Profile")
    nav("/dashboard")
    dispatch({ type: CREATE_EXPRIENCE_RESET });
  }
},[error,success,alert,dispatch,nav])


  return (
    <section className="container">
  <h1 className="large text-primary">Add An Experience</h1>
  <p className="lead">
    <i className="fas fa-code-branch" /> Add any developer/programming positions
    that you have had in the past
  </p>
  <small>* = required field</small>
  <form className="form" onSubmit={data.handleSubmit(onSubmit)}>
    <div className="form-group">
      <input {...data.register("title")} type="text" placeholder="* Job Title" name="title" required="" />
    </div>
    <div className="form-group">
      <input {...data.register("company")} type="text" placeholder="* Company" name="company" required="" />
    </div>
    <div className="form-group">
      <input {...data.register("location")} type="text" placeholder="Location" name="location" />
    </div>
    <div className="form-group">
      <h4 style={{color:"#03e9f4"}}>From Date</h4>
      <input {...data.register("from")} type="date" name="from" />
    </div>
    <div className="form-group">
      {/* <p>
 {/* Current Job <input type="checkbox" checked={true}  />
 {/* <input type="checkbox" name="current" value={current} checked={current} 
        onClick={() => {
          if (current===false) {
          setCurrent(true)
            
          }else if(current===true){
            setCurrent(false)
          }
        }}
        /> */} 
      {/* </p>  */}
    </div>
    <div className="form-group">
      <h4 style={{color:"#03e9f4"}}>To Date</h4>
      <input {...data.register("to")} type="date" name="to" disabled={current} />
    </div>
    <div className="form-group">
      <textarea
      {...data.register("description")}
        name="description"
        cols={30}
        rows={5}
        placeholder="Job Description"
        defaultValue={""}
      />
    </div>
    <input type="submit" className="btn btn-primary my-1" />
    <Link className="btn btn-light my-1" to="/dashboard">
      Go Back
    </Link>
  </form>
</section>
  )
}

export default AddExprience