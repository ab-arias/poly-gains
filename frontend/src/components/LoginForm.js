import React, { useState } from "react";
import axios from "axios";

export default function LoginForm({ handleUserLogIn }) {
    const [loginFormData, setLoginFormData] = useState({
        email: "",
        password: "",
    });
    const [loginError, setLoginError] = useState();

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
                setLoginFormData({ email, password });
            }
            return false;
        }
    }

    return (
        <form className="auth-form" onSubmit={logInUser}>
            <div className={`auth-field${loginError?.email ? " invalid" : ""}`}>
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
            <button
                className={`submit-form-button${
                    !loginFormData.email || !loginFormData.password
                        ? " hidden"
                        : ""
                }`}
                disabled={!loginFormData.email || !loginFormData.password}
                type="submit"
            >
                Log in
            </button>
        </form>
    );
}
