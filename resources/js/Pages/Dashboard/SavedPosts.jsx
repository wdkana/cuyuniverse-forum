import React from "react";
import {Head} from "@inertiajs/inertia-react";
import Authenticated from "@/Layouts/Authenticated";
import PostsList from "@/Components/Homepage/PostsLists";

export default function SavedPost(props) {
  const data = props.data.map(value => {
    const comments = value.comments;
    return {...value.posts, comments};
  });

  return (
    <Authenticated auth={props.auth} errors={props.errors}>
      <Head title={props.title} />
      <div className="min-h-screen dark:text-white">
        {data.length > 0 ? (
          <>
            <div className="pt-6 text-center">
              <h1 className="text-lg font-bold">✨ {props.page} ✨</h1>
            </div>
            <div className="lg:items-strech flex flex-col items-center justify-center gap-6 py-6 px-4 lg:flex-row lg:flex-wrap">
              <PostsList posts={data} />
            </div>
          </>
        ) : (
          <div className="pt-6 text-center">
            <h1 className="text-lg font-bold">Belum ada postingan yang anda simpan 😥</h1>
          </div>
        )}
      </div>
    </Authenticated>
  );
}
