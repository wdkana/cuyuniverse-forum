import React from 'react';
import { Head } from '@inertiajs/inertia-react';
import Navbar from '@/Components/Homepage/Navbar';
import PostsList from '@/Components/Homepage/PostsLists';
import Paginate from '@/Components/Homepage/Paginate';
import Avatar from 'avataaars';
import { randomColor } from '@/utils/jsHelper';

export default function AuthorPage(props) {
  return (
    <>
      <Head title={props.title} />
      <div className='min-h-screen'>
        <Navbar user={props.auth.user} title={props.title} root={props.root} />
        <div className="text-center pt-6">
          <div className="avatar py-4">
            <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
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
          <h1 className="text-xl font-bold">✨ {props.description} ✨</h1>
        </div>
        <div className='flex flex-col justify-center items-center lg:flex-row lg:flex-wrap lg:items-stretch p-4 gap-6'>
          <PostsList posts={props.posts.data} from="authorPage" />
        </div>
        <div className='flex justify-center items-center p-4'>
          <Paginate meta={props.posts} />
        </div>
      </div>
    </>
  )
}