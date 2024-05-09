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
    const [error, setError]= useState("")

    const handleChange = ({target: {value, name}}) => {
        setAuthData({...authData, [name]: value})
    }
    const submitForm = async (e) => {
        e.preventDefault();
        const isEmpty = Object.values(authData).some((val) => !val);
        const regex = /^[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~.-]+@[а-яА-Яа-яА-Яa-zA-Z0-9-]+(\.[а-яА-Яa-zA-Z0-9]+)*(\.[a-zA-Z0-9]+)$/;
        if (isEmpty) { setError("Заполните все поля"); return;}
        if (!regex.test(authData.email)) { setError("некоректный email"); return;}
        dispatch(authUser(authData));
        setError("")
    }

    return (
        <>
            <MyHeader>
                <h1>Авторизация</h1>
                {error !== "" ? <div>{error}</div> : ""}
            </MyHeader>
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