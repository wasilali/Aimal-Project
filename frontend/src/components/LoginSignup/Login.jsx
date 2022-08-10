import React, { useEffect, useState } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { clearErrors, loginUser } from '../../actions/userAction'
import Loader from '../loading/Loader';
import './login.css'
// import "./login.css";
import { useForm } from "react-hook-form";
const Login = () => {
  const dispatch=useDispatch();
  const alert=useAlert();
  const nav= useNavigate();
  const {error,loading,isAuthenticated}=useSelector(state=>state.user)

let data=useForm();
function saveUser(myData) {


  console.log(myData);
  dispatch(loginUser(myData))



  if(isAuthenticated===true){
    nav("/dashboard")
  }
}


  useEffect(()=>{
    if (error) {
        alert.error(error);
        dispatch(clearErrors())
    }
    if(isAuthenticated===true){
        nav("/dashboard")
  alert.success("login Successfully")

    }
  },[dispatch,alert,error,isAuthenticated])

  return (<>
    {loading?<Loader/>:(
      <>
<div className="login-box">
  <h2>Login</h2>
  <form onSubmit={data.handleSubmit(saveUser)}>
    <div className="user-box">
    <input
          {...data.register("email", {required:true})}
          type="text"
          id="login"
          className="fadeIn second"          
          placeholder="login"
        />
        {data.formState.errors.name ? <div className='error'>Please enter your name</div> :null }
      <label>Username</label>
    </div>
    <div className="user-box">
    <input
          type="text"
          id="password"
          className="fadeIn third"
          {...data.register("password", {required:true})}
          placeholder="password"
        />
        
        { data.formState.errors.password && data.formState.errors.password.type == "required" ? <div className='error'>Please enter your pasword</div> : null}
        { data.formState.errors.password && data.formState.errors.password.type == "minLength" ? <div className='error'>Please enter atleast 6 characters</div> : null}
        { data.formState.errors.password && data.formState.errors.password.type == "validate" ? <div className='error'>Please enter atleast 1 Capital letter, 1 Small letter and 1 special lettr</div> : null}

      <label>Password</label>
    </div>
    <button type="submit" class="btn btn-outline-info">Log In</button>

    {/* <input type="submit" className="fadeIn fourth" defaultValue="Log In" /> */}

    <div id="formFootere">
        <Link to="/password/forgot" className="underlineHover" href="#">
          Forgot Password?
        </Link>
      </div>
  </form>

</div>
      </>
    )}
    </>
    )
  
}

export default Login










{/* <div className="wrappers fadeInDown">
    <div id="formContent"> */}
      {/* <div className="fadeIn first">
        <img
          src="https://img.pikbest.com/png-images/simple-modern-unique-tropical-beach-logo--the-symbol-itself-will-look-nice-as-social-media_5667070.png!bw340"
          id="icon"
          alt="User Icon"
        />
      </div> */}
      {/* <form onSubmit={data.handleSubmit(saveUser)}>
        <input
          {...data.register("email", {required:true})}
          type="text"
          id="login"
          className="fadeIn second"          
          placeholder="login"
        />
        
       {data.formState.errors.name ? <div className='error'>Please enter your name</div> :null }
        
        
        
        <input
          type="text"
          id="password"
          className="fadeIn third"
          {...data.register("password", {required:true})}
          placeholder="password"
        />
        
        { data.formState.errors.password && data.formState.errors.password.type == "required" ? <div className='error'>Please enter your pasword</div> : null}
        { data.formState.errors.password && data.formState.errors.password.type == "minLength" ? <div className='error'>Please enter atleast 6 characters</div> : null}
        { data.formState.errors.password && data.formState.errors.password.type == "validate" ? <div className='error'>Please enter atleast 1 Capital letter, 1 Small letter and 1 special lettr</div> : null}

        <input type="submit" className="fadeIn fourth" defaultValue="Log In" />
      </form> */}
      {/* <div id="formFooter">
        <a className="underlineHover" href="#">
          Forgot Password?
        </a>
      </div>
    </div>
  </div> */}