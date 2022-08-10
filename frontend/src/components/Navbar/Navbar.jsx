import React from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logoutUser } from '../../actions/userAction'
import "./Navbar.css"
const Navbar = () => {
  const dispatch=useDispatch();
  const alert=useAlert();
    const {loading,isAuthenticated,user}=useSelector(state=>state.user);

  return <>
  <nav className="navbar bg-dark">
  <h1>
    <Link to="/">
      <i className="fas fa-code"/> DevConnector
    </Link>
  </h1>
  <ul>
  <li> <Link className='navlink' to="/profiles">Developers</Link>
   </li>
  {isAuthenticated&& <li> <Link className='navlink' to="/posts">Posts</Link>
    </li>}
    <li>
     {isAuthenticated&& <Link className='navlink' to="/dashboard">Dashboard</Link>}
    </li>
    <li>
    {!isAuthenticated&&<Link className='navlink' to="/register">Register</Link>}
    </li>
    <li>
    {!isAuthenticated&&<Link className='navlink' to="/login">Login</Link>}
    
    </li>
  </ul>
</nav>

  </>
}

export default Navbar