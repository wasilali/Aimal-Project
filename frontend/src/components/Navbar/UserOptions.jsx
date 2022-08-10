import React,{useState} from 'react'
import './UserOptions.css'
import {SpeedDial,SpeedDialAction} from '@material-ui/lab'
import PersonIcon from '@material-ui/icons/Person'
import ExistToAppIcon from '@material-ui/icons/ExitToApp'
import { useNavigate } from 'react-router-dom'
import { useAlert } from 'react-alert'
import {useDispatch} from 'react-redux'
import Backdrop from "@material-ui/core/Backdrop"
import { logoutUser } from '../../actions/userAction'

const UserOptions = ({user}) => {
    const [open, setOpen] = useState(false)
    const navigate=useNavigate()
    const alert=useAlert
    const dispatch=useDispatch()

    const options=[
        {icon:<PersonIcon/>,name:"MyAccount",func:account},
        {icon:<ExistToAppIcon/>,name:"Logout",func:logoutUsers},
   
    ]



    function account() {
        navigate("/account")
        
    }
    function logoutUsers() {
        dispatch(logoutUser())
        alert.success("logout Successfully")
      
        
    }
  return (
    <>
    <Backdrop open={ open }  />
    <SpeedDial
    ariaLabel='SpeedDial tooltip example'
    onClose={()=> setOpen(false)}
    onOpen={()=>setOpen(true)}
    open={open}
    direction="down"
    className='speedDial'
    style={{zIndex:"11"}}
    icon={<img 
    className='speedDialIcon'
    src={user.avatar ?  user.avatar.url : ""}
    alt="profile"
    />}
    >
   {
    options.map((item)=>(
        <SpeedDialAction key={item.name}
         icon={item.icon}
          tooltipTitle={item.name}
          tooltipOpen={window.innerWidth <= 600 ? true : false}
          onClick={item.func}/>
    ))
   }

    </SpeedDial>
    </>
  )
}

export default UserOptions