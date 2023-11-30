import { FC, Fragment, useEffect, useRef, useState } from 'react';
import { Dialog, Tab, Transition } from '@headlessui/react';
import { DocumentIcon } from '@heroicons/react/24/outline';
import { useCanvasContext } from '../../state/canvas/canvas';
import { SVGFileUpload } from './svg-file-upload';
import { Tooltip } from '@shared/components/tooltip/tooltip';
import { Button } from '@shared/components/button/button';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const ImportSvg: FC = () => {
  const { userSvg, setUserSvg } = useCanvasContext();
  const [file, setFile] = useState<File | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const svgUploadAreaRef = useRef(null);

  const closeDialog = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (file) {
      closeDialog();

      file.text().then((svgText) => {
        if (!svgText) return;

        setUserSvg(svgText);
      });
    }
  }, [file, setUserSvg]);

  useEffect(() => {
    if (!userSvg) {
      setIsOpen(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment>
      <div className="flex justify-around">
        <Tooltip message="upload new svg" position="left">
          <Button variant="filled" color="accent" rounded="sm" onClick={() => setIsOpen(true)} data-cy="import_svg">
            <div className="flex items-center gap-2">
              <DocumentIcon className="h-4 w-4 text-white" />
            </div>
          </Button>
        </Tooltip>
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeDialog} initialFocus={svgUploadAreaRef}>
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
                <Dialog.Panel className="flex min-h-[400px] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-light-secondary p-6 text-left align-middle text-dark-primary shadow-xl transition-all dark:bg-dark-secondary dark:text-white">
                  <Tab.Group>
                    <Tab.List className="flex gap-4">
                      <div className="flex w-full justify-between">
                        <div>
                          <Tab
                            className={({ selected }) =>
                              classNames(
                                'w-32 rounded-lg p-2.5 text-sm font-medium leading-5',
                                selected ? 'bg-accent text-white' : 'text-dark-primary dark:text-white',
                              )
                            }
                          >
                            Upload
                          </Tab>
                          <Tab
                            className={({ selected }) =>
                              classNames(
                                'w-32 rounded-lg p-2.5 text-sm font-medium leading-5',
                                selected ? 'bg-accent text-white' : 'text-dark-primary dark:text-white',
                              )
                            }
                          >
                            Paste
                          </Tab>
                        </div>
                      </div>
                    </Tab.List>
                    <Tab.Panels className="flex flex-grow items-center justify-around">
                      <Tab.Panel className="w-full">
                        <Transition.Child
                          as={Fragment}
                          enter="ease-out duration-300"
                          enterFrom="opacity-0 scale-95"
                          enterTo="opacity-100 scale-100"
                          leave="ease-in duration-200"
                          leaveFrom="opacity-100 scale-100"
                          leaveTo="opacity-0 scale-95"
                        >
                          <div className="mt-2" ref={svgUploadAreaRef}>
                            <SVGFileUpload setFile={setFile} />
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
                          <div className="mt-2">Paste SVG coming soon</div>
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
    </Fragment>
  );
};

export { ImportSvg };
