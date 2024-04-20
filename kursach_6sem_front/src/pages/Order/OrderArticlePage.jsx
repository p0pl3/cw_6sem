import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {getOrderArticle, updateOrderArticle} from "../../utils/requests/orderArticle";
import MyHeader from "../../components/MyHeader";
import {Button, Container, Form} from "react-bootstrap";

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


    useEffect(() => {
        if (id && articleId)
            try {
                getOrderArticle(id, articleId).then(res => {
                    const new_res = (({article_number, name, author, count, category}) =>
                        ({article_number, name, author, count, category}))(res);
                    setItem(new_res)
                })
            } catch (e) {
                setError(e.response.data.message)
            }
    }, [articleId, id])


    const handleChange = ({target: {value, name}}) => {
        setItem({...item, [name]: value})
    }

    const submitForm = async (e) => {
        e.preventDefault();
        const isEmpty = Object.values(item).some((val) => !val);
        if (isEmpty) return;
        try {
            await updateOrderArticle(id, articleId, item)
            setError("Успешно")
        } catch (e) {
            setError(e.response.data.message)
        }
    }


    return (
        <>
            <Container fluid="xxl">
                <Form onSubmit={submitForm}>
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
                            onChange={handleChange}
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
                            onChange={handleChange}
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
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group
                        className="mb-3"
                        controlId="formCount"
                    >
                        <Form.Label>Количество</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Введите количество"
                            name="count"
                            value={item.count}
                            onChange={handleChange}
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