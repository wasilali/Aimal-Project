import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import {  clearErrors, signup } from '../../actions/userAction'
import Loader from '../loading/Loader';

const Register = () => {
  
  const dispatch=useDispatch();
  const alert=useAlert();
  const nav= useNavigate();
  const {error,loading,isAuthenticated}=useSelector(state=>state.user)
  // for register
  const [user,setUser]=useState({
    name:"",
    email:"",
    password:""
})

const {name,email,password}=user
const [avatarPreview,setAvatarPreview]= useState("/okkkk.jpg")
const [avatar,setAvatar]=useState()

const registerDataChange=(e)=>{
  if(e.target.name==="image"){
   const reader=new FileReader()
   reader.onload=()=>{
      if(reader.readyState===2){
          setAvatarPreview(reader.result)
          setAvatar(reader.result)
      }
   }
   const file=e.target.files[0]
  
     reader.readAsDataURL(file)
   
  }else{
    setUser({...user,[e.target.name]:e.target.value})
}
  }

function register(e) {
  e.preventDefault()
  
  const myForm=new FormData()
  myForm.set("name",name)
  myForm.set("email",email)
  myForm.set("password",password)
  myForm.set("avatar",avatar)
  dispatch(signup(myForm))
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
alert.success("Register Successfully")

  }
},[dispatch,alert,error,isAuthenticated])

  return (<>
  {loading?<Loader/>:(
    <>
     <div className="login-box">
  <h2><img src={avatarPreview} style={{height:"60px",width:"60px",borderRadius:"50%"}} alt="Avatar Preview" /></h2>
  <form onSubmit={register}>
    <div className="user-box">
    <input type="text" placeholder="Name" name="name" required value={name} onChange={registerDataChange} />
    </div>
    <div className="user-box">
    <input type="email" placeholder="Email Address" name="email" value={email} onChange={registerDataChange} />
    <label>Email</label>
    </div>
    <div className="user-box">
    <input
      type="password"
      placeholder="Password"
      name="password"
      minLength="6"
      value={password}
      onChange={registerDataChange}
    />
      <label>Password</label>
    </div>
    <div className="user-box">
    <input
      type="file"
      placeholder="add Image"
      name="image"
      minLength="6"
      onChange={registerDataChange}
    />
    </div>
    <button type="submit" class="btn btn-outline-info">Register</button>
  </form>

</div>
    </>
  )}
  </>
  )

}

export default Register




{/* <section class="container">
<h1 class="large text-primary">Sign Up</h1>
<p class="lead"><i class="fas fa-user"></i> Create Your Account</p>
<form class="form" action="create-profile.html" onSubmit={register}>
  <div class="form-group">
    <input type="text" placeholder="Name" name="name" required value={name} onChange={registerDataChange} />
  </div>
  <div class="form-group">
    <input type="email" placeholder="Email Address" name="email" value={email} onChange={registerDataChange} />
  </div>
  <div class="form-group">
    <input
      type="password"
      placeholder="Password"
      name="password"
      minLength="6"
      value={password}
      onChange={registerDataChange}
    />
  </div>
  <div class="form-group">
  <img src={avatarPreview} style={{height:"40px",width:"40px",borderRadius:"50%"}} alt="Avatar Preview" />
    <input
      type="file"
      placeholder="add Image"
      name="image"
      minLength="6"
      onChange={registerDataChange}
    />
  </div>

  <input type="submit" class="btn btn-primary" value="Register" />
</form>
<p class="my-1">
  Already have an account? <Link to="/login">Sign In</Link>
</p>
</section> */}