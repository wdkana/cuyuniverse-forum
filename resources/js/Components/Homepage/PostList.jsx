import { formatTime } from '@/utils/jsHelper';
import { Inertia } from '@inertiajs/inertia';
import { Link } from '@inertiajs/inertia-react';
import { useEffect, useState } from 'react';
import NotificationAlert from '../Default/NotificationAlert';

export default function PostList(props) {
  const [newComment, setNewComment] = useState("")
  const [limiter, setLimiter] = useState(80)
  const [isValid, setIsValid] = useState(true)
  const [showNotif, setShowNotif] = useState(false)

  useEffect(() => {
    let mount = true
    if (limiter > 0) {
      mount && newComment.length >= 2 && newComment.length <= 80 ? setIsValid(true) : setIsValid(false)
    }
    return () => { mount = false }
  }, [newComment.length])

  useEffect(() => {
    setShowNotif(true)
    return () => setShowNotif(false)
  }, [props])

  const handlerCommentInput = (value) => {
    setNewComment(value)
    if (value.length > 2) {
      setShowNotif(false)
    }
    const x = 80 - Number(value.length)
    if (x >= 0) {
      setLimiter(x)
    }
  }

  const handlerCommentSubmit = () => {
    const data = {
      post_id: props.posts.id,
      description: newComment,
      token: props.user.token
    }
    isValid && Inertia.post('/post/comment', data)
    setNewComment('')
    return setLimiter(80)
  }

  const formValidateNotif = () => {
    return (
      <div className="alert alert-sm shadow-lg bg-base-300 mt-4">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current flex-shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <span>{!limiter ? "Ngetiknya udah dulu ya, simpen buat komentar berikutnya 👍" : `Saat ini komentar kamu dibatasi ${limiter} karakter`}</span>
        </div>
      </div>
    )
  }

  return (
    <div className="card w-full md:w-2/3 bg-base-300 shadow-lg">
      {showNotif && <NotificationAlert message={props.notif} />}
      <div className="card-body p-6">
        <p className='text-xl break-all cursor-default'>{props.posts.description}</p>
        <div className="cursor-default text-xs">posted {formatTime(props.posts.created_at)}</div>
        <div className="card-actions flex flex-col justify-end items-end text-sm py-2">
          <div className='justify-center items-center flex flex-col'>
            <Link href={`/author/${props.posts.author}`} as="button" method="get" className="avatar">
              <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src={props.author_image !== null ? `/storage/images/${props.author_image}` : '/storage/images/defaultavatar.png'} />
              </div>
            </Link>
            <div className='py-2'>{props.posts.author}</div>
          </div>
        </div>
        <div className="collapse rounded-md">
          <input type="checkbox" className="peer" />
          <div className="collapse-title bg-base-100 text-white text-white-content peer-checked:bg-white peer-checked:text-black text-md">
            🧾 <i>lihat semua komentar</i>
          </div>
          <div className="p-0 py-2 collapse-content bg-base-300 text-white-content peer-checked:bg-base-300 peer-checked:text-black-content">
            {props.comments.map((comment, i) => {
              return (
                <div className='mb-2 flex flex-col bg-neutral text-white p-6' key={i}>
                  <div className='text-xl font-mono font-bold'>{comment.description}</div>
                  <Link href={`/author/${comment.commentartor}`} as="div" method="get" className='mt-2 p-2 items-end justify-end flex gap-1 flex-row text-xs cursor-pointer hover:cursor-pointer hover:translate-x-1 hover:transition-all'>
                    <div className=''>comment {formatTime(comment.created_at)} by {comment.commentartor}</div>
                    <div className="w-6 rounded-full">
                      <img src={comment.users.image !== null ? `/storage/images/${comment.users.image}` : '/storage/images/defaultavatar.png'} />
                    </div>
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
        <div className='flex flex-col justify-center items-center gap-4 py-2'>
          {props.user && formValidateNotif()}
          <input type="text" minLength={2} maxLength={80} value={newComment} className='input w-full h-42' placeholder={props.user == null ? "Login untuk mengisi komentar" : "Tulis komentar"} onChange={(e) => handlerCommentInput(e.target.value)} disabled={props.user == null ? true : false} />
          <button type="button" className='btn btn-outline font-bold btn-sm w-full' disabled={props.user == null || !isValid ? true : false} onClick={() => handlerCommentSubmit()}>Komentar</button>
        </div>
      </div>
    </div >
  )
}