import React, { useState, useEffect, useCallback } from "react";
import { Head, Link } from "@inertiajs/inertia-react";
import Guest from "@/Layouts/Guest";
import Paginate from "@/Components/Homepage/Paginate";
import { Inertia } from "@inertiajs/inertia";
import { debounce, pickBy } from "lodash";

export default function AuthorListPage(props) {
    const [keyword, setKeyword] = useState(props.filter.search);
    const reload = useCallback(
      debounce((q) => {
        Inertia.get(
          "/cuypeople/status",
          pickBy({ search: q, page: props.filter.page }),
          {
            preserveState: true,
          }
        );
      }, 500),
      []
    );
    
    useEffect(() => reload(keyword), [keyword]);
  return (
    <Guest auth={props.auth.user}>
      <Head title={props.title} />
      <div className="min-h-screen">
        <div className="text-center pt-6">
          <h1 className="font-bold text-lg dark:text-white">✨ {props.title} ✨</h1>
          <p className="text-sm dark:text-white">{props.description}</p>
        </div>
        <div className="w-full flex justify-center my-7">
          <div className="w-11/12 lg:w-[77%] flex justify-end">
              <input
                className="h-10 w-96 bg-slate-100 dark:bg-slate-900 placeholder:text-gray-600 dark:placeholder:text-slate-100 focus:outline-none focus:ring focus:ring-blue-100 focus:border-blue-400 dark:focus:border-slate-500 dark:focus:ring-0 border rounded-lg border-gray-200 dark:border-slate-500"
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
        <div className="flex flex-col justify-center items-center sm:flex-row sm:flex-wrap p-4 gap-6 dark:text-white">
          {props.data
            .sort((a, b) => b.total_post - a.total_post)
            .map((user, i) => (
              <Link
                href={`/author/${user.username}`}
                as="button"
                className="flex flex-col rounded-md shadow-lg w-full md:w-5/6 lg:w-1/3 xl:w-1/4 justify-center items-center cursor-pointer hover:-translate-y-1 transition-all duration-300 dark:bg-slate-700 dark:shadow-slate-900"
                key={i}
              >
                <div
                  className={`avatar ${user.is_online ? "online" : "offline"}`}
                >
                  <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img
                      src={
                        user.author_image !== null
                          ? `/storage/images/${user.author_image}`
                          : "/storage/images/defaultavatar.png"
                      }
                    />
                  </div>
                </div>
                <div className="stat">
                  <div className="text-md">{user.username}</div>
                  <div className="text-sm">
                    {user.is_online ? "online" : `offline ${user.last_seen}`}
                  </div>
                  <div className="p-0 m-0 my-2 h-1 bg-base-100 w-full"></div>
                  <div className="flex justify-between items-end">
                    <div className="text-sm">
                      {user.total_post == 0
                        ? "belum pernah posting"
                        : `memiliki ${user.total_post} postingan`}
                    </div>
                    <div className="divider divider-horizontal">
                      {user.total_comment > 10
                        ? "📖"
                        : user.total_post > 5 && user.total_comment > 10
                        ? "🐱‍💻"
                        : "🗿"}
                    </div>
                    <div className="text-sm">
                      {user.total_post == 0
                        ? "belum pernah komentar"
                        : `telah mengomentari ${user.total_comment} postingan`}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
        </div>

        <div className="flex justify-center items-center p-4">
          <Paginate meta={props.users} />
        </div>
      </div>
    </Guest>
  );
}
