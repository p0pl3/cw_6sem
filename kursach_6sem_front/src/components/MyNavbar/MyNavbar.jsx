import React, {useEffect, useState} from "react";
import classes from "./MyNavbar.module.css";
import {NavLink} from "react-router-dom";
import {Container, Form} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {selectCurStore, selectUser, setCurStore} from "../../redux/slices/auth";
import active from "./navbar-active.css"
import {getStores, getStoresAvailable} from "../../utils/requests/store";

function MyNavbar() {
    const curUser = useSelector(selectUser)
    const curStore = useSelector(selectCurStore)
    const dispatch = useDispatch()
    const [stores, setStores] = useState([])

    useEffect(() => {
        try {
            if (["SUPERUSER"].includes(curUser.role.name))
                getStores().then(res => {
                    const new_res = res.map(item => ({
                        id: item.id,
                        name: item.name,
                        address: item.address
                    }))
                    setStores(new_res)
                    if (new_res.length && curStore === null)
                        dispatch(setCurStore(new_res[0]))
                })
            else if (["ADMIN", 'INTERNAL'].includes(curUser.role.name)) {
                getStoresAvailable().then(res => {
                    const new_res = res.map(item => ({
                        id: item.id,
                        name: item.name,
                        address: item.address
                    }))
                    setStores(new_res)
                    if (new_res.length && curStore === null)
                        dispatch(setCurStore(new_res[0]))
                })
            } else if (curUser.role.name === "EXTERNAL" && curUser && curStore === null)
                dispatch(setCurStore(curUser.id))
        } catch (e) {
            if (e.name === "AxiosError") {
                console.log(e.response.data.message)
            }
        }

    }, [curUser, curStore])
    const handleChange = ({target: {value}}) => {
        if (parseInt(value) === -1) {
            dispatch(setCurStore(null))
        } else {
            let selectedStore = stores.find(store => {
                return store.id === parseInt(value)
            })
            dispatch(setCurStore(selectedStore))
        }
    }
    return (
        <Container
            fluid="xxl"
            className={classes.navbar}
        >
            <div className={`${classes.inner} d-flex flex-wrap`}>
                <NavLink
                    activeClassName={active}
                    className={"d-flex flex-column align-items-center"}
                    to="/"
                >
                    <img
                        src="/assets/home.svg"
                        alt=""
                    />
                    <p>Главная</p>
                </NavLink>
                {
                    curUser && curUser.role.name === "EXTERNAL"
                        ? ""
                        :
                        <>
                            <NavLink
                                className={"d-flex flex-column align-items-center"}
                                to="/articles"
                            >
                                <img
                                    src="/assets/goods.svg"
                                    alt=""
                                />
                                <p>Товары</p>
                            </NavLink>
                        </>
                }
                <NavLink
                    className={"d-flex flex-column align-items-center"}
                    to="/supply"
                >
                    <img
                        src="/assets/procurement.svg"
                        alt=""
                    />
                    <p>Приемки</p>
                </NavLink>
                <NavLink
                    className={"d-flex flex-column align-items-center"}
                    to="/demand"
                >
                    <img
                        src="/assets/selling.svg"
                        alt=""
                    />
                    <p>Отгрузки</p>
                </NavLink>
                <NavLink
                    className={"d-flex flex-column align-items-center"}
                    to="/orders"
                >
                    <img
                        src="/assets/order.svg"
                        alt=""
                    />
                    <p>Заказы</p>
                </NavLink>
                <NavLink
                    className={"d-flex flex-column align-items-center"}
                    to="/profile"
                >
                    <img
                        src="/assets/profile.svg"
                        alt=""
                    />
                    <p>Профиль</p>
                </NavLink>
                {
                    curUser && curUser.role.name === "SUPERUSER"
                        ?
                        <NavLink
                            className={"d-flex flex-column align-items-center"}
                            to="/admin"
                        >
                            <img
                                src="/assets/crown.svg"
                                alt=""
                            />
                            <p>Админ</p>
                        </NavLink>
                        : ""
                }
                {curUser && curUser.role.name !== "EXTERNAL" ?
                    <>
                        <h5 className="m-0 align-self-center ms-auto me-3">
                            {
                                ["ADMIN", "SUPERUSER", 'INTERNAL'].includes(curUser.role.name) ?
                                    <Form.Select
                                        name="role"
                                        onChange={handleChange}
                                        value={curStore ? curStore.id : -1}
                                    >
                                        <option value={-1}>выберите склад</option>
                                        {stores.map((store, index) => (
                                            <option
                                                value={store.id}
                                            >{store.name}</option>
                                        ))}
                                    </Form.Select>
                                    : ""
                            }
                        </h5>
                    </>
                    : <></>
                }
            </div>

        </Container>
    )
}

export default MyNavbar;