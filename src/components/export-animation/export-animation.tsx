import { Fragment, useEffect, useState } from 'react';
import { Dialog, Tab, Transition } from '@headlessui/react';
import hljs from 'highlight.js';
import 'highlight.js/styles/default.css';
import { ClipboardDocumentIcon, CodeBracketIcon } from '@heroicons/react/24/outline';
import { useCreateJSAnimations } from '../../hooks/use-create-js-animations.tsx/use-create-js-animations.tsx';

const copyToClipboard = async (code: string[]) => {
  try {
    await navigator.clipboard.writeText(code.toString());
    console.log('Content copied to clipboard');
  } catch (err) {
    // TODO: replace with modal || tooltip
    console.error('Failed to copy: ', err);
  }
};

const ExportAnimation = () => {
  const { generateJSAnimations, generateCSSAnimations, jsAnimations, cssAnimations, clearGeneratedAnimationCode } =
    useCreateJSAnimations();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const generate = () => {
    generateJSAnimations();
    generateCSSAnimations();
    setIsOpen(true);
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
    }, 0.5);
  }, [isOpen, activeTab]);

  return (
    <div>
      <CodeBracketIcon className="h-4 w-4 cursor-pointer" onClick={generate} />
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
                <Dialog.Panel className="min-h-[400px] w-full max-w-3xl overflow-hidden  rounded-2xl bg-dark-secondary p-6 text-left align-middle text-white shadow-xl transition-all dark:text-white">
                  <Tab.Group>
                    <Tab.List className="flex gap-4">
                      <Tab onClick={() => setActiveTab(1)}>JavaScript</Tab>
                      <Tab onClick={() => setActiveTab(2)}>Css</Tab>
                    </Tab.List>
                    <Tab.Panels>
                      <Tab.Panel>
                        <Dialog.Title
                          as="div"
                          className="flex items-center justify-between text-lg font-medium leading-6 dark:text-white"
                        >
                          <h3>JavaScript Code Generation</h3>
                          <div>
                            <button
                              type="button"
                              className="focus-visible:ring-indigp-500 indigo-900 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2
                        text-sm font-medium hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                            >
                              <ClipboardDocumentIcon
                                className="h-6 w-6 text-white"
                                onClick={() => copyToClipboard(jsAnimations)}
                              />
                            </button>
                          </div>
                        </Dialog.Title>

                        <Transition.Child
                          as={Fragment}
                          enter="ease-out duration-300"
                          enterFrom="opacity-0 scale-95"
                          enterTo="opacity-100 scale-100"
                          leave="ease-in duration-200"
                          leaveFrom="opacity-100 scale-100"
                          leaveTo="opacity-0 scale-95"
                        >
                          <div className="mt-2">
                            {!jsAnimations.length && <h1>There are no animations available</h1>}
                            <pre>
                              <code className="language-javascript">{jsAnimations}</code>
                            </pre>
                          </div>
                        </Transition.Child>
                      </Tab.Panel>
                      <Tab.Panel>
                        <Dialog.Title
                          as="div"
                          className="flex items-center justify-between text-lg font-medium leading-6 dark:text-white"
                        >
                          <h3>CSS Code Generation</h3>
                          <div>
                            <button
                              type="button"
                              className="focus-visible:ring-indigp-500 indigo-900 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2
                        text-sm font-medium hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                            >
                              <ClipboardDocumentIcon
                                className="h-6 w-6 text-white"
                                onClick={() => copyToClipboard(cssAnimations)}
                              />
                            </button>
                          </div>
                        </Dialog.Title>

                        <Transition.Child
                          as={Fragment}
                          enter="ease-out duration-300"
                          enterFrom="opacity-0 scale-95"
                          enterTo="opacity-100 scale-100"
                          leave="ease-in duration-200"
                          leaveFrom="opacity-100 scale-100"
                          leaveTo="opacity-0 scale-95"
                        >
                          <div className="mt-2">
                            {!cssAnimations.length && <h1>There are no animations available</h1>}
                            <pre>
                              <code className="language-css">{cssAnimations}</code>
                            </pre>
                          </div>
                        </Transition.Child>
                      </Tab.Panel>
                    </Tab.Panels>
                  </Tab.Group>
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
