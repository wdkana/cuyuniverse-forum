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

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <Link href={route('form.news')} method="get" as="button" className='btn btn-outline m-2'>Buat Berita</Link>
                            <Link href={route('my.news')} method="get" className='btn btn-outline m-2'>Berita Saya</Link>
                            <button className='btn btn-outline m-2'>Badge Saya <span className="badge badge-sm badge-primary ml-2">Soon</span></button>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
