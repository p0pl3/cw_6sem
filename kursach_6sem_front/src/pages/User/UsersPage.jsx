import React, {useEffect, useState} from "react";
import {getUsers} from "../../utils/requests/user";
import ItemsList from "../../components/ItemsList";

export default function UsersPage() {

    const [users, setUsers] = useState([])

    useEffect(() => {
        getUsers().then(res => {
            const new_res = res.map(item => ({
                id: item.id,
                email: item.email,
                phone: item.phone,
                role: item.role ? item.role.name : ""
            }))
            setUsers(new_res)
        })
    }, [])

    return (
        <>
            <ItemsList
                items={users}
                link="/admin/users"
                thread_names={["id", "email", "телефон", "роль"]}
            />
        </>
    )
}