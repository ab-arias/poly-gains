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

    function handleLoginFormChange(event) {
        const { name, value } = event.target;
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
            if (result.success) {
                handleUserLogIn(result.result);
            }
        } catch (error) {
            console.log(error);
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

    return (
        <div className="auth-screen">
            <div className="auth-box">
                <div className="auth-header">
                    <button onClick={() => setDisplayLogin(true)}>Login</button>
                    <button onClick={() => setDisplayLogin(false)}>
                        Register
                    </button>
                </div>
                {displayLogin ? (
                    <form className="auth-form" onSubmit={logInUser}>
                        <div className="auth-field">
                            <label htmlFor="email">Email </label>
                            <input
                                name="email"
                                value={loginFormData.email}
                                onChange={handleLoginFormChange}
                                placeholder="you@email.com"
                            />
                        </div>
                        <div className="auth-field">
                            <label htmlFor="password">Password </label>
                            <input
                                type="password"
                                name="password"
                                value={loginFormData.password}
                                onChange={handleLoginFormChange}
                                placeholder="password"
                            />
                        </div>
                        <button type="submit">Login</button>
                    </form>
                ) : (
                    <form className="auth-form" onSubmit={registerUser}>
                        <div className="auth-field">
                            <label htmlFor="name">Name </label>
                            <input
                                name="name"
                                value={registerFormData.name}
                                onChange={handleRegisterFormChange}
                                placeholder="John Doe"
                            />
                        </div>
                        <div className="auth-field">
                            <label htmlFor="username">Username </label>
                            <input
                                name="username"
                                value={registerFormData.username}
                                onChange={handleRegisterFormChange}
                                placeholder="JohnnyGainz"
                            />
                        </div>
                        <div className="auth-field">
                            <label htmlFor="email">Email </label>
                            <input
                                name="email"
                                value={registerFormData.email}
                                onChange={handleRegisterFormChange}
                                placeholder="john@polygains.net"
                            />
                        </div>
                        <div className="auth-field">
                            <label htmlFor="password">Password </label>
                            <input
                                type="password"
                                name="password"
                                value={registerFormData.password}
                                onChange={handleRegisterFormChange}
                                placeholder="password"
                            />
                        </div>
                        <div className="auth-field">
                            <label htmlFor="password2">
                                Confirm your password{" "}
                            </label>
                            <input
                                type="password"
                                name="password2"
                                value={registerFormData.password2}
                                onChange={handleRegisterFormChange}
                                placeholder="password"
                            />
                        </div>
                        <button type="submit">Login</button>
                    </form>
                )}
            </div>
        </div>
    );
}
