import React from "react";
import { Head } from "@inertiajs/inertia-react";
import PostsList from "@/Components/Homepage/PostsLists";
import Paginate from "@/Components/Homepage/Paginate";
import Guest from "@/Layouts/Guest";

export default function PostsPage(props) {
    return (
        <Guest auth={props.auth.user}>
            <Head title={props.title} />
            <div className="min-h-screen">
                <div className="text-center pt-6">
                    <h1 className="font-bold text-lg">✨ {props.title} ✨</h1>
                    <p className="text-sm">{props.description}</p>
                </div>
                <div className="flex flex-col justify-center items-center lg:flex-row lg:flex-wrap lg:items-strech pt-6 px-4 gap-6">
                    <PostsList posts={props.posts.data} />
                </div>
                <div className="flex justify-center items-center py-6">
                    <Paginate meta={props.posts.meta} />
                </div>
            </div>
        </Guest>
    );
}
