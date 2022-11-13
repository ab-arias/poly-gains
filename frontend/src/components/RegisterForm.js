import React, { useState } from "react";
import axios from "axios";

export default function RegisterForm() {
    const [registerFormData, setRegisterFormData] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
        password2: "",
    });
    const [registerError, setRegisterError] = useState();
    const [successfulReg, setSuccessfulReg] = useState("");

    function handleRegisterFormChange(event) {
        const { name, value } = event.target;
        if (registerError && registerError[name]) {
            setRegisterError((prevError) => {
                const copy = { ...prevError };
                delete copy[name];
                return copy;
            });
        }
        setRegisterFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    }

    async function registerUser(e) {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:4000/users/register",
                registerFormData
            );
            const result = response.data;
            setSuccessfulReg("Successfully Registered @" + result.username);
            setRegisterFormData({
                name: "",
                username: "",
                email: "",
                password: "",
                password2: "",
            });
        } catch (error) {
            if (error.response?.data) {
                setRegisterError(error.response.data);
                const name = error.response.data?.name
                    ? ""
                    : registerFormData.name;
                const username = error.response.data?.username
                    ? ""
                    : registerFormData.username;
                const email = error.response.data?.email
                    ? ""
                    : registerFormData.email;
                const password =
                    error.response.data?.password ||
                    error.response.data?.password2
                        ? ""
                        : registerFormData.password;
                const password2 =
                    error.response.data?.password2 ||
                    error.response.data?.password
                        ? ""
                        : registerFormData.password2;
                setRegisterFormData({
                    name,
                    username,
                    email,
                    password,
                    password2,
                });
            }
            return false;
        }
    }

    return (
        <form className="auth-form" onSubmit={registerUser}>
            <div
                className={`auth-field${registerError?.name ? " invalid" : ""}`}
            >
                <label htmlFor="name">Name </label>
                <input
                    name="name"
                    value={registerFormData.name}
                    onChange={handleRegisterFormChange}
                    placeholder={
                        registerError?.name
                            ? registerError.name
                            : "Enter your full name"
                    }
                />
            </div>
            <div
                className={`auth-field${
                    registerError?.username ? " invalid" : ""
                }`}
            >
                <label htmlFor="username">Username </label>
                <input
                    name="username"
                    value={registerFormData.username}
                    onChange={handleRegisterFormChange}
                    placeholder={
                        registerError?.username
                            ? registerError.username
                            : "Enter your username"
                    }
                />
            </div>
            <div
                className={`auth-field${
                    registerError?.email ? " invalid" : ""
                }`}
            >
                <label htmlFor="email">E-mail Address </label>
                <input
                    name="email"
                    value={registerFormData.email}
                    onChange={handleRegisterFormChange}
                    placeholder={
                        registerError?.email
                            ? registerError.email
                            : "Enter your email address"
                    }
                />
            </div>
            <div
                className={`auth-field${
                    registerError?.password ? " invalid" : ""
                }`}
            >
                <label htmlFor="password">Password </label>
                <input
                    type="password"
                    name="password"
                    value={registerFormData.password}
                    onChange={handleRegisterFormChange}
                    placeholder={
                        registerError?.password
                            ? registerError.password
                            : "Enter your password"
                    }
                />
            </div>
            <div
                className={`auth-field${
                    registerError?.password2 ? " invalid" : ""
                }`}
            >
                <label htmlFor="password2">Confirm your password </label>
                <input
                    type="password"
                    name="password2"
                    value={registerFormData.password2}
                    onChange={handleRegisterFormChange}
                    placeholder={
                        registerError?.password2
                            ? registerError.password2
                            : "Enter your password again"
                    }
                />
            </div>
            {successfulReg ? (
                <div className="reg-success">
                    {successfulReg}
                    <br />
                    Please Log In
                </div>
            ) : (
                <button
                    className={`submit-form-button${
                        !registerFormData.name ||
                        !registerFormData.username ||
                        !registerFormData.email ||
                        !registerFormData.password ||
                        !registerFormData.password2
                            ? " hidden"
                            : ""
                    }`}
                    disabled={
                        !registerFormData.name ||
                        !registerFormData.username ||
                        !registerFormData.email ||
                        !registerFormData.password ||
                        !registerFormData.password2
                    }
                    type="submit"
                >
                    Register
                </button>
            )}
        </form>
    );
}
