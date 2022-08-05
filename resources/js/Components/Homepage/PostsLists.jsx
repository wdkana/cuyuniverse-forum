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
  return posts.filter((post) => post.image == null).map((post, i) => {
    let more = false;
    let desc = post.description
    if (desc.length > 150) {
      desc = desc.slice(0, 150)
      more = true
    }
    return (
      <Link
        href={`/post/${post.id}`} method="get" as="div"
        key={i}
        className="card cursor-pointer md:py-2 md:px-1 bg-base-100 transition-all duration-300  dark:bg-slate-700 dark:text-white dark:hover:bg-gray-600 w-full md:w-full">
        <div className={`card-body rounded-md flex flex-col shadow-md m-2 md:m-0 p-4 justify-between hover:-translate-y-1 hover:bg-primary hover:text-primary-content dark:bg-none dark:shadow-none`}>
          {post.hashtag &&
            <Link className="card-title" as="a" href={`/?tag=${post.hashtag}`}>
              <div className="badge badge-primary text-primary-content">#{post.hashtag}</div>
            </Link>
          }
          <div className="text-xl break-words break-normal">
            {desc}
            {more && <span className="italic text-sm text-primary"> ...lebih lengkap</span>}
          </div>

          <div className="mt-2 py-2 flex flex-row items-center">
            <Link href={`/author/${post.author}`} as="button" method="get" className="avatar">
              <div className="w-8 rounded-full">
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
            <div className="ml-2 text-sm">
              <p className="leading-none dark:text-white">{post.author}</p>
              <p className="break-normal break-words">
                posted {formatTime(post.updated_at)} |{" "}
                {post.comments && post.comments.length > 0 ? post.comments.length : "no"} comment
              </p>
            </div>
          </div>
        </div>
      </Link>
    );
  });
};

export default function PostsList(props) {
  if (!props.posts || !props.posts.length) return noPosts();
  return isPosts(props.posts, props.from);
}
