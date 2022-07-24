import React from "react";
import Authenticated from "@/Layouts/Authenticated";
import { Link, Head } from "@inertiajs/inertia-react";

export default function PostManagementPage(props) {
    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl leading-tight">{props.title}</h2>}
        >
            <Head title={props.title} />
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row w-full gap-4">
                    <Link href={route("posts.create")} method="get" as="button" className="btn btn-outline rounded-md">
                        Create New Post
                    </Link>
                    <Link href={route("posts.main")} method="get" as="button" className="btn btn-outline rounded-md">
                        Manage My Post
                    </Link>
                </div>
            </div>
        </Authenticated>
    );
}
