import React, { useState } from "react";
import Dropdown from "@/Components/Default/Dropdown";
import NavLink from "@/Components/Default/NavLink";
import ResponsiveNavLink from "@/Components/Default/ResponsiveNavLink";
import { MdLogin, MdDashboard, MdOutlineHome, MdSearch } from "react-icons/md";
import { FaGithub } from "react-icons/fa";
import { Link } from "@inertiajs/inertia-react";
import DarkToggle from "@/Components/Homepage/DarkToggle";

export default function Guest({ children, auth }) {
  const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

  return (
    <div className="min-h-screen">
      <nav className="fixed bottom-0 z-10 w-full bg-white dark:bg-slate-900 dark:text-white md:shadow-lg lg:sticky lg:top-0">
        <div className="mx-auto w-full px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 lg:justify-center">
            <div className="flex w-full gap-2">
              <div className="shrink-1 flex w-full items-center lg:w-auto">
                <NavLink href={route("outer.main")} active={route().current("outer.main")}>
                  <MdOutlineHome className="m-1" size={24} />
                </NavLink>
              </div>

              <div className="flex w-full items-center lg:w-auto">
                <NavLink href={route("author.status")} active={route().current("author.status")}>
                  <MdSearch className="m-1" size={24} />
                </NavLink>
              </div>

              <div className="flex w-full items-center lg:w-auto">
                <NavLink href="/teams" active={route().current("outer.teams")}>
                  <FaGithub className="m-1" size={24} />
                </NavLink>
              </div>
            </div>

            <div className="hidden sm:ml-6 sm:items-center lg:flex">
              <div className="relative ml-3">
                {auth ? (
                  <Link href={route("dash.main")} method="get" as="button" className="mt-1">
                    <div className="avatar h-8 w-8">
                      <img
                        src={auth.image ? `/storage/images/${auth.image}` : "/storage/images/defaultavatar.png"}
                        className="rounded-full ring ring-primary ring-offset-2 ring-offset-base-100"
                      />
                    </div>
                  </Link>
                ) : (
                  <Dropdown>
                    <Dropdown.Trigger>
                      <span className="inline-flex rounded-md ">
                        <button
                          type="button"
                          className="inline-flex items-center rounded-md border border-transparent px-3 py-2 text-sm font-medium leading-4 text-base-100 transition duration-150 ease-in-out hover:text-black focus:outline-none dark:text-white">
                          <MdLogin size={24} className="text-black dark:text-white" />
                          <svg
                            className="ml-2 -mr-0.5 h-4 w-4 text-black"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor">
                            <path
                              fillRule="evenodd"
                              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </span>
                    </Dropdown.Trigger>
                    <Dropdown.Content>
                      <Dropdown.Link href={route("login")} method="get" as="button">
                        Masuk
                      </Dropdown.Link>
                      <Dropdown.Link href={route("register")} method="get" as="button">
                        Daftar
                      </Dropdown.Link>
                    </Dropdown.Content>
                  </Dropdown>
                )}
              </div>
            </div>

            <div className="-mr-2 flex items-center lg:hidden">
              <button
                onClick={() => setShowingNavigationDropdown(previousState => !previousState)}
                className="inline-flex items-center justify-center rounded-md p-2 transition duration-150 ease-in-out hover:bg-base-100 hover:text-black focus:bg-base-100 focus:text-black focus:outline-none">
                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  <path
                    className={!showingNavigationDropdown ? "inline-flex" : "hidden"}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                  <path
                    className={showingNavigationDropdown ? "inline-flex" : "hidden"}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className={(showingNavigationDropdown ? "block" : "hidden") + " lg:hidden"}>
          <div className="space-y-1 pt-2">
            {auth && (
              <ResponsiveNavLink href={route("dash.main")} active={route().current("dash.main")}>
                <MdDashboard className="m-1" />
                Dashboard
              </ResponsiveNavLink>
            )}
          </div>

          <div className="border-b border-neutral pt-2 pb-1">
            {auth ? (
              <div className="flex justify-end px-4">
                <Link
                  href={route("dash.main")}
                  method="get"
                  as="button"
                  className="flex flex-col items-center justify-center">
                  <div className="avatar h-10 w-10">
                    <img
                      src={auth.image ? `/storage/images/${auth.image}` : "/storage/images/defaultavatar.png"}
                      className="rounded-full ring ring-primary ring-offset-2 ring-offset-base-100"
                    />
                  </div>
                  <div>{auth.username}</div>
                </Link>
              </div>
            ) : (
              <>
                <div className="flex flex-col items-center justify-center gap-1">
                  <ResponsiveNavLink method="get" href={route("login")} as="button">
                    Masuk
                  </ResponsiveNavLink>
                </div>

                <div className="space-y-1">
                  <ResponsiveNavLink method="get" href={route("register")} as="button">
                    Daftar
                  </ResponsiveNavLink>
                </div>
              </>
            )}
          </div>
        </div>
      </nav>
      <main>{children}</main>
      <div className="fixed bottom-16 right-2 lg:right-6 lg:bottom-6">
        <DarkToggle />
      </div>
    </div>
  );
}
