import RenderIfTrue from "@/helper/RenderIfTrue";
import {formatTime} from "@/utils/jsHelper";
import {Inertia} from "@inertiajs/inertia";
import {Link} from "@inertiajs/inertia-react";
import {useEffect, useState} from "react";
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
      <div className="alert alert-sm shadow-sm text-base-100 bg-secondary dark:bg-slate-300 mt-4 rounded-md dark:text-slate-900">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="stroke-current flex-shrink-0 w-6 h-6">
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
    <div className="card w-full md:w-2/3 bg-base dark:bg-slate-700 shadow-lg dark:text-white mb-10">
      <RenderIfTrue isTrue={showNotif}>
        <NotificationAlert message={props.notif} />
      </RenderIfTrue>
      <div className="card-body p-6">
        <p className="text-2xl break-all cursor-default font-bold">{props.posts.description}</p>

        <div className="flex flex-row py-2 border-b-4 border-b-secondary dark:border-b-slate-400">
          <div className="basis-1/2 flex justify-start items-end">
            <div className="text-xs cursor-default break-normal">posted {formatTime(props.posts.created_at)}</div>
          </div>

          <div className="basis-1/2 card-actions flex flex-col justify-end items-end text-sm">
            <div className="justify-center items-center flex flex-col">
              <Link href={`/author/${props.posts.author}`} as="button" method="get" className="avatar">
                <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
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
                className="border-b-2 border-b-secondary dark:border-b-slate-500 dark:text-white dark:bg-slate-800 flex flex-col p-3"
                key={i}>
                <div className="text-md font-mono font-bold">{comment.description}</div>
                <Link
                  href={`/author/${comment.commentartor}`}
                  as="div"
                  method="get"
                  className="mt-2 p-2 items-end justify-end flex gap-1 flex-row text-xs cursor-pointer hover:cursor-pointer hover:translate-x-1 transition-all">
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
      <div className="flex justify-start px-2 lg:px-10 py-2 items-center gap-2 text-base-100">
        <button
          onClick={() => likePost(props.posts.id)}
          type="button"
          className={`${
            props.user == null
              ? "bg-secondary uppercase border-none rounded-md btn-sm cursor-not-allowed"
              : `bg-secondary uppercase border-none rounded-md btn-sm
              ${
                props.is_liked_post
                  ? "hover:bg-primary bg-primary-focus"
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
          className={`${
            props.user == null
              ? "bg-secondary uppercase rounded-md btn-sm cursor-not-allowed"
              : `bg-secondary uppercase rounded-md btn-sm 
              ${
                props.is_saved_post
                  ? "hover:bg-primary bg-primary-focus"
                  : "bg-secondary hover:bg-primary hover:text-base-100"
              }`
          } 
          `}
          disabled={!props.user ? true : false}>
          {props.is_saved_post ? "Disimpan" : "Simpan"}
        </button>
      </div>
      <div className="flex flex-col justify-center items-center gap-4 py-2 px-2 sm:px-10 ">
        {props.user && formValidateNotif()}
        <input
          type="text"
          minLength={2}
          maxLength={80}
          value={newComment}
          className="input rounded-md w-full h-42 outline-none border-slate-600 dark:border-slate-400 dark:placeholder-white dark:bg-slate-900 dark:text-white"
          placeholder={props.user == null ? "Login untuk mengisi komentar" : "Tulis komentar"}
          onChange={e => handlerCommentInput(e.target.value)}
          disabled={props.user == null ? true : false}
          autoComplete="off"
        />
        <button
          type="button"
          className={
            !isValid
              ? `bg-secondary text-base-100 mb-4 font-bold btn-md w-full rounded-md cursor-not-allowed ${
                  props.user == null || (!isValid && "text-base-100")
                }`
              : `bg-primary text-base-100 hover:bg-blue-600 duration-300 transition-all mb-4 font-bold btn-md w-full rounded-md ${
                  props.user == null || (!isValid && "text-base-100")
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
