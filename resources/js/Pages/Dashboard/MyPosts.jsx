import React, { useEffect, useState } from "react";

import Authenticated from "@/Layouts/Authenticated";
import { Head, Link } from "@inertiajs/inertia-react";
import { usePage } from "@inertiajs/inertia-react";
import { formatTime } from "@/utils/jsHelper";
import { Inertia } from "@inertiajs/inertia";
import NotificationAlert from "@/Components/Default/NotificationAlert";
import { TbTrashX } from "react-icons/tb";

export default function MyPosts(props) {
    const { flash } = usePage().props;
    const [wantRemove, setWantRemove] = useState(false);
    const [showNotif, setShowNotif] = useState(false);

    const handleRemoveConfirmation = () => {
        return setWantRemove(true);
    };

    useEffect(() => {
        if (flash.message) {
            setShowNotif(true);
        }
        return () => setShowNotif(false);
    }, [props]);

    const removePosts = (id) => {
        const data = {
            id: id,
            token: props.auth.user.token,
        };
        Inertia.post("/dashboard/manage-posts/posts/delete", data);
        return setWantRemove(false);
    };

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={
                <div className="flex flex-row justify-between dark:text-white">
                    <h2 className="font-semibold text-xl leading-tight cursor-default">
                        {props.page}
                    </h2>
                    <Link
                        href={`${route(props.nextRoute)}`}
                        method="get"
                        as="button"
                        className="btn btn-sm btn-ghost leading-tight"
                    >
                        {props.next}
                    </Link>
                </div>
            }
        >
            <Head title="Dashboard" />
            <div className="flex flex-col justify-center items-center lg:flex-row lg:flex-wrap lg:items-strech py-6 px-4 gap-6">
                {showNotif && <NotificationAlert message={flash.message} />}
                {props.data.length > 0 ? (
                    props.data.map((posts, i) => {
                        return (
                            <div
                                key={i}
                                className="card w-full md:w-1/2 lg:w-1/3 xl:w-1/3 bg-base-100 dark:bg-slate-700 shadow-lg cursor-pointer transition-all duration-300 hover:delay-75 dark:hover:bg-gray-600 dark:text-white hover:-translate-y-1 hover:bg-neutral"
                            >
                                <div className="card-body">
                                    <Link
                                        href={`/post/${posts.id}`}
                                        method="get"
                                        as="div"
                                        className="card-title"
                                    >
                                        <p
                                            className={`cursor-pointer hover:-translate-y-1 transition-all duration-300 text-xl text-left ${posts.description.length > 100
                                                ? "break-normal overflow-x-hidden"
                                                : "break-words"
                                                } h-20`}
                                        >
                                            {posts.description}
                                        </p>
                                    </Link>
                                    <div className="card-actions justify-between">
                                        <div className="text-xs">
                                            posted{" "}
                                            {formatTime(posts.updated_at)} |{" "}
                                            {posts.comments.length} comment
                                        </div>
                                        <label
                                            onClick={() =>
                                                handleRemoveConfirmation()
                                            }
                                            className="btn btn-ghost cursor-pointer hover:bg-base-300 hover:rounded-md modal-button"
                                            htmlFor={`my-modal-${posts.id}`}
                                        >
                                            <TbTrashX size={20} />
                                        </label>
                                        {wantRemove && (
                                            <>
                                                <input
                                                    type="checkbox"
                                                    id={`my-modal-${posts.id}`}
                                                    className="modal-toggle"
                                                />
                                                <div className="modal">
                                                    <div className="modal-box">
                                                        <h3 className="font-bold text-lg">
                                                            Hapus Postingan{" "}
                                                        </h3>
                                                        <p className="py-4">
                                                            Kamu yakin ingin
                                                            menghapus postingan{" "}
                                                            <b>{posts.title}</b>
                                                            ?
                                                        </p>
                                                        <div className="modal-action">
                                                            <label
                                                                htmlFor={`my-modal-${posts.id}`}
                                                                className="btn btn-outline rounded-md"
                                                                onClick={() =>
                                                                    removePosts(
                                                                        posts.id
                                                                    )
                                                                }
                                                            >
                                                                Ya Hapus
                                                            </label>
                                                            <label
                                                                htmlFor={`my-modal-${posts.id}`}
                                                                className="btn btn-inline rounded-md"
                                                            >
                                                                Gak
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="text-center dark:text-white">
                        <p className="font-bold text-2xl">
                            kamu belum punya postingan
                        </p>
                        <Link
                            href={`${route(props.nextRoute)}`}
                            method="get"
                            as="button"
                            className="btn btn-ghost rounded-md"
                        >
                            Post Sekarang!
                        </Link>
                    </div>
                )}
            </div>
        </Authenticated>
    );
}
