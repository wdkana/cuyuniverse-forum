import React from "react";
import Guest from "@/Layouts/Guest";
import { Head, Link, useForm } from "@inertiajs/inertia-react";

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm();

    const submit = (e) => {
        e.preventDefault();

        post(route("verification.send"));
    };

    return (
        <Guest>
            <Head title="Email Verification" />
            <div className="flex p-4 m-2 lg:p-10 lg:m-8 min-h-screen">
                <div className="flex flex-col w-full justify-center items-center">
                    <div className="mb-4 text-lg lg:text-2xl">
                        Thanks loh udah daftar di Cuy Universe, Sekarang coba di verifikasi dulu emailnya ya bro. Klik
                        link yang udah kita kirim ke email kalian. Kalau belom dapet linknya, kita bakal kirim ulang
                        konfirmasinya kok kalem.
                    </div>

                    {status === "verification-link-sent" && (
                        <div className="mb-4 font-medium text-xl">
                            Thanks udah daftar bro, silahkan dicek dan dibuka duls emailnya untuk konfirmasi pendaftaran
                            di CUY UNIVERSE
                        </div>
                    )}

                    <form onSubmit={submit}>
                        <div className="mt-4 flex flex-col items-center justify-center gap-4">
                            <button
                                disabled={processing}
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Kirim Ulang Verifikasi Email
                            </button>

                            <Link href={route("logout")} method="post" as="button" className="underline text-lg">
                                Keluar
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </Guest>
    );
}
