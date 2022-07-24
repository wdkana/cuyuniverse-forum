import React, { useEffect, useState } from "react";
import Authenticated from "@/Layouts/Authenticated";
import { Head, Link, usePage } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import { useForm } from "@inertiajs/inertia-react";
import NotificationAlert from "@/Components/Default/NotificationAlert";

export default function SettingPage(props) {
  const { data, setData, progress, processing } = useForm({
    image: null,
    username: null
  });

  const [username, setUsername] = useState(props.auth.user.username);
  const [showNotif, setShowNotif] = useState(false);
  const { flash } = usePage().props;

  useEffect(() => {
    if (flash.message) {
      setShowNotif(true);
    }
    return () => setShowNotif(false);
  }, [props]);

  function handleChangeUsername(e) {
    setUsername(e.target.value);
  }

  function updateUsername(e) {
    e.preventDefault();
    setData({
      ...data,
      username: e.target.value
    });
    Inertia.put("/dashboard/update-username", { username: username, token: props.auth.user.token });
  }

  function updatePhoto(e) {
    e.preventDefault();
    Inertia.post("/dashboard/photo", { image: data[0], token: props.auth.user.token });
  }

  return (
    <Authenticated
      auth={props.auth}
      errors={props.errors}
      header={
        <div className="flex flex-row justify-between">
          <h2 className="font-semibold text-xl leading-tight cursor-default">{props.title}</h2>
          <Link
            href={route(`${props.nextRoute}`)}
            as="button"
            className="btn btn-sm btn-ghost rounded-md leading-tight"
          >
            {props.next}
          </Link>
        </div>
      }
    >
      <Head title="Notification" />
      {showNotif && <NotificationAlert message={flash.message} />}
      <div className="overflow-hidden sm:rounded-lg p-2 lg:p-10">
        <div className="divider w-full">Profile Picture</div>
        <div className="flex flex-col gap-6 items-center p-4 lg:gap-2">
          {props.errors && props.errors.username && <NotificationAlert message={props.errors.username} />}
          {props.errors && <NotificationAlert message={props.errors.image} />}
          <div className="flex flex-col justify-center items-center">
            <div className="avatar online">
              <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img
                  src={
                    props.auth.user.image
                      ? `/storage/images/${props.auth.user.image}`
                      : "/storage/images/defaultavatar.png"
                  }
                />
              </div>
            </div>
            <div className="flex flex-col justify-center items-center">
              <form onSubmit={updatePhoto} className="py-3">
                <input
                  className="block w-full text-lg file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary hover:file:bg-secondary file:cursor-pointer"
                  type="file"
                  name="image"
                  onChange={(e) => setData(e.target.files)}
                />
                {progress && (
                  <progress value={progress.percentage} max="100">
                    {progress.percentage}%
                  </progress>
                )}
                <button
                  type="submit"
                  disabled={processing}
                  className="btn w-full border-0 rounded-md mt-2 bg-primary hover:bg-secondary"
                >
                  Upload Avatar
                </button>
              </form>
            </div>
          </div>
          <div className="divider w-full">Profile Identity</div>
          <div className="flex justify-center w-full">
            <form onSubmit={updateUsername}>
              <label className="form-label font-semibold">username ✔</label>
              <input
                onChange={handleChangeUsername}
                name="username"
                type="text"
                className="w-full text-lg font-bold font-mono input input-bordered rounded-md"
                value={username}
              />
              <button
                type="submit"
                disabled={processing}
                className="btn w-full border-0 rounded-md mt-2 bg-primary hover:bg-secondary"
              >
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </Authenticated>
  );
}
