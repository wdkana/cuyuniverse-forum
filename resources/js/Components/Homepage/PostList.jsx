import RenderIfTrue from "@/helper/RenderIfTrue";
import { formatTime } from "@/utils/jsHelper";
import { Inertia } from "@inertiajs/inertia";
import { Link } from "@inertiajs/inertia-react";
import { useEffect, useState } from "react";
import NotificationAlert from "../Default/NotificationAlert";

export default function PostList(props) {
  const [newComment, setNewComment] = useState("");
  const [limiter, setLimiter] = useState(80);
  const [isValid, setIsValid] = useState(true);
  const [showNotif, setShowNotif] = useState(false);

  useEffect(() => {
    let mount = true;
    if (limiter > 0) {
      mount && newComment.length >= 2 && newComment.length <= 80 ? setIsValid(true) : setIsValid(false);
    }
    return () => {
      mount = false;
    };
  }, [newComment.length]);

  useEffect(() => {
    setShowNotif(true);
    return () => setShowNotif(false);
  }, [props]);

  const handlerCommentInput = value => {
    setNewComment(value);
    if (value.length > 2) {
      setShowNotif(false);
    }
    const x = 80 - Number(value.length);
    if (x >= 0) {
      setLimiter(x);
    }
  };

  const handlerCommentSubmit = () => {
    const data = {
      post_id: props.posts.id,
      description: newComment,
      token: props.user.token,
    };
    isValid && Inertia.post("/post/comment", data);
    setNewComment("");
    return setLimiter(80);
  };

  const formValidateNotif = () => {
    return (
      <div className="alert alert-sm mt-4 rounded-md bg-secondary text-base-100 shadow-sm dark:bg-slate-300 dark:text-slate-900">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="h-6 w-6 flex-shrink-0 stroke-current">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span>
            {!limiter
              ? "Ngetiknya udah dulu ya, simpen buat komentar berikutnya 👍"
              : `Saat ini komentar kamu dibatasi ${limiter} karakter`}
          </span>
        </div>
      </div>
    );
  };

  const likePost = postId => {
    const data = {
      post_id: postId,
      token: props.user.token,
    };

    return Inertia.post("/post/like/love", data, {
      preserveScroll: true,
    });
  };

  const savePost = postId => {
    const data = {
      post_id: postId,
      token: props.user.token,
    };

    return Inertia.post("/post/saved-post/saved", data);
  };

  return (
    <div className="bg-base card mb-10 w-full shadow-lg dark:bg-slate-700 dark:text-white md:w-2/3 ">
      {props.posts.image &&
        <img src={`/storage/images/posts/${props.posts.image}`} className="image-full" />
      }
      <RenderIfTrue isTrue={showNotif}>
        <NotificationAlert message={props.notif} />
      </RenderIfTrue>
      <div className="card-body p-6" data-aos="flip-left" data-aos-duration="500">
        <p className="cursor-default break-normal break-words text-xl">{props.posts.description}</p>
        <div className="flex flex-row border-b-4 border-b-secondary py-2 dark:border-b-slate-400">
          <div className="flex basis-1/2 items-end justify-start">
            <div className="cursor-default break-normal text-xs">posted {formatTime(props.posts.created_at)}</div>
          </div>

          <div className="card-actions flex basis-1/2 flex-col items-end justify-end text-sm">
            <div className="flex flex-col items-center justify-center">
              <Link href={`/author/${props.posts.author}`} as="button" method="get" className="avatar">
                <div className="w-12 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100">
                  <img
                    src={
                      props.author_image !== null
                        ? `/storage/images/${props.author_image}`
                        : "/storage/images/defaultavatar.png"
                    }
                  />
                </div>
              </Link>
              <div className="py-2">{props.posts.author}</div>
            </div>
          </div>
        </div>
        <div className="bg-base-200">
          {props.comments.map((comment, i) => {
            return (
              <div
                className="flex flex-col border-b-2 border-b-secondary p-3 dark:border-b-slate-500 dark:bg-slate-800 dark:text-white"
                key={i}>
                <div className="text-md font-mono break-words break-normal">{comment.description}</div>
                <Link
                  href={`/author/${comment.commentartor}`}
                  as="div"
                  method="get"
                  className="mt-2 flex cursor-pointer flex-row items-end justify-end gap-1 p-2 text-xs transition-all hover:translate-x-1 hover:cursor-pointer">
                  <div className="mr-1">
                    comment {formatTime(comment.created_at)} by {comment.commentartor}
                  </div>
                  <div className="avatar">
                    <div className="w-6 rounded-full">
                      <img
                        src={
                          comment.users.image !== null
                            ? `/storage/images/${comment.users.image}`
                            : "/storage/images/defaultavatar.png"
                        }
                      />
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
      <div className="divider" />
      <div className="flex items-center justify-start gap-2 px-2 py-2 text-base-100 sm:px-10">
        <button
          onClick={() => likePost(props.posts.id)}
          type="button"
          className={`${props.user == null
            ? "btn-sm cursor-not-allowed rounded-md border-none bg-secondary uppercase"
            : `btn-sm rounded-md border-none bg-secondary uppercase
              ${props.is_liked_post
              ? "bg-primary-focus hover:bg-primary"
              : "bg-secondary hover:bg-primary hover:text-base-100"
            }`
            }
          `}
          disabled={!props.user ? true : false}>
          {props.posts.likes_count} {props.posts.likes_count === 1 ? "Like" : "Likes"}
        </button>
        <button
          onClick={() => savePost(props.posts.id)}
          type="button"
          className={`${props.user == null
            ? "btn-sm cursor-not-allowed rounded-md bg-secondary uppercase"
            : `btn-sm rounded-md bg-secondary uppercase
              ${props.is_saved_post
              ? "bg-primary-focus hover:bg-primary"
              : "bg-secondary hover:bg-primary hover:text-base-100"
            }`
            }
          `}
          disabled={!props.user ? true : false}>
          {props.is_saved_post ? "Disimpan" : "Simpan"}
        </button>
      </div>
      <div className="flex flex-col items-center justify-center gap-4 py-2 px-2 sm:px-10 ">
        {props.user && formValidateNotif()}
        <input
          type="text"
          minLength={2}
          maxLength={80}
          value={newComment}
          className="h-42 input w-full rounded-md border-slate-600 outline-none dark:border-slate-400 dark:bg-slate-900 dark:text-white dark:placeholder-white"
          placeholder={props.user == null ? "Login untuk mengisi komentar" : "Tulis komentar"}
          onChange={e => handlerCommentInput(e.target.value)}
          disabled={props.user == null ? true : false}
          autoComplete="off"
        />
        <button
          type="button"
          className={
            !isValid
              ? `btn-md mb-4 w-full cursor-not-allowed rounded-md bg-secondary font-bold text-base-100 ${props.user == null || (!isValid && "text-base-100")
              }`
              : `btn-md mb-4 w-full rounded-md bg-primary font-bold text-base-100 transition-all duration-300 hover:bg-blue-600 ${props.user == null || (!isValid && "text-base-100")
              }`
          }
          disabled={props.user == null || !isValid ? true : false}
          onClick={() => handlerCommentSubmit()}>
          Komentar
        </button>
      </div>
    </div>
  );
}
