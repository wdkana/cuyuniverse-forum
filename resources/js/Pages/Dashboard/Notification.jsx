import React, { useEffect, useState } from "react";
import Authenticated from "@/Layouts/Authenticated";
import { Head, Link } from "@inertiajs/inertia-react";

export default function NotificationPage(props) {
  return (
    <Authenticated
      auth={props.auth}
      errors={props.errors}
      header={
        <div className="flex flex-row justify-between">
          <h2 className="font-semibold text-xl leading-tight cursor-default">{props.page}</h2>
          <Link href={route(`${props.nextRoute}`)} as="button" className="btn btn-sm btn-ghost leading-tight">
            {props.next}
          </Link>
        </div>
      }
    >
      <Head title="Notification" />
      <div className="overflow-hidden shadow-sm sm:rounded-lg p-4  ">
        <div className="flex flex-col justify-center items-center lg:flex-row lg:flex-wrap lg:items-center gap-4">
          <h1>COMING SOON ✌</h1>
        </div>
      </div>
      <div className="divider"></div>
    </Authenticated>
  );
}
