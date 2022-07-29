import React from "react";
import Guest from "@/Layouts/Guest";
import {Head, Link, useForm} from "@inertiajs/inertia-react";

export default function VerifyEmail({status}) {
  const {post, processing} = useForm();

  const submit = e => {
    e.preventDefault();

    post(route("verification.send"));
  };

  return (
    <Guest>
      <Head title="Email Verification" />
      <div className="m-2 flex min-h-screen p-4 lg:m-8 lg:p-10">
        <div className="flex w-full flex-col items-center justify-center">
          <div className="mb-4 text-lg lg:text-2xl">
            Thanks loh udah daftar di Cuy Universe, Sekarang coba di verifikasi dulu emailnya ya bro. Klik link yang
            udah kita kirim ke email kalian. Kalau belom dapet linknya, kita bakal kirim ulang konfirmasinya kok kalem.
          </div>

          {status === "verification-link-sent" && (
            <div className="mb-4 text-xl font-medium">
              Thanks udah daftar bro, silahkan dicek dan dibuka duls emailnya untuk konfirmasi pendaftaran di CUY
              UNIVERSE
            </div>
          )}

          <form onSubmit={submit}>
            <div className="mt-4 flex flex-col items-center justify-center gap-4">
              <button
                disabled={processing}
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                Kirim Ulang Verifikasi Email
              </button>

              <Link href={route("logout")} method="post" as="button" className="text-lg underline">
                Keluar
              </Link>
            </div>
          </form>
        </div>
      </div>
    </Guest>
  );
}
