import { formatTime } from '@/utils/jsHelper';
import { Link } from '@inertiajs/inertia-react';
import Avatar from 'react-avatar';

const noPosts = () => {
  return (
    <div className="text-center">
      <h6 className="font-bold">
        <progress className="progress w-56"></progress>
      </h6>
    </div>
  )
}

const isPosts = (posts) => {
  return posts.map((post, i) => {
    return (
      <div key={i} className="card w-full lg:w-1/3 bg-base-300 shadow-lg">
        <div className="card-body p-3">
          <p className='text-lg break-all cursor-default'>{post.description}</p>
          <div className="badge badge-outline cursor-default">{formatTime(post.updated_at)}</div>
          <div className="card-actions flex flex-col justify-end items-end text-sm">
            <div className='justify-center items-center flex flex-col'>
              <Link href={`/author/${post.author}`} as="button" method="get" className="avatar pb-2">
                <div className="w-8 rounded-full ring ring-primary ring-offset-base-100">
                  <Avatar name={post.author} size={32} fgColor="#fff" />
                </div>
              </Link>
              <div className="badge badge-inline p-4 max-w-xs cursor-default">
                {post.author}
              </div>
            </div>
          </div>
        </div>
      </div >
    )
  }
  )
}

export default function PostsList({ posts }) {
  if (!posts || !posts.length) return noPosts()
  return isPosts(posts)
}