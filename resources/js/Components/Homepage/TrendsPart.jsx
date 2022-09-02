import {Link} from "@inertiajs/inertia-react";

const TrendsPart = ({tags, countTags, linktag}) => {
  return (
    <Link
      as="div"
      href={`/?tag=${linktag}`}
      className="mt-2 p-2 hover:dark:bg-slate-800 hover:bg-gray-300 hover:cursor-pointer">
      <h2 className="font-semibold text-xl">#{tags}</h2>
      <p className="text-slate-500">{countTags} postingan</p>
    </Link>
  );
};

export default TrendsPart;
