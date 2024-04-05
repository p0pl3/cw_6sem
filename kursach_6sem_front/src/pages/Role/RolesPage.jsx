import React, {useEffect, useState} from "react";
import {getRoles} from "../../utils/requests/role";
import ItemsList from "../../components/ItemsList";
import MyHeader from "../../components/MyHeader";
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";

export default function RolesPage() {

    const [roles, setRoles] = useState([])


    useEffect(() => {
        getRoles().then(res => {
            const new_res = res.map(item => ({
                id: item.id,
                name: item.name,
            }))
            setRoles(new_res)
        })
    }, [])

    return (
        <>
            <MyHeader>
                <Button as={Link} to={"/admin/roles/create"}>Создать роль</Button>
            </MyHeader>
            <ItemsList
                items={roles}
                link="/admin/roles"
                thread_names={["id", "наименование"]}
            />
        </>
    )
}