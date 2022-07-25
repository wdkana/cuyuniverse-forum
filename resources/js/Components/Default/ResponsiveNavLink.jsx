import React from "react";
import { Link } from "@inertiajs/inertia-react";

export default function ResponsiveNavLink({
  method = "get",
  as = "a",
  href,
  active = false,
  children,
}) {
  return (
    <Link
      method={method}
      as={as}
      href={href}
      className={`w-full flex items-start pl-3 pr-4 py-2 border-l-4 ${active
        ? "border-secondary text-secondary-content focus:outline-none focus:text-primary-content focus:bg-primary focus:border-primary"
        : "border-transparent text-base-content dark:text-white dark:hover:text-slate-100 hover:text-primary-content hover:bg-secondary hover:border-secondary"
        } text-base font-medium focus:outline-none transition duration-150 ease-in-out`}
    >
      {children}
    </Link>
  );
}
