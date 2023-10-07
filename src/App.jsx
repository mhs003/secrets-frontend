/* import Loading from "./components/Loading";
import Loader from "./States/Loader";
import Toast from "./components/Toast";
import ToastProvider from "./States/ToastProvider";
import { Route, Router, useLocation } from "preact-iso";
import Home from "./pages/Home/Home";
import Login from "./pages/Login";
import { NotFound } from "./pages/_404";
import Signup from "./pages/Signup";
import { effect } from "@preact/signals";
import TokenProvider from "./States/TokenProvider";
import { authAPI } from "./utils/server";
import UserProvider from "./States/UserProvider";

export default function App() {
    effect(() => {
        Loader.show();
        TokenProvider.load();
        if (TokenProvider.get()) {
            authAPI
                .get("/user/validate", {
                    headers: {
                        Authorization: `Bearer ${TokenProvider.get()}`,
                    },
                })
                .then((res) => {
                    const data = res.data;
                    UserProvider.setInfo(data.data);
                    if (data.type !== "success") {
                        UserProvider.logout();
                    }
                })
                .catch((err) => {
                    const errType = err.response?.data?.error?.type;
                    if (
                        errType === "user_not_found" &&
                        errType === "unauthorized"
                    ) {
                        UserProvider.logout();
                    } else {
                        ToastProvider.open(
                            "Something went wrong. Please check your internet connect and refresh the page.",
                            3
                        );
                    }
                })
                .finally(() => {
                    Loader.hide();
                });
        } else {
            Loader.hide();
        }
    });
    return (
        <>
            <Toast />
            <Loading />
            <Router>
                <Route path="/" component={Home} />
                {!TokenProvider.get() && (
                    <Route path="/login" component={Login} />
                )}
                {!TokenProvider.get() && (
                    <Route path="/signup" component={Signup} />
                )}
                <Route default component={NotFound} />
            </Router>
        </>
    );
}
 */

import React from "react";
import Toast from "./components/Toast";
import Loading from "./components/Loading";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { effect } from "@preact/signals-react";
import Loader from "./States/Loader";
import TokenProvider from "./States/TokenProvider";
import { authAPI } from "./utils/server";
import UserProvider from "./States/UserProvider";
import ToastProvider from "./States/ToastProvider";

export default function App() {
    const location = useLocation();

    effect(() => {
        Loader.show();
        TokenProvider.load();
        if (TokenProvider.get()) {
            authAPI
                .get("/user/validate", {
                    headers: {
                        Authorization: `Bearer ${TokenProvider.get()}`,
                    },
                })
                .then((res) => {
                    const data = res.data;
                    UserProvider.setInfo(data.data);
                    if (data.type !== "success") {
                        UserProvider.logout();
                    }
                })
                .catch((err) => {
                    const errType = err.response?.data?.error?.type;
                    if (
                        errType === "user_not_found" &&
                        errType === "unauthorized"
                    ) {
                        UserProvider.logout();
                    } else {
                        ToastProvider.open(
                            "Something went wrong. Please check your internet connect and refresh the page.",
                            3
                        );
                    }
                })
                .finally(() => {
                    Loader.hide();
                });
        } else {
            Loader.hide();
        }
    });
    return (
        <>
            <Toast />
            <Loading />
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route
                    path="/login"
                    element={
                        !TokenProvider.get() ? <Login /> : <Navigate to="/" />
                    }
                />
                <Route
                    path="/signup"
                    element={
                        !TokenProvider.get() ? <Signup /> : <Navigate to="/" />
                    }
                />
            </Routes>
        </>
    );
}
