import { signal } from "@preact/signals-react";

const loader = signal(true);

const show = () => {
    loader.value = true;
};

const hide = () => {
    loader.value = false;
};

const toggle = () => {
    loader.value = !loader.value;
};

const get = () => {
    return loader.value;
};

const Loader = {
    get,
    show,
    hide,
    toggle,
};

export default Loader;
