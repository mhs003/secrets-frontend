import { ImSpinner4 } from "react-icons/im";
import Loader from "../States/Loader";
import { useSignal } from "@preact/signals-react";
import { useEffect } from "react";
// import { useSignal } from "@preact/signals";
// import { useEffect } from "preact/hooks";

export default function Loading() {
    const dots = useSignal("");

    useEffect(() => {
        setInterval(() => {
            dots.value =
                dots.value === ""
                    ? "."
                    : dots.value === "."
                    ? ".."
                    : dots.value === ".."
                    ? "..."
                    : "";
        }, 600);
    }, []);
    return (
        <div
            className="absolute text-white w-screen h-[100dvh] top-0 left-0 gap-4 justify-center items-center flex-col bg-transparent backdrop-blur-[20px] z-50"
            style={{
                display: Loader.get() ? "flex" : "none",
            }}
        >
            <ImSpinner4 size={28} className="animate-spin" />
            <h2 className="font-bold text-lg">Loading {dots.value}</h2>
        </div>
    );
}
