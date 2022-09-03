import {formatTime} from "@/utils/jsHelper";
import {Link} from "@inertiajs/inertia-react";
import {AiOutlineHeart, AiFillHeart} from "react-icons/ai";
import {BsChat} from "react-icons/bs";
import PopupComment from "../utils/modal";

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
        className="rounded-sm border border-gray-200 p-4 shadow-lg dark:border-slate-900 "
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
                  className="cursor-pointer text-xl font-semibold text-black hover:underline dark:text-white"
                  href={`author/${post.author}`}>
                  {post.author}
                </a>
                <span className="text-xs"> - {formatTime(post.updated_at).replace("about", "")}</span>
              </div>

              <div className="text-lg font-normal text-black dark:text-white lg:text-xl">
                {post.hashtag && (
                  <Link className="card-title mb-3" as="a" href={`/?tag=${post.hashtag}`}>
                    <div className="badge badge-primary ">#{post.hashtag}</div>
                  </Link>
                )}
                {desc}

                {more && (
                  <Link className="cursor-pointer text-sm italic text-primary" href={`/post/${post.id}`}>
                    {" "}
                    ...lebih lengkap
                  </Link>
                )}
              </div>
              {post.image && (
                <img
                  src={`/storage/images/posts/${post.image}`}
                  className="mt-2 h-96 w-screen rounded-md object-cover"
                  alt="gambar"
                  loading="lazy"
                />
              )}
              <div className="mt-4 flex items-center gap-3">
                <PopupComment
                  activator={({setShow}) => (
                    <button className="flex items-center gap-2" onClick={() => setShow(true)}>
                      <BsChat className="h-6 w-6 cursor-pointer hover:text-teal-500" />
                      <span>{post.comments && post.comments.length > 0 ? post.comments.length : 0} </span>
                    </button>
                  )}>
                  {post.id}
                </PopupComment>
                <div className="flex items-center gap-2">
                  <AiOutlineHeart className="h-6 w-6 cursor-pointer hover:text-red-500" />
                  <span></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  });
};

export default function PostsList(props) {
  if (!props.posts || !props.posts.length) return noPosts();
  return isPosts(props.posts, props.from);
}
