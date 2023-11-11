import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { ClipboardDocumentIcon } from '@heroicons/react/24/outline';

import hljs from 'highlight.js';
import 'highlight.js/styles/default.css';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { useCreateJSAnimations } from '../../hooks/use-create-js-animations.tsx/use-create-js-animations.tsx';

const ExportAnimation = () => {
  const { generateJSAnimations, jsAnimations, clearGeneratedAnimationCode } = useCreateJSAnimations();
  const [isOpen, setIsOpen] = useState(false);

  const generate = () => {
    generateJSAnimations();

    if (jsAnimations) {
      setIsOpen(true);
    }
  };

  const closeDialog = () => {
    setIsOpen(false);
    setTimeout(() => {
      clearGeneratedAnimationCode();
    }, 500);
  };

  useEffect(() => {
    // TODO: fix & remove timeout for highlight
    setTimeout(() => {
      document.querySelectorAll('code').forEach((block) => {
        hljs.highlightElement(block as HTMLElement);
      });
    }, 10);
  }, [isOpen]);

  return (
    <div>
      <ArrowTopRightOnSquareIcon className="h-4 w-4 cursor-pointer" onClick={generate} />
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeDialog}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
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
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-3xl overflow-hidden rounded-2xl  bg-dark-secondary p-6 text-left align-middle text-white shadow-xl transition-all dark:text-white">
                  <Dialog.Title
                    as="div"
                    className="flex items-center justify-between text-lg font-medium leading-6 dark:text-white"
                  >
                    <h3>JavaScript Code Generation</h3>
                    <div>
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium"
                        onClick={closeDialog}
                      >
                        <ClipboardDocumentIcon className="h-6 w-6 text-white" />
                      </button>
                    </div>
                  </Dialog.Title>
                  <div className="mt-2">
                    <pre>
                      <code className="language-javascript">{jsAnimations}</code>
                    </pre>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export { ExportAnimation };
