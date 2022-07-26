import React, { useState } from 'react';
import Dropdown from '@/Components/Default/Dropdown';
import NavLink from '@/Components/Default/NavLink';
import ResponsiveNavLink from '@/Components/Default/ResponsiveNavLink';
import DarkToggle from '@/Components/Homepage/DarkToggle';
import { MdOutlineHome, MdSearch } from 'react-icons/md';
import { FaGithub } from "react-icons/fa"

export default function Authenticated({ auth, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    return (
        <div className="min-h-screen dark:text-white">
            <nav className="md:shadow-lg fixed bottom-0 border-t-base-200 border-2 lg:top-0 lg:sticky z-10 w-full bg-white dark:text-white dark:bg-slate-900">
                <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="flex gap-2">
                                <div className="shrink-1 flex items-center">
                                    <NavLink
                                        href={route("outer.main")}
                                        active={route().current("outer.main")}
                                    >
                                        <MdOutlineHome className="m-1" size={24} />
                                    </NavLink>
                                </div>

                                <div className="flex items-center">
                                    <NavLink
                                        href={route("author.status")}
                                        active={route().current("author.status")}
                                    >
                                        <MdSearch className="m-1" size={24} />
                                    </NavLink>
                                </div>

                                <div className="flex items-center">
                                    <NavLink href="/teams" active={route().current("outer.teams")}>
                                        <FaGithub className="m-1" size={24} />
                                    </NavLink>
                                </div>
                            </div>
                        </div>

                        <div className="hidden sm:flex sm:items-center sm:ml-6">
                            <div className="ml-3 relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex">
                                            <button
                                                type="button"
                                                className="inline-flex items-center py-2 border border-transparent text-sm leading-4 font-medium hover:text-black focus:outline-none transition ease-in-out duration-150"
                                            >
                                                <div className='avatar w-10 h-10 mr-2'>
                                                    <img src={auth.user.image ? `/storage/images/${auth.user.image}` : '/storage/images/defaultavatar.png'} className=" rounded-full ring ring-primary ring-offset-base-100 ring-offset-2" />
                                                </div>
                                                {auth.user.username}

                                                <svg
                                                    className="ml-2 -mr-0.5 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
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
                                        <Dropdown.Link href={route('dash.main')} active={route().current('dash.main')} as="button" method="get">
                                            Dashboard
                                        </Dropdown.Link>
                                        <Dropdown.Link href={route('dash.notif')} active={route().current('dash.notif')} as="button" method="get">
                                            Notification
                                        </Dropdown.Link>
                                        <Dropdown.Link href={route('posts.main')} active={route().current('posts.main')} as="button" method="get">
                                            Manage Post
                                        </Dropdown.Link>
                                        <Dropdown.Link href={route('dash.saved.post')} active={route().current('dash.saved.post')} as="button" method="get">
                                            Saved Post
                                        </Dropdown.Link>
                                        <Dropdown.Link href={route('dash.stats')} active={route().current('dash.stats')} as="button" method="get">
                                            Statistics
                                        </Dropdown.Link>
                                        <Dropdown.Link href={route('dash.setting.profile')} method="get" as="button" active={route().current('dash.setting.profile')}>
                                            Setting
                                        </Dropdown.Link>
                                        <Dropdown.Link href={route('logout')} method="post" as="button">
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-mr-2 flex items-center sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                className="inline-flex items-center justify-center p-2 rounded-md hover:text-base-100 hover:bg-base-content focus:outline-none focus:bg-base-content focus:text-base-100 transition duration-150 ease-in-out"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path
                                        className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
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

                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink href={route('dash.main')} active={route().current('dash.main')}>
                            Dashboard
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('posts.main')} active={route().current('posts.main')}>
                            Manage Post
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('dash.saved.post')} active={route().current('dash.saved.post')}>
                            Saved Post
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('dash.notif')} active={route().current('dash.notif')}>
                            Notification
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('dash.stats')} active={route().current('dash.stats')}>
                            Statistics
                        </ResponsiveNavLink>
                    </div>

                    <div className="pt-4 pb-1 border-b border-base-100">
                        <div className="px-4 justify-center flex-col flex items-center gap-1">
                            <div className="w-16 rounded-full">
                                <div className='avatar w-16 h-16 mr-2'>
                                    <img src={auth.user.image ? `/storage/images/${auth.user.image}` : '/storage/images/defaultavatar.png'} className=" rounded-full ring ring-primary ring-offset-base-100 ring-offset-2" />
                                </div>
                            </div>
                            <div className="font-medium text-base badge badge-inline"><i>{auth.user.username}</i></div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('dash.setting.profile')} active={route().current('dash.setting.profile')} as="button">
                                Setting
                            </ResponsiveNavLink>
                            <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                    <div className='divider'></div>
                </div>
            </nav>

            {header && (
                <header>
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                </header>
            )}

            <main>{children}</main>

            <div className="fixed right-6 bottom-6">
                <DarkToggle />
            </div>
        </div>
    );
}
