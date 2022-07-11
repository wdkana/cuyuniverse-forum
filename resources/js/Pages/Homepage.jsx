import React from 'react';
import { Head } from '@inertiajs/inertia-react';
import NewsLists from '@/Components/Homepage/NewsLists';
import Paginate from '@/Components/Homepage/Paginate';
import Navbar from '@/Components/Homepage/Navbar';

export default function Homepage(props) {
  return (
    <>
      <Head title={props.title} />
      <div className='min-h-screen bg-slate-50'>
        <Navbar user={props.auth.user} news={props.news.data} />
        <div className='flex flex-col justify-center items-center lg:flex-row lg:flex-wrap lg:items-stretch p-4 gap-6'>
          <NewsLists news={props.news.data} />
        </div>
        <div className='flex justify-center items-center p-4'>
          <Paginate meta={props.news.meta} newsLength={props.news.data.length} />
        </div>
      </div>
    </>
  )
}