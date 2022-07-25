import React from 'react';
import { Head } from '@inertiajs/inertia-react';
import Authenticated from '@/Layouts/Authenticated';
import PostsList from '@/Components/Homepage/PostsLists';

export default function SavedPost(props) {
  const data = props.data.map(value => {
    const comments = value.comments;
    return { ...value.posts, comments }
  })

  return (
    <Authenticated
      auth={props.auth}
      errors={props.errors}
    >
      <Head title={props.title} />
      <div className='min-h-screen dark:text-white'>
        {data.length > 0 ? (
          <>
            <div className='text-center pt-6'>
              <h1 className='font-bold text-lg'>✨ {props.page} ✨</h1>
            </div>
            <div className='flex flex-col justify-center items-center lg:flex-row lg:flex-wrap lg:items-strech py-6 px-4 gap-6'>
              <PostsList posts={data} />
            </div>
          </>
        ) : (
          <div className='text-center pt-6'>
            <h1 className='font-bold text-lg'>Belum ada postingan yang anda simpan 😥</h1>
          </div>
        )}
      </div>
    </Authenticated>
  )
}