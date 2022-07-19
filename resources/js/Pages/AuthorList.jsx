import React from 'react';
import { Head, Link } from '@inertiajs/inertia-react';
import Navbar from '@/Components/Homepage/Navbar';
import Avatar from 'avataaars';
import { randomColor } from '@/utils/jsHelper';


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
        <div className="flex flex-col justify-center items-center sm:flex-row sm:flex-wrap px-6 gap-6">
          {props.data.sort((a, b) => b.total_post - a.total_post).map((user, i) => {
            return (
              <Link href={`/author/${user.username}`} as="button" className="flex flex-col justify-center items-center cursor-pointer" key={i}>
                <div className='stat'>
                  <div className={`avatar ${user.is_online ? 'online' : 'offline'} p-2`}>
                    <div className="w-auto rounded-full">
                      <Avatar style={{ width: '100%', height: '100%' }}
                        topType={randomColor("top")}
                        accessoriesType='Wayfarers'
                        hairColor={randomColor("hair")}
                        facialHairType={randomColor("facial")}
                        facialHairColor='Red'
                        clotheType={randomColor("shirt")}
                        clotheColor='Red'
                        eyeType={randomColor("eyes")}
                        eyebrowType='UnibrowNatural'
                        mouthType={randomColor("mouth")}
                        skinColor='Light'
                      />
                    </div>
                  </div>
                  <div className="stat-title text-xs">Total Post</div>
                  <div className={`stat-value ${user.total_post > 9 ? "text-primary" : "text-secondary"} text-sm`}>{user.total_post}</div>
                  <div>{user.username}</div>
                </div>
              </Link>
            )
          })}
        </div>
        <div className='text-center py-6'>
          <button onClick={() => scrollToTop()} className="btn btn-link btn-sm">Kembali Ke Atas</button>
        </div>
      </div>
    </>
  )
}