import React, { useEffect, useState } from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head, Link } from '@inertiajs/inertia-react';

export default function NotificationPage(props) {
  // const [comments, setComments] = useState([])

  // useEffect(() => {
  //   let mount = true
  //   if (props.cmment) {
  //     const commentDatas = props.comments
  //     let filteredComment = []
  //     commentDatas.map(data => {
  //       data.map((fl) => {
  //         filteredComment.push(fl)
  //       })
  //     })
  //     mount ? setComments(filteredComment) : ""
  //   }
  //   return () => { mount = false }
  // }, [])

  return (
    <Authenticated
      auth={props.auth}
      errors={props.errors}
      header={<div className='flex flex-row justify-between'>
        <h2 className="font-semibold text-xl leading-tight cursor-default">{props.page}</h2>
        <Link href={route(`${props.nextRoute}`)} as="button" className="btn btn-sm btn-link leading-tight">{props.next}</Link>
      </div>}
    >
      <Head title="Notification" />
      <div className="overflow-hidden shadow-sm sm:rounded-lg p-4  ">
        <div className='flex flex-col justify-center items-center lg:flex-row lg:flex-wrap lg:items-center gap-4'>
          <h1>COMING SOON ✌</h1>
          {/* {comments.sort((a, b) => b.created_at - a.created_at).map((lastComment, i) => {
            return (
              <Link href={`/post/${lastComment.post_id}`} method="get" as="button" key={i} className="card flex flex-row justify-between items-center h-20 w-full md:w-1/2 lg:w-1/3 xl:w-1/4 bg-base-300 shadow-lg p-6 cursor-pointer hover:-translate-y-1 hover:transition-all">
                <div className='font-bold'>{lastComment.description}</div>
                <div className='text-xs'>{lastComment.commentartor}</div>
              </Link>
            )
          })} */}
        </div>
      </div>
      <div className='divider'></div>
    </Authenticated>
  );
}
