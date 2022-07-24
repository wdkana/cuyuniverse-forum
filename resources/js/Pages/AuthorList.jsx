import AuthorCard from "@/Components/Homepage/AuthorCard";
import Guest from "@/Layouts/Guest";
import { Head } from "@inertiajs/inertia-react";

export default function AuthorListPage(props) {
  const scrollToTop = () => {
    return window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  return (
    <Guest auth={props.auth.user}>
      <Head title={props.title} />
      <div className="min-h-screen">
        <div className="text-center pt-6">
          <h1 className="font-bold text-lg">✨ {props.title} ✨</h1>
          <p className="text-sm">{props.description}</p>
        </div>
        <div className="flex flex-col justify-center items-center sm:flex-row sm:flex-wrap p-4 gap-6">
          {props.data
            .sort((a, b) => b.total_post - a.total_post)
            .map((user, i) => (
              <AuthorCard key={i} {...user} />
            ))}
        </div>
        {props.data.length > 20 && (
          <div className="text-center py-6">
            <button onClick={() => scrollToTop()} className="btn btn-ghost text-white btn-sm">
              Kembali Ke Atas
            </button>
          </div>
        )}
      </div>
    </Guest>
  );
}
