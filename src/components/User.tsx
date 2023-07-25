import React from "react";
import { useState } from "react";
import { CheckCircleIcon, PencilIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/router";

const User = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  function handleConfirm() {
    // Handle the confirmed vote action here
    setIsOpen(false);
    router.push("/vote");
  }

  function handleCancel() {
    setIsOpen(false);
  }
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-row justify-center items-center space-x-20">
        <div className="bg-gray-200 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">vote</h2>
          <img
            src="/images/vote.jpg"
            alt="Change Authority"
            className="w-64 h-64 mb-4"
          />
          <button
            onClick={() => setIsOpen(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg mb-4"
          >
            <PencilIcon className="h-5 w-5 mr-2 inline-block" />
            vote
          </button>
          <Transition.Root show={isOpen} as={React.Fragment}>
            <Dialog
              as="div"
              className="fixed inset-0 z-50 overflow-y-auto"
              onClose={setIsOpen}
            >
              <div className="flex items-center justify-center min-h-screen">
                <Transition.Child
                  as={React.Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
                </Transition.Child>

                <Transition.Child
                  as={React.Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <h3 className="text-lg font-bold mb-2">
                      Confirmation Required
                    </h3>
                    <p className="text-gray-700 mb-4">
                      Please read the instruction and confirm.<br></br> 1.Users
                      need to double-tap the button to confirm the transaction
                      when submitting their vote.
                    </p>
                    <div className="flex justify-end">
                      <button
                        onClick={handleConfirm}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg mr-2"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={handleCancel}
                        className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition.Root>
        </div>
      </div>
    </div>
  );
};

export default User;
