import React from "react";
import {Outlet} from "react-router-dom";
import MyNavbar from "../components/MyNavbar/MyNavbar";


function RootPage() {

    return (
        <>
            <MyNavbar/>
            <Outlet/>
        </>
    )
}

export default RootPage