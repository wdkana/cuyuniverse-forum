import React, { useEffect, useState } from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head, Link, usePage } from '@inertiajs/inertia-react';
import NotificationAlert from '@/Components/Default/NotificationAlert';
import CreatePost from '@/Components/Dashboard/CreatePost';
import { MdSettings } from 'react-icons/md';
export default function DashboardPage(props) {
    const { flash } = usePage().props
    const [showNotif, setShowNotif] = useState(false)

    useEffect(() => {
        if (flash.message) {
            setShowNotif(true)
        }
        return () => setShowNotif(false)
    }, [props])

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<div className="font-semibold text-sm dark:text-white">
                Your profile
                <Link href={route('dash.setting.profile')} as="button" method="get" className='btn btn-ghost btn-sm'>
                    ({props.auth.user.username} <MdSettings />)
                </Link>
            </div>}
        >
            <Head title={props.title} />
            {showNotif && <NotificationAlert message={flash.message} />}
            <div className='pb-32 lg:pb-2'>
                <CreatePost props={props} />
            </div>
        </Authenticated>
    );
}
