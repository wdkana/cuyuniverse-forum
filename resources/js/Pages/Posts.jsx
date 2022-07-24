import React, { useState } from "react";
import { Head } from "@inertiajs/inertia-react";
import PostsList from "@/Components/Homepage/PostsLists";
import Paginate from "@/Components/Homepage/Paginate";
import Guest from "@/Layouts/Guest";
import axios from "axios";

export default function PostsPage(props) {
    const [keyword, setKeyword] = useState("");
    const [posts, setPosts] = useState([]);
    const [meta, setMeta] = useState({});
    const [nodata, setNodata] = useState(false);

    const handleChange = (event) => {
        setKeyword(event.target.value);
    };

    const searchHandle = async (event) => {
        await axios
            .post(route("posts.more"), {
                keyword: keyword
            })
            .then((res) => {
                if (!res.data.data.length) {
                    setNodata(true);
                    return;
                }
                setPosts(res.data.data);
                setMeta({
                    current_page: res.data.current_page,
                    links: res.data.links
                });
            })
            .catch((err) => {
                throw err;
            });
    };

    return (
        <Guest auth={props.auth.user}>
            <Head title={props.title} />
            <div className="min-h-screen">
                <div className="text-center pt-6">
                    <h1 className="font-bold text-lg">✨ {props.title} ✨</h1>
                    <p className="text-sm">{props.description}</p>
                </div>
                <div className="flex flex-col">
                    <div className="pt-2 relative mx-auto text-gray-600">
                        <input
                            className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none dark:bg-slate-900 dark:border-gray-700 dark:placeholder-white"
                            type="search"
                            name="search"
                            onChange={handleChange}
                            placeholder="Search"
                        />
                        <button type="button" className="absolute right-0 top-0 mt-5 mr-4" onClick={searchHandle}>
                            <svg
                                className="text-gray-600 dark:text-white h-4 w-4 fill-current"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                version="1.1"
                                id="Capa_1"
                                x="0px"
                                y="0px"
                                viewBox="0 0 56.966 56.966"
                                width="512px"
                                height="512px"
                            >
                                <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                            </svg>
                        </button>
                    </div>
                </div>
                {nodata ? (
                    <div className="flex justify-center pt-5">
                        <div className="alert alert-warning shadow-lg text-white w-1/3">
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
                ) : (
                    <>
                        <div className="flex flex-col justify-center items-center lg:flex-row lg:flex-wrap lg:items-strech pt-6 px-4 gap-6">
                            <PostsList posts={!posts.length ? props.posts.data : posts} />
                        </div>
                        <div className="flex justify-center items-center py-6">
                            <Paginate meta={props.posts.meta} />
                        </div>
                    </>
                )}
            </div>
        </Guest>
    );
}
