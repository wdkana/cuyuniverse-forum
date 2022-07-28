import React from "react";
import Guest from "@/Layouts/Guest";
import ValidationErrors from "@/Components/Default/ValidationErrors";
import {Head, Link, useForm} from "@inertiajs/inertia-react";
import {MdAccountCircle} from "react-icons/md";

export default function ForgotPassword({status}) {
  const {data, setData, post, processing, errors} = useForm({
    email: "",
  });

  const onHandleChange = event => {
    setData(event.target.name, event.target.value);
  };

  const submit = e => {
    e.preventDefault();

    post(route("password.email"));
  };

  return (
    <Guest>
      <Head title="Forgot Password" />
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="mb-4 text-sm leading-normal">
            Lupa password? kalem aja coba masukin email lu dan kita bakal kirim link konfirmasi reset password supaya lu
            bisa set ulang passwordnya.
          </div>
          {status && <div className="mb-4 text-sm font-medium text-indigo-800">{status}</div>}

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
              className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-600 dark:bg-slate-900 dark:text-white dark:placeholder-slate-100 sm:text-sm"
              placeholder="email address"
              onChange={onHandleChange}
              value={data.email}
            />

            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              disabled={processing}>
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
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
