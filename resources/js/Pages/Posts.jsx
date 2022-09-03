import React, {useEffect, useRef, useState} from "react";
import {Head, Link} from "@inertiajs/inertia-react";
import PostsList from "@/Components/Homepage/PostsLists";
import TrendsPart from "@/Components/Homepage/TrendsPart";

import Guest from "@/Layouts/Guest";
import {Inertia} from "@inertiajs/inertia";
import {FaArrowLeft} from "react-icons/fa";
import InfiniteScroll from "react-infinite-scroll-component";

export default function PostsPage(props) {
  const {auth, title, tags} = props;
  const {data: posts, meta, links} = props.posts;
  const [allPosts, setAllPosts] = useState([...posts]);
  const [tagParam, setQueryParam] = useState("");

  const parseParams = querystring => {
    const params = new URLSearchParams(querystring);
    const obj = {};
    for (const key of params.keys()) {
      if (params.getAll(key).length > 1) {
        obj[key] = params.getAll(key);
      } else {
        obj[key] = params.get(key);
      }
    }
    return obj;
  };

  useEffect(() => {
    let params = parseParams(window.location.search);
    setQueryParam(params.tag);
  }, []);

  const loadMorePosts = () => {
    Inertia.get(
      links.next,
      {},
      {
        preserveState: true,
        preserveScroll: true,
        only: ["posts"],
        onSuccess: ({props}) => {
          setAllPosts([...allPosts, ...props.posts.data]);
          window.history.replaceState({}, document.title, meta.path);
        },
      }
    );
  };

  return (
    <Guest auth={auth.user}>
      <Head title={title} />
      <div className="min-h-screen">
        <div>
          <div className="lg:mt-4">
            <div className="mb-4 flex flex-col gap-3 px-5 lg:flex-row">
              <div className="mt-3 block lg:hidden lg:w-2/5">
                <div className="w-full rounded-md bg-gray-200 p-3 shadow-md dark:bg-slate-900 ">
                  <h1 className="font-bold italic">Trends CuyUniverse</h1>
                  {tags.map((trend, i) => {
                    return <TrendsPart tags={trend.hashtag} linktag={trend.hashtag} key={i} />;
                  })}
                </div>
              </div>
              <div className="w-full rounded-md p-1 lg:w-3/5">
                {posts.length > 0 ? (
                  <InfiniteScroll
                    dataLength={allPosts.length}
                    next={loadMorePosts}
                    hasMore={links.next !== null}
                    loader={<h4 style={{textAlign: "center"}}>Loading...</h4>}
                    endMessage={
                      <p style={{textAlign: "center"}} className="mt-4">
                        <b>🌹...🌹</b>
                      </p>
                    }>
                    <div className="grid grid-cols-1 ">
                      <PostsList posts={allPosts} />
                    </div>
                  </InfiniteScroll>
                ) : (
                  <div className="flex justify-center pt-5">
                    <div className="alert alert-warning w-11/12 rounded-sm text-slate-900 shadow-lg md:w-1/3">
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
              <div className="mt-3 hidden lg:block lg:w-2/5">
                <div className="sticky top-20 w-full rounded-md bg-gray-200 p-3 shadow-md dark:bg-slate-900">
                  <h1 className="text-2xl font-bold italic">Trends CuyUniverse</h1>
                  {tags.map((trend, i) => {
                    return <TrendsPart tags={trend.hashtag} linktag={trend.hashtag} countTags={trend.count} key={i} />;
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Guest>
  );
}
