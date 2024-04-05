import React, {useState} from "react";
import {Button, Container, Form} from "react-bootstrap";
import MyHeader from "../../components/MyHeader";
import {useDispatch} from "react-redux";
import {registerUser} from "../../redux/slices/auth";
import {Link} from "react-router-dom";


function RegisterPage() {
    const dispatch = useDispatch();
    const [authData, setAuthData] = useState({
        email: "",
        password: "",
        phone: "",
        roleId: {}
    });

    const handleChange = ({target: {value, name}}) => {
        setAuthData({...authData, [name]: value})
    }
    const submitForm = async (e) => {
        e.preventDefault();
        const isEmpty = Object.values(authData).some((val) => !val);
        if (isEmpty) return;
        dispatch(registerUser(authData));
    }
    return (
        <>
            <MyHeader><h1>Регистрация</h1></MyHeader>
            <Container fluid="xxl">
                <Form onSubmit={submitForm}>
                    <Form.Group
                        className="mb-3"
                        controlId="formRole"
                    >
                        <Form.Label>Роль</Form.Label>
                        <Form.Select
                            name="roleId"
                            onChange={handleChange}
                        >
                            <option
                                value={3}
                                selected={3 === authData.roleId}
                            >Сотрудник склада</option>
                            <option
                                value={4}
                                selected={4 === authData.roleId}
                            >Поставщик</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group
                        className="mb-3"
                        controlId="formPhone"
                    >
                        <Form.Label>Номер телефона</Form.Label>
                        <Form.Control
                            type="tel"
                            placeholder="Введите номер телефона"
                            name="phone"
                            value={authData.phone}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group
                        className="mb-3"
                        controlId="formBasicEmail"
                    >
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Введите email"
                            name="email"
                            value={authData.email}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                    >
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Пароль"
                            name="password"
                            value={authData.password}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Button
                        variant="primary"
                        type="submit"
                    >
                        Зарегистрироваться
                    </Button>
                </Form>
                <Link to={"/login"}>Авторизация</Link>
            </Container>
        </>
    )
}

export default RegisterPage