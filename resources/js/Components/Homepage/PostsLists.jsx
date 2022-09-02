import {formatTime} from "@/utils/jsHelper";
import {Link} from "@inertiajs/inertia-react";

const noPosts = () => {
  return (
    <div className="text-center">
      <h6 className="font-bold">
        <progress className="progress w-56"></progress>
      </h6>
    </div>
  );
};

String.prototype.parseHashtag = function () {
  return this.replace(/[#]+[A-Za-z0-9-_]+/g, function (t) {
    var tag = t.replace("#", "");
    return '<a href="?tag=' + tag + '" target="_blank">#' + tag + "</a>";
  });
};

const isPosts = (posts, from) => {
  return posts.map((post, i) => {
    let more = false;
    let desc = post.description;

    if (desc.length > 150) {
      desc = desc.slice(0, 150);
      more = true;
    }
    return (
      <div
        className="rounded-sm p-4 shadow-lg border border-gray-200 dark:border-slate-900 "
        method="get"
        as="div"
        key={i}>
        <div className="flex flex-col md:flex-row">
          <div className="flex">
            {from?.page == "author" ? (
              <img
                className="h-14 w-14 rounded-full"
                src={
                  from.author_image !== null
                    ? `/storage/images/${from.author_image}`
                    : "/storage/images/defaultavatar.png"
                }
                loading="lazy"
              />
            ) : (
              <img
                className="h-14 w-14 rounded-full"
                src={
                  post.users && post.users.image !== null
                    ? `/storage/images/${post.users.image}`
                    : "/storage/images/defaultavatar.png"
                }
                loading="lazy"
              />
            )}

            <div className="ml-3">
              <div className="flex items-center gap-1">
                <a
                  className="text-xl font-semibold text-black hover:underline cursor-pointer dark:text-white"
                  href={`author/${post.author}`}>
                  {post.author}
                </a>
                <span className="text-xs"> - {formatTime(post.updated_at).replace("about", "")}</span>
              </div>

              <p className="text-sm font-normal text-black dark:text-white">
                {post.hashtag && (
                  <Link className="card-title mb-3" as="a" href={`/?tag=${post.hashtag}`}>
                    <div className="badge badge-primary text-xs ">#{post.hashtag}</div>
                  </Link>
                )}
                {desc}

                {more && (
                  <Link className="italic text-sm text-primary cursor-pointer" href={`/post/${post.id}`}>
                    {" "}
                    ...lebih lengkap
                  </Link>
                )}
              </p>
              {post.image && (
                <img
                  src={`/storage/images/posts/${post.image}`}
                  className="mt-2 h-44 w-screen rounded-md bg-cover"
                  alt="gambar"
                  loading="lazy"
                />
              )}
              <div className="mt-4 flex items-center gap-3">
                <Link className="flex items-center gap-2" href={`/post/${post.id}`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 hover:text-teal-500 cursor-pointer">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                    />
                  </svg>
                  <span>{post.comments && post.comments.length > 0 ? post.comments.length : 0} </span>
                </Link>
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 hover:text-red-500 cursor-pointer">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                    />
                  </svg>
                  <span></span>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="py-4">
            {from?.page == "author" ? (
              <img
                className="h-14 w-14 md:h-20 md:w-20 rounded-full"
                src={
                  from.author_image !== null
                    ? `/storage/images/${from.author_image}`
                    : "/storage/images/defaultavatar.png"
                }
                loading="lazy"
              />
            ) : (
              <img
                className="h-14 w-14 md:h-20 md:w-20 rounded-full"
                src={
                  post.users && post.users.image !== null
                    ? `/storage/images/${post.users.image}`
                    : "/storage/images/defaultavatar.png"
                }
                loading="lazy"
              />
            )}
          </div>
          <div className="flex flex-col">
            <h1 className="md:text-xl text-base font-semibold mt-4 -ml-1">
              {post.author} . <span className="text-xs">{formatTime(post.updated_at).replace("about", "")}</span>
            </h1>
            <p className="md:text-sm font-normal text-xs -ml-1">
              {desc}
              {more && <span className="italic text-sm text-primary"> ...lebih lengkap</span>}
            </p>
            <div className="mt-4">
              {post.image && (
                <img
                  src={`/storage/images/posts/${post.image}`}
                  className="md:h-72 w-80 md:w-full rounded-md object-fill"
                  alt="gambar"
                  loading="lazy"
                />
              )}
              {post.hashtag && (
                <Link className="card-title" as="a" href={`/?tag=${post.hashtag}`}>
                  <div className="badge badge-primary text-primary-content">#{post.hashtag}</div>
                </Link>
              )}
            </div>
            <div className="mt-4">
              <div className="flex flex-row items-center gap-4 hover:cursor-pointer">
                <div className="flex flex-initial items-center gap-2 -ml-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 hover:text-teal-500">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
                    />
                  </svg>
                  <span>{post.comments && post.comments.length > 0 ? post.comments.length : 0} </span>
                </div>
                <div className="flex flex-initial items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 hover:text-red-500">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                    />
                  </svg>
                  <span></span>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    );
  });
};

export default function PostsList(props) {
  if (!props.posts || !props.posts.length) return noPosts();
  return isPosts(props.posts, props.from);
}
