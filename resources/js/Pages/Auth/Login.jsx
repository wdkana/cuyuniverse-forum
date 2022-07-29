import React, {useEffect} from "react";
import Guest from "@/Layouts/Guest";
import ValidationErrors from "@/Components/Default/ValidationErrors";
import {Head, Link, useForm} from "@inertiajs/inertia-react";
import {MdLockOpen} from "react-icons/md";
import RenderIfTrue from "@/helper/RenderIfTrue";

export default function Login({status, canResetPassword}) {
  const {data, setData, post, processing, errors, reset} = useForm({
    username: "",
    password: "",
    remember: "",
  });

  useEffect(() => {
    return () => {
      reset("password");
    };
  }, []);

  const onHandleChange = event => {
    setData(event.target.name, event.target.type === "checkbox" ? event.target.checked : event.target.value);
  };

  const submit = e => {
    e.preventDefault();

    post(route("login"));
  };

  return (
    <Guest>
      <Head title="MASUK AKUN" />
      <div
        className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
        data-aos="fade-up"
        data-aos-duration="500">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2
              className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:!text-white"
              data-aos="fade-up-right"
              data-aos-duration="500">
              Masuk CuyUniverse
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600 dark:!text-white">
              Atau{" "}
              <Link
                href={route("register")}
                as="button"
                className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
                daftar gratis disini
              </Link>
            </p>
            <RenderIfTrue isTrue={status}>
              <div className="mb-4 text-sm font-medium">{status}</div>
            </RenderIfTrue>
            <ValidationErrors errors={errors} />
          </div>
          <form className="mt-8 space-y-6" onSubmit={submit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="flex flex-col gap-2 -space-y-px rounded-md shadow-sm">
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
                  className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-600 dark:bg-slate-900 dark:text-white dark:placeholder-slate-100 sm:text-sm"
                  placeholder="Masukan Username"
                  onChange={onHandleChange}
                  value={data.username}
                />
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
                  className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-600 dark:bg-slate-900 dark:text-white dark:placeholder-slate-100 sm:text-sm"
                  placeholder="Password"
                  onChange={onHandleChange}
                  value={data.password}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:bg-white"
                  name="remember"
                  value={data.remember}
                  onChange={onHandleChange}
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900 dark:text-white">
                  Ingatkan saya
                </label>
              </div>

              <div className="text-sm">
                <RenderIfTrue isTrue={canResetPassword}>
                  <Link
                    href={route("password.request")}
                    className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
                    Lupa password?
                  </Link>
                </RenderIfTrue>
              </div>
            </div>

            <div data-aos="fade-up-right" data-aos-duration="500">
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                disabled={processing}>
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
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
