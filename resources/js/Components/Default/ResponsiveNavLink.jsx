import React from "react";
import { Link } from "@inertiajs/inertia-react";

export default function ResponsiveNavLink({ method = "get", as = "a", href, active = false, children }) {
    return (
        <Link
            method={method}
            as={as}
            href={href}
            className={`w-full flex items-start pl-3 pr-4 py-2 border-l-4 ${
                active
                    ? "border-indigo-400 text-base focus:outline-none focus:text-indigo-800 focus:bg-neutral focus:border-indigo-700"
                    : "border-transparent text-black hover:text-black hover:bg-neutral hover:border-indigo-700"
            } text-base font-medium focus:outline-none transition duration-150 ease-in-out`}
        >
            {children}
        </Link>
    );
}
