import { Dialog, Transition } from '@headlessui/react';
import { Dispatch, FC, Fragment, SetStateAction, useEffect, useState } from 'react';

interface ConfirmDialogProps {
  openDialog: boolean;
  onDialogClose: Dispatch<SetStateAction<boolean>>;
  title: string;
  message: string;
  confirmCallback: () => void;
}

const ConfirmDialog: FC<ConfirmDialogProps> = (props) => {
  const { openDialog, onDialogClose, title, message, confirmCallback } = props;
  const [isOpen, setIsOpen] = useState(false);

  const confirm = () => {
    confirmCallback();
    setIsOpen(false);
    onDialogClose(false);
  };

  const cancel = () => {
    setIsOpen(false);
    onDialogClose(false);
  };

  useEffect(() => {
    setIsOpen(openDialog);
  }, [openDialog]);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={cancel} data-cy="confirm_dialog">
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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-light-primary bg-light-secondary p-6 text-left align-middle text-dark-secondary shadow-sm shadow-indigo-600 transition-all dark:bg-dark-secondary dark:text-white">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-dark-primary dark:text-white"
                  data-cy="confirm_dialog_title"
                >
                  {title}
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-dark-primary dark:text-white" data-cy="confirm_dialog_message">
                    {message}
                  </p>
                </div>

                <div className="mt-4 flex gap-4">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-900 hover:bg-indigo-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                    onClick={cancel}
                    data-cy="confirm_dialog_cancel"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-900 hover:bg-indigo-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                    onClick={confirm}
                    data-cy="confirm_dialog_confirm"
                  >
                    Confirm
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export { ConfirmDialog };
