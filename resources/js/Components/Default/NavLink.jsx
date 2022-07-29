import React from "react";
import {Link} from "@inertiajs/inertia-react";

export default function NavLink({href, active, children}) {
  return (
    <Link
      href={href}
      className={`duration-15 inline-flex items-center px-1 pt-1 text-sm font-medium leading-5 text-black transition ease-in-out focus:border-b-primary focus:outline-none dark:text-white dark:hover:text-white ${
        active ? "border-b-4 border-b-primary" : "border-b-none hover:text-primary"
      }`}>
      {children}
    </Link>
  );
}
