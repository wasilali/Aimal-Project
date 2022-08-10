import React, { useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { clearErrors, delEducationsss, delexpriences, delProfile, getALLProduct, userProductDetails } from '../../actions/profileAction'
import { CREATE_EXPRIENCE_RESET, DELETE_EDUCATION_RESET, DELETE_EXPRIENCE_RESET } from '../../constants/profileConstants'

const Dashboard = () => {
  const dispatch=useDispatch();
  const nav=useNavigate();
  const alert=useAlert();
  const {user}=useSelector(set=>set.user)

  const { loading, profile }=useSelector((e)=>e.profileDetails)

  const { isDeleted,error }=useSelector((e)=>e.delprofile)

  const { isDeleted:del,message,error:experror }=useSelector((e)=>e.delexprience)



// function deluser(id) {
//   dispatch(delProfile(id))

// }

  useEffect(()=>{
  dispatch(userProductDetails())

    if (error) {
      alert.error(error);
      dispatch(clearErrors())
  }
  if (isDeleted) {
    alert.success("Profile Deleted Successfully")
  nav("/dashboard")
  dispatch({type:DELETE_EXPRIENCE_RESET})
  }

  if (experror) {
    alert.error(error);
    dispatch(clearErrors())
}
if (del) {
  alert.success(message)
nav("/dashboard")
dispatch({type:DELETE_EDUCATION_RESET})
}
  },[dispatch,error,alert,isDeleted,experror,del])


  return (
    <>
    {profile !==null ?(
    <section className="container">
    <h1 className="large text-primary">Dashboard</h1>
    <p className="lead">
      <i className="fas fa-user" /> Welcome Sir {user&&user.name}
    </p>
    <div className="dash-buttons">
      <Link to="/add-experience" className="btn btn-light">
        <i className="fab fa-black-tie text-primary" /> Add Experience
      </Link>
      <Link to="/add-education" className="btn btn-light">
        <i className="fas fa-graduation-cap text-primary" /> Add Education
      </Link>
      <Link to="/create/post" className="btn btn-primary my-1">
        Create Posts
      </Link>
    </div>
    <h2 className="my-2">Experience Credentials</h2>
    <table className="table">
      <thead>
        <tr>
          <th>Company</th>
          <th className="hide-sm">Title</th>
          <th className="hide-sm">Years</th>
          <th />
        </tr>
      </thead>
      <tbody>
      {profile.experience&&profile.experience.map((expe)=>(
        <tr key={expe._id}>
        <td>{expe.title}</td>
        <td className="hide-sm">{expe.company}</td>
        <td className="hide-sm">{String(expe.from).substr(0,10)} - {expe.to ? String(expe.to).substr(0,10) : 'Now'}</td>
        <td>
          <button className="btn btn-danger"onClick={()=>{
            dispatch(delexpriences(expe._id))
          }}>Delete</button>
        </td>
      </tr>
      ))}

      </tbody>
    </table>
    <h2 className="my-2">Education Credentials</h2>
    <table className="table">
      <thead>
        <tr>
          <th>School</th>
          <th className="hide-sm">Degree</th>
          <th className="hide-sm">Years</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {profile.education&&profile.education.map((itms)=>(
        <tr key={itms._id}>
        <td>{itms.school}</td>
        <td className="hide-sm">{itms.degree}</td>
        <td className="hide-sm">{String(itms.from).substr(0,10)} - {itms.to ? String(itms.to).substr(0,10) : 'Now'}</td>
        <td>
          <button className="btn btn-danger"onClick={()=>{
            dispatch(delEducationsss(itms._id))
          }}>Delete</button>
        </td>
      </tr>
        ))}
      </tbody>
    </table>
    <div className="my-2">
      <button onClick={()=>{
        dispatch(delProfile(profile._id))
      }} className="btn btn-danger" >
        <i className="fas fa-user-minus" />
        Delete My Account
      </button>
    </div>
  </section>
      ):(
        <section className="container">
        <h1 className="large text-primary">Dashboard</h1>
        <p className="lead">
          <i className="fas fa-user" /> Welcome Sir {user && user.name}
        </p>
      <p>You have not yet setup a profile, please add some info</p>
      <Link to="/create/profile" className="btn btn-primary my-1">
        Create Profile
      </Link>
      <Link to="/create/post" className="btn btn-primary my-1">
        Create Posts
      </Link>
    </section>
      )
    }
    </>

      )
    
}

export default Dashboard