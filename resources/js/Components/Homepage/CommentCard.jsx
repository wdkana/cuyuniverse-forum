import { Link } from "@inertiajs/inertia-react";
import { formatTime } from "@/utils/jsHelper";

export default function CommentCard({ comment }) {
  return (
    <div className="border-b-2 flex flex-col p-2">
      <div className="text-md font-mono font-bold">{comment.description}</div>
      <Link
        href={`/author/${comment.commentartor}`}
        as="div"
        method="get"
        className="mt-2 p-2 items-end justify-end flex gap-1 flex-row text-xs cursor-pointer hover:cursor-pointer hover:translate-x-1 hover:transition-all"
      >
        <div className="mr-1">
          comment {formatTime(comment.created_at)} by {comment.commentartor}
        </div>
        <div className="avatar">
          <div className="w-6 rounded-full">
            <img
              src={
                comment.users.image !== null
                  ? `/storage/images/${comment.users.image}`
                  : "/storage/images/defaultavatar.png"
              }
            />
          </div>
        </div>
      </Link>
    </div>
  );
}
