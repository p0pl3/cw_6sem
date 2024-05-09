import React from "react";
import {Container} from "react-bootstrap";

export default function UserComponent({user}) {
    return (
        <Container fluid="xxl">
            <div className="d-flex align-items-center flex-column">
                <img
                    src=""
                    alt=""
                    className="rounded-circle"
                />
                <p>{user.name}</p>
            </div>

        </Container>
    )
}