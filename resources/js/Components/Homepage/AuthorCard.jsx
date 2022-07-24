import { Link } from "@inertiajs/inertia-react";

export default function AuthorCard({ user }) {
    return (
        <Link
            href={`/author/${user.username}`}
            as="button"
            className="flex flex-col rounded-md shadow-lg w-full md:w-5/6 lg:w-1/3 xl:w-1/4 justify-center items-center cursor-pointer hover:-translate-y-1 hover:transition-all dark:bg-slate-700 dark:shadow-slate-900"
        >
            <div className={`avatar ${user.is_online ? "online" : "offline"}`}>
                <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img
                        src={
                            user.author_image !== null
                                ? `/storage/images/${user.author_image}`
                                : "/storage/images/defaultavatar.png"
                        }
                    />
                </div>
            </div>
            <div className="stat">
                <div className="text-md">{user.username}</div>
                <div className="text-sm">{user.is_online ? "online" : `offline ${user.last_seen}`}</div>
                <div className="p-0 m-0 my-2 h-1 bg-base-100 w-full"></div>
                <div className="flex justify-between items-end">
                    <div className="text-sm">
                        {user.total_post == 0 ? "belum pernah posting" : `memiliki ${user.total_post} postingan`}
                    </div>
                    <div className="divider divider-horizontal">
                        {user.total_comment > 10
                            ? "📖"
                            : user.total_post > 5 && user.total_comment > 10
                            ? "🐱‍💻"
                            : "🗿"}
                    </div>
                    <div className="text-sm">
                        {user.total_post == 0
                            ? "belum pernah komentar"
                            : `telah mengomentari ${user.total_comment} postingan`}
                    </div>
                </div>
            </div>
        </Link>
    );
}
