import {HiMenuAlt2} from "react-icons/hi";
import {useState} from "react";

const NavBar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const setToggleMenu = () => setShowMenu(!showMenu);

  return (
    <nav className="border-gray-200 bg-light-primary px-2 py-2.5 dark:bg-gray-900 sm:px-4">
      <div className="container mx-auto flex max-w-7xl flex-wrap items-center justify-between">
        <a href="https://flowbite.com/" className="flex items-center">
          <span className="self-center whitespace-nowrap text-4xl font-bold dark:text-white">Cuy!</span>
        </a>
        <button
          type="button"
          className="ml-3 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
          onClick={() => setToggleMenu()}>
          <span className="sr-only">Open main menu</span>
          <HiMenuAlt2 className="text-2xl" />
        </button>
        <div className={`${showMenu ? "hidden" : ""} w-full md:block md:w-auto`}>
          <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 p-4 dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:text-sm md:font-medium md:dark:bg-gray-900">
            <li>
              <a
                href="#"
                className="block rounded bg-blue-700 py-2 pr-4 pl-3 text-white dark:text-white md:bg-transparent md:p-0 md:text-blue-700"
                aria-current="page">
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block rounded py-2 pr-4 pl-3 text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-white">
                About
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block rounded py-2 pr-4 pl-3 text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-white">
                Services
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block rounded py-2 pr-4 pl-3 text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-white">
                Pricing
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block rounded py-2 pr-4 pl-3 text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-white">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
