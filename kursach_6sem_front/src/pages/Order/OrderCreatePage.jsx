import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectCurStore, selectUser} from "../../redux/slices/auth";
import {Button, Container, Form, Image, Modal, Table} from "react-bootstrap";
import {createOrderExternal, createOrderInternal} from "../../utils/requests/order";
import {createOrderArticle} from "../../utils/requests/orderArticle";

export default function OrderCreatePage() {
    const navigate = useNavigate()

    const [item, setItem] = useState({
        date_arrive: "",
    });

    const [orderType, setOrderType] = useState("external");

    const [books, setBooks] = useState([]);

    const curUser = useSelector(selectUser)

    const curStore = useSelector(selectCurStore)

    const [error, setError] = useState("")

    const initCurBook = {
        index: -1,
        book: {
            article_number: "",
            name: "",
            author: "",
            count: ""
        }
    }

    const [curBook, setCurBook] = useState(initCurBook);

    const handleChange = ({target: {value, name}}) => {
        setItem({...item, [name]: value})
    }

    const handleChangeOrderType = ({target: {value}}) => {
        setOrderType(value)
    }

    const submitForm = async (e) => {
        e.preventDefault();
        const isEmpty = Object.values(item).some((val) => !val);
        if (isEmpty) { setError("Заполните все поля"); return;}
        if (!/\d\d\d\d-\d\d-\d\d/i.test(item.date_arrive)) { setError("Неверный формат даты. (гггг-мм-дд)"); return;}
        let order;
        try {
            if (orderType === "internal")
                order = await createOrderInternal(curStore.id, item)
            else if (orderType === "external") {
                if (curUser.role.name !== "EXTERNAL")
                    order = await createOrderExternal({
                        date_arrive: item.date_arrive,
                        storeId: curStore.id
                    })
                else {
                    order = await createOrderExternal({
                        date_arrive: item.date_arrive,
                    })
                }
            } else
                return
            setError("Успешно")
            for (let book of books) {
                try {
                    book["orderId"] = order.id;
                    console.log(order.id)
                    await createOrderArticle(order.id, book)
                } catch (e) {
                    setError(e.response.data.message)
                    break
                }
            }
            navigate("/orders")
        } catch (e) {
            setError(e.response.data.message)
        }
    }

    const handleChangeModal = ({target: {value, name}}) => {
        setCurBook({
            ...curBook,
            book: {
                ...curBook.book,
                [name]: value
            }
        })
    }

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const handleShow = (index) => {
        if (index === -1)
            setCurBook(initCurBook)
        else
            setCurBook({
                index: index,
                book: books[index]
            })
        setShow(true);
    }

    const deleteBook = (index) => {
        let tempBooks = books.slice();
        tempBooks.splice(index, 1)
        setBooks(tempBooks)
    }

    const submitModal = (e) => {
        e.preventDefault();
        const isEmpty = Object.values(curBook.book).some((val) => !val);
        if (isEmpty) { setError("Заполните все поля"); return;}
        if (curBook.index === -1) {
            let tempBooks = books
            tempBooks.push(curBook.book)
            setBooks(tempBooks)
        } else {
            let tempBooks = books
            tempBooks[curBook.index] = curBook.book
            setBooks(tempBooks)
        }
        setShow(false)
    }
    return (
        <>
            <Container fluid="xxl">
                <Form onSubmit={submitForm}>
                    <Form.Group
                        className="mb-3"
                        controlId="formOrderType"
                    >
                        {curUser.role.name !== "EXTERNAL" ?
                            <>
                                <Form.Label>Тип заказа</Form.Label>

                                <Form.Select
                                    name="orderType"
                                    onChange={handleChangeOrderType}
                                    value={orderType}
                                >
                                    <option value="external">Внешний</option>
                                    <option value="internal">Внутренний</option>
                                </Form.Select>
                            </>
                            : <></>
                        }
                    </Form.Group>

                    <Form.Group
                        className="mb-3"
                        controlId="formDate"
                    >
                        <Form.Label>Дата</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Введите дату (гггг-мм-дд)"
                            name="date_arrive"
                            value={item.name}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Table
                        striped
                        bordered
                        hover
                    >
                        <thead>
                        <tr>
                            <th>Артикул</th>
                            <th>Наименование</th>
                            <th>Автор</th>
                            <th>Количество</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {books.map((book, index) => (
                            <tr>
                                {Object.values(book).map(atr => (
                                    <th onClick={() => handleShow(index)}>{atr}</th>
                                ))}
                                <th>
                                    <Image
                                        src="/assets/delete.svg"
                                        onClick={() => deleteBook(index)}
                                        width="32px"
                                    />

                                </th>
                            </tr>
                        ))}
                        </tbody>
                    </Table>

                    <Button
                        className="w-100"
                        onClick={() => handleShow(-1)}
                    >Добавить книгу</Button>

                    {error !== "" ? <div>{error}</div> : ""}

                    <Button
                        className="w-100 mt-3"
                        variant="primary"
                        type="submit"
                    >
                        Создать
                    </Button>
                </Form>
            </Container>
            <Modal
                show={show}
                onHide={handleClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Книга</Modal.Title>
                </Modal.Header>
                <Form onSubmit={submitModal}>
                    <Modal.Body>
                        <Form.Group
                            className="mb-3"
                            controlId="modalArticle"
                        >
                            <Form.Label>Артикул</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Введите артикул"
                                name="article_number"
                                value={curBook.book.article_number}
                                onChange={handleChangeModal}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="modalName"
                        >
                            <Form.Label>Наименование</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Введите наименование"
                                name="name"
                                value={curBook.book.name}
                                onChange={handleChangeModal}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="modalAuthor"
                        >
                            <Form.Label>Автор</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Введите автора"
                                name="author"
                                value={curBook.book.author}
                                onChange={handleChangeModal}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="modalCount"
                        >
                            <Form.Label>Количество</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Введите количество"
                                name="count"
                                value={curBook.book.count}
                                onChange={handleChangeModal}
                            />
                        </Form.Group>
                        {error !== "" ? <div>{error}</div> : ""}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="secondary"
                            onClick={handleClose}
                        >
                            Отменить
                        </Button>
                        <Button
                            variant="primary"
                            type="submit"
                        >
                            Добавить
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}