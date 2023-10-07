import { signal } from "@preact/signals-react";

const secretState = signal([]);
const syncState = signal(0);

const initSecrets = (/** @type {object[]} */ arr) => {
    secretState.value = arr;
};

const sync = () => {
    syncState.value += 1;
};

const syncSignal = () => {
    return syncState.value;
};

const getSecrets = () => {
    return secretState.value;
};

const getSecret = (index = 0) => {
    return secretState.value[index];
};

const is = (index = 0, value = "") => {
    return secretState.value[index] === value;
};

const length = secretState.value.length;

const isLength = (expt = 0) => {
    return secretState.value.length === expt;
};

const deleteOne = (index) => {
    secretState.value = secretState.value.filter(
        (t) => t !== secretState.value[index]
    );
};

const SecretProvider = {
    initSecrets,
    getSecrets,
    getSecret,
    length,
    isLength,
    is,
    deleteOne,
    sync,
    syncSignal,
};

export default SecretProvider;
