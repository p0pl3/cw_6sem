import React from "react";
import {Link, useNavigate} from "react-router-dom";
import {Container} from "react-bootstrap";

export default function PageNotFound() {
    const navigate = useNavigate();
    return (
        <Container
            fluid="xxl"
            className="d-flex flex-column justify-content-center align-items-center vh-100"
        >
            <p className="fs-1">404</p>
            <p className="fs-1">Страница не найдена</p>
            <Link
                className="fs-4 text-success text-decoration-underline"
                to="/"
            >На главную</Link>
        </Container>
    )
}