import React from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Link, Head } from '@inertiajs/inertia-react';

export default function Dashboard(props) {
    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12 flex justify-center items-center">
                <div className='indicator'>
                    <span className={`indicator-item indicator-top indicator-center badge badge-inline`}>Feature #1</span>
                    <div className="max-w-2xl mx-auto sm:px-4 lg:px-6 rounded-lg bg-white border-b border-gray-200 shadow-lg">
                        <div className="flex flex-wrap justify-center items-stretch p-12 gap-2">
                            <Link href={route('form.news')} method="get" as="button" className='w-full lg:w-32 btn btn-outline'>Buat Berita</Link>
                            <Link href={route('my.news')} method="get" as="button" className='w-full lg:w-32 btn btn-outline'>Berita Saya</Link>
                            <button className='w-full lg:w-1/2 btn btn-outline'>Badge Saya <span className="ml-2 badge badge-sm badge-primary">Soon</span></button>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
