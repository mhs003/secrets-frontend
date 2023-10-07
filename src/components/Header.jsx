// import { useLocation } from "preact-iso";
// import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import ToastProvider from "../States/ToastProvider";
import TokenProvider from "../States/TokenProvider";
import UserProvider from "../States/UserProvider";

export default function Header() {
    // const { url } = useLocation();

    return (
        <header className="flex justify-between items-center bg-slate-800 text-white p-4 shadow-lg">
            <h1
                onClick={() => ToastProvider.open("Hello World", 1)}
                className="font-bold text-2xl transition-transform active:scale-90 cursor-pointer user-select-none "
            >
                Secrets?!
            </h1>
            <div className="flex">
                {!TokenProvider.get() ? (
                    <>
                        <Link
                            to="/login"
                            className="p-2 px-4 rounded-l-full transition-transform bg-slate-700 hover:bg-slate-500 active:scale-90"
                        >
                            Login
                        </Link>
                        <Link
                            to="/signup"
                            className="p-2 px-4 rounded-r-full transition-transform bg-slate-700 hover:bg-slate-500 active:scale-90"
                        >
                            Signup
                        </Link>
                    </>
                ) : (
                    <button
                        className="p-2 px-4 rounded-full transition-transform bg-slate-700 hover:bg-slate-500 active:scale-90"
                        onClick={() => UserProvider.logout(true)}
                    >
                        Logout..?
                    </button>
                )}
            </div>
        </header>
    );
}
