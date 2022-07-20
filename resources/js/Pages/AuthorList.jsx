import React from 'react';
import { Head, Link } from '@inertiajs/inertia-react';
import Navbar from '@/Components/Homepage/Navbar';

export default function AuthorListPage(props) {
  const scrollToTop = () => {
    return window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }

  return (
    <>
      <Head title={props.title} />
      <div className='min-h-screen'>
        <Navbar user={props.auth.user} title={props.title} root={props.root} />
        <div className='text-center pt-6'>
          <h1 className='font-bold text-lg'>✨ {props.title} ✨</h1>
          <p className='text-sm'>{props.description}</p>
        </div>
        <div className="flex flex-col justify-center items-center sm:flex-row sm:flex-wrap p-4 gap-6">
          {props.data.sort((a, b) => b.total_post - a.total_post).map((user, i) => {
            return (
              <Link href={`/author/${user.username}`} as="button" className="flex flex-col bg-slate-50 text-black rounded-md shadow-lg w-full md:w-5/6 lg:w-1/3 xl:w-1/4 justify-center items-center cursor-pointer" key={i}>
                <div className='stat'>
                  <div className="text-md">{user.username}</div>
                  <div className="text-sm">
                    {user.is_online ? 'online' : `offline ${user.last_seen}`}
                  </div>
                  <div className="p-0 m-0 my-2 h-1 bg-base-100 w-full"></div>
                  <div className='flex justify-between items-end'>
                    <div className="text-sm">
                      {user.total_post == 0 ? "belum pernah posting" : `memiliki ${user.total_post} postingan`}
                    </div>
                    <div className="divider divider-horizontal">
                      {user.total_comment > 10 ? "📖" : user.total_post > 5 && user.total_comment > 10 ? "🐱‍💻" : "🗿"}
                    </div>
                    <div className="text-sm">telah mengomentari  <span className={`stat-value ${user.total_post > 9 ? "text-primary" : "text-secondary"} text-sm`}>{user.total_comment}</span> post</div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
        <div className='text-center py-6'>
          <button onClick={() => scrollToTop()} className="btn btn-link text-white btn-sm">Kembali Ke Atas</button>
        </div>
      </div>
    </>
  )
}