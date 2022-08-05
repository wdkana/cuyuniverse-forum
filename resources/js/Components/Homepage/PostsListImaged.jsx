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

const isPostsWithImage = (posts, from) => {
  return posts.filter(post => post.image !== null).map((post, i) => {
    let more = false;
    let desc = post.description
    if (desc.length > 60) {
      desc = desc.slice(0, 60)
      more = true
    }
    return <Link
      href={`/post/${post.id}`} method="get" as="div" className="flex cursor-pointer" key={i}>
      <div className="z-0 card bg-base-100 shadow-xl w-full max-h-72 image-full">
        <figure><img src={`/storage/images/posts/${post.image}`} alt="Post Image" height={200} width={200} /></figure>
        <div className="card-body w-80">
          {post.hashtag &&
            <Link className="card-title w-1/2" as="a" href={`/?tag=${post.hashtag}`}>
              <div className="badge badge-primary text-primary-content">#{post.hashtag}</div>
            </Link>
          }
          <p className="text-sm">{desc} {more && <span className="italic text-sm text-white break-words break-normal"> ...lebih lengkap</span>}</p>
          <div className="w-full flex flex-row flex-wrap gap-2 p-2 absolute bottom-0 left-0 bg-opacity-70 text-white bg-black">
            <Link href={`/author/${post.author}`} as="button" method="get" className="avatar cursor-pointer">
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
            <div className="badge badge-outline">{post.author}</div>
            <p className="break-words break-normal text-2xs">
              posted {formatTime(post.updated_at)} |{" "}
              {post.comments && post.comments.length > 0 ? post.comments.length : "no"} comment
            </p>
          </div>
        </div>
      </div>
    </Link>
  })
}

export default function PostsListImage(props) {
  if (!props.posts || !props.posts.length) return noPosts();
  return isPostsWithImage(props.posts, props.from)
}
