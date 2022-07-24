import { useEffect } from "react";

const DarkToggle = () => {
  useEffect(() => {
    const themeButton = window.document.getElementById("theme-toggle");
    const html = window.document.querySelector("html");

    themeButton.addEventListener("click", function () {
      if (localStorage.theme === "light") {
        html.classList.add("dark");
        localStorage.theme = "dark";
      } else {
        html.classList.remove("dark");
        localStorage.theme = "light";
      }
    });

    if (localStorage.theme === "dark" || (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return (
    <div className="relative">
      <div className="absolute">
        <input id="theme-toggle" type="checkbox" className="focus:outline-none rounded-md text-sm p-5 opacity-0 z-[99999999999999]" />
      </div>
      <div className="p-1.5 rounded-md focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 bg-slate-700 dark:bg-slate-200 shadow-md shadow-slate-400 dark:shadow-slate-900 dark:text-white">
        <svg
          id="theme-toggle-dark-icon"
          className="w-7 h-7 text-white dark:text-black"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
        </svg>
      </div>
    </div>
  );
};

export default DarkToggle;
