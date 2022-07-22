import React, { useState } from 'react';
import Dropdown from '@/Components/Default/Dropdown';
import NavLink from '@/Components/Default/NavLink';
import ResponsiveNavLink from '@/Components/Default/ResponsiveNavLink';
import { MdOutlineArticle, MdOutlineTrendingUp, MdOutlineLeaderboard, MdLogin, MdDashboard } from "react-icons/md"
import { Link } from '@inertiajs/inertia-react';

export default function Guest({ children, auth }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    return (
        <div className="min-h-screen">
            <nav className="md:shadow-lg">
                <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex gap-2">
                            <div className="shrink-1 flex items-center">
                                <NavLink href={route('outer.main')} active={route().current('outer.main')}>
                                    <MdOutlineTrendingUp className='m-1' />Trending
                                </NavLink>
                            </div>

                            <div className="flex items-center">
                                <NavLink href={route('outer.posts')} active={route().current('outer.posts')}>
                                    <MdOutlineArticle className='m-1' /> Postingan
                                </NavLink>
                            </div>

                            <div className="flex items-center">
                                <NavLink href={route('author.status')} active={route().current('author.status')}>
                                    <MdOutlineLeaderboard className='m-1' /> Pengguna
                                </NavLink>
                            </div>
                        </div>

                        <div className="hidden sm:flex sm:items-center sm:ml-6">
                            <div className="ml-3 relative">
                                {auth ?
                                    <Link href={route('dash.main')} method="get" as="button" className='mt-1'>
                                        <div className='avatar w-8 h-8'>
                                            <img src={auth.image ? `/storage/images/${auth.image}` : '/storage/images/defaultavatar.png'} className="rounded-full ring ring-primary ring-offset-base-100 ring-offset-2" />
                                        </div>
                                    </Link>
                                    :
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <span className="inline-flex rounded-md ">
                                                <button
                                                    type="button"
                                                    className="inline-flex items-center px-3 py-2 border border-transparent text-black text-sm leading-4 font-medium rounded-md hover:text-black focus:outline-none transition ease-in-out duration-150 "
                                                >
                                                    <MdLogin size={24} />
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
                                            <Dropdown.Link href={route('login')} method="get" as="button">
                                                Masuk
                                            </Dropdown.Link>
                                            <Dropdown.Link href={route('register')} method="get" as="button">
                                                Daftar
                                            </Dropdown.Link>
                                        </Dropdown.Content>
                                    </Dropdown>
                                }
                            </div>
                        </div>

                        <div className="-mr-2 flex items-center sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                className="inline-flex items-center justify-center p-2 rounded-md hover:text-black hover:bg-neutral focus:outline-none focus:bg-neutral focus:text-black transition duration-150 ease-in-out"
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
                    <div className="pt-2 space-y-1">
                        <ResponsiveNavLink href={route('author.status')} active={route().current('author.status')}>
                            <MdOutlineLeaderboard className='m-1' />Semua Pengguna
                        </ResponsiveNavLink>
                        {auth && <ResponsiveNavLink href={route('dash.main')} active={route().current('dash.main')}>
                            <MdDashboard className='m-1' />Dashboard
                        </ResponsiveNavLink>}
                    </div>

                    <div className="pt-2 pb-1 border-b border-neutral">
                        {auth ?
                            <div className="flex justify-end px-4">
                                <Link href={route('dash.main')} method="get" as="button" className='flex justify-center items-center flex-col'>
                                    <div className='avatar w-10 h-10'>
                                        <img src={auth.image ? `/storage/images/${auth.image}` : '/storage/images/defaultavatar.png'} className="rounded-full ring ring-primary ring-offset-base-100 ring-offset-2" />
                                    </div>
                                    <div>{auth.username}</div>
                                </Link>
                            </div>
                            :
                            <>
                                <div className="justify-center flex-col flex items-center gap-1">
                                    <ResponsiveNavLink method="get" href={route('login')} as="button">
                                        Masuk
                                    </ResponsiveNavLink>
                                </div>

                                <div className="space-y-1">
                                    <ResponsiveNavLink method="get" href={route('register')} as="button">
                                        Daftar
                                    </ResponsiveNavLink>
                                </div>
                            </>
                        }
                    </div>
                </div>
            </nav>
            <main>{children}</main>
        </div>
    );
}
