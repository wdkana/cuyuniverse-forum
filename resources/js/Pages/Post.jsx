import React from "react";
import {Head} from "@inertiajs/inertia-react";
import PostList from "@/Components/Homepage/PostList";
import Guest from "@/Layouts/Guest";

export default function PostPage(props) {
  return (
    <Guest auth={props.auth.user}>
      <Head title={props.title} />
      <div className="min-h-screen">
        <div className="pt-6 text-center">
          <h1 className="text-lg font-bold dark:text-white" data-aos="zoom-in" data-aos-duration="1500">
            ✨ {props.title} ✨
          </h1>
        </div>
        <div
          className="flex  flex-col items-center justify-center gap-6 px-2 pt-6 lg:flex-row lg:flex-wrap lg:items-stretch lg:px-4"
          data-aos="zoom-in"
          data-aos-duration="500">
          <PostList
            posts={props.posts}
            comments={props.comments}
            user={props.auth.user}
            author_image={props.author_image}
            is_saved_post={props.is_saved_post}
            is_liked_post={props.is_liked_post}
            notif={props.flash.message}
          />
        </div>
      </div>
    </Guest>
  );
}
