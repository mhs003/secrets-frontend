import React from "react";
import { Link } from "react-router-dom";

export default function LoggedOutView() {
    return (
        <div className="flex justify-center items-center h-[calc(100dvh-72px)] text-white">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">
                    Welcome to the Secrets Website
                </h1>
                <p className="text-xl">
                    Please{" "}
                    <Link className="p-link" to="/login">
                        login
                    </Link>{" "}
                    to access the full website.
                </p>
            </div>
        </div>
    );
}
