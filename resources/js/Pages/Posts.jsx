import React, { useCallback, useEffect, useRef, useState } from "react";
import { Head, Link } from "@inertiajs/inertia-react";
import PostsList from "@/Components/Homepage/PostsLists";
import Paginate from "@/Components/Homepage/Paginate";
import Guest from "@/Layouts/Guest";
import { debounce, pickBy } from "lodash";
import { Inertia } from "@inertiajs/inertia";
import { Menu } from "@headlessui/react";
import { FaArrowLeft } from "react-icons/fa";

const menus = [
  { name: "latest", value: "latest" },
  { name: "oldest", value: "oldest" },
];

export default function PostsPage(props) {
  const { auth, title, filter, } = props;
  const { data: posts, meta } = props.posts;
  const [keyword, setKeyword] = useState(filter.search);
  const [tag, setTag] = useState(filter.tag);
  const isFirstRender = useRef(true);

  const reload = useCallback(
    debounce((q, x) => {
      Inertia.get("/", pickBy({ search: q, page: filter.page, filtered: filter.filtered, tag: x }), {
        preserveState: true,
      });
    }, 500),
    []
  );

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    reload(keyword, null)
    tag && reload(null, tag)
  }, [keyword, tag]);

  return (
    <Guest auth={auth.user}>
      <Head title={title} />
      <div className="min-h-screen">
        {!tag &&
          <div className="flex justify-center px-5 pt-5 lg:px-0">
            <div className="flex w-full justify-between lg:w-2/3 xl:w-5/6">
              <div className="flex w-4/12 rounded-sm border dark:border-slate-500 md:w-52 lg:w-52">
                <Menu
                  as="div"
                  className="w-full text-gray-600 transition duration-200 focus-within:ring focus-within:ring-blue-100 dark:text-slate-100 dark:focus-within:ring-0">
                  <Menu.Button className="flex h-10 w-full items-center justify-between rounded-sm bg-slate-100 pl-3 pr-2 capitalize focus:outline-none dark:bg-slate-900">
                    {!filter.filtered ? "All" : filter.filtered}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-400"
                      viewBox="0 0 20 20"
                      fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Menu.Button>
                  <Menu.Items className="relative mt-1.5 overflow-hidden rounded-sm bg-white py-0.5 text-gray-900 shadow dark:bg-slate-600 dark:text-slate-100">
                    {menus.map((menu, key) => {
                      return menu.name == "line" ? (
                        <div key={key} className="my-0.5 h-px w-full bg-gray-200"></div>
                      ) : (
                        <Menu.Item key={key}>
                          <Link
                            preserveState
                            className={`block px-4 py-2 text-sm font-medium capitalize hover:bg-gray-100 dark:hover:bg-slate-600 md:w-52`}
                            href={`?filtered=${menu.value}`}>
                            {menu.name}
                          </Link>
                        </Menu.Item>
                      );
                    })}
                  </Menu.Items>
                </Menu>
              </div>
              <div className="w-6/12 md:w-52 lg:w-52">
                <input
                  className="h-10 w-full rounded-sm border border-gray-200 bg-slate-100 placeholder:text-gray-600 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-100 dark:border-slate-500 dark:bg-slate-900 dark:placeholder:text-slate-100 dark:focus:border-slate-500 dark:focus:ring-0"
                  autoComplete="off"
                  type="search"
                  name="search"
                  id="search"
                  placeholder="Search . . ."
                  defaultValue={keyword || ""}
                  onKeyUp={e => e.code === "Enter" && setKeyword(e.target.value)}
                />
              </div>
            </div>
          </div>
        }
        {props.tags && props.tags.length > 0 &&
          <div className="py-2 px-2 w-full lg:w-2/3 xl:w-5/6 lg:p-0 lg:py-2 lg:mx-auto">
            <div className="flex flex-row flex-wrap bg-primary text-primary-content rounded-sm overflow-hidden">
              {tag ? <Link href={route('outer.main')} as="button" className="p-1"><FaArrowLeft /></Link> : <h5 className="p-1 italic">in trending</h5>}
              {props.tags.map((trend, i) => {
                return (
                  <span className="py-1" key={i}>
                    <p
                      name="tag"
                      className={`${tag == props.tags[i].hashtag && 'bg-white text-black'} font-bold link px-2 hover:cursor-pointer hover:bg-white hover:text-black`}
                      onClick={() => setTag(trend.hashtag)}>
                      #{trend.hashtag}
                    </p>
                  </span>
                )
              })}
            </div>
          </div>
        }
        {posts.length > 0 ? (
          <>
            <div
              className="w-full p-2 mx-auto md:w-4/3 lg:w-4/6 xl:w-5/6 md:p-0"
              data-aos="zoom-in"
              data-aos-duration="500">
              <div className="flex flex-row flex-wrap gap-1 md:gap-0 bg-base-200 md:bg-base-100">
                <PostsList posts={posts} />
              </div>
            </div>
            {meta.last_page > 1
              && <div className="mb-10 lg:mb-2 flex items-center justify-center md:mb-7">
                <Paginate meta={meta} />
              </div>
            }
          </>
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
    </Guest >
  );
}
