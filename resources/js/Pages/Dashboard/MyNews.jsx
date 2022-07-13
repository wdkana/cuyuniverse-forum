import React from 'react';

import Authenticated from '@/Layouts/Authenticated';
import { Head } from '@inertiajs/inertia-react';
import { usePage } from '@inertiajs/inertia-react'
import { formatTime, randomBadgeColor } from '@/utils/jsHelper';

const newsNotification = (text) => {
  return (
    <div className="alert alert-info shadow-lg">
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current flex-shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        <span>{text}</span>
      </div>
    </div>
  )
}

export default function MyNews(props) {
  const { flash } = usePage().props

  return (
    <Authenticated
      auth={props.auth}
      errors={props.errors}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{props.page}</h2>}
    >
      <Head title="Dashboard" />
      <div className='flex flex-col justify-center items-center lg:flex-row lg:flex-wrap lg:items-stretch p-4 gap-6'>
        {flash.message && newsNotification(flash.message)}
        {props.data ? props.data.map((news, i) => {
          return (
            <div key={i} className="card w-full sm:w-96 bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">{news.title} <div className={`badge ${randomBadgeColor()}`}>{news.category.toUpperCase()}</div></h2>
                <p className='text-sm'>{news.description}</p>
                <div className="card-actions justify-start">
                  <div className="badge badge-outline">{formatTime(news.updated_at)}</div>
                </div>
              </div>
            </div>
          )
        }) : <p>kamu belum membuat berita</p>}
      </div>
    </Authenticated>
  );
}
