import React from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head } from '@inertiajs/inertia-react';

export default function DashboardPage(props) {
    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl leading-tight">{props.title}</h2>}
        >
            <Head title={props.title} />
            <div className='max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8'>
                <div className="flex flex-col md:flex-row w-full">
                    <h1>Untuk saat ini silahkan gunakan menubar yang ada dibagian atas website ini untuk mengakses menu fitur yang tersedia.</h1>
                </div>
            </div>
        </Authenticated>
    );
}
