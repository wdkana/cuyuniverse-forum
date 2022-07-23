import React, { useEffect, useState } from "react";
import Authenticated from "@/Layouts/Authenticated";
import { Head, usePage } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import { useForm } from "@inertiajs/inertia-react";
import NotificationAlert from "@/Components/Default/NotificationAlert";

export default function DashboardPage(props) {
    const { data, setData, progress, processing } = useForm({
        image: null,
        username: null,
    });

    const [username, setUsername] = useState(props.auth.user.username);

    const { flash } = usePage().props;
    const [showNotif, setShowNotif] = useState(false);

    useEffect(() => {
        if (flash.message) {
            setShowNotif(true);
        }
        return () => setShowNotif(false);
    }, [props]);

    function submit(e) {
        e.preventDefault();
        Inertia.post("/dashboard/photo", {
            image: data[0],
            token: props.auth.user.token,
        });
    }

    function handleChangeUsername(e) {
        setUsername(e.target.value);
    }

    function updateUsername(e) {
        e.preventDefault();
        setData({
            ...data,
            username: e.target.value,
        });
        Inertia.put("/dashboard/update-username", {
            username: username,
            token: props.auth.user.token,
        });
    }

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl leading-tight">
                    {props.title}
                </h2>
            }
        >
            <Head title={props.title} />
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                {showNotif && <NotificationAlert message={flash.message} />}
                {props.errors && (
                    <NotificationAlert message={props.errors.image} />
                )}
                <div className="flex flex-col lg:flex-row justify-center items-center w-full gap-6">
                    <div className="avatar online">
                        <div className="w-24 rounded-full ring ring-indigo-300 ring-offset-base-100 ring-offset-2">
                            <img
                                src={
                                    props.auth.user.image
                                        ? `/storage/images/${props.auth.user.image}`
                                        : "/storage/images/defaultavatar.png"
                                }
                            />
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <form onSubmit={submit}>
                            <input
                                className="input py-2 px-2 my-4 w-full"
                                type="file"
                                name="image"
                                onChange={(e) => setData(e.target.files)}
                            />
                            {progress && (
                                <progress value={progress.percentage} max="100">
                                    {progress.percentage}%
                                </progress>
                            )}
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-indigo-500 text-white py-3 w-full rounded-md"
                            >
                                Upload Avatar
                            </button>
                        </form>
                    </div>
                    <div>
                        <h1>
                            Untuk saat ini silahkan gunakan menubar yang ada
                            dibagian atas website ini untuk mengakses menu fitur
                            yang tersedia.
                        </h1>
                    </div>
                </div>
                <div className="flex flex-col my-[4rem]">
                    <form
                        className="flex flex-col gap-2"
                        onSubmit={updateUsername}
                    >
                        <div className="flex flex-col gap-2">
                            <label className="">Username</label>
                            <input
                                onChange={handleChangeUsername}
                                name="username"
                                type="text"
                                className="bg-gray-300 border-none rounded"
                                value={username}
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={processing}
                            className="flex-1 w-24 bg-indigo-500 text-white py-2 px-4 rounded-lg self-end"
                        >
                            Simpan
                        </button>
                    </form>
                </div>
            </div>
        </Authenticated>
    );
}
