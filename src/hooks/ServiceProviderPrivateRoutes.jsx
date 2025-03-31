import React from 'react'
import { Navigate, Outlet } from "react-router-dom";

export default function ServiceProviderPrivateRoutes() {
    const role = localStorage.getItem("role");  // Get the role from storage

    return role === "service" ? <Outlet /> : <Navigate to="/service/login" />;
}
