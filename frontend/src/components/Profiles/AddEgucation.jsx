import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { useState } from 'react';
import { clearErrors, newEducation, userProductDetails } from '../../actions/profileAction';
import { CREATE_EDUCATION_RESET } from '../../constants/profileConstants';

const AddEgucation = () => {
  const data=useForm();
  const dispatch=useDispatch();
const [current,setCurrent]=useState(false)

  const {success,error}=useSelector(e=>e.exprience)
  const { profile }=useSelector((e)=>e.profileDetails)

  const alert=useAlert();
  const nav=useNavigate();
function onSubmit(myData) {
  myData.productId=profile._id
console.log(myData);
dispatch(newEducation(myData))
}
useEffect(()=>{
  dispatch(userProductDetails())
  if (error) {
    alert.error(error);
    dispatch(clearErrors())
}

  if (success===true) {
    alert.success("Aducation adds into Profile")
    nav("/dashboard")
    dispatch({ type: CREATE_EDUCATION_RESET });
  }
},[error,success,alert,dispatch,nav])

  return (
    <section className="container">
  <h1 className="large text-primary">Add Your Education</h1>
  <p className="lead">
    <i className="fas fa-graduation-cap" /> Add any school, bootcamp, etc that
    you have attended
  </p>
  <small>* = required field</small>
  <form className="form" onSubmit={data.handleSubmit(onSubmit)}>
    <div className="form-group">
      <input
      {...data.register("school")}
        type="text"
        placeholder="* School or Bootcamp"
        name="school"
        required=""
      />
    </div>
    <div className="form-group">
      <input
      {...data.register("degree")}
        type="text"
        placeholder="* Degree or Certificate"
        name="degree"
        required=""
      />
    </div>
    <div className="form-group">
      <input {...data.register("fieldofstudy")} type="text" placeholder="Field Of Study" name="fieldofstudy" />
    </div>
    <div className="form-group">
      <h4 style={{color:"#03e9f4"}}>From Date</h4>
      <input {...data.register("from")} type="date" name="from" />
    </div>
    <div className="form-group">
    {/* <p>
        <input type="checkbox" name="current" value={current} checked={current} 
        onClick={() => {
          if (current===false) {
          setCurrent(true)
            
          }else if(current===true){
            setCurrent(false)
          }
        }}
        /> Current School
        or Bootcamp
      </p> */}
    </div>
    <div className="form-group">
      <h4 style={{color:"#03e9f4"}}> To Date</h4>
      <input {...data.register("to")} type="date" name="to"/>
    </div>
    <div className="form-group">
      <textarea
      {...data.register("description")}
        name="description"
        cols={30}
        rows={5}
        placeholder="Program Description"
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

export default AddEgucation