import React, { useEffect, useState } from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head, Link, usePage } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';
import { useForm } from '@inertiajs/inertia-react'
import NotificationAlert from '@/Components/Default/NotificationAlert';

export default function SettingPage(props) {
  const { data, setData, progress, processing } = useForm({
    image: null,
    username: null
  });

  const [username, setUsername] = useState(props.auth.user.username);
  const [showNotif, setShowNotif] = useState(false)
  const { flash } = usePage().props

  useEffect(() => {
    if (flash.message) {
      setShowNotif(true)
    }
    return () => setShowNotif(false)
  }, [props])

  function handleChangeUsername(e) {
    setUsername(e.target.value)
  }

  function updateUsername(e) {
    e.preventDefault();
    setData({
      ...data,
      username: e.target.value
    });
    Inertia.put('/dashboard/update-username', { username: username, token: props.auth.user.token })
  }

  function updatePhoto(e) {
    if (e.target.files[0]) {
      Inertia.post('/dashboard/photo', { image: e.target.files[0], token: props.auth.user.token })
    }
  }

  return (
    <Authenticated
      auth={props.auth}
      errors={props.errors}
      header={<div className='flex flex-row justify-between dark:text-white'>
        <h2 className="font-semibold text-xl leading-tight cursor-default">{props.title}</h2>
        <Link href={route(`${props.nextRoute}`)} as="button" className="btn btn-sm btn-ghost rounded-md leading-tight">{props.next}</Link>
      </div>}
    >
      <Head title="Notification" />
      {showNotif && <NotificationAlert message={flash.message} />}
      <div className="overflow-hidden sm:rounded-lg p-2 lg:p-10">
        <div className='flex flex-col gap-6 items-center p-4 lg:gap-2'>
          {props.errors && props.errors.username && <NotificationAlert message={props.errors.username} />}
          {props.errors && <NotificationAlert message={props.errors.image} />}
          <div className='flex flex-col justify-center items-center'>
            <div className="avatar online">
              <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src={props.auth.user.image ? `/storage/images/${props.auth.user.image}` : '/storage/images/defaultavatar.png'} />
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" onClick={e => document.querySelector('[name="image"]').click()}><path d="M384 352v64c0 17.67-14.33 32-32 32H96c-17.67 0-32-14.33-32-32v-64c0-17.67-14.33-32-32-32s-32 14.33-32 32v64c0 53.02 42.98 96 96 96h256c53.02 0 96-42.98 96-96v-64c0-17.67-14.33-32-32-32S384 334.3 384 352zM201.4 9.375l-128 128c-12.51 12.51-12.49 32.76 0 45.25c12.5 12.5 32.75 12.5 45.25 0L192 109.3V320c0 17.69 14.31 32 32 32s32-14.31 32-32V109.3l73.38 73.38c12.5 12.5 32.75 12.5 45.25 0s12.5-32.75 0-45.25l-128-128C234.1-3.125 213.9-3.125 201.4 9.375z" /></svg>
              </div>
            </div>
            <div className='flex flex-col justify-center items-center'>
              <form className="hidden">
                <input className="block w-full text-lg file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary hover:file:bg-secondary file:cursor-pointer" type="file" name="image" onChange={updatePhoto} />
              </form>
            </div>
          </div>
          <div className='divider w-full dark:text-white dark:before:bg-slate-700 dark:after:bg-slate-700'>Profile Identity</div>
          <div className='flex justify-center w-full '>
            <form onSubmit={updateUsername}>
              <label className="form-label font-semibold dark:text-white">username ✔</label>
              <input onChange={handleChangeUsername} name='username' type="text" className="w-full text-lg font-bold font-mono input input-bordered rounded-md bg-base-100 dark:bg-slate-900 dark:text-white dark:placeholder-slate-100" value={username} />
              <button type='submit' disabled={processing} className='btn w-full border-0 rounded-md mt-2 bg-primary hover:bg-secondary text-primary-content'>Update</button>
            </form>
          </div>
          <div className='divider w-full dark:text-white dark:before:bg-slate-700 dark:after:bg-slate-700'>Security</div>
          <Link
            as="button"
            href={route('dash.change.password')}
            className="btn w-full sm:w-1/2 lg:w-1/3 border-0 rounded-md mt-2 bg-primary text-primary-content hover:bg-secondary"
          >
            Change Password
          </Link>
        </div>
      </div>
    </Authenticated>
  );
}
