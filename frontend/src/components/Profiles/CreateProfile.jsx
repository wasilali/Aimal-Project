import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { clearErrors, newProfile } from '../../actions/profileAction';
import { CREATE_PROFILE_RESET } from "../../constants/profileConstants";

const CreateProfile = () => {
  const data=useForm();
  const dispatch=useDispatch();
  const alert=useAlert();
  const nav=useNavigate();
  const { loading, error, success }=useSelector((e)=>e.profile)
  const [current,setCurrent]=useState(false)
  function onSubmits(myData) {
    console.log(myData);
    dispatch(newProfile(myData))
  }
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Product Created Successfully");
      nav("/dashboard");
      dispatch({ type: CREATE_PROFILE_RESET });
    }
  }, [dispatch, alert, error, success]);
  return (
    <>
    <section className="container"onSubmit={data.handleSubmit(onSubmits)}>
  <h1 className="large text-primary">Create Your Profile</h1>
  <p className="lead">
    <i className="fas fa-user" /> Let's get some information to make your
    profile stand out
  </p>
  <small>* = required field</small>
  <form className="form" >
    <div className="form-group">
      <select name="status" {...data.register("status")}>
        <option value={0}>* Select Professional Status</option>
        <option value="Developer">Developer</option>
        <option value="Junior Developer">Junior Developer</option>
        <option value="Senior Developer">Senior Developer</option>
        <option value="Manager">Manager</option>
        <option value="Student or Learning">Student or Learning</option>
        <option value="Instructor">Instructor or Teacher</option>
        <option value="Intern">Intern</option>
        <option value="Other">Other</option>
      </select>
      <small className="form-text">
        Give us an idea of where you are at in your career
      </small>
    </div>
    <div className="form-group">
      <input {...data.register("company")} type="text" placeholder="Company" name="company" />
      <small className="form-text">
        Could be your own company or one you work for
      </small>
    </div>
    <div className="form-group">
      <input {...data.register("website")} type="text" placeholder="Website" name="website" />
      <small className="form-text">
        Could be your own or a company website
      </small>
    </div>
    <div className="form-group">
      <input {...data.register("location")} type="text" placeholder="Location" name="location" />
      <small className="form-text">
        City &amp; state suggested (eg. Boston, MA)
      </small>
    </div>
    <div className="form-group">
      <input {...data.register("skills")} type="text" placeholder="* Skills" name="skills" />
      <small className="form-text">
        Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
      </small>
    </div>
    <div className="form-group">
      <input {...data.register("githubusername")} type="text" placeholder="Github Username" name="githubusername" />
      <small className="form-text">
        If you want your latest repos and a Github link, include your username
      </small>
    </div>
    <div className="form-group">
      <textarea
        placeholder="A short bio of yourself"
        name="bio"
        defaultValue={""}
        {...data.register("bio")}
      />
      <small className="form-text">Tell us a little about yourself</small>
    </div>
    <div className="my-2">
      <button type="button" className="btn btn-light" onClick={()=>{
 if (current===false) {
  setCurrent(true)
    
  }else if(current===true){
    setCurrent(false)
  }
      }}>
        Add Social Network Links
      </button>
      <span>Optional</span>
    </div>
    {current===true&& <>
      <div className="form-group social-input">
      <i className="fab fa-twitter fa-2x" />
      <input {...data.register("twitter")} type="text" placeholder="Twitter URL" name="twitter" />
    </div>
    <div className="form-group social-input">
      <i className="fab fa-facebook fa-2x" />
      <input {...data.register("facebook")} type="text" placeholder="Facebook URL" name="facebook" />
    </div>
    <div className="form-group social-input">
      <i className="fab fa-youtube fa-2x" />
      <input {...data.register("youtube")} type="text" placeholder="YouTube URL" name="youtube" />
    </div>
    <div className="form-group social-input">
      <i className="fab fa-linkedin fa-2x" />
      <input {...data.register("linkedin")} type="text" placeholder="Linkedin URL" name="linkedin" />
    </div>
    <div className="form-group social-input">
      <i className="fab fa-instagram fa-2x" />
      <input {...data.register("instagram")} type="text" placeholder="Instagram URL" name="instagram" />
    </div>
    </>}
    
    <input type="submit" className="btn btn-primary my-1" />
    <Link className="btn btn-light my-1" to="/dashboard">
      Go Back
    </Link>
  </form>
</section>

    </>
  )
}

export default CreateProfile