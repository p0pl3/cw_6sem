import React from "react";
import {Navigate, Outlet, useLocation} from "react-router-dom";
import MyNavbar from "../components/MyNavbar/MyNavbar";
import {useSelector} from "react-redux";
import {selectToken} from "../redux/slices/auth";


function RootPage() {
    const token = useSelector(selectToken)
    const RequireAuth = ({children}) => {
        const location = useLocation();
        if (!token) {
            return <Navigate
                to="/login"
                state={{prevUrl: location.pathname}}
            />
        }
        return children;
    }

    return (
        <RequireAuth>
            <MyNavbar/>
            <Outlet/>
        </RequireAuth>
    )
}

export default RootPage