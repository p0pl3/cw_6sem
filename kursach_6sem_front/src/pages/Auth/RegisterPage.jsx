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
        roleId: 3
    });
    const [error, setError]= useState("")

    const handleChange = ({target: {value, name}}) => {
        setAuthData({...authData, [name]: value})
    }
    const submitForm = async (e) => {
        e.preventDefault();
        const isEmpty = Object.values(authData).some((val) => !val);
        if (isEmpty) { setError("Заполните все поля"); return;}
        const regex = /^[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~.-]+@[а-яА-Яа-яА-Яa-zA-Z0-9-]+(\.[а-яА-Яa-zA-Z0-9]+)*(\.[a-zA-Z0-9]+)$/;
        if (!regex.test(authData.email)) { setError("Проверьте правильность email"); return;}
        if (!/^\+7\(\d{3}\)\d{3}-\d{2}-\d{2}$/.test(authData.phone)){ setError("Введите номер в формате +7(999)999-99-99"); return;}

        if (isEmpty) { setError("Заполните все поля"); return;}
        dispatch(registerUser(authData));
    }
    return (
        <>
            <MyHeader>
                <h1>Регистрация</h1>

            </MyHeader>

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
                            value={authData.roleId}
                        >
                            <option
                                value={3}
                                selected={3 === authData.roleId}
                            >Сотрудник склада
                            </option>
                            <option
                                value={4}
                                selected={4 === authData.roleId}
                            >Поставщик
                            </option>
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
            {error === "" ? "" : <Container>{error}</Container>}
        </>
    )
}

export default RegisterPage