import React from "react";
import {Container, Table} from "react-bootstrap";
import {Link} from "react-router-dom";
import classes from "./TableScroll.module.css";

const ItemsList = ({title, items, link, thread_names, scrollable, notitems}) => {
    return (
        <Container fluid="xxl">
            {title ? <h3>{title}</h3> : ""}

            <Table
                striped
                bordered
                hover
                responsive
                className={"text-nowrap"}
            >
                <thead>
                <tr>
                    {thread_names && thread_names.length ?
                        thread_names.map(key => (
                            <th>{key}</th>
                        )) : (<th>Нет итемов</th>)}
                </tr>
                </thead>
                <tbody>
                {items && items.length ? items.map(item => (
                    <tr>
                        {
                            Object.values(item).map(atr => (
                                <td>
                                    <Link
                                        className={classes.a}
                                        to={`${link}/${item.id}`}
                                    >
                                        {atr}
                                    </Link>
                                </td>
                            ))
                        }
                    </tr>
                )) : (<tr>
                    <th colSpan={thread_names.length}>{notitems ? notitems : "пусто"}</th>
                </tr>)}
                </tbody>
            </Table>
        </Container>
    )
}

export default ItemsList