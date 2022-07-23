import React from 'react';
import Button from '@/Components/Default/Button';
import Guest from '@/Layouts/Guest';
import { Head, Link, useForm } from '@inertiajs/inertia-react';

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm();

    const submit = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    return (
        <Guest>
            <Head title="Email Verification" />
            <div className="alert alert-info shadow-lg">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current flex-shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <span className='text-white'> Thanks loh udah daftar di Cuy Universe, Sekarang coba di verifikasi dulu emailnya ya bro. Klik link yang udah kita kirim ke email kalian. Kalau belom dapet linknya, kita bakal kirim ulang konfirmasinya kok kalem.</span>
                </div>
                <div className="flex-none">
                    <form onSubmit={submit}>
                            <Link
                                href={route('logout')}
                                method="post"
                                as="button"
                                className="btn btn-sm btn-ghost"
                            >
                                Keluar
                            </Link>  

                            <Button processing={processing}>Kirim Ulang Verifikasi Email</Button>      
                    </form>
                </div>
            </div>
            {status === 'verification-link-sent' && (
                <div className="mb-4 font-medium text-sm">
                    Thanks udah daftar bro, silahkan dicek dan dibuka duls emailnya untuk konfirmasi pendaftaran di CUY UNIVERSE
                </div>
            )}
        </Guest>
    );
}
