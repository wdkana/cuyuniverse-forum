import { Link } from "@inertiajs/inertia-react";
import React from "react";

export default function Paginate({ meta }) {
  return (
    <div className="flex flex-wrap gap-4 w-full justify-center py-8 px-2">
      {meta.links.map((link, key) =>
        link.url == null ? (
          <span key={key} className="text-gray-500" dangerouslySetInnerHTML={{ __html: link.label }} />
        ) : (
          <Link
            key={key}
            className={`${link.active ? "rounded-lg bg-white px-3 py-1 text-blue-500 shadow" : ""}`}
            href={link.url || ""}
            dangerouslySetInnerHTML={{ __html: link.label }}
          />
        )
      )}
    </div>
  );
}
