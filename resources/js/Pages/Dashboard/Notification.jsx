import React from "react";
import Authenticated from "@/Layouts/Authenticated";
import { Head, Link } from "@inertiajs/inertia-react";

export default function NotificationPage(props) {

    const markNotificationAsRead = (notificationId) => {
        // return Inertia.get('/dashboard/mark-notification-as-read/' + notificationId);
    }

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={
                <div className="flex flex-row justify-between">
                    <h2 className="font-semibold text-xl leading-tight cursor-default">
                        {props.page}
                    </h2>
                    <Link
                        href={route(`${props.nextRoute}`)}
                        as="button"
                        className="btn btn-sm btn-ghost leading-tight"
                    >
                        {props.next}
                    </Link>
                </div>
            }
        >
            <Head title="Notification" />
            <div className="overflow-hidden shadow-sm sm:rounded-lg p-4">
                {/* <div className='flex flex-col justify-center items-center lg:flex-row lg:flex-wrap lg:items-center gap-4'> */}
                <div className="flex flex-col justify-center items-center lg:flex-col lg:flex-wrap gap-4">
                    {(props.notifications.length > 0) ? props.notifications.map((notification, index) => (
                        <div className="card w-full p-5 md:w-1/2 lg:w-1/3 xl:w-1/3 bg-base-100 shadow-lg dark:text-black" key={index}>
                            {(notification.data.type === 'comment') ? (
                                <Link onClick={() => markNotificationAsRead(notification.id)} href={route("outer.byId", [notification.data.post_id])}>
                                    <b>{notification.data.commentartor}</b> mengomentari postingan Anda <i> "{notification.data.description}"</i>
                                </Link>
                            ) : (notification.data.type === 'like') ? (
                                <Link onClick={() => markNotificationAsRead(notification.id)} href={route("outer.byId", [notification.data.post_id])}>
                                    <b>{notification.data.user_like}</b> menyukai postingan Anda
                                </Link>
                            ) : (notification.data.type === 'mention') ? (
                                <Link onClick={() => markNotificationAsRead(notification.id)} href={route("outer.byId", [notification.data.post_id])}>
                                    <b>{notification.data.from}</b> telah mentioned Anda
                                </Link>
                            ) : (<></>)}
                        </div>
                    )) : (
                        <h1>Tidak ada notifikasi</h1>
                    )}
                </div>
            </div>
        </Authenticated>
    );
}
