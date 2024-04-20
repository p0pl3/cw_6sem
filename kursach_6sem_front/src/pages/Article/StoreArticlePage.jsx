import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {Button, Container, Form} from "react-bootstrap";
import MyHeader from "../../components/MyHeader";
import {useNavigate, useParams} from "react-router-dom";
import {selectCurStore} from "../../redux/slices/auth";
import {getStoreArticle, updateStoreArticle} from "../../utils/requests/storeArticle";

export default function StoreArticlePage() {

    const navigate = useNavigate()

    const {id} = useParams()

    const [error, setError] = useState("")

    const curStoreId = parseInt(useSelector(selectCurStore).id)

    const [item, setItem] = useState({
        article_number: "",
        name: "",
        author: "",
        count: 0
    })

    useEffect(() => {
        if (curStoreId && id)
            getStoreArticle(curStoreId, id).then(res => {
                const new_res = (({article_number, name, author, count}) =>
                    ({article_number, name, author, count}))(res);
                setItem(new_res)
            }).catch((e)=>{

            })

    }, [curStoreId, id])

    const handleChange = ({target: {value, name}}) => {
        setItem({...item, [name]: value})
    }
    const submitForm = async (e) => {
        e.preventDefault();
        const isEmpty = Object.values(item).some((val) => !val);
        if (isEmpty) return;
        try {
            await updateStoreArticle(curStoreId, id, item)
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
                        controlId="formArticleNumber"
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
                            placeholder="Введите автора"
                            name="author"
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