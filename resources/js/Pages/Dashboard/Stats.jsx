import React from "react";
import { Head, Link } from "@inertiajs/inertia-react";
import Authenticated from "@/Layouts/Authenticated";

export default function Stats(props) {
  return (
    <Authenticated
      auth={props.auth}
      errors={props.errors}
      header={
        <div className="flex flex-row justify-between dark:text-white">
          <h2 className="font-semibold text-xl leading-tight cursor-default">
            {props.title}
          </h2>
          <Link
            href={`${route(props.nextRoute)}`}
            method="get"
            as="button"
            className="btn btn-sm btn-ghost leading-tight"
          >
            {props.next}
          </Link>
        </div>
      }
    >
      <Head title="Statistics" />
      <div className="flex justify-center">
        <div className="stats stats-vertical md:stats-horizontal shadow dark:bg-slate-900 dark:text-white">

          <div className="stat place-items-center">
            <div className="stat-figure text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
            </div>
            <div className="stat-title">Total Likes Earned</div>
            <div className="stat-value text-primary">{props.likes_count}</div>
          </div>

          <div className="stat place-items-center">
            <div className="stat-figure text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 8l-5-5-5 5M12 4.2v10.3"></path></svg>
            </div>
            <div className="stat-title">Total Posts Published</div>
            <div className="stat-value text-primary">{props.posts_count}</div>
          </div>

        </div>
      </div>
    </Authenticated>
  );
}
