import React from "react";
import Button from "@/Components/Default/Button";
import Guest from "@/Layouts/Guest";
import Input from "@/Components/Default/Input";
import ValidationErrors from "@/Components/Default/ValidationErrors";
import { Head, useForm } from "@inertiajs/inertia-react";

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
    });

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route("password.email"));
    };

    return (
        <Guest>
            <Head title="Forgot Password" />
            <div className="mb-4 text-sm leading-normal">
                Lupa password? kalem aja coba masukin email lu dan kita bakal kirim link konfirmasi reset password
                supaya lu bisa set ulang passwordnya.
            </div>

            {status && <div className="mb-4 font-medium text-sm text-indigo-800">{status}</div>}

            <ValidationErrors errors={errors} />

            <form onSubmit={submit}>
                <Input
                    type="email"
                    name="email"
                    value={data.email}
                    className="mt-1 block w-full"
                    isFocused={true}
                    placeholder="contoh: emailkamu@uhuy.com"
                    handleChange={onHandleChange}
                />

                <div className="flex items-center justify-end mt-4">
                    <Button className="ml-4 hover:bg-indigo-800" processing={processing}>
                        Email Password Reset Link
                    </Button>
                </div>
            </form>
        </Guest>
    );
}
