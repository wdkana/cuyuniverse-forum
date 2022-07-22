import RenderIfTrue from "@/helper/RenderIfTrue";
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
              post.description.length > 80 ? "overflow-x-hidden" : "break-words"
            } h-20`}
          >
            {post.description}
          </div>
          <div className="card-actions text-sm">
            <div className="text-xs">
              posted {formatTime(post.updated_at)} |{" "}
              {post.comments && post.comments.length > 0
                ? post.comments.length
                : "no"}{" "}
              comment
            </div>
          </div>
          <RenderIfTrue isTrue={from !== "authorPage"}>
            <div className="justify-end items-end flex flex-col">
              <Link
                href={`/author/${post.author}`}
                as="button"
                method="get"
                className="avatar"
              >
                <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img
                    src={
                      post.users && post.users.image !== null
                        ? `/storage/images/${post.users.image}`
                        : "/storage/images/defaultavatar.png"
                    }
                  />
                </div>
              </Link>
              <div className="py-2">{post.author}</div>
            </div>
          </RenderIfTrue>
        </Link>
      </div>
    );
  });
};

export default function PostsList(props) {
  if (!props.posts || !props.posts.length) return noPosts();
  return isPosts(props.posts, props.from);
}
