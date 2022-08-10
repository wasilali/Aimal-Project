import React, { useEffect } from 'react'
import "./App.css"
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Navbar from './components/Navbar/Navbar';
import LandingPage from './components/LandingPage/LandingPage';
import Login from './components/LoginSignup/Login';
import Register from './components/LoginSignup/Register';
import Dashboard from './components/Dashboard/Dashboard';
import ProctedRout from './components/protectedRoutes/ProctedRout';
import { useSelector } from 'react-redux';
import { loardUser } from './actions/userAction';
import store from "./store"
import Loader from './components/loading/Loader';
import UserOptions from './components/Navbar/UserOptions';
import UpdateProfile from './components/LoginSignup/UpdateProfile';
import UpdatePassword from './components/LoginSignup/UpdatePassword';
import CreateProfile from './components/Profiles/CreateProfile';
import Profiles from './components/Profiles/Profiles';
import Profile from './components/Profiles/Profile';
import AddExprience from './components/Profiles/AddExprience';
import AddEgucation from './components/Profiles/AddEgucation';
import ForgotPassword from './components/LoginSignup/ForgotPassword';
import RestetPass from './components/LoginSignup/RestetPass';
import Posts from './components/posts/Posts';
import CreatePost from './components/posts/CreatePost';
import UserProfile from './components/Profile/UserProfile';
import Account from './components/Profile/Account';

function App() {

    const {loading,isAuthenticated,user}=useSelector(state=>state.user)

    useEffect(()=>{
        if (user !==null) {
        store.dispatch(loardUser())
          
        }
      },[])
    return <>
    {loading?<Loader/>:(
        <>
        <BrowserRouter>
    <Navbar/>
    {isAuthenticated&&<UserOptions user={user}/>}
    <Routes>
        <Route element={<ProctedRout isAuthenticated={isAuthenticated}/>}>
        <Route path='/dashboard' element={<Dashboard/>} ></Route>
        <Route path='/account' element={<Account/>}/>
        <Route path='/me/update' element={<UpdateProfile/> }/>
        <Route path='/password/update' element={<UpdatePassword/>}/>
        <Route path='/create/profile' element={<CreateProfile/>}></Route>
        <Route path='/profile/:id' element={<Profile/>} ></Route>
        <Route path='/add-experience' element={<AddExprience/>} ></Route>
        <Route path='/add-education' element={<AddEgucation/>} ></Route>
        <Route path='/posts' element={<Posts/>}></Route>
        <Route path='/create/post' element={<CreatePost/>}></Route>
        <Route path="/user/:id" element={<UserProfile />}></Route>


    </Route>
    <Route path='/' element={<LandingPage/>} ></Route>
    <Route path='/login' element={<Login/>} ></Route>
    <Route path='/register' element={<Register/>} ></Route>
    <Route path='/profiles' element={<Profiles/>}></Route>
    <Route path='/password/forgot' element={ <ForgotPassword/> }/>
    <Route path='/password/reset/:token' element={ <RestetPass/> } />

    </Routes> 
    </BrowserRouter>
        </>
    )}
    

    </>
}

export default App;

