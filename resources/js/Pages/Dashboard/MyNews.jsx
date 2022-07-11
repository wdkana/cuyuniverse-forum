import React from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head } from '@inertiajs/inertia-react';

export default function MyNews(props) {
  return (
    <Authenticated
      auth={props.auth}
      errors={props.errors}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{props.page}</h2>}
    >
      <Head title="Dashboard" />
      <div className='flex flex-col justify-center items-center lg:flex-row lg:flex-wrap lg:items-stretch p-4 gap-6'>
        {props.data ? props.data.map((news, i) => {
          return (
            <div key={i} className="card w-full sm:w-96 bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">{news.title} <div className="badge badge-secondary">NEW</div></h2>
                <p className='text-sm'>{news.description}</p>
                <div className="card-actions justify-end">
                  <div className="badge badge-inline">{news.category}</div>
                </div>
              </div>
            </div>
          )
        }) : <p>kamu belum membuat berita</p>}
      </div>
    </Authenticated>
  );
}
