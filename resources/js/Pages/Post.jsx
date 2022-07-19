import React from 'react';
import { Head } from '@inertiajs/inertia-react';
import Navbar from '@/Components/Homepage/Navbar';
import PostList from '@/Components/Homepage/PostList';

export default function PostPage(props) {
  return (
    <>
      <Head title={props.title} />
      <div className='min-h-screen'>
        <Navbar user={props.auth.user} title={props.title} root={props.root} />
        <div className='text-center pt-6'>
          <h1 className='font-bold text-lg'>✨ {props.title} ✨</h1>
          <p className='text-sm'>{props.description}</p>
        </div>
        <div className='flex flex-col justify-center items-center lg:flex-row lg:flex-wrap lg:items-stretch pt-6 px-4 gap-6'>
          <PostList posts={props.data} />
        </div>
      </div>
    </>
  )
}