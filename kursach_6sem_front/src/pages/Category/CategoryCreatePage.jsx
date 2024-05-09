import React, {useState} from "react";

import MyHeader from "../../components/MyHeader";
import {Button, Container, Form} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {createCategory} from "../../utils/requests/category";

export default function CategoryCreatePage() {
    const navigate = useNavigate()
    const [category, setCategory] = useState({
        name: ""
    });
    const [error, setError] = useState("")
    const handleChange = ({target: {value, name}}) => {
        setCategory({...category, [name]: value})
    }
    const submitForm = async (e) => {
        e.preventDefault();
        const isEmpty = Object.values(category).some((val) => !val);
        if (isEmpty) { setError("Заполните все поля"); return;}
        try {
            await createCategory(category)
            setError("Успешно")
        } catch (e) {
            setError(e.response.data.message)
        }
    }
    return (
        <>
            <MyHeader>
                <Button
                    onClick={() => navigate("/admin/categories")}
                >Назад
                </Button>
            </MyHeader>
            <Container fluid="xxl">
                <Form onSubmit={submitForm}>
                    <Form.Group
                        className="mb-3"
                        controlId="formName"
                    >
                        <Form.Label>Наименование</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Введите наименование"
                            name="name"
                            value={category.name}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    {error !== "" ? <div>{error}</div> : ""}
                    <Button
                        variant="primary"
                        type="submit"
                    >
                        Создать
                    </Button>
                </Form>
            </Container>
        </>
    )
}