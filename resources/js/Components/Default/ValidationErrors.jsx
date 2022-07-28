import React from "react";

export default function ValidationErrors({errors}) {
  return (
    Object.keys(errors).length > 0 && (
      <div className="mt-2 mb-2 p-0">
        <div className="font-medium text-red-400">Silahkan periksa lagi datanya ya bro.</div>

        <ul className="list-inside list-disc px-2 text-sm text-red-400">
          {Object.keys(errors).map(function (key, index) {
            return <li key={index}>{errors[key]}</li>;
          })}
        </ul>
      </div>
    )
  );
}
