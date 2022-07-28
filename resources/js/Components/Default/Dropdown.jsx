import React, {useState, useContext, Fragment} from "react";
import {Link} from "@inertiajs/inertia-react";
import {Transition} from "@headlessui/react";

const DropDownContext = React.createContext();

const Dropdown = ({children}) => {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen(previousState => !previousState);
  };

  return (
    <DropDownContext.Provider value={{open, setOpen, toggleOpen}}>
      <div className="absolute bottom-0 right-0 lg:relative">{children}</div>
    </DropDownContext.Provider>
  );
};

const Trigger = ({children}) => {
  const {open, setOpen, toggleOpen} = useContext(DropDownContext);

  return (
    <>
      <div onClick={toggleOpen}>{children}</div>

      {open && <div className="fixed inset-0 z-40" onClick={() => setOpen(false)}></div>}
    </>
  );
};

const Content = ({align = "right", width = "48", contentClasses = "py-1", children}) => {
  const {open, setOpen} = useContext(DropDownContext);

  let alignmentClasses = "origin-top";

  if (align === "left") {
    alignmentClasses = "origin-top-left left-0";
  } else if (align === "right") {
    alignmentClasses = "origin-top-right right-0";
  }

  let widthClasses = "";

  if (width === "48") {
    widthClasses = "w-48";
  }

  return (
    <>
      <Transition
        as={Fragment}
        show={open}
        enter="transition ease-out duration-200"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95">
        <div
          className={`relative z-50 mt-2 rounded-md bg-base-100 shadow-lg dark:bg-slate-500 lg:absolute ${alignmentClasses} ${widthClasses}`}
          onClick={() => setOpen(false)}>
          <div className={`rounded-md ring-1 ring-secondary ring-opacity-5 ` + contentClasses}>{children}</div>
        </div>
      </Transition>
    </>
  );
};

const DropdownLink = ({href, method = "post", as = "a", children, active}) => {
  return (
    <Link
      href={href}
      method={method}
      as={as}
      className={`block w-full px-4 py-2 text-left text-sm leading-5 transition duration-150 ease-in-out hover:bg-primary hover:text-primary-content focus:border-b-primary focus:bg-primary focus:outline-none dark:bg-slate-500 dark:hover:bg-primary dark:hover:text-white ${
        active
          ? "bg-primary text-primary-content dark:bg-primary dark:text-primary-content"
          : "bg-transparent hover:text-primary-content"
      }`}>
      {children}
    </Link>
  );
};

Dropdown.Trigger = Trigger;
Dropdown.Content = Content;
Dropdown.Link = DropdownLink;

export default Dropdown;
