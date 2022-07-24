import RenderIfTrue from "@/helper/RenderIfTrue";
import { formatTime } from "@/utils/jsHelper";
import { Inertia } from "@inertiajs/inertia";
import { Link } from "@inertiajs/inertia-react";
import { useEffect, useState } from "react";
import NotificationAlert from "../Default/NotificationAlert";
import CommentCard from "./CommentCard";

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

    const handlerCommentInput = (value) => {
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
            token: props.user.token
        };
        isValid && Inertia.post("/post/comment", data);
        setNewComment("");
        return setLimiter(80);
    };

    const formValidateNotif = () => {
        return (
            <div className="alert alert-sm shadow-sm bg-primary mt-4 rounded-md">
                <div>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="stroke-current flex-shrink-0 w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
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

    const likePost = (postId) => {
        const data = {
            post_id: postId,
            token: props.user.token
        };

        return Inertia.post("/post/like/love", data, {
            preserveScroll: true
        });
    };

    const savePost = (postId) => {
        const data = {
            post_id: postId,
            token: props.user.token
        };

        return Inertia.post("/post/savedpost/saved", data);
    };

    return (
        <div className="card w-full md:w-2/3 bg-base-100 dark:bg-slate-700 shadow-lg">
            <RenderIfTrue isTrue={showNotif}>
                <NotificationAlert message={props.notif} />
            </RenderIfTrue>
            <div className="card-body p-6">
                <p className="text-2xl break-all cursor-default font-bold">{props.posts.description}</p>

                <div className="flex flex-row py-2 border-b-4 border-b-primary">
                    <div className="basis-1/2 flex justify-start items-end">
                        <div className="text-xs cursor-default break-normal">
                            posted {formatTime(props.posts.created_at)}
                        </div>
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
                        return <CommentCard key={i} comment={comment} />;
                    })}
                </div>
            </div>
            <div className="flex justify-start px-2 lg:px-10 py-2 items-center gap-2">
                <button
                    onClick={() => likePost(props.posts.id)}
                    type="button"
                    className="btn dark:text-white btn-primary rounded-md btn-sm"
                    disabled={!props.user ? true : false}
                >
                    {props.posts.likes_count} Like
                </button>
                <button
                    onClick={() => savePost(props.posts.id)}
                    type="button"
                    className={`btn dark:text-white rounded-md btn-sm ${
                        props.is_saved_post ? "btn-primary" : "hover:btn-primary"
                    }`}
                    disabled={!props.user ? true : false}
                >
                    {props.is_saved_post ? "Disimpan" : "Simpan"}
                </button>
            </div>
            <div className="flex flex-col justify-center items-center gap-4 py-2 px-2 sm:px-10">
                {props.user && formValidateNotif()}
                <input
                    type="text"
                    minLength={2}
                    maxLength={80}
                    value={newComment}
                    className="input rounded-md w-full h-42 outline-none border-none dark:placeholder-slate-800"
                    placeholder={props.user == null ? "Login untuk mengisi komentar" : "Tulis komentar"}
                    onChange={(e) => handlerCommentInput(e.target.value)}
                    disabled={props.user == null ? true : false}
                />
                <button
                    type="button"
                    className="btn btn-primary font-bold btn-md w-full rounded-md dark:text-white"
                    disabled={props.user == null || !isValid ? true : false}
                    onClick={() => handlerCommentSubmit()}
                >
                    Komentar
                </button>
            </div>
        </div>
    );
}
