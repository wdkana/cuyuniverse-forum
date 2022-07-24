import React from "react";
import { Head } from "@inertiajs/inertia-react";
import PostsList from "@/Components/Homepage/PostsLists";
import Paginate from "@/Components/Homepage/Paginate";
import Guest from "@/Layouts/Guest";

export default function AuthorPage(props) {
  return (
    <Guest auth={props.auth.user}>
      <Head title={props.title} />
      <div className="min-h-screen">
        <div className="text-center pt-6">
          <div className={`avatar ${props.is_online ? "online" : "offline"}`}>
            <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img
                src={
                  props.author_image !== null
                    ? `/storage/images/${props.author_image}`
                    : "/storage/images/defaultavatar.png"
                }
              />
            </div>
          </div>
          <h1 className="text-xl font-bold">✨ {props.author} ✨</h1>
        </div>
        <div className="flex flex-col justify-center items-center lg:flex-row lg:flex-wrap lg:items-stretch p-4 gap-6">
          <PostsList posts={props.posts.data} from="authorPage" />
        </div>
        <div className="flex justify-center items-center p-4">
          <Paginate meta={props.posts} />
        </div>
      </div>
    </Guest>
  );
}
