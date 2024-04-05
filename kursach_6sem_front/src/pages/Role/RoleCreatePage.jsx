import React, {useState} from "react";
import MyHeader from "../../components/MyHeader";
import {Button, Container, Form} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {createRole} from "../../utils/requests/role";

export default function RoleCreatePage() {
    const navigate = useNavigate()

    const [item, setItem] = useState({
        name: "",
    });


    const [error, setError] = useState("")

    const handleChange = ({target: {value, name}}) => {
        setItem({...item, [name]: value})
    }
    const submitForm = async (e) => {
        e.preventDefault();
        const isEmpty = Object.values(item).some((val) => !val);
        if (isEmpty) return;
        try {
            await createRole(item)
            setError("Успешно")
        } catch (e) {
            setError(e.response.data.message)
        }
    }
    return (
        <>
            <MyHeader>
                <Button
                    onClick={() => navigate("/admin/roles")}
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
                            value={item.name}
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