import React,{useState,useEffect} from 'react'
import './forgotPassword.css'
import {useDispatch,useSelector} from 'react-redux'
import {clearErrors,forgotPassword} from '../../actions/userAction'
import {useAlert} from 'react-alert'
import { useNavigate } from 'react-router-dom'
import Loader from '../loading/Loader'
import MetData from '../MetData'

const ForgotPassword = () => {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const alert=useAlert()
    const {error,message,loading}=useSelector((state)=>state.forgotPassword)

    const [email,setEmail]=useState("")

    const forgotPasswordSubmit=(e)=>{
        e.preventDefault()
        const myForm=new FormData()
        myForm.set("email",email)
       dispatch(forgotPassword(myForm))
console.log(email);
    }
    useEffect(() => {
        
      if(error){
        alert.error(error)
        dispatch(clearErrors())
        
      }
      if(message){
        alert.success("Email sended")
    }
    }, [dispatch,error,alert,message])
    
  return (
    <>
    {loading ? <Loader/> :  (
         <>
         <MetData title="Forgot Password "/>
         <div className="wrapper fadeInDown">
    <div id="formContent">
      {/* Tabs Titles */}
      {/* Icon */}
      <div className="fadeIn first">
        <img
          src="/th.jpg"
          id="icon"
          alt="User Icon"
          style={{borderRadius:"50%",height:"80px"}}
          
        />
      </div>
      {/* Login Form */}
      <form  onSubmit={forgotPasswordSubmit}>
        <input
          type="text"
          id="login"
          className="fadeIn second"          
          placeholder="email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />
        <input type="submit" className="fadeIn fourth" defaultValue="Log In" />
      </form>

    </div>
  </div>
    </>
    )}
    </>
  )
}

export default ForgotPassword



{/* <div className='forgotPasswordContainer'>
           <div className='forgotPasswordBox'>
       
             <h2 className='forgotPasswordHeading' >Forgot Password</h2>
           <form
            className="forgotPasswordForm form"
            onSubmit={forgotPasswordSubmit}
            >
        
          <div className='emailName'>
            <div className='forgotPasswordEmail'>
             <MailOutlineIcon/>
             <input type="email" 
             placeholder='Email'
             required
             name="email"
             value={email}
             onChange={(e)=>setEmail(e.target.value)}
             />
            </div>
            <div>
            <input type="submit" 
            value="send"
            className="forgotPasswordBtn"
            /> 
            </div>
          </div>
        </form>
       </div>
      </div> */}