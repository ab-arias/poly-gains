import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AiOutlineCloseCircle, AiOutlineCheckCircle } from "react-icons/ai";
import { FiSend } from "react-icons/fi";
import { FaUserFriends } from "react-icons/fa";
import axios from "axios";

export default function FriendsModal({ userToken, setShowFriendsModal }) {
    const [user, setUser] = useState();
    const [currentFriends, setCurrentFriends] = useState([]);
    const [pendingFriends, setPendingFriends] = useState([]);

    async function fetchUser() {
        try {
            const response = await axios.get(
                window.$BACKEND_URI + "user/" + userToken.id
            );
            return response.data.user;
        } catch (error) {
            return false;
        }
    }

    useEffect(() => {
        fetchUser().then((result) => {
            if (result) {
                setUser(result);
            }
        });
        // eslint-disable-next-line
    }, []);

    async function fetchFriends(id) {
        try {
            const response = await axios.get(
                window.$BACKEND_URI + "friends/" + id
            );
            return response.data;
        } catch (error) {
            return false;
        }
    }

    useEffect(() => {
        if (user) {
            if (user.friends.length === 0) {
                setCurrentFriends([]);
                setPendingFriends([]);
                return;
            }
            fetchFriends(user._id).then((result) => {
                if (result) {
                    let pending = [],
                        current = [];
                    result.forEach((entry) => {
                        if (entry.status === "friends")
                            current.push({
                                ...entry.friend,
                                status: entry.status,
                            });
                        else
                            pending.push({
                                ...entry.friend,
                                status: entry.status,
                            });
                    });
                    setPendingFriends(pending);
                    setCurrentFriends(current);
                }
            });
        }
        // eslint-disable-next-line
    }, [user]);

    async function handleAcceptRequest(otherId) {
        const otherUserFriends = await fetchFriends(otherId);
        const otherFriends = otherUserFriends.map((rel) => {
            if (rel.friend._id === user._id)
                return { friend: rel.friend._id, status: "friends" };
            else return { friend: rel.friend._id, status: rel.status };
        });
        const myFriends = user.friends.map((rel) => {
            if (rel.friend === otherId) return { ...rel, status: "friends" };
            else return rel;
        });
        await updateFriends(otherId, otherFriends, myFriends);
    }

    async function handleRemoveRequest(otherId) {
        const otherUserFriends = await fetchFriends(otherId);
        const otherFriends = otherUserFriends.filter((rel) => {
            if (rel.friend._id !== user._id)
                return { friend: rel.friend._id, status: rel.status };
            else return false;
        });
        const myFriends = user.friends.filter((rel) => rel.friend !== otherId);
        await updateFriends(otherId, otherFriends, myFriends);
    }

    async function updateFriends(otherId, otherReq, myReq) {
        try {
            const newUser = await axios.post(
                window.$BACKEND_URI + "user/" + user._id,
                { friends: myReq }
            );
            await axios.post(window.$BACKEND_URI + "user/" + otherId, {
                friends: otherReq,
            });
            setUser(newUser.data);
            return true;
        } catch (error) {
            return false;
        }
    }

    function renderButton(rel) {
        let clickHandle, icon, buttonText;
        if (rel.status === "sent") {
            clickHandle = () => handleRemoveRequest(rel._id);
            icon = <FiSend className="button-icon" size={16} />;
            buttonText = "Request Sent";
        } else if (rel.status === "pending") {
            clickHandle = () => handleAcceptRequest(rel._id);
            icon = <AiOutlineCheckCircle className="button-icon" size={16} />;
            buttonText = "Accept Friend Request";
        } else if (rel.status === "friends") {
            clickHandle = () => handleRemoveRequest(rel._id);
            icon = <FaUserFriends className="button-icon" size={16} />;
            buttonText = "Friends";
        } else {
            return null;
        }
        return (
            <div className="friend-request-button" onClick={clickHandle}>
                {icon}
                <div>{buttonText}</div>
            </div>
        );
    }

    function renderFriends(friends) {
        return friends.map((result, i) => (
            <div className="friend-row" key={i}>
                <Link
                    className="friend-link"
                    to={"/profile/" + result.username}
                    onClick={() => setShowFriendsModal(false)}
                >
                    <img
                        className="friend-avatar"
                        src={
                            result?.avatar
                                ? result.avatar
                                : require("../assets/img/DefaultProfilePic.jpeg")
                        }
                        alt="Cannot display"
                    />
                    @{result.username}
                </Link>
                {renderButton(result)}
            </div>
        ));
    }

    const pending = renderFriends(pendingFriends);
    const current = renderFriends(currentFriends);

    return (
        user && (
            <div className="modal-screen">
                <div className="modal-header">
                    <AiOutlineCloseCircle
                        className="modal-left-button"
                        size={35}
                        onClick={() => setShowFriendsModal(false)}
                    />
                    <div className="modal-center-title">My Friends</div>
                    <div
                        className="modal-right-button"
                        style={{ width: 35 }}
                    ></div>
                </div>
                <div className="modal-container">
                    {pending.length > 0 && (
                        <div className="friends-block-header">
                            Pending Requests
                        </div>
                    )}
                    {pending}
                    <div className="friends-block-header">Friends</div>
                    {current.length > 0 ? (
                        current
                    ) : (
                        <div className="no-friends">No Friends Yet</div>
                    )}
                </div>
            </div>
        )
    );
}
