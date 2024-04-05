import React from "react";
import {Container} from "react-bootstrap";


function MyHeader({children}) {
    return (
        <Container fluid="xxl" className="d-flex justify-content-between align-items-center">
            {children}
        </Container>
    )
}

export default MyHeader;