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
        Inertia.post("/dashboard/photo", { image: data[0], token: props.auth.user.token });
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
        Inertia.put("/dashboard/update-username", { username: username, token: props.auth.user.token });
    }

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl leading-tight">{props.title}</h2>}
        >
            <Head title={props.title} />
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <div className="alert alert-info shadow-lg text-white">
                    <div>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="stroke-current flex-shrink-0 w-6 h-6"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            ></path>
                        </svg>
                        <span>
                            Untuk saat ini silahkan gunakan menubar yang ada dibagian atas website ini untuk mengakses
                            menu fitur yang tersedia.
                        </span>
                    </div>
                </div>
                {showNotif && <NotificationAlert message={flash.message} />}
                {props.errors && props.errors.username && <NotificationAlert message={props.errors.username} />}
                {props.errors && <NotificationAlert message={props.errors.image} />}
                <div className="flex flex-col justify-center items-center w-full gap-6 mt-5">
                    <div className="avatar online">
                        <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
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
                                className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-sky-50 file:text-sky-500hover:file:bg-violet-100"
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
                                className="btn text-white w-full rounded-md mt-2 bg-sky-600 hover:bg-sky-700"
                            >
                                Upload Avatar
                            </button>
                        </form>
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center mt-3">
                    <form onSubmit={updateUsername}>
                        <div className="form-group float-left">
                            <label className="form-label">Username</label>
                            <input
                                onChange={handleChangeUsername}
                                name="username"
                                type="text"
                                className="form-control input input-bordered input-info w-full max-w-xs"
                                value={username}
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={processing}
                            className="btn  text-white  bg-sky-600 hover:bg-sky-700 float-right  mt-6 ml-2"
                        >
                            Simpan
                        </button>
                    </form>
                </div>
            </div>
        </Authenticated>
    );
}
