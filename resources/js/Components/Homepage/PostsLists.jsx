import { formatTime } from '@/utils/jsHelper';
import { Link } from '@inertiajs/inertia-react';

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
      <div key={i} className="card w-full md:w-1/2 lg:w-1/3 xl:w-1/4 bg-base-300 shadow-lg">
        <Link href={`/post/${post.id}`} method="get" as="div" className="card-body p-6 cursor-pointer">
          <div className='text-xl break-all text-left'>{post.description}</div>
          <div className="badge badge-outline">{formatTime(post.updated_at)}</div>
          <div className="card-actions flex justify-end items-end text-sm">
            <Link href={`/author/${post.author}`} as="button" method="get" className="badge badge-inline p-4 max-w-xs">
              <div className="badge badge-inline max-w-xs cursor-pointer">
                {post.author}
              </div>
            </Link>
          </div>
        </Link>
      </div >
    )
  }
  )
}

export default function PostsList({ posts, from }) {
  if (!posts || !posts.length) return noPosts()
  return isPosts(posts, from)
}