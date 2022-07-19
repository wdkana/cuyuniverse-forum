import { formatTime } from '@/utils/jsHelper';
import { Link } from '@inertiajs/inertia-react';
import Avatar from 'avataaars';

const getPost = (posts) => {
  return (
    <div className="card w-full md:w-1/2 lg:w-1/3 xl:w-1/4 bg-base-300 shadow-lg">
      <div className="card-body p-6">
        <p className='text-xl break-all cursor-default'>{posts[0].description}</p>
        <div className="badge badge-outline cursor-default">{formatTime(posts[0].created_at)}</div>
        <div className="card-actions flex flex-col justify-end items-end text-sm">
          <div className='justify-center items-center flex flex-col'>
            <Link href={`/author/${posts[0].author}`} as="button" method="get" className="avatar p-2">
              <div className="w-10 rounded-full ring ring-primary ring-offset-base-100">
                <Avatar style={{ width: '100%', height: '100%' }}
                  avatarStyle='Circle'
                  topType='WinterHat3'
                  accessoriesType='Prescription02'
                  hatColor='Red'
                  facialHairType='BeardMedium'
                  facialHairColor='Red'
                  clotheType='BlazerSweater'
                  eyeType='WinkWacky'
                  eyebrowType='RaisedExcited'
                  mouthType='Smile'
                  skinColor='Light'
                />
              </div>
            </Link>
            <div className="badge badge-inline p-4 max-w-xs cursor-default">
              {posts[0].author}
            </div>
          </div>
        </div>
        <div className='w-full'>
          <div tabIndex="0" className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box">
            <div className="collapse-title text-md">
              Lihat semua komentar
            </div>
            <div className="collapse-content">
              {posts[0].comments.map((comment, i) => {
                return (
                  <div className='text-sm mb-3 rounded-md shadow-lg flex flex-col bg-base-300 p-4' key={i}>
                    <p>{comment.description}</p>
                    <div className='badge badge-secondary mt-4 text-xs'>{formatTime(comment.created_at)}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

export default function PostList({ posts }) {
  return getPost(posts)
}