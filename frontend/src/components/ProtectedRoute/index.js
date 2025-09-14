import React from "react";
import {Navigate} from 'react-router-dom'
import Cookies from 'js-cookie'

const ProtectedRoute = ({children ,allowedRoles}) => {
    const token = Cookies.get("token");
    const role = Cookies.get("role");

    if(!token) {
        return <Navigate to="/login" replace />

    }

    if(allowedRoles && Array.isArray(allowedRoles)) {
        if(!role || !allowedRoles.includes(role)) {
            return <Navigate to="/" replace />
        }
    }

    return children;
}

export default ProtectedRoute