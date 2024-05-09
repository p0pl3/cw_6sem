import React, {useEffect, useState} from 'react';
import {Card, Container} from "react-bootstrap";
import {useSelector} from "react-redux";
import {selectCurStore, selectUser} from "../redux/slices/auth";
import {getLastExternalOrders, getLastInternalOrders} from "../utils/requests/order";
import ItemsList from "../components/ItemsList";

function MainPage() {
    const [error, setError] = useState("")
    const curStore = useSelector(selectCurStore)
    const user = useSelector(selectUser)
    const [orders, setOrders] = useState([])

    useEffect(() => {
        if (curStore && user) {
            if (user.role.name === "EXTERNAL") {
                getLastExternalOrders().then(res => {
                    const new_res = res.map(item => ({
                        id: item.id,
                        date_arrive: item.date_arrive.slice(0, 10),
                        status: item.status,
                        order_type: item.order_type,
                        destination: item.destinationId || item.destinationUserId,
                        source: item.sourceId || item.sourceUserId,
                    }))
                    setOrders(new_res)
                })
            } else {
                getLastInternalOrders(curStore.id).then(res => {
                    const new_res = res.map(item => ({
                        id: item.id,
                        date_arrive: item.date_arrive.slice(0, 10),
                        status: item.status,
                        order_type: item.order_type,
                        destination: item.destinationId || item.destinationUserId,
                        source: item.sourceId || item.sourceUserId,
                    }))
                    setOrders(new_res)
                })
            }
        } else {
            setOrders([])
        }

    }, [curStore, user])


    return (
        <>
            <Container fluid="xxl">
                {error !== "" ? <div>{error}</div> : ""}
                <Card className="mt-3">
                    <Card.Header>Скоро приемки</Card.Header>
                    <ItemsList
                        items={orders}
                        link={"/orders"}
                        thread_names={["id", "дата", "статус", "тип заказа", "заказчик", "поставщик"]}
                    />
                </Card>
            </Container>
        </>
    )
}

export default MainPage;