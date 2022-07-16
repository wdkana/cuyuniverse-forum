import React from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/inertia-react';
import Navbar from '@/Components/Homepage/Navbar';

export default function Guest({ children }) {
    return (
        <div>
            <Navbar user={null} title="Cuy Universe" />
            <div className="min -h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 ">
                <div>
                    <Link href="/">
                        <ApplicationLogo className="w-20 h-20 fill-current text-white" />
                    </Link>
                </div>

                <div className="w-full sm:max-w-md mt-6 bg-base-300 px-6 py-4 shadow-md overflow-hidden sm:rounded-lg">
                    {children}
                </div>
            </div>
        </div>
    );
}
