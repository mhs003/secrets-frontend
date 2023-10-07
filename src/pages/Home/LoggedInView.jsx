/* eslint-disable react-hooks/exhaustive-deps */
import SingleSecret from "./SingleSecret";
import { secretsAPI } from "../../utils/server";
import TokenProvider from "../../States/TokenProvider";
import Loader from "../../States/Loader";
import ToastProvider from "../../States/ToastProvider";
import { ImSpinner8 } from "react-icons/im";
import SecretProvider from "../../States/SecretProvider";
import { effect, useSignal } from "@preact/signals-react";
import { useEffect } from "react";

export default function LoggedInView() {
    const modalOpened = useSignal(false);
    // const revalidateSignal = useSignal(0);
    const isLoading = useSignal(false);
    const inputs = useSignal({
        title: "",
        body: "",
        createdOn: Date.now(),
    });

    const formSubmitHandler = (e) => {
        e.preventDefault();
        if (inputs.value.body.trim().length < 7) {
            ToastProvider.open("Secret body is too short!", 2);
            return;
        }
        isLoading.value = true;
        secretsAPI
            .post("/create", inputs.value, {
                headers: {
                    Authorization: `Bearer ${TokenProvider.get()}`,
                },
            })
            .then((res) => {
                if (res.data.type === "success") {
                    inputs.value = {
                        ...inputs.value,
                        title: "",
                        body: "",
                    };
                    SecretProvider.sync();
                } else {
                    ToastProvider.open(
                        "Something went wrong, please try again later.",
                        3
                    );
                }
            })
            .catch((err) => {
                ToastProvider.open(
                    "Something went wrong, please check your internet connect and try again.",
                    3
                );
            })
            .finally(() => {
                isLoading.value = false;
            });
    };
    effect(() => {
        if (modalOpened.value) {
            document.body.style.overflowY = "hidden";
        } else {
            document.body.style.overflowY = "auto";
        }
    });
    useEffect(() => {
        Loader.show();
        secretsAPI
            .get("/getAll", {
                headers: {
                    Authorization: `Bearer ${TokenProvider.get()}`,
                },
            })
            .then((res) => {
                if (res.data.type === "success") {
                    SecretProvider.initSecrets(res.data.data.toReversed());
                    // console.log(res.data.data);
                } else {
                    SecretProvider.initSecrets(["error_fetching_data"]);
                }
            })
            .catch((err) => {
                // const errType = err.response?.data?.error?.type;
                SecretProvider.initSecrets(["error_fetching_data"]);
            })
            .finally(() => {
                Loader.hide();
            });
    }, [SecretProvider.syncSignal()]);
    return (
        <div className="p-3 md:p-10 flex flex-col md:flex-row gap-3 md:gap-10 items-center">
            <button
                onClick={() => {
                    modalOpened.value = true;
                }}
                className="block md:hidden w-full p-4 rounded-full text-center bg-slate-800 transition-transform active:scale-90"
            >
                Add Secret
            </button>
            <div
                className={
                    (modalOpened.value === true ? "block" : "hidden md:block") +
                    " fixed top-0 left-0 overscroll-contain overflow-y-auto backdrop-blur-lg w-full h-full p-10 md:relative md:w-2/5 lg:w-1/4 md:bg-slate-800 md:h-[calc(100dvh-240px)] md:rounded-[40px] md:shadow-lg"
                }
            >
                <form
                    onSubmit={formSubmitHandler}
                    className="flex flex-col h-full justify-center items-center gap-5 overflow-y-auto"
                >
                    <h2 className="text-white text-4xl font-bold mb-4">
                        Create a Secret
                    </h2>
                    <input
                        type="text"
                        name="title"
                        className="bg-transparent p-4 w-[95%] appearance-none border rounded-full focus:outline-none focus:outline-slate-100"
                        placeholder="Secret Title"
                        value={inputs.value.title}
                        onChange={(e) => {
                            inputs.value = {
                                ...inputs.value,
                                // @ts-ignore
                                title: e.target.value,
                                createdOn: Date.now(),
                            };
                        }}
                    />
                    <textarea
                        name="body"
                        className="bg-transparent p-4 w-[95%] h-full appearance-none border rounded-3xl focus:outline-none focus:outline-slate-100"
                        placeholder="Secret body"
                        value={inputs.value.body}
                        onChange={(e) => {
                            inputs.value = {
                                ...inputs.value,
                                // @ts-ignore
                                body: e.target.value,
                                createdOn: Date.now(),
                            };
                        }}
                    ></textarea>
                    <button
                        type="submit"
                        className={
                            "w-[95%] p-4 rounded-full text-center bg-emerald-600 hover:bg-emerald-800 transition-transform active:scale-90 disabled:bg-gray-500 " +
                            (isLoading.value
                                ? "cursor-progress"
                                : "cursor-pointer")
                        }
                        disabled={isLoading.value}
                    >
                        {isLoading.value ? (
                            <div className="flex justify-center items-center gap-2">
                                <ImSpinner8 className="animate-spin" />
                                Creating...
                            </div>
                        ) : (
                            <>Create</>
                        )}
                    </button>
                    <span
                        onClick={() => {
                            modalOpened.value = false;
                        }}
                        className="md:hidden underline underline-offset-4 cursor-pointer p-3 select-none"
                    >
                        Close
                    </span>
                </form>
            </div>
            <hr className="hidden md:block w-1 bg-slate-800 border-none h-[calc(100dvh-360px)] rounded-full" />
            <div
                className={
                    "flex flex-col gap-4 w-full md:w-3/5 lg:w-3/4 p-4 bg-slate-800 h-[calc(100dvh-92px)] md:h-[calc(100dvh-152px)] rounded-[40px] shadow-lg overflow-y-auto " +
                    ((SecretProvider.isLength(1) &&
                        SecretProvider.is(0, "error_fetching_data")) ||
                    SecretProvider.isLength(0)
                        ? "justify-center items-center"
                        : "")
                }
            >
                {SecretProvider.isLength(1) &&
                SecretProvider.is(0, "error_fetching_data") ? (
                    <h4 className="text-slate-200">
                        Could not fetch data. Please check your internet
                        connection and try again.
                    </h4>
                ) : SecretProvider.isLength(0) ? (
                    <h4 className="text-slate-200">No data found</h4>
                ) : (
                    <>
                        {SecretProvider.getSecrets().map((skrt, index) => {
                            return (
                                <SingleSecret
                                    key={index}
                                    index={index}
                                    secret={skrt}
                                />
                            );
                        })}
                    </>
                )}
            </div>
        </div>
    );
}
