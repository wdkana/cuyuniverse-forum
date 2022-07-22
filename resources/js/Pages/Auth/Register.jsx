import React, { useEffect } from 'react';
import Button from '@/Components/Default/Button';
import Guest from '@/Layouts/Guest';
import Input from '@/Components/Default/Input';
import Label from '@/Components/Default/Label';
import ValidationErrors from '@/Components/Default/ValidationErrors';
import { Head, Link, useForm } from '@inertiajs/inertia-react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('register'));
    };

    return (
        <Guest>
            <div className='p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 flex flex-col justify-center items-center'>
                <Head title="DAFTAR AKUN" />
                <div className='font-bold text-xl'>DAFTAR CUYUNIVERSE</div>
                <ValidationErrors errors={errors} />

                <form onSubmit={submit} className="w-full md:w-1/2">
                    <div>
                        <Label forInput="username" value="Username" className="" />

                        <Input
                            type="text"
                            name="username"
                            value={data.username}
                            className="mt-1 block w-full"
                            autoComplete="username"
                            isFocused={true}
                            handleChange={onHandleChange}
                            required
                        />
                    </div>

                    <div className="mt-4">
                        <Label forInput="email" value="Email" className="" />

                        <Input
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full"
                            autoComplete="email"
                            handleChange={onHandleChange}
                            required
                        />
                    </div>

                    <div className="mt-4">
                        <Label forInput="password" value="Password" className="" />

                        <Input
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full"
                            autoComplete="new-password"
                            handleChange={onHandleChange}
                            required
                        />
                    </div>

                    <div className="mt-4">
                        <Label forInput="password_confirmation" value="Confirm Password" className="" />

                        <Input
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="mt-1 block w-full"
                            handleChange={onHandleChange}
                            required
                        />
                    </div>

                    <div className="flex items-center justify-end mt-4">
                        <Link href={route('login')} className="underline text-sm">
                            Udah punya akun?
                        </Link>

                        <Button className="ml-4 hover:bg-indigo-800" processing={processing}>
                            Daftar
                        </Button>
                    </div>
                </form>
            </div>

        </Guest >
    );
}
