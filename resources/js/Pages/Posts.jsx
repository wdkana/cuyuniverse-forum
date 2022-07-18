import React from 'react';
import { Head } from '@inertiajs/inertia-react';
import PostsList from '@/Components/Homepage/PostsLists';
import Paginate from '@/Components/Homepage/Paginate';
import Navbar from '@/Components/Homepage/Navbar';

export default function PostsPage(props) {
  return (
    <>
      <Head title={props.title} />
      <div className='min-h-screen'>
        <Navbar user={props.auth.user} title={props.title} root={props.root} />
        <div className='py-6 flex flex-col justify-center items-center gap-6'>
          <PostsList posts={props.posts.data} />
          <Paginate meta={props.posts.meta} postsLength={props.posts.data.length} />
        </div>
      </div>
    </>
  )
}