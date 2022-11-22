import React from "react";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { RiUserSearchLine } from "react-icons/ri";
import axios from "axios";

export default function SearchBar({ userToken }) {
    const [timer, setTimer] = useState(null);
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

    async function fetchSearchResults() {
        try {
            const response = await axios.get(
                window.$BACKEND_URI + "search/" + searchBarInput
            );
            return response.data;
        } catch (error) {
            //We're not handling errors. Just logging into the console.
            console.log(error);
            return false;
        }
    }

    function handleClearSearch() {
        setSearchBarInput("");
        setSearchResults([]);
        setSearchOpen(false);
    }

    function handleInputChange(e) {
        setSearchBarInput(e.target.value);
        clearTimeout(timer);
        const newTimer = setTimeout(() => {
            !searchBarInput
                ? setSearchResults([])
                : fetchSearchResults().then((result) => {
                      setSearchResults(result);
                  });
        }, 500);
        setTimer(newTimer);
    }

    const userList =
        searchBarInput &&
        searchResults.map((result, i) => (
            <Link
                className="search-results-row"
                key={i}
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
                            : require("../assets/img/DefaultProfilePic.jpeg")
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
        <div ref={closeSearchRef} className="search-block">
            {searchOpen ? (
                <input
                    className="search-bar"
                    name="usersearch"
                    value={searchBarInput}
                    onChange={handleInputChange}
                    placeholder="Search by username"
                />
            ) : (
                <RiUserSearchLine
                    className="Hlink search-icon"
                    size={20}
                    onClick={() => setSearchOpen(true)}
                />
            )}
            {renderSearchResults()}
        </div>
    );
}
