import React, { useCallback, useEffect, useState } from "react";
import { Head, Link } from "@inertiajs/inertia-react";
import PostsList from "@/Components/Homepage/PostsLists";
import Paginate from "@/Components/Homepage/Paginate";
import Guest from "@/Layouts/Guest";
import { debounce, pickBy } from "lodash";
import { Inertia } from "@inertiajs/inertia";
import { Menu } from "@headlessui/react";

const menus = [
  { name: "latest", value: "latest" },
  { name: "oldest", value: "oldest" },
];

export default function PostsPage(props) {
  const { auth, title, description, filter } = props;
  const { data: posts, meta } = props.posts;
  const [keyword, setKeyword] = useState(filter.search);

  const reload = useCallback(
    debounce((q) => {
      Inertia.get(
        "/posts",
        pickBy({ search: q, page: filter.page, filtered: filter.filtered }),
        {
          preserveState: true,
        }
      );
    }, 500),
    []
  );

  useEffect(() => reload(keyword), [keyword]);
  return (
    <Guest auth={auth.user}>
      <Head title={title} />
      <div className="min-h-screen">
        <div className="text-center pt-6">
          <h1 className="font-bold text-lg">✨ {title} ✨</h1>
          <p className="text-sm">{description}</p>
        </div>
        <div className="flex justify-center pt-5 lg:px-0 px-5">
          <div className="w-full lg:w-2/3 flex justify-between">
            <div className="flex">
              <Menu
                as="div"
                className="relative focus-within:ring focus-within:ring-blue-100 focus-within:border-blue-300 dark:focus-within:ring-0 dark:focus-within:border-slate-500 transition duration-200 rounded-lg border dark:border-slate-200 text-gray-600 dark:text-slate-100"
              >
                <Menu.Button className="capitalize flex items-center justify-between rounded-lg focus:outline-none bg-slate-100 dark:bg-slate-900 h-10 pl-3 pr-2 w-full lg:w-52">
                  {!filter.filtered ? "All" : filter.filtered}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Menu.Button>
                <Menu.Items className="absolute w-52 z-50 bg-white dark:bg-slate-600 shadow rounded-lg mt-1.5 overflow-hidden py-0.5 text-gray-900 dark:text-slate-100">
                  {menus.map((menu, key) => {
                    return menu.name == "line" ? (
                      <div
                        key={key}
                        className="h-px bg-gray-200 my-0.5 w-full"
                      ></div>
                    ) : (
                      <Menu.Item key={key}>
                        <Link
                          preserveState
                          className={`block px-4 py-2 hover:bg-gray-100 dark:hover:bg-slate-600 font-medium capitalize text-sm`}
                          href={`/posts?filtered=${menu.value}`}
                        >
                          {menu.name}
                        </Link>
                      </Menu.Item>
                    );
                  })}
                </Menu.Items>
              </Menu>
            </div>
            <div>
              <input
                className="h-10 bg-slate-100 dark:bg-slate-900 placeholder:text-gray-600 dark:placeholder:text-slate-100 focus:outline-none focus:ring focus:ring-blue-100 focus:border-blue-400 dark:focus:border-slate-500 dark:focus:ring-0 border rounded-lg border-gray-200 dark:border-slate-500"
                autoComplete="off"
                type="text"
                name="search"
                id="search"
                placeholder="Search . . ."
                value={keyword || ''}
                onChange={(e) => setKeyword(e.target.value)}
              />
            </div>
          </div>
        </div>
        {posts.length ? (
          <>
            <div className="flex flex-col justify-center items-center lg:flex-row lg:flex-wrap lg:items-strech py-6 px-4 gap-6">
              <PostsList posts={posts} />
            </div>
            <div className="flex justify-center items-center py-6">
              <Paginate meta={meta} />
            </div>
          </>
        ) : (
          <div className="flex justify-center pt-5">
            <div className="alert alert-warning rounded-md shadow-lg text-slate-900 w-1/3">
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
                <span>Tidak ada postingan yang tersedia</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </Guest>
  );
}
