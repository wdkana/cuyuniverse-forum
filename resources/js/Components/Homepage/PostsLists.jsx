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
      <div key={i} className="card w-full md:w-1/2 lg:w-1/3 xl:w-1/3 bg-base-300 shadow-lg cursor-pointer hover:transition-all hover:delay-75 hover:-translate-y-1 hover:bg-neutral">
        <Link href={`/post/${post.id}`} method="get" as="div" className="card-body p-6">
          <div className={`text-xl text-left ${post.description.length > 100 ? "overflow-x-hidden" : "break-words"} h-20`}>{post.description}</div>
          <div className="card-actions flex flex-row justify-between items-center text-sm">
            <div className='text-xs'>
              posted {formatTime(post.updated_at)} | {post.comments && post.comments.length > 0 ? post.comments.length : "no"} comment
            </div>
            <Link href={`/author/${post.author}`} as="button" method="get" className="p-4 max-w-xs cursor-pointer">
              <div className="badge badge-outline max-w-xs cursor-pointer hover:translate-y-1 hover:transition-all">
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