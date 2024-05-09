import React, {useEffect, useState} from "react";
import {Button, Container, ToggleButton, ToggleButtonGroup} from "react-bootstrap";
import {useSelector} from "react-redux";
import {selectCurStore, selectUser} from "../../redux/slices/auth";
import ItemsList from "../../components/ItemsList";
import {
    getBurseExternalOrders,
    getBurseInternalOrders,
    getMyBurseExternalOrders,
    getMyBurseInternalOrders
} from "../../utils/requests/order";
import MyHeader from "../../components/MyHeader";
import {Link} from "react-router-dom";

export default function OrdersPage() {
    const [orders, setOrders] = useState([])

    const [myOrders, setMyOrders] = useState([])

    const [curOrders, setCurOrders] = useState([])

    const user = useSelector(selectUser)

    const curStore = useSelector(selectCurStore)

    const [orderType, setOrderType] = useState("my")

    useEffect(() => {
        if (user) {
            if (user.role.name === "EXTERNAL") {
                getBurseExternalOrders().then(res => {
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
                getMyBurseExternalOrders().then(res => {
                    const new_res = res.map(item => ({
                        id: item.id,
                        date_arrive: item.date_arrive.slice(0, 10),
                        status: item.status,
                        order_type: item.order_type,
                        destination: item.destinationId || item.destinationUserId,
                        source: item.sourceId || item.sourceUserId,
                    }))
                    setMyOrders(new_res)
                })
            } else {
                if (curStore) {
                    getBurseInternalOrders(curStore.id).then(res => {
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
                    getMyBurseInternalOrders(curStore.id).then(res => {
                        const new_res = res.map(item => ({
                            id: item.id,
                            date_arrive: item.date_arrive.slice(0, 10),
                            status: item.status,
                            order_type: item.order_type,
                            destination: item.destinationId || item.destinationUserId,
                            source: item.sourceId || item.sourceUserId,
                        }))
                        setMyOrders(new_res)
                    })
                }
            }
        }
    }, [user, curStore])

    useEffect(() => {
        if (orderType === "my") {
            setCurOrders(myOrders)
        } else if (orderType === "another") {
            setCurOrders(orders)
        }
    }, [orderType, orders, curStore, myOrders])

    const handleChange = (val) => setOrderType(val);

    return (
        <>
            <MyHeader>
                <Button
                    as={Link}
                    to="/orders/create"
                >Создать заявку</Button>
            </MyHeader>

            {
                user ? (user.role.name !== "EXTERNAL" && curStore) || (user.role.name === "EXTERNAL") ?
                        <>
                            <Container fluid="xxl">
                                <ToggleButtonGroup
                                    size="lg"
                                    className="w-100"
                                    type="radio"
                                    name="orderType"
                                    defaultValue={"my"}
                                    value={orderType}
                                    onChange={handleChange}
                                >
                                    <ToggleButton
                                        id="tbg-radio-1"
                                        value={"my"}
                                    >
                                        Заказы склада
                                    </ToggleButton>
                                    <ToggleButton
                                        id="tbg-radio-2"
                                        value={"another"}
                                    >
                                        Чужие заказы
                                    </ToggleButton>
                                </ToggleButtonGroup>
                                <ItemsList
                                    items={curOrders}
                                    link={"/orders"}
                                    thread_names={["id", "дата", "статус", "тип заказа", "заказчик", "поставщик"]}
                                />
                            </Container>
                        </>
                        :
                        <Container fluid="xxl">
                            <h1>
                                выберите склад
                            </h1>
                        </Container>
                    : ""
            }
        </>
    )
}