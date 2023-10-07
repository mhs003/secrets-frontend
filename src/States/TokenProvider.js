import { signal } from "@preact/signals-react";

const token = signal(null);

const save = (/** @type {string} */ iToken) => {
    localStorage.setItem("token", iToken);
};

const load = () => {
    const gToken = localStorage.getItem("token");
    if (gToken) {
        token.value = gToken;
    } else {
        token.value = null;
    }
};

const get = () => {
    return token.value;
};

const remove = () => {
    localStorage.removeItem("token");
    token.value = null;
};

const TokenProvider = {
    save,
    load,
    get,
    remove,
};

export default TokenProvider;
