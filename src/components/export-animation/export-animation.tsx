import { Fragment, useEffect, useState } from 'react';
import { Dialog, Tab, Transition } from '@headlessui/react';
import hljs from 'highlight.js';
import 'highlight.js/styles/default.css';
import { ClipboardDocumentIcon, CodeBracketIcon } from '@heroicons/react/24/outline';
import { useAnimationsContext } from '@state/animations';
import { useCreateJSAnimations } from '@hooks/use-create-js-animations.tsx/use-create-js-animations.tsx';

const copyToClipboard = async (code: string[]) => {
  try {
    await navigator.clipboard.writeText(code.toString());
    console.log('Content copied to clipboard');
  } catch (err) {
    // TODO: replace with modal || tooltip
    console.error('Failed to copy: ', err);
  }
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const ExportAnimation = () => {
  const { generateJSAnimations, generateCSSAnimations, jsAnimations, cssAnimations, clearGeneratedAnimationCode } =
    useCreateJSAnimations();
  const { animations } = useAnimationsContext();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'js' | 'css'>('js');

  const generate = () => {
    if (!animations || animations.length <= 0) return;
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
    }, 10);
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
                <Dialog.Panel className="h-[30rem] w-full max-w-3xl flex-col overflow-scroll rounded-2xl bg-light-secondary p-6 text-left align-middle text-dark-primary shadow-xl transition-all dark:bg-dark-secondary dark:text-white">
                  <Tab.Group>
                    <Tab.List className="flex gap-4">
                      <div className="flex w-full justify-between">
                        <div>
                          <Tab
                            onClick={() => setActiveTab('js')}
                            className={({ selected }) =>
                              classNames(
                                'w-32 rounded-lg p-2.5 text-sm font-medium leading-5',
                                selected ? 'bg-accent text-white' : 'text-dark-primary dark:text-white',
                              )
                            }
                          >
                            JavaScript
                          </Tab>
                          <Tab
                            onClick={() => setActiveTab('css')}
                            className={({ selected }) =>
                              classNames(
                                'w-32 rounded-lg p-2.5 text-sm font-medium leading-5',
                                selected ? 'bg-accent text-white' : 'text-dark-primary dark:text-white',
                              )
                            }
                          >
                            Css
                          </Tab>
                        </div>

                        <button
                          type="button"
                          className="focus-visible:ring-indigp-500 indigo-900 inline-flex justify-center rounded-md border border-transparent bg-accent px-4 py-2
                        text-sm font-medium hover:bg-accent focus:scale-90 focus:outline-none focus-visible:ring-2                        "
                        >
                          <ClipboardDocumentIcon
                            className="h-6 w-6 text-white"
                            onClick={() => copyToClipboard(activeTab === 'js' ? jsAnimations : cssAnimations)}
                          />
                        </button>
                      </div>
                    </Tab.List>
                    <Tab.Panels>
                      <Tab.Panel>
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
                            <div className="mb-5">
                              {jsAnimations.length &&
                                jsAnimations.map((animation) => {
                                  return (
                                    <pre key={animation}>
                                      <code className="language-javascript">{animation}</code>
                                    </pre>
                                  );
                                })}
                            </div>
                          </div>
                        </Transition.Child>
                      </Tab.Panel>
                      <Tab.Panel>
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
                            <div className="mb-5">
                              {cssAnimations.length &&
                                cssAnimations.map((animation) => {
                                  return (
                                    <pre>
                                      <code className="language-css">{animation}</code>
                                    </pre>
                                  );
                                })}
                            </div>
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
