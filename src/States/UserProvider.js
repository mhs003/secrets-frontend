import { signal } from "@preact/signals-react";
import { hrefTo } from "../utils/Navigator";
import TokenProvider from "./TokenProvider";

const userState = signal({});

const logout = (ask = false) => {
    if (ask) {
        const askp = prompt(
            "Do you really want to logout?\nEnter 'yes' to confirm."
        );

        if (askp === "'yes'") {
            alert("You are supposed to enter, yes. Not 'yes'. Moron!");
        } else if (askp === "yes") {
            TokenProvider.remove();
            hrefTo("/");
        }
    } else {
        TokenProvider.remove();
        hrefTo("/");
    }
};

const setInfo = (/** @type {{}} */ uinfo) => {
    userState.value = uinfo;
};

const getInfo = () => {
    return userState.value;
};

const get = (/** @type {string | number} */ key) => {
    return userState.value[key];
};

const UserProvider = { logout, setInfo, getInfo, get };

export default UserProvider;
