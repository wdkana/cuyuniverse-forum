import React, { useEffect, useState } from "react";
import { Head } from "@inertiajs/inertia-react";
import PostsList from "@/Components/Homepage/PostsLists";
import PostsListImaged from "@/Components/Homepage/PostsListImaged";
import Guest from "@/Layouts/Guest";

export default function AuthorPage(props) {
  const thisData = {
    page: "author",
    author_image: props.author_image,
  };
  const { data: posts } = props.posts;

  const [postImageLength, setPostImageLength] = useState(0);
  useEffect(() => {
    let isImagedPost = true
    if (isImagedPost) {
      posts.filter(post => post.image !== null).map((post, i) => {
        setPostImageLength(i);
      })
    }
    return () => { isImagedPost = false };
  }, [posts])

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
        {posts.length > 0 ? (
          <div className="py-2 px-2 w-full lg:w-2/3 xl:w-5/6 lg:p-0 lg:py-2 mx-auto">
            {postImageLength > 0 &&
              <>
                <h1 className="font-sans font-bold text-2xl border-b-2 mb-4">Latest Image Posts</h1>
                <div className="flex flex-row gap-2 overflow-x-auto">
                  <PostsListImaged posts={posts} from={thisData} />
                </div>
              </>
            }
            <h1 className="font-sans font-bold text-2xl px-2 mt-4 border-b-2 mb-4">Readable Posts</h1>
            <div className="flex flex-row flex-wrap place-items-end gap-1 bg-base-200 md:gap-0 md:bg-base-100">
              <PostsList posts={posts} from={thisData} />
            </div>
          </div>
        ) : (
          <div className="flex justify-center pt-5">
            <div className="alert alert-warning w-11/12 md:w-1/3 rounded-sm text-slate-900 shadow-lg">
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
                <span>Belum ada postingan yang tersedia</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </Guest>
  );
}
