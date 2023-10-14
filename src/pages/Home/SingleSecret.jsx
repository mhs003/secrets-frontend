import TokenProvider from "../../States/TokenProvider";
import { secretsAPI } from "../../utils/server";
import SecretProvider from "../../States/SecretProvider";
import { ImSpinner3 } from "react-icons/im";
import ToastProvider from "../../States/ToastProvider";
import { signal } from "@preact/signals-react";

export default function SingleSecret({ index, secret }) {
    const deleteLoading = signal(false);
    const hideLoading = signal(false);

    const deleteSecret = () => {
        if (window.confirm("Do you really want to delete this secret?")) {
            deleteLoading.value = true;
            secretsAPI
                .delete("/delete", {
                    params: {
                        id: secret._id,
                    },
                    headers: {
                        Authorization: `Bearer ${TokenProvider.get()}`,
                    },
                })
                .then((res) => {
                    SecretProvider.deleteOne(index);
                })
                .catch((err) => {
                    ToastProvider.open(
                        "Something went wrong. Please try again later.",
                        3
                    );
                })
                .finally(() => {
                    deleteLoading.value = false;
                });
        }
    };
    const hideSecret = () => {
        if (!secret.hidden) {
            hideLoading.value = true;
            if (window.confirm("Do you really want to hide this secret?")) {
                secretsAPI
                    .put(
                        "/update",
                        {
                            id: secret._id,
                            hide: true,
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${TokenProvider.get()}`,
                            },
                        }
                    )
                    .then((res) => {
                        SecretProvider.sync();
                    })
                    .catch((err) => {
                        console.log(err.response.data);
                        ToastProvider.open(
                            "Something went wrong. Please try again later.",
                            3
                        );
                    })
                    .finally(() => {
                        hideLoading.value = false;
                    });
            }
        } else {
            if (window.confirm("Do you really want to unhide this secret?")) {
                hideLoading.value = true;
                secretsAPI
                    .put(
                        "/update",
                        {
                            id: secret._id,
                            hide: false,
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${TokenProvider.get()}`,
                            },
                        }
                    )
                    .then((res) => {
                        SecretProvider.sync();
                    })
                    .catch((err) => {
                        console.log(err.response.data);
                        ToastProvider.open(
                            "Something went wrong. Please try again later.",
                            3
                        );
                    })
                    .finally(() => {
                        hideLoading.value = false;
                    });
            }
        }
    };
    return (
        <div className="w-full flex flex-col gap-4 border-2 border-transparent hover:border-slate-700 hover:shadow-lg p-5 rounded-[30px]">
            {secret.hidden ? (
                <div className="flex items-center gap-2">
                    <h1 className="font-bold text-xl text-amber-600">
                        The secret is hidden.
                    </h1>
                    <span
                        onClick={hideLoading.value ? () => {} : hideSecret}
                        className={
                            "flex justify-center items-center gap-1 " +
                            (hideLoading.value
                                ? "text-gray-400 cursor-default"
                                : "text-cyan-600 underline-offset-2 hover:underline cursor-pointer")
                        }
                    >
                        {hideLoading.value && (
                            <ImSpinner3 className="animate-spin" />
                        )}
                        {secret.hidden ? "Unhide" : "Hide"}
                    </span>
                </div>
            ) : (
                <>
                    <h2 className="font-bold text-xl text-emerald-600">
                        {secret.title}
                    </h2>
                    <div className="flex gap-3">
                        <div className="h-full w-1 bg-slate-500 rounded-full" />
                        <p className="whitespace-pre-wrap">{secret.body}</p>
                    </div>
                    <div className="flex gap-4">
                        <span
                            onClick={hideLoading.value ? () => {} : hideSecret}
                            className={
                                "flex justify-center items-center gap-1 " +
                                (hideLoading.value
                                    ? "text-gray-400 cursor-default"
                                    : "text-cyan-600 underline-offset-2 hover:underline cursor-pointer")
                            }
                        >
                            {hideLoading.value && (
                                <ImSpinner3 className="animate-spin" />
                            )}
                            Hide
                        </span>
                        <span
                            onClick={
                                deleteLoading.value ? () => {} : deleteSecret
                            }
                            className={
                                "flex justify-center items-center gap-1 " +
                                (deleteLoading.value
                                    ? "text-gray-400 cursor-default"
                                    : "text-red-600 underline-offset-2 hover:underline cursor-pointer")
                            }
                        >
                            {deleteLoading.value && (
                                <ImSpinner3 className="animate-spin" />
                            )}
                            Delete
                        </span>
                    </div>
                </>
            )}
        </div>
    );
}
