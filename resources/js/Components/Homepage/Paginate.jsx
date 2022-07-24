import { Link } from "@inertiajs/inertia-react";
import RenderIfTrue from "@/helper/RenderIfTrue";

const Paginate = ({ meta }) => {
  const prev = meta.links[0].url;
  const next = meta.links[meta.links.length - 1].url;

  if (meta.last_page == 1) return null;
  return (
    <div className="btn-group">
      <RenderIfTrue isTrue={prev}>
        <Link href={prev} className="btn btn-sm btn-outline rounded-md">
          «
        </Link>
      </RenderIfTrue>
      <Link className="btn btn-sm btn-outline rounded-md">{meta.current_page}</Link>
      <RenderIfTrue isTrue={next}>
        <Link href={next} className="btn btn-sm btn-outline rounded-md">
          »
        </Link>
      </RenderIfTrue>
    </div>
  );
};

export default Paginate;
