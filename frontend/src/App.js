import React, { useEffect, useState, useRef } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { RiUserSearchLine } from "react-icons/ri";
import { IconContext } from "react-icons";
import axios from "axios";
import Profile from "./components/Profile";
import Stats from "./components/Stats";
import CalPoly from "./components/CalPoly";
import Workouts from "./components/Workouts";
import EditProfile from "./components/EditProfile";
import Auth from "./components/Auth";
import OtherProfile from "./components/OtherProfile";

export default function App() {
    const [userToken, setUserToken] = useState();
    const [searchBarInput, setSearchBarInput] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [searchOpen, setSearchOpen] = useState(false);
    const closeSearchRef = useRef();

    const useOutsideClick = (ref, callback) => {
        const handleClick = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                callback();
            }
        };

        useEffect(() => {
            document.addEventListener("click", handleClick);

            return () => {
                document.removeEventListener("click", handleClick);
            };
        });
    };

    useOutsideClick(closeSearchRef, () => {
        if (searchOpen) handleClearSearch();
    });

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser);
            setUserToken(foundUser);
        }
    }, []);

    function handleUserLogIn(user) {
        localStorage.setItem("user", JSON.stringify(user));
        setUserToken(user);
    }

    function handleLogOut() {
        setUserToken();
        localStorage.clear();
    }

    async function fetchSearchResults() {
        try {
            const response = await axios.get(
                "http://localhost:4000/search/" + searchBarInput
            );
            return response.data;
        } catch (error) {
            //We're not handling errors. Just logging into the console.
            console.log(error);
            return false;
        }
    }

    useEffect(() => {
        !searchBarInput
            ? setSearchResults([])
            : fetchSearchResults().then((result) => {
                  setSearchResults(result);
              });
    }, [searchBarInput]);

    function handleClearSearch() {
        setSearchBarInput("");
        setSearchResults([]);
        setSearchOpen(false);
    }

    const userList =
        searchBarInput &&
        searchResults.map((result, i) => (
            <Link
                className="search-results-row"
                style={
                    i === searchResults.length - 1
                        ? { borderBottomWidth: "0" }
                        : null
                }
                onClick={handleClearSearch}
                to={
                    userToken.username === result.username
                        ? "/"
                        : "/profile/" + result.username
                }
            >
                <img
                    className="search-results-avatar"
                    src={
                        result?.avatar
                            ? result.avatar
                            : require("./assets/img/DefaultProfilePic.jpeg")
                    }
                    alt="Cannot display"
                />
                @{result.username}
            </Link>
        ));

    function renderSearchResults() {
        if (userList.length !== 0 && searchBarInput.length > 1) {
            return <div className="search-results">{userList}</div>;
        } else if (searchOpen && searchBarInput.length > 1) {
            return (
                <div className="search-results search-results-row">
                    No Users Found
                </div>
            );
        }
        return <div></div>;
    }

    return (
        <BrowserRouter>
            {userToken ? (
                <div className="app">
                    <div class="header">
                        <div class="left-header">
                            <div className="left-header-button">
                                <Link to="/">
                                    <img
                                        style={{ height: 50}}
                                        src={require("./assets/img/PolyGainsLogo.png")}
                                        alt="PolyGains"
                                    />
                                </Link>
                            </div>
                        </div>
                        <div class="middle-header">
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
                        <div class="right-header">
                            <div ref={closeSearchRef} className="search-block">
                                {searchOpen ? (
                                    <input
                                        className="search-bar"
                                        name="usersearch"
                                        value={searchBarInput}
                                        onChange={(e) =>
                                            setSearchBarInput(e.target.value)
                                        }
                                        placeholder="Search by username"
                                    />
                                ) : (
                                    <IconContext.Provider
                                        value={{ size: "20px" }}
                                    >
                                        <div
                                            className="Hlink"
                                            style={{
                                                paddingTop: 3,
                                                cursor: "pointer",
                                                marginRight: 0,
                                                paddingRight: 0,
                                            }}
                                        >
                                            <RiUserSearchLine
                                                onClick={() =>
                                                    setSearchOpen(true)
                                                }
                                            />
                                        </div>
                                    </IconContext.Provider>
                                )}
                                {renderSearchResults()}
                            </div>
                            <div
                                className="log-out Hlink"
                                onClick={handleLogOut}
                            >
                                Log Out
                            </div>
                        </div>
                    </div>

                    <div className="main-body">
                        <Routes>
                            <Route
                                path="/"
                                element={<Profile userToken={userToken} />}
                            />
                            <Route
                                path="/stats"
                                element={<Stats userToken={userToken} />}
                            />
                            <Route
                                path="/calpoly"
                                element={<CalPoly userToken={userToken} />}
                            />
                            <Route
                                path="/workouts"
                                element={<Workouts userToken={userToken} />}
                            />
                            <Route
                                path="/editprofile"
                                element={<EditProfile userToken={userToken} />}
                            />
                            <Route
                                path={"/profile/:username"}
                                element={<OtherProfile />}
                            />
                        </Routes>
                    </div>
                </div>
            ) : (
                <Auth handleUserLogIn={handleUserLogIn} />
            )}
        </BrowserRouter>
    );
}
