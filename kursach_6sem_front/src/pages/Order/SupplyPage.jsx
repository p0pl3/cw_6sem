import React, {useEffect, useState} from "react";
import {Container} from "react-bootstrap";
import {useSelector} from "react-redux";
import {selectCurStore, selectUser} from "../../redux/slices/auth";


import {getAllOrders, getExternalOrders, getInternalOrders} from "../../utils/requests/order";
import ItemsList from "../../components/ItemsList";

export default function SupplyPage() {
    const [orders, setOrders] = useState([])
    const user = useSelector(selectUser)
    const curStore = useSelector(selectCurStore)

    useEffect(() => {
        if (user)
            if (user.role.name === "SUPERUSER") {
                getAllOrders().then(res => {
                    let temp_orders = res
                        .filter(item => (item.status === "ACCEPTED" && item.destinationId === curStore.id))
                        .map(item => ({
                            id: item.id,
                            date_arrive: item.date_arrive.slice(0, 10),
                            status: item.status,
                            order_type: item.order_type,
                            destination: item.destinationId || item.destinationUserId,
                            source: item.sourceId || item.sourceUserId,
                        }))
                    setOrders(temp_orders)
                })
            } else if (["ADMIN", "INTERNAL"].includes(user.role.name) && curStore) {
                getInternalOrders(curStore.id).then(res => {
                    let temp_orders = res
                        .filter(item => (item.status === "ACCEPTED" && item.destinationId === curStore.id))
                        .map(item => ({
                            id: item.id,
                            date_arrive: item.date_arrive.slice(0, 10),
                            status: item.status,
                            order_type: item.order_type,
                            destination: item.destinationId || item.destinationUserId,
                            source: item.sourceId || item.sourceUserId,
                        }))
                    setOrders(temp_orders)
                })
            } else if (user.role.name === "EXTERNAL") {
                getExternalOrders().then(res => {
                    let temp_orders = res
                        .filter(item => (item.status === "ACCEPTED" && item.destinationUserId === curStore.id))
                        .map(item => ({
                            id: item.id,
                            date_arrive: item.date_arrive.slice(0, 10),
                            status: item.status,
                            order_type: item.order_type,
                            destination: item.destinationId || item.destinationUserId,
                            source: item.sourceId || item.sourceUserId,
                        }))
                    setOrders(temp_orders)
                })
            }
    }, [user, curStore])


    console.log(user)
    return (
        <>
            {
                user ? (
                        (user.role.name !== "EXTERNAL" && curStore) || (user.role.name === "EXTERNAL") ?
                            <ItemsList
                                items={orders}
                                link={"/supply"}
                                thread_names={["id", "дата", "статус", "тип заказа", "заказчик", "поставщик"]}
                            />
                            :
                            <Container fluid="xxl">
                                <h1>
                                    выберите склад
                                </h1>
                            </Container>
                    )
                    : ""
            }

        </>
    )
}