import React,{useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {useSelector} from 'react-redux'
import "./Account.css"
import MetData from '../MetData'
import Loader from '../loading/Loader'


const Account = () => {
    const nav= useNavigate();
    const {loading,isAuthenticated,user}=useSelector(state=>state.user)
    useEffect(()=>{
        if (isAuthenticated===false) {
            nav("/login")
        }
        
        
    },[isAuthenticated])
  return (
        <>
        {loading?<Loader/>:(
            <>
            <MetData title={`${user.name}s Account`}/>
            <div className='profileContainer'>
                <div>
                    <h1>My Profile</h1>
                    <img src={user.avatar ?  user.avatar.url : ""} alt={user.name}/>
                    <Link to="/me/update">Edit Profile</Link>
                </div>
                <div>
                    <div>
                        <h4>Full Name</h4>
                        <p>{user.name}</p>
                    </div>
                    <div>
                        <h4>Email</h4>
                        <p>{user.email}</p>
                    </div>
                    <div>
                        <h4>Joined On</h4>
                        <p>{String(user.createdAt).substr(0,10)}</p>
                    </div>
                    <div>
                        <Link to="/password/update">Change Password</Link>
                    </div>
                </div>
        
            </div>
            </>
        )}
        </>
  )
}

export default Account