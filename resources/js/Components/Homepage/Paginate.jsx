import { Link } from "@inertiajs/inertia-react";
import React from "react";

export default function Paginate({ meta }) {
  return (
    <div className="flex items-center gap-x-4">
      {meta.links.map((link, key) =>
        link.url == null ? (
          <span
            key={key}
            className="text-gray-500"
            dangerouslySetInnerHTML={{ __html: link.label }}
          />
        ) : (
          <Link
            key={key}
            className={`${
              link.active
                ? "text-blue-500 px-3 py-1 shadow rounded-lg bg-white"
                : ""
            }`}
            href={link.url || ""}
            dangerouslySetInnerHTML={{ __html: link.label }}
          />
        )
      )}
    </div>
  );
}
