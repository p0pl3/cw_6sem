import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {getOrderArticle, updateOrderArticle} from "../../utils/requests/orderArticle";
import {Button, Container, Form} from "react-bootstrap";
import {getCategories} from "../../utils/requests/category";

export default function OrderArticlePage() {
    const navigate = useNavigate()

    const {id} = useParams()
    const {articleId} = useParams()
    const [error, setError] = useState("")
    const [item, setItem] = useState({
        article_number: "",
        name: "",
        author: "",
        count: ""
    })
    const [categories, setCategories] = useState([])

    useEffect(() => {
        if (id && articleId)
            try {
                getOrderArticle(id, articleId).then(res => {
                    const new_res = (({article_number, name, author, count, categoryId}) =>
                        ({article_number, name, author, count, categoryId}))(res);
                    setItem(new_res)
                })
            } catch (e) {
                setError(e.response.data.message)
            }
        getCategories().then(res => {
            const new_res = res.map(item => ({
                id: item.id,
                name: item.name,
            }))
            setCategories(new_res)
        })
    }, [articleId, id])


    return (
        <>
            <Container fluid="xxl">
                <Form>
                    <Form.Group
                        className="mb-3"
                        controlId="formArticle"
                    >
                        <Form.Label>Артикул</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Введите артикул"
                            name="article_number"
                            value={item.article_number}
                            disabled
                            readOnly
                        />
                    </Form.Group>
                    <Form.Group
                        className="mb-3"
                        controlId="formName"
                    >
                        <Form.Label>Наименование</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Введите наименование"
                            name="name"
                            value={item.name}
                            disabled
                            readOnly
                        />
                    </Form.Group>
                    <Form.Group
                        className="mb-3"
                        controlId="formAuthor"
                    >
                        <Form.Label>Автор</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Введите автора"
                            name="author"
                            value={item.author}
                            disabled
                            readOnly
                        />
                    </Form.Group>
                    <Form.Group
                        className="mb-3"
                        controlId="formCount"
                    >
                        <Form.Label>Количество</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Введите количество"
                            name="count"
                            value={item.count}
                            disabled
                            readOnly
                        />
                    </Form.Group>
                    {error !== "" ? <div>{error}</div> : ""}
                    <Button
                        variant="primary"
                        type="submit"
                    >
                        Обновить
                    </Button>
                </Form>
            </Container>
        </>
    )
}