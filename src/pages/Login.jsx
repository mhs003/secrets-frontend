import SEO from "../components/SEO";
import { ImSpinner4 } from "react-icons/im";
import ToastProvider from "../States/ToastProvider";
import { authAPI } from "../utils/server";
import TokenProvider from "../States/TokenProvider";
import { hrefTo } from "../utils/Navigator";
import BackButton from "../components/BackButton";
import { useSignal } from "@preact/signals-react";
import { Link } from "react-router-dom";

export default function Login() {
    // Local states
    const isLoading = useSignal(false);
    const inputs = useSignal({ uname: "", passwd: "" });
    // ^^^^^^^^^^^^

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        isLoading.value = true;
        authAPI
            .post("/login", {
                uname: inputs.value.uname,
                passwd: inputs.value.passwd,
            })
            .then((res) => {
                TokenProvider.save(res.data.token);
                ToastProvider.open("Login successfull!");
                setTimeout(() => {
                    hrefTo("/");
                }, 200);
            })
            .catch((err) => {
                ToastProvider.open(
                    err?.response?.data?.message ?? "Something went wrong!",
                    3
                );
            })
            .then(() => {
                isLoading.value = false;
            });
    };

    return (
        <div className="flex justify-center items-center h-[100dvh]">
            <SEO
                title="Login"
                description="Login to the Secret?!"
                name="Monzurul Hasan"
                type="login_page"
            />
            <div className="w-full max-w-md">
                <form
                    method="post"
                    onSubmit={handleLoginSubmit}
                    className="bg-gray-800 shadow-lg rounded px-12 pt-6 pb-8 mb-4 mx-2 relative"
                >
                    <BackButton />
                    <h1 className="text-3xl text-white font-bold mb-4">
                        Login
                    </h1>
                    <div className="mb-4">
                        <label
                            className="block text-gray-400 text-sm font-bold mb-2"
                            htmlFor="username"
                        >
                            Username
                        </label>
                        <input
                            className="shadow appearance-none bg-transparent border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline hover:border-blue-300 focus:border-blue-300 focus:outline-gray-600"
                            id="username"
                            type="text"
                            onChange={(e) => {
                                inputs.value = {
                                    ...inputs.value,
                                    uname: e.currentTarget.value,
                                };
                            }}
                            placeholder="Username"
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            className="block text-gray-400 text-sm font-bold mb-2"
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <input
                            className="shadow appearance-none bg-transparent border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline hover:border-blue-300 focus:border-blue-300 focus:outline-gray-600"
                            id="password"
                            type="password"
                            onChange={(e) => {
                                inputs.value = {
                                    ...inputs.value,
                                    passwd: e.currentTarget.value,
                                };
                            }}
                            placeholder="******************"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-transform active:scale-90 focus:outline-none focus:shadow-outline ${
                                isLoading.value
                                    ? "opacity-50 cursor-not-allowed"
                                    : ""
                            }`}
                            type="submit"
                            disabled={isLoading.value}
                        >
                            {isLoading.value ? (
                                <div className="flex items-center">
                                    <ImSpinner4 className="animate-spin mr-2" />
                                    <span>Loading...</span>
                                </div>
                            ) : (
                                "Sign In"
                            )}
                        </button>
                        <Link
                            className="inline-block align-baseline font-bold text-sm text-blue-400 px-3 py-2 rounded transition-transform active:scale-90 border border-transparent hover:border-blue-400"
                            to="/signup"
                        >
                            Create an account
                        </Link>
                    </div>
                </form>
                <p className="text-center text-white text-xs">
                    &copy;2023 Monzurul Hasan. All rights reserved.
                </p>
            </div>
        </div>
    );
}
