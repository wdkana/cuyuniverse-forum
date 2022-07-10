import React from 'react';
import { Link, Head } from '@inertiajs/inertia-react';
import NewsLists from '@/Components/Homepage/NewsLists';

export default function Homepage(props) {
  console.log('props: ', props);
  return (
    <div className='min-h-screen bg-slate-50'>
      <Head title={props.title} />
      <h2 className='p-4'>{props.description}</h2>
      <div className='flex flex-row flex-wrap justify-center gap-4'>
        <NewsLists news={props.news.data} />
      </div>
    </div>
  )
}