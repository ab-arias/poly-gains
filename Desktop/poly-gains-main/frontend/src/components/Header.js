import React from "react";
import { Link } from "react-router-dom";
import { FaUserFriends } from "react-icons/fa";
import SearchBar from "./SearchBar";

export default function Header({
    userToken,
    handleLogOut,
    setShowFriendsModal,
}) {
    return (
        <div className="header">
            <div className="left-header">
                <div className="left-header-button">
                    <Link to="/">
                        <img
                            style={{ height: 50 }}
                            src={require("../assets/img/PolyGainsLogo.png")}
                            alt="PolyGains"
                        />
                    </Link>
                </div>
            </div>
            <div className="middle-header">
                <Link className="Hlink" to="/calpoly">
                    CalPoly
                </Link>
                <Link className="Hlink" to="/stats">
                    Stats
                </Link>
                <Link className="Hlink" to="/workouts">
                    Workouts
                </Link>
            </div>
            <div className="right-header">
                <SearchBar userToken={userToken} />
                <FaUserFriends
                    className="Hlink friend-icon"
                    size={20}
                    onClick={() => setShowFriendsModal(true)}
                />
                <div className="log-out Hlink" onClick={handleLogOut}>
                    Log Out
                </div>
            </div>
        </div>
    );
}
