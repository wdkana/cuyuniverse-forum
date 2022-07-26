import React, { useEffect, useState } from "react";
import Authenticated from "@/Layouts/Authenticated";
import { Head, Link, usePage } from "@inertiajs/inertia-react";
import { useForm } from "@inertiajs/inertia-react";
import NotificationAlert from "@/Components/Default/NotificationAlert";

export default function ChangePassword(props) {
  const { data, setData, put, processing, reset } = useForm({
    oldPassword: "",
    newPassword: "",
    newPassword_confirmation: "",
    token: props.auth.user.token,
  });

  const [confirmUpdate, setConfirmUpdate] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const { flash } = usePage().props;

  useEffect(() => {
    if (flash.message) {
      setShowNotif(true);
    }

    return () => {
      reset("oldPassword", "newPassword", "newPassword_confirmation");
      setConfirmUpdate(false);
      setShowNotif(false);
    };
  }, [props]);

  function handleChange(e) {
    const name = e.target.getAttribute("name");

    if (name === "confirm") {
      return setConfirmUpdate(!confirmUpdate);
    }

    setData({
      ...data,
      [name]: e.target.value,
    });
  }

  function updatePassword(e) {
    e.preventDefault();
    put(route("dash.update.password"));
  }

  return (
    <Authenticated
      auth={props.auth}
      errors={props.errors}
      header={
        <div className="flex flex-row justify-between">
          <h2 className="font-semibold text-xl leading-tight cursor-default">{props.title}</h2>
          <Link href={route(`${props.nextRoute}`)} as="button" className="btn btn-sm btn-ghost rounded-md leading-tight">
            {props.next}
          </Link>
        </div>
      }
    >
      <Head title="Change Password" />
      {showNotif && <NotificationAlert message={flash.message} />}
      <div className="overflow-hidden sm:rounded-lg p-2 lg:p-10">
        <div className="flex flex-col gap-6 items-center p-4 lg:gap-2">
          {props.errors && props.errors.oldPassword && <NotificationAlert message={props.errors.oldPassword} />}
          {props.errors && props.errors.newPassword && <NotificationAlert message={props.errors.newPassword} />}
          <div className="flex justify-center w-full">
            <form onSubmit={updatePassword}>
              <div className="mb-2">
                <label className="form-label font-semibold">Old Password</label>
                <input
                  type="password"
                  name="oldPassword"
                  className="w-full text-lg text-black font-bold font-mono input input-bordered rounded-md dark:bg-slate-900 dark:text-white dark:placeholder-slate-100"
                  required
                  value={data.oldPassword}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-2">
                <label className="form-label font-semibold">New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  className="w-full text-lg font-bold font-mono input input-bordered rounded-md dark:bg-slate-900 dark:text-white dark:placeholder-slate-100"
                  required
                  value={data.newPassword}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-2">
                <label className="form-label font-semibold">New Password Confirmation</label>
                <input
                  type="password"
                  name="newPassword_confirmation"
                  required
                  className="w-full text-lg text-black font-bold font-mono input input-bordered rounded-md dark:bg-slate-900 dark:text-white dark:placeholder-slate-100" value={data.newPassword_confirmation}
                  onChange={handleChange}
                />
              </div>
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text text-black dark:text-white">Confirm change password.</span>
                  <input
                    type="checkbox"
                    name="confirm"
                    className="checkbox checkbox-primary"
                    required
                    checked={confirmUpdate}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <button type="submit" disabled={processing} className="btn w-full border-0 rounded-md mt-2 bg-primary text-primary-content hover:bg-secondary">
                Change
              </button>
            </form>
          </div>
        </div>
      </div>
    </Authenticated>
  );
}
