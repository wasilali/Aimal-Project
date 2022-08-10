import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import {  getALLProduct } from '../../actions/profileAction';
import { useEffect } from 'react';
import { Link } from "react-router-dom";
import Loader from '../loading/Loader';
const Profiles = () => {
  const dispatch=useDispatch();
  const { loading, profiles }=useSelector((e)=>e.allProfiles)

  useEffect(()=>{
    dispatch(getALLProduct())
  },[dispatch])
  return (
    <>
    {loading?<Loader/>:(
    <>
    <section className="container">
  <h1 className="large text-primary">Developers</h1>
  <p className="lead">
    <i className="fab fa-connectdevelop" /> Browse and connect with developers
  </p>
  <div className="profiles">
{
  profiles&&profiles.map((profile)=>(
    <div className="profile bg-light"key={profile._id}>
    <img
      className="round-img"
      src={profile.avatar?profile.avatar.url:""}
      alt="alt"
    />
    <div>
      <h2>{profile.name}</h2>
      <p>{profile.status} {profile.company && <span> at {profile.company}</span>}</p>
      <p>{profile.location && <span>{profile.location}</span>}</p>
      <Link to={`/profile/${profile._id}`} className="btn btn-primary">
        View Profile
      </Link>
    </div>
    <ul>
      
          <li className="text-primary">
          <i className="fas fa-check" /> {profile.skills}
        </li>

    </ul>
  </div>
  ))
}
   
  </div>
</section>

    </>
    )}
    </>

  )
}

export default Profiles