import { signal } from "@preact/signals-react";

/*
    Types:
        1 - Success
        2 - Info
        3 - Error
*/

const toastState = signal({
    body: "",
    shown: false,
    type: 1,
    closeAfter: 0,
});
const progressState = signal(100);

//

const getBody = () => {
    return toastState.value.body;
};

const getType = () => {
    return toastState.value.type;
};

const open = (/** @type {string} */ body, type = 1, closeAfter = 6) => {
    type = type < 1 || type > 3 ? 1 : type;

    toastState.value = {
        body: body,
        shown: true,
        type: type,
        closeAfter: closeAfter > 1 ? closeAfter * 1000 : 2000,
    };
};

const close = () => {
    resetProgress();
    toastState.value = {
        body: "",
        shown: false,
        type: 0,
        closeAfter: 0,
    };
};

const getCloseAfter = () => {
    return toastState.value.closeAfter;
};

const isShown = () => {
    return toastState.value.shown;
};

const getProgress = () => {
    return progressState.value;
};

const decreaseProgress = (by = -1) => {
    progressState.value += by;
};

const resetProgress = () => {
    progressState.value = 100;
};

const ToastProvider = {
    open,
    close,
    getBody,
    getType,
    isShown,
    getProgress,
    decreaseProgress,
    resetProgress,
    getCloseAfter,
};

export default ToastProvider;
