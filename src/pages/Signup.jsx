import SEO from "../components/SEO";
import { ImSpinner4 } from "react-icons/im";
import { authAPI } from "../utils/server";
import { hrefTo } from "../utils/Navigator";
import ToastProvider from "../States/ToastProvider";
import BackButton from "../components/BackButton";
import { useSignal } from "@preact/signals-react";

export default function Signup() {
    // Local states
    const isLoading = useSignal(false);
    const inputs = useSignal({ uname: "", fname: "", passwd: "" });
    // ^^^^^^^^^^^^

    const handleSignupSubmit = (e) => {
        e.preventDefault();
        isLoading.value = true;
        authAPI
            .post("/signup", {
                uname: inputs.value.uname,
                fname: inputs.value.fname,
                passwd: inputs.value.passwd,
            })
            .then((res) => {
                ToastProvider.open("Registration succeed!");
                hrefTo("/login?registered=true");
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
                title="Signup"
                description="Signup to the Secret?!"
                name="Monzurul Hasan"
                type="signup_page"
            />
            <div className="w-full max-w-md">
                <form
                    method="post"
                    onSubmit={handleSignupSubmit}
                    className="bg-gray-800 shadow-lg rounded px-12 pt-6 pb-8 mb-4 mx-2 relative"
                >
                    <BackButton />
                    <h1 className="text-3xl text-white font-bold mb-4">
                        Sign Up
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
                    <div className="mb-4">
                        <label
                            className="block text-gray-400 text-sm font-bold mb-2"
                            htmlFor="fullname"
                        >
                            Full Name
                        </label>
                        <input
                            className="shadow appearance-none bg-transparent border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline hover:border-blue-300 focus:border-blue-300 focus:outline-gray-600"
                            id="fullname"
                            type="text"
                            onChange={(e) => {
                                inputs.value = {
                                    ...inputs.value,
                                    fname: e.currentTarget.value,
                                };
                            }}
                            placeholder="Fullname"
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
                                "Sign Up"
                            )}
                        </button>
                        <a
                            className="inline-block align-baseline font-bold text-sm text-blue-400 px-3 py-2 rounded transition-transform active:scale-90 border border-transparent hover:border-blue-400"
                            href="/login"
                        >
                            Instead, Login here
                        </a>
                    </div>
                </form>
                <p className="text-center text-white text-xs">
                    &copy;2023 Monzurul Hasan. All rights reserved.
                </p>
            </div>
        </div>
    );
}
