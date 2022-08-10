import React from 'react'
import { Navigate,Outlet } from 'react-router-dom'
const ProctedRout = ({isAuthenticated}) => {

    if (isAuthenticated===false) {
        return <Navigate to={'/login'}/>
    }
    return <Outlet/>
}

export default ProctedRout