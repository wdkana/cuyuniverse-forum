import React, { useEffect } from 'react';
import Guest from '@/Layouts/Guest';
import ValidationErrors from '@/Components/Default/ValidationErrors';
import { Head, Link, useForm } from '@inertiajs/inertia-react';
import { MdLockOpen } from 'react-icons/md';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        username: '',
        password: '',
        remember: '',
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('login'));
    };

    return (
        <Guest>
            <Head title="MASUK AKUN" />
            <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        {/* <img
                            className="mx-auto h-12 w-auto"
                            src="logo gue"
                            alt="logo gue" /> */}
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Masuk CuyUniverse</h2>
                        <p className="mt-2 text-center text-sm text-gray-600">
                            Atau{' '}
                            <Link href={route('register')} as="button" className="font-medium text-indigo-600 hover:text-indigo-500">
                                daftar gratis disini
                            </Link>
                        </p>
                        {status && <div className="mb-4 font-medium text-sm">{status}</div>}
                        <ValidationErrors errors={errors} />
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={submit}>
                        <input type="hidden" name="remember" defaultValue="true" />
                        <div className="flex flex-col gap-2 rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="email-address" className="sr-only">
                                    Username
                                </label>
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    autoComplete="on"
                                    required
                                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Masukan Username"
                                    onChange={onHandleChange}
                                    value={data.username} />
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="on"
                                    required
                                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Password"
                                    onChange={onHandleChange}
                                    value={data.password} />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                    name="remember" value={data.remember} onChange={onHandleChange} />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                    Ingatkan saya
                                </label>
                            </div>

                            <div className="text-sm">
                                {canResetPassword && (
                                    <Link
                                        href={route('password.request')}
                                        className="font-medium text-indigo-600 hover:text-indigo-500">
                                        Lupa password?
                                    </Link>
                                )}
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                disabled={processing}>
                                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                    <MdLockOpen />
                                </span>
                                Masuk Akun
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Guest>
    );
}
