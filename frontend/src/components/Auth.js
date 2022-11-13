import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Auth({ handleUserLogIn }) {
    const [displayLogin, setDisplayLogin] = useState(true);
    const [loginFormData, setLoginFormData] = useState({
        email: "",
        password: "",
    });
    const [registerFormData, setRegisterFormData] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
        password2: "",
    });
    const [loginError, setLoginError] = useState();
    const [registerError, setRegisterError] = useState();

    function handleLoginFormChange(event) {
        const { name, value } = event.target;
        if (loginError && loginError[name]) {
            setLoginError((prevError) => {
                const copy = { ...prevError };
                delete copy[name];
                return copy;
            });
        }
        setLoginFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    }

    function handleRegisterFormChange(event) {
        const { name, value } = event.target;
        setRegisterFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    }

    async function logInUser(e) {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:4000/users/login",
                loginFormData
            );
            const result = response.data;
            handleUserLogIn(result);
        } catch (error) {
            if (error.response?.data) {
                setLoginError(error.response.data);
                const password = error.response.data?.password
                    ? ""
                    : loginFormData.password;
                const email = error.response.data?.email
                    ? ""
                    : loginFormData.email;
                setLoginFormData({ email: email, password: password });
            }
            return false;
        }
    }

    async function registerUser(e) {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:4000/users/register",
                registerFormData
            );
            const result = response.data;
            console.log(result);
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    function enableLogin() {
        if (displayLogin) return;
        setDisplayLogin(true);
        setLoginError();
        setLoginFormData({ email: "", password: "" });
    }

    function enableRegister() {
        if (!displayLogin) return;
        setDisplayLogin(false);
        setRegisterError();
        setRegisterFormData({
            name: "",
            username: "",
            email: "",
            password: "",
            password2: "",
        });
    }

    function renderLoginForm() {
        return (
            <form className="auth-form" onSubmit={logInUser}>
                <div
                    className={`auth-field${
                        loginError?.email ? " invalid" : ""
                    }`}
                >
                    <label htmlFor="email">E-mail Address</label>
                    <input
                        name="email"
                        value={loginFormData.email}
                        onChange={handleLoginFormChange}
                        placeholder={
                            loginError?.email
                                ? loginError.email
                                : "Enter your email address"
                        }
                    />
                </div>
                <div
                    className={`auth-field${
                        loginError?.password ? " invalid" : ""
                    }`}
                >
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={loginFormData.password}
                        onChange={handleLoginFormChange}
                        placeholder={
                            loginError?.password
                                ? loginError.password
                                : "Enter your password"
                        }
                    />
                </div>
                <button className="submit-form-button" type="submit">
                    Log in
                </button>
            </form>
        );
    }

    function renderRegisterForm() {
        return (
            <form className="auth-form" onSubmit={registerUser}>
                <div className="auth-field">
                    <label htmlFor="name">Name </label>
                    <input
                        name="name"
                        value={registerFormData.name}
                        onChange={handleRegisterFormChange}
                        placeholder="Enter your full name"
                    />
                </div>
                <div className="auth-field">
                    <label htmlFor="username">Username </label>
                    <input
                        name="username"
                        value={registerFormData.username}
                        onChange={handleRegisterFormChange}
                        placeholder="Enter your username"
                    />
                </div>
                <div className="auth-field">
                    <label htmlFor="email">E-mail Address </label>
                    <input
                        name="email"
                        value={registerFormData.email}
                        onChange={handleRegisterFormChange}
                        placeholder="Enter your email address"
                    />
                </div>
                <div className="auth-field">
                    <label htmlFor="password">Password </label>
                    <input
                        type="password"
                        name="password"
                        value={registerFormData.password}
                        onChange={handleRegisterFormChange}
                        placeholder="Enter your password"
                    />
                </div>
                <div className="auth-field">
                    <label htmlFor="password2">Confirm your password </label>
                    <input
                        type="password"
                        name="password2"
                        value={registerFormData.password2}
                        onChange={handleRegisterFormChange}
                        placeholder="Enter your password again"
                    />
                </div>
                <button className="submit-form-button" type="submit">
                    Register
                </button>
            </form>
        );
    }

    return (
        <div className="auth-screen">
            <img
                style={{ height: 250 }}
                src={require("../assets/img/PolyGainsLogo.png")}
                alt="PolyGains"
            />
            <div className="auth-box">
                <div className="auth-header">
                    <div
                        className={
                            displayLogin ? "auth-active" : "auth-inactive"
                        }
                        onClick={enableLogin}
                    >
                        Login
                    </div>
                    <div
                        className={
                            displayLogin ? "auth-inactive" : "auth-active"
                        }
                        onClick={enableRegister}
                    >
                        Register
                    </div>
                </div>
                {displayLogin ? renderLoginForm() : renderRegisterForm()}
            </div>
        </div>
    );
}
