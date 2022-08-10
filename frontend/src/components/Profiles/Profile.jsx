import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails } from '../../actions/profileAction';
import { useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import Loader from '../loading/Loader';
const Profile = () => {
  const dispatch=useDispatch();
  const params=useParams();

  const { loading, profile }=useSelector((e)=>e.profileDetails)


  useEffect(()=>{
     dispatch(getProductDetails(params.id))
  },[dispatch])

  return (
        <>
        {loading?<Loader/>:(
    <section className="container">
    <Link to="/profiles" className="btn btn-light">
      Back To Profiles
    </Link>
    <div className="profile-grid my-1">
      {/* Top */}
      <div className="profile-top bg-primary p-2">
        <img
          className="round-img my-1"
          src={profile.avatar&&profile.avatar.url}
          alt=""
        />
        <h1 className="large">{profile.name}</h1>
        <p className="lead">{profile.status} {profile.company && <span> at {profile.company}</span>}</p>
        <p>{profile.location && <span>{profile.location}</span>}</p>
        <div className="icons my-1">
          <a href="#" target="_blank" rel="noopener noreferrer">
            <i className="fas fa-globe fa-2x" />
          </a>
          <a href={profile.twitter} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter fa-2x" />
          </a>
          <a href={profile.facebook} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook fa-2x" />
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin fa-2x" />
          </a>
          <a href={profile.youtube} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-youtube fa-2x" />
          </a>
          <a href={profile.instagram} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram fa-2x" />
          </a>
        </div>
      </div>
      {/* About */}
      <div className="profile-about bg-light p-2">
        <h2 className="text-primary">{profile.name}</h2>
        <p>
         {profile.bio}
        </p>
        <div className="line" />
        <h2 className="text-primary">Skill Set</h2>
        <div className="skills">

          <div className="text-primary">
          <i className="fas fa-check" /> {profile.skills}
        </div>

        </div>
      </div>
      {/* Experience */}
      {profile.experience&&profile.experience.map((expe)=>(
      <div className="profile-exp bg-white p-2">
      <h2 className="text-primary">Experience</h2>
      <div>
        <h3 style={{color:"#00fe2f"}}>{expe.title}</h3>
        <p><strong>Date: </strong>{String(expe.from).substr(0,10)} - {expe.to ? String(expe.to).substr(0,10) : 'Now'}</p>
        <p>
          <strong>location: </strong>{expe.location}
        </p>
        <p>
          <strong>Description: </strong>{expe.description}
        </p>
      </div>
    </div>
      ))};

      {/* Education */}
      {profile.education&&profile.education.map((itms)=>(
      <div className="profile-edu bg-white p-2">
      <h2 className="text-primary">Education</h2>
      <div>
        <h3 style={{color:"#00fe2f"}}>{itms.school}</h3>
        <p><strong>Date: </strong>{String(itms.from).substr(0,10)} - {itms.to ? String(itms.to).substr(0,10) : 'Now'}</p>
        <p>
          <strong>Degree: </strong>{itms.degree}
        </p>
        <p>
          <strong>Field Of Study: </strong>{itms.fieldofstudy}
        </p>
        <p>
          <strong>Description: </strong>{itms.description}
        </p>
      </div>
    </div>
      ))}

      {/* Github */}
      <div className="profile-github">
        <h2 className="text-primary my-1">
          <i className="fab fa-github" /> Github Repos
        </h2>
        <div className="repo bg-white p-1 my-1">
          <div>
            <h4>
              <a href="#" target="_blank" rel="noopener noreferrer">
                Repo One
              </a>
            </h4>
            <p>
              {profile.githubusername}
            </p>
          </div>
          <div>
            <ul>
              <li className="badge badge-primary">Stars: 44</li>
              <li className="badge badge-dark">Watchers: 21</li>
              <li className="badge badge-light">Forks: 25</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
        )}
</>

  
  )
}

export default Profile