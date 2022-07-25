import React from "react";
import { Link } from "@inertiajs/inertia-react";

export default function NavLink({ href, active, children }) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center px-1 pt-1 text-black text-sm font-medium leading-5 focus:border-b-primary focus:outline-none transition duration-15 dark:hover:text-white dark:text-white ease-in-out ${active ? 'border-b-primary border-b-4' : 'border-b-none hover:text-primary'}`}
    >
      {children}
    </Link>
  );
}
