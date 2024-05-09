import React, {useEffect, useState} from "react";
import {Badge, Button, Container} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {logout, selectUser, setCurStore} from "../redux/slices/auth";
import {getStoresAvailable} from "../utils/requests/store";

function ProfilePage() {
    const dispatch = useDispatch()
    const user = useSelector(selectUser)
    const [error, setError] = useState("")
    const [stores, setStores] = useState([])
    useEffect(() => {
        try {
            if (["ADMIN", 'INTERNAL'].includes(user.role.name)) {
                getStoresAvailable().then(res => {
                    const new_res = res.map(item => ({
                        id: item.id,
                        name: item.name,
                        address: item.address
                    }))
                    setStores(new_res)
                    setError("")
                })
            } else if (user.role.name === "EXTERNAL" && user)
                dispatch(setCurStore(user.id))
        } catch (e) {
            if (e.name === "AxiosError") {
                setError(e.response.data.message)
            }
        }

    }, [user])
    return (
        <>
            <Container fluid="xxl">
                {user ?
                    <>
                        <div>
                            <h3><Badge style={{"background": "#00b000"}}>Email:</Badge> {user.email}</h3>
                            <h3><Badge>Номер:</Badge> {user.phone ? user.phone : ""}</h3>
                            <h3><Badge>Роль:</Badge> {user.role ? user.role.name : ""}</h3>
                            <h3><Button
                                variant="danger"
                                onClick={() => dispatch(logout())}
                            >Выйти</Button>
                            </h3>
                        </div>
                    </>
                    : ""}
            </Container>
        </>
    )
}

export default ProfilePage;