import React from 'react';
import { Link, Head } from '@inertiajs/inertia-react';
import PostsList from '@/Components/Homepage/PostsLists';
import Navbar from '@/Components/Homepage/Navbar';
import ResetTime from '@/Components/Homepage/ResetTimer';
import Hero from '@/Components/Homepage/Hero';

export default function HomePage(props) {
  return (
    <>
      <Head title={props.title} />
      <div className='min-h-screen'>
        <Navbar user={props.auth.user} title={props.title} root={props.root} />
        <Hero />
        <div className='py-4 flex justify-center'>
          <ResetTime />
        </div>
        {/* <div className='flex flex-col justify-center items-center flex-wrap lg:flex-row xl:flex-nowrap lg:items-stretch p-4 gap-6'>
          <PostsList posts={props.posts.data} />
        </div> */}
        {props.posts.data.length > 3 &&
          <div className='flex flex-col justify-center items-center lg:flex-row lg:flex-wrap lg:items-stretch p-4 gap-6'>
            <Link href={route('outer.posts')} as="button" className="btn btn-outline">Lihat Semua Postingan</Link>
          </div>
        }
      </div>
    </>
  )
}