import { formatTime } from '@/utils/jsHelper';
import { Link } from '@inertiajs/inertia-react';
import Avatar from 'avataaars';
import { randomColor } from '@/utils/jsHelper';

const noPosts = () => {
  return (
    <div className="text-center">
      <h6 className="font-bold">
        <progress className="progress w-56"></progress>
      </h6>
    </div>
  )
}

const isPosts = (posts, from) => {
  return posts.map((post, i) => {
    return (
      <div key={i} className="card w-full md:w-1/2 lg:w-1/3 xl:w-1/4 bg-base-300 shadow-lg">
        <div className="card-body p-3">
          <p className='text-xl break-all cursor-default'>{post.description}</p>
          <div className="badge badge-outline cursor-default">{formatTime(post.updated_at)}</div>
          <div className="card-actions flex flex-col justify-end items-end text-sm">
            <div className='justify-center items-center flex flex-col'>
              <Link href={`/author/${post.author}`} as="button" method="get" className="avatar p-2">
                {from != "authorPage" &&
                  <div className="w-10 rounded-full ring ring-primary ring-offset-base-100">
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
                }
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

export default function PostsList({ posts, from }) {
  if (!posts || !posts.length) return noPosts()
  return isPosts(posts, from)
}