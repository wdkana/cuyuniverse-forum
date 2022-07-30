import React from "react";
import {Link} from "@inertiajs/inertia-react";

export default function ResponsiveNavLink({method = "get", as = "a", href, active = false, children}) {
  return (
    <Link
      method={method}
      as={as}
      href={href}
      className={`flex w-full items-start border-l-4 py-2 pl-3 pr-4 ${
        active
          ? "border-secondary text-secondary-content focus:border-primary focus:bg-primary focus:text-primary-content focus:outline-none dark:text-primary-content"
          : "border-transparent text-base-content hover:border-secondary hover:bg-secondary hover:text-primary-content dark:text-white dark:hover:text-slate-100"
      } text-base font-medium transition duration-150 ease-in-out focus:outline-none`}>
      {children}
    </Link>
  );
}
