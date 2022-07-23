import { formatTime } from "@/utils/jsHelper";
import { Link } from "@inertiajs/inertia-react";

const noPosts = () => {
    return (
        <div className="text-center">
            <h6 className="font-bold">
                <progress className="progress w-56"></progress>
            </h6>
        </div>
    );
};

const isPosts = (posts, from) => {
    return posts.map((post, i) => {
        return (
            <div
                key={i}
                className="card w-full md:w-1/2 lg:w-1/3 xl:w-1/3 bg-base-100 shadow-lg cursor-pointer hover:transition-all hover:delay-75 hover:-translate-y-1 hover:bg-neutral"
            >
                <Link
                    href={`/post/${post.id}`}
                    method="get"
                    as="div"
                    className="card-body p-6"
                >
                    <div
                        className={`text-xl ${
                            post.description.length > 80
                                ? "overflow-x-hidden"
                                : "break-words"
                        } h-20`}
                    >
                        {post.description}
                    </div>

                    <div class="flex flex-row">
                        <div className="basis-1/2 content-end card-actions text-sm">
                            <div className="text-xs break-normal">
                                posted {formatTime(post.updated_at)} |{" "}
                                {post.comments && post.comments.length > 0
                                    ? post.comments.length
                                    : "no"}{" "}
                                comment
                            </div>
                        </div>

                        {from !== "authorPage" && (
                            <div className="basis-1/2 flex flex-col items-end">
                                <Link
                                    href={`/author/${post.author}`}
                                    as="button"
                                    method="get"
                                    className="avatar"
                                >
                                    <div className="w-12 mx-5 rounded-full ring ring-indigo-300 ring-offset-base-100 ring-offset-2">
                                        <img
                                            src={
                                                post.users &&
                                                post.users.image !== null
                                                    ? `/storage/images/${post.users.image}`
                                                    : "/storage/images/defaultavatar.png"
                                            }
                                        />
                                    </div>
                                </Link>
                                <div className="py-2">{post.author}</div>
                            </div>
                        )}
                    </div>
                </Link>
            </div>
        );
    });
};

export default function PostsList(props) {
    if (!props.posts || !props.posts.length) return noPosts();
    return isPosts(props.posts, props.from);
}
