import { Dialog, Transition } from '@headlessui/react';
import { Dispatch, FC, Fragment, SetStateAction } from 'react';
import { Button } from '../button/button';

interface ConfirmDialogProps {
  openDialog: boolean;
  onDialogClose: Dispatch<SetStateAction<boolean>>;
  title: string;
  message: string;
  confirmCallback: () => void;
}

const ConfirmDialog: FC<ConfirmDialogProps> = (props) => {
  const { openDialog, onDialogClose, title, message, confirmCallback } = props;

  const confirm = () => {
    confirmCallback();
    onDialogClose(false);
  };

  const cancel = () => {
    onDialogClose(false);
  };

  return (
    <Transition appear show={openDialog} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => onDialogClose(false)} data-cy="confirm_dialog">
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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-light-secondary p-6 text-left align-middle text-dark-secondary shadow-sm transition-all dark:border-2 dark:border-white dark:bg-dark-secondary dark:text-white">
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
                  <Button variant="ghost" color="inherit" onClick={cancel} data-cy="confirm_dialog_cancel">
                    <div className="flex items-center gap-2">Cancel</div>
                  </Button>
                  <Button
                    variant="filled"
                    color="accent"
                    rounded="md"
                    onClick={confirm}
                    data-cy="confirm_dialog_confirm"
                  >
                    <div className="flex items-center gap-2">Confirm</div>
                  </Button>
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
