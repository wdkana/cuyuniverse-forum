import React, {useEffect, useState} from "react";

import Authenticated from "@/Layouts/Authenticated";
import {Head, Link} from "@inertiajs/inertia-react";
import {usePage} from "@inertiajs/inertia-react";
import {formatTime} from "@/utils/jsHelper";
import {Inertia} from "@inertiajs/inertia";
import NotificationAlert from "@/Components/Default/NotificationAlert";
import {TbTrashX} from "react-icons/tb";
import {FaArrowAltCircleUp, FaCommentsDollar, FaWindowMinimize} from "react-icons/fa";

export default function MyPosts(props) {
  const {flash} = usePage().props;
  const [showNotif, setShowNotif] = useState(false);
  const [scrollTo, setScrollTo] = useState(false);

  const pageOffset = () => {
    setInterval(() => {
      if (window.pageYOffset >= 300) {
        setScrollTo(true);
      } else {
        setScrollTo(false);
      }
    }, 500);
  };

  useEffect(() => {
    pageOffset();
    if (flash.message) {
      setShowNotif(true);
    }
    return () => setShowNotif(false);
  }, [props]);

  const removePosts = id => {
    const data = {
      id: id,
      token: props.auth.user.token,
    };
    Inertia.post("/dashboard/manage-posts/posts/delete", data);
  };

  return (
    <Authenticated
      auth={props.auth}
      errors={props.errors}
      header={
        <div className="flex flex-row justify-between dark:text-white">
          <h2 className="cursor-default text-xl font-semibold leading-tight">{props.page}</h2>
          <Link
            href={`${route(props.nextRoute)}`}
            method="get"
            as="button"
            className="btn btn-ghost btn-sm leading-tight">
            {props.next}
          </Link>
        </div>
      }>
      <Head title="Dashboard" />
      {scrollTo ? (
        <div
          id="scroll"
          className="fixed bottom-28 right-2 z-10 flex h-10 w-10 items-center justify-center lg:bottom-16"
          data-aos="fade-up"
          data-aos-easing="ease-in-out"
          data-aos-duration="1000"
          onClick={() => window.scrollTo(0, 0)}>
          <FaArrowAltCircleUp size={24} />
        </div>
      ) : (
        ""
      )}
      <div className="lg:items-strech flex flex-col items-center justify-center gap-6 py-6 px-4 lg:flex-row lg:flex-wrap">
        {showNotif && <NotificationAlert message={flash.message} />}
        {props.data.length > 0 ? (
          props.data.map((posts, i) => {
            return (
              <div
                key={i}
                className="card w-full cursor-pointer bg-base-100 text-base-content shadow-lg transition-all duration-300 hover:-translate-y-1 hover:delay-75 dark:bg-slate-700 dark:text-white dark:hover:bg-gray-600 md:w-1/2 lg:w-1/3 xl:w-1/3">
                <div className="card-body">
                  {posts.image && <img src={`/storage/images/posts/${posts.image}`} className="image-full" />}
                  <Link href={`/post/${posts.id}`} method="get" as="div" className="card-title">
                    <p
                      className={`cursor-pointer text-left text-xl transition-all duration-300 hover:-translate-y-1 ${
                        posts.description.length > 80 ? "overflow-x-hidden pr-2" : "break-words"
                      } h-20`}>
                      {posts.description}
                    </p>
                  </Link>
                  <div className="card-actions flex items-center justify-between pt-3">
                    <div className="text-xs">
                      posted {formatTime(posts.updated_at)} | {posts.comments.length} comment
                    </div>
                    <label
                      onClick={() => removePosts(posts.id)}
                      className="modal-button btn btn-ghost cursor-pointer hover:rounded-md hover:bg-base-300"
                      htmlFor={`my-modal-${posts.id}`}>
                      <TbTrashX size={20} />
                    </label>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center dark:text-white">
            <p className="text-2xl font-bold">kamu belum punya postingan</p>
            <Link href={`${route(props.nextRoute)}`} method="get" as="button" className="btn btn-ghost rounded-md">
              Post Sekarang!
            </Link>
          </div>
        )}
      </div>
    </Authenticated>
  );
}
