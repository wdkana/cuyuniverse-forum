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
    let desc_no_image = post.description
    let desc_with_image = post.description
    if (post.image && post.description.length > 20) {
      desc_with_image = desc_with_image.slice(0, 20)
      more = true
    }
    if (!post.image && post.description.length > 150) {
      desc_no_image = desc_no_image.slice(0, 150)
      more = true
    }
    return (
      <Link
        href={`/post/${post.id}`} method="get" as="div"
        key={i}
        className="card-normal cursor-pointer md:py-2 md:px-1 bg-base-100 transition-all duration-300  dark:bg-slate-700 dark:text-white dark:hover:bg-gray-600 w-full md:w-1/2 md:h-full">
        {post.image &&
          <img src={`/storage/images/posts/${post.image}`} className="relative pt-2 md:pt-0 block md:max-h-72 w-auto h-auto min-w-full" />
        }
        <div className={`flex flex-col shadow-md p-4 justify-between h-auto hover:-translate-y-1 hover:bg-primary hover:text-primary-content`}>
          <div className="text-md break-words break-all">
            {post.image ? desc_with_image : desc_no_image}
            {more && <span className="italic text-sm text-primary"> ...lebih lengkap</span>}
          </div>

          <div className="mt-2 py-2 flex flex-row items-center">
            <Link href={`/author/${post.author}`} as="button" method="get" className="avatar">
              <div className="w-6 rounded-full">
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
            <div className="ml-2 text-2xs">
              <p className="leading-none dark:text-white">{post.author}</p>
              <p className="break-normal">
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
