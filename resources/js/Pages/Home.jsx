import React from "react";
import { Link, Head } from "@inertiajs/inertia-react";
import PostsList from "@/Components/Homepage/PostsLists";
import Hero from "@/Components/Homepage/Hero";
import Guest from "@/Layouts/Guest";
import Announcemenet from "@/Components/Homepage/Announcement";

export default function HomePage(props) {
  return (
    <Guest auth={props.auth.user}>
      <Head title={props.title} />
      <div className="min-h-screen">
        <Hero />
        <div className="pb-2 flex justify-center">
          <Announcemenet />
        </div>
        <div className="flex flex-col justify-center items-center lg:flex-row lg:flex-wrap lg:items-strech py-6 px-4 gap-6">
          <PostsList posts={props.posts.data} />
        </div>
        {props.posts.data.length > 3 && (
          <div className="flex flex-col justify-center items-center lg:flex-row lg:flex-wrap lg:items-stretch py-4 gap-4">
            <Link href={route("outer.posts")} as="button" className="btn btn-ghost btn-sm rounded-md">
              Lihat Semua Postingan
            </Link>
          </div>
        )}
      </div>
    </Guest>
  );
}
