import React, { useEffect } from 'react';
import Button from '@/Components/Default/Button';
import Checkbox from '@/Components/Default/Checkbox';
import Guest from '@/Layouts/Guest';
import Input from '@/Components/Default/Input';
import Label from '@/Components/Default/Label';
import ValidationErrors from '@/Components/Default/ValidationErrors';
import { Head, Link, useForm } from '@inertiajs/inertia-react';

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
            <div className='p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 flex flex-col justify-center items-center'>
                <Head title="MASUK AKUN" />
                <div className='font-bold text-xl'>MASUK CUYUNIVERSE</div>
                {status && <div className="mb-4 font-medium text-sm">{status}</div>}

                <ValidationErrors errors={errors} />

                <form onSubmit={submit} className="w-full md:w-1/2">
                    <div>
                        <Label forInput="username" value="Username" />

                        <Input
                            type="text"
                            name={"username"}
                            value={data.username}
                            className="mt-1 block w-full"
                            autoComplete={"username"}
                            isFocused={true}
                            handleChange={onHandleChange}
                        />
                    </div>

                    <div className="mt-4">
                        <Label forInput="password" value="Password" />

                        <Input
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full"
                            autoComplete="current-password"
                            handleChange={onHandleChange}
                        />
                    </div>

                    <div className="block mt-4">
                        <label className="flex items-center">
                            <Checkbox name="remember" value={data.remember} handleChange={onHandleChange} />

                            <span className="ml-2 text-sm ">Remember me</span>
                        </label>
                    </div>

                    <div className="flex items-center justify-end mt-4">
                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="underline text-sm"
                            >
                                Lupa password?
                            </Link>
                        )}

                        <Button className="ml-4 hover:bg-indigo-800" processing={processing}>
                            Masuk
                        </Button>
                    </div>
                </form>
            </div>
        </Guest>
    );
}
