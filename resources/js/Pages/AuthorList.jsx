import React, {useState, useEffect, useCallback, useRef} from "react";
import {Head, Link} from "@inertiajs/inertia-react";
import Guest from "@/Layouts/Guest";
import Paginate from "@/Components/Homepage/Paginate";
import {Inertia} from "@inertiajs/inertia";
import {debounce, pickBy} from "lodash";

export default function AuthorListPage(props) {
  const [keyword, setKeyword] = useState(props.filter.search);
  const isFirstRender = useRef(true);

  const reload = useCallback(
    debounce(q => {
      Inertia.get("/cuypeople/status", pickBy({search: q, page: props.filter.page}), {
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
    reload(keyword);
  }, [keyword]);

  return (
    <Guest auth={props.auth.user}>
      <Head title={props.title} />
      <div className="min-h-screen">
        <div className="pt-6 text-center">
          <h1 className="text-lg font-bold dark:text-white" data-aos="zoom-in" data-aos-duration="2500">
            ✨ {props.title} ✨
          </h1>
          <p className="text-sm dark:text-white" data-aos="zoom-in" data-aos-duration="3500">
            {props.description}
          </p>
        </div>
        <div className="my-7 flex w-full justify-center">
          <div className="flex w-11/12 justify-end lg:w-[77%]">
            <input
              className="h-10 w-96 rounded-lg border border-gray-200 bg-slate-100 placeholder:text-gray-600 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-100 dark:border-slate-500 dark:bg-slate-900 dark:placeholder:text-slate-100 dark:focus:border-slate-500 dark:focus:ring-0"
              autoComplete="off"
              type="text"
              name="search"
              id="search"
              placeholder="Search . . ."
              value={keyword || ""}
              onChange={e => setKeyword(e.target.value)}
              data-aos="fade-left"
              data-aos-duration="2000"
            />
          </div>
        </div>
        <div
          className="flex flex-col items-center justify-center gap-6 p-4 dark:text-white sm:flex-row sm:flex-wrap"
          data-aos="zoom-in"
          data-aos-duration="1000">
          {props.data
            .sort((a, b) => b.total_post - a.total_post)
            .map((user, i) => (
              <Link
                href={`/author/${user.username}`}
                as="button"
                className="flex w-full cursor-pointer flex-col items-center justify-center rounded-md shadow-lg transition-all duration-300 hover:-translate-y-1 dark:bg-slate-700 dark:shadow-slate-900 md:w-5/6 lg:w-1/3 xl:w-1/4"
                key={i}>
                <div className={`avatar ${user.is_online ? "online" : "offline"}`}>
                  <div className="w-16 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100">
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
                  <div className="text-sm">{user.is_online ? "online" : `offline ${user.last_seen}`}</div>
                  <div className="m-0 my-2 h-1 w-full bg-base-100 p-0"></div>
                  <div className="flex items-end justify-between">
                    <div className="text-sm">
                      {user.total_post == 0 ? "belum pernah posting" : `memiliki ${user.total_post} postingan`}
                    </div>
                    <div className="divider divider-horizontal">
                      {user.total_comment > 10 ? "📖" : user.total_post > 5 && user.total_comment > 10 ? "🐱‍💻" : "🗿"}
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

        <div className="mb-20 flex items-center justify-center md:mb-7" data-aos="fade-up" data-aos-duration="500">
          <Paginate meta={props.users} />
        </div>
      </div>
    </Guest>
  );
}
