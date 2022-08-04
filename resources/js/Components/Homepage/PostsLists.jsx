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
    let more = false;
    let desc = post.description
    if (desc.length > 30) {
      desc = desc.slice(0, 80)
      more = true
    }
    return (
      <div
        key={i}
        className="cursor-pointer md:border-2 md:p-2 bg-base-100 transition-all duration-300 hover:-translate-y-1 hover:bg-primary hover:text-primary-content dark:bg-slate-700 dark:text-white dark:hover:bg-gray-600 w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
        <Link href={`/post/${post.id}`} method="get" as="div" className="flex flex-col p-4 justify-evenly">
          <div className="text-md break-words h-20">
            {desc}
            {more && <span className="italic text-sm text-primary"> ...lebih lengkap</span>}
          </div>

          <div className="mt-2 flex flex-row items-center">
            <Link href={`/author/${post.author}`} as="button" method="get" className="avatar">
              <div className="w-6 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100">
                {from?.page == "author" ? (
                  <img
                    src={
                      from.author_image !== null
                        ? `/storage/images/${from.author_image}`
                        : "/storage/images/defaultavatar.png"
                    }
                  />
                ) : (
                  <img
                    src={
                      post.users && post.users.image !== null
                        ? `/storage/images/${post.users.image}`
                        : "/storage/images/defaultavatar.png"
                    }
                  />
                )}
              </div>
            </Link>
            <div className="ml-4 text-sm">
              <p className="leading-none dark:text-white">{post.author}</p>
              <p className="break-normal text-xs">
                posted {formatTime(post.updated_at)} |{" "}
                {post.comments && post.comments.length > 0 ? post.comments.length : "no"} comment
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
