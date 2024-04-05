import {Button, Container} from "react-bootstrap";
import {Link} from "react-router-dom";
import React from "react";
import {useSelector} from "react-redux";
import {selectUser} from "../redux/slices/auth";


export default function AdminPage(){
    const user = useSelector(selectUser)
    return(
        <>
            <Container fluid="xxl">
                {
                    ["SUPERUSER", "ADMIN"].includes(user.role.name)
                        ? <div className="d-flex flex-wrap gap-3">
                            <Button as={Link} to={"/admin/users"}>Пользователи</Button>
                            <Button as={Link} to={"/admin/stores"}>Склады</Button>
                            <Button as={Link} to={"/admin/categories"}>Жанры</Button>
                        </div>
                        : ""
                }
            </Container>
        </>
    )
}

