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
    const [workouts, setWorkouts] = useState([]);
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

    async function addNewWorkout(newWorkout) {
        try {
            const newWorkouts = [...user.workouts, newWorkout];
            const response = await axios.post(
                window.$BACKEND_URI + "user/" + user._id,
                {
                    name: user.name,
                    avatar: user.avatar,
                    activeWorkouts: user.activeWorkouts,
                    workouts: newWorkouts,
                }
            );
            setUser(response.data);
        } catch (error) {
            //We're not handling errors. Just logging into the console.
            console.log(error);
            return false;
        }
    }

    async function createNewWorkout(workout) {
        const newCopy = {
            name: workout.name,
            exercise_list: workout.exercise_list,
        };
        try {
            const response = await axios.post(
                window.$BACKEND_URI + "workouts",
                newCopy
            );
            const result = response.data;
            addNewWorkout(result._id);
        } catch (error) {
            //We're not handling errors. Just logging into the console.
            console.log(error);
            return false;
        }
    }

    function renderButton() {
        let clickHandle, icon, buttonText;
        if (friendStatus === "sent") {
            clickHandle = handleRemoveRequest;
            icon = <FiSend className="button-icon" size={16} />;
            buttonText = "Request Sent";
        } else if (friendStatus === "pending") {
            clickHandle = handleAcceptRequest;
            icon = <AiOutlineCheckCircle className="button-icon" size={16} />;
            buttonText = "Accept Friend Request";
        } else if (friendStatus === "friends") {
            clickHandle = handleRemoveRequest;
            icon = <FaUserFriends className="button-icon" size={16} />;
            buttonText = "Friends";
        } else {
            clickHandle = handleSendRequest;
            icon = <AiOutlinePlusCircle className="button-icon" size={16} />;
            buttonText = "Send Friend Request";
        }

        return (
            <div className="friend-request-button" onClick={clickHandle}>
                {icon}
                <div>{buttonText}</div>
            </div>
        );
    }

    const displayCards = workouts.map((card, i) => {
        if (card._id === "637012e5c8e5bba98b4d3903") return null;
        return (
            <div className="workouts-card" key={i}>
                <AiOutlinePlusCircle
                    className="workouts-card-add"
                    size={25}
                    onClick={() => createNewWorkout(card)}
                />
                <div className="workouts-card-header">
                    <div className="workouts-card-overflow">{card.name}</div>
                </div>
                <div className="workouts-card-body">
                    {card.exercise_list.map((exercise, i) => (
                        <div
                            className="workouts-card-exercise-container"
                            key={i}
                        >
                            <div className="workouts-card-exercise">
                                {exercise.exercise}
                            </div>
                            <div className="workouts-card-sets-reps">
                                {exercise.sets}
                                <span> sets x </span>
                                {exercise.reps}
                                <span> reps</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    });

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

                <div className="other-center-dashboard">
                    <h2 className="section-header">{otherUser.name}'s Stats</h2>
                    <div className="other-center-container">
                        <ProgressTable
                            statsData={stats}
                            otherName={otherUser.name}
                        />
                        <div className="other-stats-container">
                            <div className="other-stats-labels">
                                <div style={{ marginBottom: 5 }}>Weight:</div>
                                <div style={{ marginBottom: 5 }}>Height:</div>
                                <div style={{ marginBottom: 5 }}>Calories:</div>
                                <div>Plan:</div>
                            </div>
                            <div>
                                <div style={{ marginBottom: 5 }}>
                                    {stats.weight} lbs
                                </div>
                                <div style={{ marginBottom: 5 }}>
                                    {stats.height} inches
                                </div>
                                <div style={{ marginBottom: 5 }}>
                                    {stats.calories}
                                </div>
                                <div>{stats.plan}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <WorkoutCalendar
                    preview={true}
                    workouts={workouts}
                    calendar={calendar}
                    otherName={otherUser.name}
                />
                <div className="workouts-cards-container">{displayCards}</div>
            </div>
        )
    );
}
