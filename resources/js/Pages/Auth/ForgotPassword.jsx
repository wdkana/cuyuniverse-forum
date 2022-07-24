import React from "react";
import Guest from "@/Layouts/Guest";
import ValidationErrors from "@/Components/Default/ValidationErrors";
import { Head, Link, useForm } from "@inertiajs/inertia-react";
import { MdAccountCircle } from "react-icons/md";

export default function ForgotPassword({ status }) {
  const { data, setData, post, processing, errors } = useForm({
    email: ""
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
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="mb-4 text-sm leading-normal">
            Lupa password? kalem aja coba masukin email lu dan kita bakal kirim link konfirmasi reset password supaya lu
            bisa set ulang passwordnya.
          </div>
          {status && <div className="mb-4 font-medium text-sm text-indigo-800">{status}</div>}

          <ValidationErrors errors={errors} />
          <div className="text-sm">
            <Link href={route("login")} className="font-medium text-indigo-600 hover:text-indigo-500">
              atau login disini
            </Link>
          </div>
          <form onSubmit={submit} className="mt-8 space-y-6">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="on"
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="email address"
              onChange={onHandleChange}
              value={data.email}
            />

            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={processing}
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <MdAccountCircle />
              </span>
              Email password reset link
            </button>
          </form>
        </div>
      </div>
    </Guest>
  );
}
