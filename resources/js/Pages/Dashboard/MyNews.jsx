import React, { useState } from 'react';

import Authenticated from '@/Layouts/Authenticated';
import { Head, Link } from '@inertiajs/inertia-react';
import { usePage } from '@inertiajs/inertia-react'
import { formatTime, randomBadgeColor } from '@/utils/jsHelper';
import { Inertia } from '@inertiajs/inertia';

const newsNotification = (text) => {
  return (
    <div className="alert alert-sm bg-base-300 shadow-lg">
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current flex-shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        <span>{text}</span>
      </div>
    </div>
  )
}

export default function MyNews(props) {
  const { flash } = usePage().props
  const [wantRemove, setWantRemove] = useState(false)
  console.log(props)
  const handleRemoveConfirmation = () => {
    setWantRemove(true)
  }

  const removeNews = (id) => {
    const data = {
      id: id
    }
    Inertia.post('/dashboard/news/delete', data)
    return setWantRemove(false)
  }



  return (
    <Authenticated
      auth={props.auth}
      errors={props.errors}
      header={
        <div className='flex flex-row justify-between'>
          <h2 className="font-semibold text-xl leading-tight cursor-default">{props.page}</h2>
          <Link href={`${route(props.nextRoute)}`} method="get" as="button" className="btn btn-sm btn-link leading-tight">{props.next}</Link>
        </div>
      }
    >
      <Head title="Dashboard" />
      <div className='flex flex-col justify-center items-center lg:flex-row lg:flex-wrap lg:items-stretch p-4 gap-6'>
        {flash.message && newsNotification(flash.message)}
        {props.data.length > 0 ? props.data.map((news, i) => {
          return (
            <div key={i} className="card w-full sm:w-96 bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">{news.title} <div className={`badge ${randomBadgeColor()}`}>{news.category.toUpperCase()}</div></h2>
                <p className='text-sm'>{news.description}</p>
                <div className="card-actions justify-between">
                  <div className="badge badge-outline">{formatTime(news.updated_at)}</div>
                  <label onClick={() => handleRemoveConfirmation()} className="cursor-pointer badge badge-outline modal-button" htmlFor={`my-modal-${news.id}`}>remove</label>
                  {wantRemove &&
                    <>
                      <input type="checkbox" id={`my-modal-${news.id}`} className="modal-toggle" />
                      <div className="modal">
                        <div className="modal-box">
                          <h3 className="font-bold text-lg">Hapus Postingan </h3>
                          <p className="py-4">Kamu yakin ingin menghapus postingan <b>{news.title}</b>?</p>
                          <div className="modal-action">
                            <label htmlFor={`my-modal-${news.id}`} className="btn btn-outline" onClick={() => removeNews(news.id)}>Ya Hapus</label>
                            <label htmlFor={`my-modal-${news.id}`} className="btn btn-inline">Gak</label>
                          </div>
                        </div>
                      </div>
                    </>
                  }
                </div>
              </div>
            </div>
          )
        }) : <div className='text-center'>
          <p className='font-bold text-2xl'>
            kamu belum membuat berita
          </p>
          <Link href={
            route('form.news')} as="button" className='btn btn-link'>Buat Berita Sekarang</Link>
        </div>}
      </div>
    </Authenticated >
  );
}
