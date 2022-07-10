import React from 'react';
import { Link, Head } from '@inertiajs/inertia-react';
import NewsLists from '@/Components/Homepage/NewsLists';

export default function Homepage(props) {
  return (
    <div className='flex justify-center items-center min-h-screen bg-slate-50'>
      <Head title={props.title} />
      <div>
        <NewsLists props={props} />
        {/* {props.news ? props.news.map((data, i) => {
          return (
            <div key={i} className="p-4 m-2 bg-white text-black shadow-md rounded-md">
              <p className='text-2xl'>{data.title}</p>
              <p className='text-sm'>{data.descrition}</p>
              <i>{data.category}</i>
              <i>{data.author}</i>
            </div>
          )
        }) : <p>Saat Ini Belum Ada Berita Tersedia</p>} */}
      </div>
    </div>
  )
}