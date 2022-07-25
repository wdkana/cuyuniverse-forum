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
        className="card w-full md:w-1/2 lg:w-1/3 xl:w-1/3 bg-base-100 dark:bg-slate-700 shadow-lg cursor-pointer transition-all duration-300 dark:hover:bg-gray-600 dark:text-white hover:-translate-y-1"
      >
        <Link
          href={`/post/${post.id}`}
          method="get"
          as="div"
          className="card-body p-6"
        >
          <div
            className={`text-xl ${post.description.length > 80 ? "overflow-x-hidden" : "break-words"
              } h-20`}
          >
            {post.description}
          </div>

          <div className="flex flex-row">
            <Link
              href={`/author/${post.author}`}
              as="button"
              method="get"
              className="avatar"
            >
              <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                {from?.page == "author" ?
                  <img
                    src={
                      from.author_image !== null
                        ? `/storage/images/${from.author_image}`
                        : "/storage/images/defaultavatar.png"
                    }
                  />
                  : <img
                    src={
                      post.users && post.users.image !== null
                        ? `/storage/images/${post.users.image}`
                        : "/storage/images/defaultavatar.png"
                    }
                  />}
              </div>
            </Link>
            <div className="text-sm ml-4">
              <p className="dark:text-white leading-none">
                {post.author}
              </p>
              <p className="text-xs break-normal">
                posted {formatTime(post.updated_at)} |{" "}
                {post.comments && post.comments.length > 0
                  ? post.comments.length
                  : "no"}{" "}
                comment
              </p>
            </div>
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
