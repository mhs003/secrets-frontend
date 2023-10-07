/* eslint-disable react-hooks/exhaustive-deps */
import { FaTimes } from "react-icons/fa";
import ToastProvider from "../States/ToastProvider";
import { FiAlertCircle, FiAlertTriangle } from "react-icons/fi";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { useSignal } from "@preact/signals-react";
import { useEffect } from "react";

export default function Toast() {
    const timeController = useSignal([0, 0]);

    const closeTheToast = () => {
        ToastProvider.close();
    };

    useEffect(() => {
        if (ToastProvider.isShown()) {
            // @ts-ignore
            timeController.value[0] = setInterval(() => {
                ToastProvider.decreaseProgress();
            }, ToastProvider.getCloseAfter() / 100 - 2);
            // @ts-ignore
            timeController.value[1] = setTimeout(() => {
                clearInterval(timeController.value[0]);
                ToastProvider.resetProgress();
                ToastProvider.close();
            }, ToastProvider.getCloseAfter());
        } else {
            clearInterval(timeController.value[0]);
            clearTimeout(timeController.value[1]);
        }
    }, [ToastProvider.isShown()]);

    return (
        <div
            role="alert"
            className="absolute top-5 left-1/2 -translate-x-1/2 rounded-xl border p-4 pb-2 w-80 border-gray-800 bg-gray-900 shadow-sm shadow-gray-800 z-[100]"
            style={{
                display: ToastProvider.isShown() ? "block" : "none",
            }}
        >
            <div className="flex items-start gap-4">
                <span className="flex flex-col items-center justify-center">
                    {ToastProvider.getType() === 1 ? (
                        <AiOutlineCheckCircle
                            size={24}
                            className="text-green-600"
                        />
                    ) : ToastProvider.getType() === 2 ? (
                        <FiAlertTriangle size={21} className="text-cyan-600" />
                    ) : (
                        <FiAlertCircle size={21} className="text-red-600" />
                    )}
                </span>

                <div className="flex-1">
                    <strong className="block">
                        {ToastProvider.getType() === 1 ? (
                            <span className="text-green-600 font-bold">
                                Success!
                            </span>
                        ) : ToastProvider.getType() === 2 ? (
                            <span className="text-cyan-600 font-bold">
                                Info!
                            </span>
                        ) : (
                            <span className="text-red-600 font-bold">
                                Error!
                            </span>
                        )}
                    </strong>

                    <p className="mt-1 text-sm text-gray-200">
                        {ToastProvider.getBody()}
                    </p>
                </div>

                <button
                    className="text-gray-400 transition hover:text-gray-500"
                    onClick={closeTheToast}
                >
                    <span className="sr-only">Dismiss popup</span>
                    <FaTimes />
                </button>
            </div>
            <div className="h-1 w-full rounded-full bg-slate-800">
                <div
                    className="h-1 w-full mt-4 rounded-full transition-all"
                    style={{
                        width: ToastProvider.getProgress() + "%",
                        backgroundColor:
                            ToastProvider.getType() === 1
                                ? "rgb(22 163 74 / 1)"
                                : ToastProvider.getType() === 2
                                ? "rgb(8 145 178 / 1)"
                                : "rgb(220 38 38 / 1)",
                    }}
                ></div>
            </div>
        </div>
    );

    /* return (
        <div
            className="absolute top-5 left-1/2 -translate-x-1/2 flex gap-2 justify-center items-center bg-white p-4 rounded-xl shadow-md shadow-gray-800 z-[100]"
            style={{
                display: ToastProvider.isShown() ? "flex" : "none",
            }}
        >
            <p className="text-black">{ToastProvider.getBody()}</p>
            <FaTimes
                size={26}
                onClick={closeTheToast}
                className="p-[6px] text-red-500 rounded-md hover:bg-slate-200 cursor-pointer transition-transform active:scale-90"
            />
        </div>
    ); */
}
