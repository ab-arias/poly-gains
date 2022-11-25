import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProgressTable from "./ProgressTable";
import WorkoutCalendar from "./WorkoutCalendar";
import { AiOutlinePlusCircle, AiOutlineCheckCircle } from "react-icons/ai";
import { FiSend } from "react-icons/fi";
import { FaUserFriends } from "react-icons/fa";
import axios from "axios";

export default function OtherProfile({ userToken }) {
    const params = useParams();
    const [stats, setStats] = useState();
    const [user, setUser] = useState();
    const [otherUser, setOtherUser] = useState();
    const [calendar, setCalendar] = useState();
    const [workouts, setWorkouts] = useState();
    const [friendStatus, setFriendStatus] = useState();

    async function fetchOtherUser() {
        try {
            const response = await axios.get(
                window.$BACKEND_URI + "profile/" + params.username
            );
            return response.data.user;
        } catch (error) {
            //We're not handling errors. Just logging into the console.
            console.log(error);
            return false;
        }
    }

    async function fetchUser() {
        try {
            const response = await axios.get(
                window.$BACKEND_URI + "user/" + userToken.id
            );
            return response.data.user;
        } catch (error) {
            //We're not handling errors. Just logging into the console.
            console.log(error);
            return false;
        }
    }

    useEffect(() => {
        fetchOtherUser().then((result) => {
            if (result) {
                setOtherUser(result);
                setCalendar(result.activeWorkouts);
                fetchStats(result.stats).then((result1) => {
                    if (result1) {
                        setStats(result1);
                    }
                });
                fetchUser().then((thisUser) => {
                    if (thisUser) {
                        setUser(thisUser);
                        const status = thisUser.friends.find(
                            (f) => f.friend === result._id
                        );
                        if (status) setFriendStatus(status.status);
                        else setFriendStatus("none");
                    }
                });
            }
        });
        // eslint-disable-next-line
    }, [params.username]);

    async function fetchWorkouts() {
        try {
            const response = await axios.get(window.$BACKEND_URI + "workouts", {
                params: { workouts: otherUser.workouts },
            });
            return response.data;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    useEffect(() => {
        if (otherUser) {
            fetchWorkouts().then((result) => {
                if (result) {
                    setWorkouts(result);
                }
            });
        }
        // eslint-disable-next-line
    }, [otherUser]);

    async function fetchStats(Id) {
        try {
            const response = await axios.get(
                window.$BACKEND_URI + "stats/" + Id
            );
            return response.data.stats_list;
        } catch (error) {
            //We're not handling errors. Just logging into the console.
            console.log(error);
            return false;
        }
    }

    function handleSendRequest() {
        const otherFriends = [
            { friend: user._id, status: "pending" },
            ...otherUser.friends,
        ];
        const myFriends = [
            { friend: otherUser._id, status: "sent" },
            ...user.friends,
        ];
        const res = updateFriends(otherFriends, myFriends);
        if (res) setFriendStatus("sent");
    }

    function handleAcceptRequest() {
        const otherFriends = otherUser.friends.map((rel) => {
            if (rel.friend === user._id) return { ...rel, status: "friends" };
            else return rel;
        });
        const myFriends = user.friends.map((rel) => {
            if (rel.friend === otherUser._id)
                return { ...rel, status: "friends" };
            else return rel;
        });
        const res = updateFriends(otherFriends, myFriends);
        if (res) setFriendStatus("friends");
    }

    function handleRemoveRequest() {
        const otherFriends = otherUser.friends.filter(
            (rel) => rel.friend !== user._id
        );
        const myFriends = user.friends.filter(
            (rel) => rel.friend !== otherUser._id
        );
        const res = updateFriends(otherFriends, myFriends);
        if (res) setFriendStatus("none");
    }

    async function updateFriends(otherReq, myReq) {
        try {
            const newUser = await axios.post(
                window.$BACKEND_URI + "user/" + user._id,
                { friends: myReq }
            );
            const newOther = await axios.post(
                window.$BACKEND_URI + "user/" + otherUser._id,
                { friends: otherReq }
            );
            setUser(newUser.data);
            setOtherUser(newOther.data);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    function renderButton() {
        if (friendStatus === "sent") {
            return (
                <div
                    className="friend-request-button"
                    onClick={handleRemoveRequest}
                >
                    <FiSend className="button-icon" size={16} />
                    <div>Request Sent</div>
                </div>
            );
        } else if (friendStatus === "pending") {
            return (
                <div
                    className="friend-request-button"
                    onClick={handleAcceptRequest}
                >
                    <AiOutlineCheckCircle className="button-icon" size={16} />
                    <div>Accept Friend Request</div>
                </div>
            );
        } else if (friendStatus === "friends") {
            return (
                <div
                    className="friend-request-button"
                    onClick={handleRemoveRequest}
                >
                    <FaUserFriends className="button-icon" size={16} />
                    <div>Friends</div>
                </div>
            );
        } else
            return (
                <div
                    className="friend-request-button"
                    onClick={handleSendRequest}
                >
                    <AiOutlinePlusCircle className="button-icon" size={16} />
                    <div>Send Friend Request</div>
                </div>
            );
    }

    return (
        otherUser &&
        user &&
        friendStatus &&
        workouts &&
        stats && (
            <div className="profile-main-container">
                <img
                    className="profile-avatar"
                    src={
                        otherUser?.avatar
                            ? otherUser.avatar
                            : require("../assets/img/DefaultProfilePic.jpeg")
                    }
                    alt="Cannot display"
                />
                <h2>{otherUser.name}</h2>
                <h4>@{otherUser.username}</h4>
                {renderButton()}

                <div className="center-dashboard">
                    <ProgressTable
                        statsData={stats}
                        otherName={otherUser.name}
                    />
                </div>
                <WorkoutCalendar
                    preview={true}
                    workouts={workouts}
                    calendar={calendar}
                    otherName={otherUser.name}
                />
            </div>
        )
    );
}
