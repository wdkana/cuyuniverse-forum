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

    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return (
    <div className="relative w-10">
      <div className="absolute">
        <input
          id="theme-toggle"
          type="checkbox"
          className="z-[99999999999999] cursor-pointer rounded-md p-5 text-sm opacity-0 focus:outline-none"
        />
      </div>
      <div className="rounded-md bg-slate-700 p-1.5 shadow-md shadow-slate-400 focus:ring-4 focus:ring-gray-200 dark:bg-slate-200 dark:text-white dark:shadow-slate-900 dark:focus:ring-gray-700">
        <svg
          id="theme-toggle-dark-icon"
          className="h-7 w-7 text-white dark:text-black"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
        </svg>
      </div>
    </div>
  );
};

export default DarkToggle;
