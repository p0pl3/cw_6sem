import React from "react";
import {Container, Table} from "react-bootstrap";
import ItemsList from "./ItemsList";

export const OrderComponent = ({order}) => {

    return (
        <>
            {
                order ?
                    <>
                        <Container fluid="xxl">
                            <Table
                                striped
                                bordered
                                hover
                                responsive
                                className={"text-nowrap"}
                            >
                                <tbody>
                                <tr>
                                    <th>id</th>
                                    <th>{order.id}</th>
                                </tr>
                                <tr>
                                    <th> Cтатус</th>
                                    <th> {order.status}</th>
                                </tr>
                                <tr>
                                    <th>Заказчик</th>
                                    <th> {order.destinationId || order.destinationUserId}</th>
                                </tr>
                                <tr>
                                    <th>Поставщик</th>
                                    <th> {order.sourceId || order.sourceUserId}</th>
                                </tr>
                                <tr>
                                    <th>Дата создания</th>
                                    <th> {order.createdAt.slice(0, 10)}</th>
                                </tr>
                                <tr>
                                    <th>Дата приемки</th>
                                    <th> {order.date_arrive.slice(0, 10)}</th>
                                </tr>
                                <tr>
                                    <th>Тип заказа</th>
                                    <th> {order.order_type}</th>
                                </tr>
                                </tbody>
                            </Table>
                        </Container>
                        <ItemsList
                            title="Книги"
                            items={order.order_articles}
                            link={`/orders/${order.id}/articles`}
                            thread_names={["id", "артикул", "наименование", "автор", "жанр", "количество"]}
                            scrollable={true}
                        />
                    </>
                    : ""
            }
        </>

    )
}