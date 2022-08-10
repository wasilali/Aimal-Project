import React, { Fragment, useState, useEffect } from "react";
// import "./ResetPass.css";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, loardUser, resetPassword } from "../../actions/userAction";
import { useAlert } from "react-alert";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../loading/Loader";
import MetData from "../MetData";


const RestetPass = () => {
  const nav=useNavigate()
  const parms=useParams()
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, success, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const resetPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("password", password);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(resetPassword(parms.token,myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Password Updated Successfully");
      dispatch(loardUser())
      nav("/")
    }
  }, [dispatch, error, alert, success]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetData title="Change Password" />
          <div className="wrapper fadeInDown">
    <div id="formContent">
      <div className="fadeIn first">
        <img
          src="/th.jpg"
          id="icon"
          alt="User Icon"
          style={{borderRadius:"50%",height:"80px"}}

        />
      </div>
      <form onSubmit={resetPasswordSubmit}>
        <input
          type="text"
          id="login"
          className="fadeIn second"          
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="text"
          id="password"
          className="fadeIn third"
          placeholder="Conform password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <input type="submit" className="fadeIn fourth" defaultValue="Log In" />
      </form>

    </div>
  </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default RestetPass;



{/* <div className="resetPasswordContainer">
<div className="resetPasswordBox">
  <h2 className="resetPasswordHeading">Update Profile</h2>

  <form
    className="resetPasswordForm"
    onSubmit={resetPasswordSubmit}
  >
    <div>
      <LockOpenIcon />
      <input
        type="password"
        placeholder="New Password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>
    <div className="loginPassword">
      <LockIcon />
      <input
        type="password"
        placeholder="Confirm Password"
        required
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
    </div>
    <input
      type="submit"
      value="Update"
      className="resetPasswordBtn"
    />
  </form>
</div>
</div> */}