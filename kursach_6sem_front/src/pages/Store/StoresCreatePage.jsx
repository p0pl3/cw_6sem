import React, {useState} from "react";
import {createStore} from "../../utils/requests/store";
import MyHeader from "../../components/MyHeader";
import {Button, Container, Form} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

export default function StoresCreatePage() {
    const navigate = useNavigate()
    const [store, setStore] = useState({
        name: "",
        address: ""
    });


    const [error, setError] = useState("")

    const handleChange = ({target: {value, name}}) => {
        setStore({...store, [name]: value})
    }
    const submitForm = async (e) => {
        e.preventDefault();
        const isEmpty = Object.values(store).some((val) => !val);
        if (isEmpty) { setError("Заполните все поля"); return;}
        try {
            await createStore(store)
            setError("Успешно")
        } catch (e) {
            setError(e.response.data.message)
        }
    }
    return (
        <>
            <MyHeader>
                <Button
                    onClick={() => navigate("/admin/stores")}
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
                            value={store.name}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group
                        className="mb-3"
                        controlId="formAddress"
                    >
                        <Form.Label>Адрес</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Введите адрес"
                            name="address"
                            value={store.address}
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