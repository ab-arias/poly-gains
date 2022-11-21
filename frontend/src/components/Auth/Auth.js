import React, { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function Auth({ handleUserLogIn }) {
    const [displayLogin, setDisplayLogin] = useState(true);

    return (
        <div className="auth-screen">
            <img
                style={{ height: 250 }}
                src={require("../../assets/img/PolyGainsLogo.png")}
                alt="PolyGains"
            />
            <div className="auth-box">
                <div className="auth-header">
                    <div
                        className={
                            displayLogin ? "auth-active" : "auth-inactive"
                        }
                        onClick={() =>
                            displayLogin ? undefined : setDisplayLogin(true)
                        }
                    >
                        Login
                    </div>
                    <div
                        className={
                            displayLogin ? "auth-inactive" : "auth-active"
                        }
                        onClick={() =>
                            displayLogin ? setDisplayLogin(false) : undefined
                        }
                    >
                        Register
                    </div>
                </div>
                {displayLogin ? (
                    <LoginForm handleUserLogIn={handleUserLogIn} />
                ) : (
                    <RegisterForm />
                )}
            </div>
        </div>
    );
}
