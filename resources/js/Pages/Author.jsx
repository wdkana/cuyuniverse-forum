import React from "react";
import {Head} from "@inertiajs/inertia-react";
import PostsList from "@/Components/Homepage/PostsLists";
import Paginate from "@/Components/Homepage/Paginate";
import Guest from "@/Layouts/Guest";

export default function AuthorPage(props) {
  const thisData = {
    page: "author",
    author_image: props.author_image,
  };
  return (
    <Guest auth={props.auth.user}>
      <Head title={props.title} />
      <div className="min-h-screen">
        <div className="pt-6 text-center" data-aos="fade-right" data-aos-duration="2500">
          <div className={`avatar ${props.is_online ? "online" : "offline"}`}>
            <div className="w-24 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100">
              <img
                src={
                  props.author_image !== null
                    ? `/storage/images/${props.author_image}`
                    : "/storage/images/defaultavatar.png"
                }
              />
            </div>
          </div>
          <h1 className="text-xl font-bold dark:text-white">✨ {props.author} ✨</h1>
        </div>
        <div
          className="flex flex-col items-center justify-center gap-6 p-4 lg:flex-row lg:flex-wrap lg:items-stretch"
          data-aos="fade-up"
          data-aos-duration="1500">
          <PostsList posts={props.posts.data} from={thisData} />
        </div>
        <div className="mb-20 flex items-center justify-center md:mb-7" data-aos="fade-up" data-aos-duration="500">
          <Paginate meta={props.posts} />
        </div>
      </div>
    </Guest>
  );
}
