import React,  from "react";
import classes from "./MyNavbar.module.css";
import {NavLink} from "react-router-dom";
import {Container} from "react-bootstrap";
import active from "./navbar-active.css"

function MyNavbar() {

    return (
        <Container
            fluid="xxl"
            className={classes.navbar}
        >
            <div className={`${classes.inner} d-flex flex-wrap`}>
                <NavLink
                    activeClassName={active}
                    className={"d-flex flex-column align-items-center"}
                    to="/"
                >
                    <img
                        src="/assets/home.svg"
                        alt=""
                    />
                    <p>Главная</p>
                </NavLink>
            </div>
        </Container>
    )
}

export default MyNavbar;