import React, { useState } from 'react';
import ApplicationLogo from '@/Components/Default/ApplicationLogo';
import Dropdown from '@/Components/Default/Dropdown';
import NavLink from '@/Components/Default/NavLink';
import ResponsiveNavLink from '@/Components/Default/ResponsiveNavLink';
import { Link } from '@inertiajs/inertia-react';
import Avatar from 'avataaars';

export default function Authenticated({ auth, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="min-h-screen">
            <nav className="md:shadow-lg bg-neutral">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="shrink-0 flex items-center">
                                <Link href="/">
                                    <ApplicationLogo className="block h-9 w-auto " />
                                </Link>
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                                <NavLink href={route('dash.main')} active={route().current('dash.main')}>
                                    Dashboard
                                </NavLink>
                            </div>
                        </div>

                        <div className="hidden sm:flex sm:items-center sm:ml-6">
                            <div className="ml-3 relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md ">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md hover:text-white focus:outline-none transition ease-in-out duration-150 "
                                            >
                                                <div className="w-10 rounded-full">
                                                    <Avatar style={{ width: '100%', height: '100%' }}
                                                        avatarStyle='Circle'
                                                        topType='WinterHat3'
                                                        accessoriesType='Prescription02'
                                                        hatColor='Red'
                                                        facialHairType='BeardMedium'
                                                        facialHairColor='Red'
                                                        clotheType='BlazerSweater'
                                                        eyeType='WinkWacky'
                                                        eyebrowType='RaisedExcited'
                                                        mouthType='Smile'
                                                        skinColor='Light'
                                                    />
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
                                className="inline-flex items-center justify-center p-2 rounded-md hover:text-white hover:bg-neutral focus:outline-none focus:bg-neutral focus:text-white transition duration-150 ease-in-out"
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
                    </div>

                    <div className="pt-4 pb-1 border-t border-neutral">
                        <div className="px-4 justify-center flex-col flex items-center gap-1">
                            <div className="w-10 rounded-full">
                                <Avatar style={{ width: '100%', height: '100%' }}
                                    avatarStyle='Circle'
                                    topType='WinterHat3'
                                    accessoriesType='Prescription02'
                                    hatColor='Red'
                                    facialHairType='BeardMedium'
                                    facialHairColor='Red'
                                    clotheType='BlazerSweater'
                                    eyeType='WinkWacky'
                                    eyebrowType='RaisedExcited'
                                    mouthType='Smile'
                                    skinColor='Light'
                                />
                            </div>
                            <div className="font-medium text-base badge badge-inline"><i>{auth.user.username}</i></div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header>
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}
