import React from 'react';
import { Link, Head } from '@inertiajs/inertia-react';
import NewsLists from '@/Components/Homepage/NewsLists';
import Navbar from '@/Components/Homepage/Navbar';
import ResetTime from '@/Components/Homepage/ResetTimer';
import Hero from '@/Components/Homepage/Hero';

export default function Home(props) {
  return (
    <>
      <Head title={props.title} />
      <div className='min-h-screen bg-base-300'>
        <Navbar user={props.auth.user} title="Cuy Universe" />
        <Hero />
        {props.news.data.length > 4 &&
          <div className='py-4 flex justify-center'>
            <ResetTime />
          </div>
        }
        <div className='flex flex-col justify-center items-center flex-wrap lg:flex-row xl:flex-nowrap lg:items-stretch p-4 gap-6'>
          <NewsLists news={props.news.data} />
        </div>
        {props.news.data.length > 3 &&
          <div className='flex flex-col justify-center items-center lg:flex-row lg:flex-wrap lg:items-stretch p-4 gap-6'>
            <Link href={route('news')} as="button" className="btn btn-outline">more news</Link>
          </div>
        }
      </div>
    </>
  )
}