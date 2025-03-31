import React from 'react'
import { Navigate, Outlet } from "react-router-dom";

export default function UserPrivateRoutes() {
    const role = localStorage.getItem("role");  // Get the role from storage

    return role === "user" ? <Outlet /> : <Navigate to="/login" />;
}

