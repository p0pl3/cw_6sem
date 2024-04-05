import React, {useState} from "react";
import MyHeader from "../../components/MyHeader";
import {Button, Container, Form} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {authUser} from "../../redux/slices/auth";
import {Link} from "react-router-dom";

function LoginPage() {
    const dispatch = useDispatch();
    const [authData, setAuthData] = useState({
        email: "",
        password: ""
    });

    const handleChange = ({target: {value, name}}) => {
        setAuthData({...authData, [name]: value})
    }
    const submitForm = async (e) => {
        e.preventDefault();
        const isEmpty = Object.values(authData).some((val) => !val);
        if (isEmpty) return;
        dispatch(authUser(authData));
    }

    return (
        <>
            <MyHeader><h1>Авторизация</h1></MyHeader>
            <Container fluid="xxl">
                <Form onSubmit={submitForm}>
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
                        Войти
                    </Button>
                </Form>
                <Link to={"/registration"}>Регистрация</Link>
            </Container>
        </>
    )
}

export default LoginPage