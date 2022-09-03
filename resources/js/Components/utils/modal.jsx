import {Dialog, Transition} from "@headlessui/react";
import {useState, Fragment} from "react";
import {createPortal} from "react-dom";

function PopupComment({activator, children}) {
  const [show, setShow] = useState(false);

  const content = show && (
    <Dialog as="div" className="relative z-10" onClose={() => setShow(false)}>
      <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0">
        <div className="fixed inset-0 bg-black bg-opacity-25" />
      </Transition.Child>

      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95">
            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
              {children}
              <div className="mt-4">
                <button
                  type="button"
                  className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200"
                  onClick={() => setShow(false)}>
                  close
                </button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </div>
    </Dialog>
  );

  return (
    <>
      {activator({setShow})}
      {createPortal(
        <Transition appear show={show} as={Fragment}>
          {() => <div>{content}</div>}
        </Transition>,
        document.body
      )}
    </>
  );
}

export default PopupComment;
