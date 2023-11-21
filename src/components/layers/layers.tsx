import { FC, useState } from 'react';
import { Disclosure } from '@headlessui/react';
import { ChevronRightIcon, TrashIcon } from '@heroicons/react/24/solid';
import { useAnimationsContext } from '@state/animations';
import { useSelectedElementContext } from '@state/selected-element';
import { ConfirmDialog } from '../confirm-dialog/confirm-dialog';

const Layers: FC = () => {
  const { selectedElementID, setSelectedElementId } = useSelectedElementContext();
  const { animations, createNewAnimation, deleteAnimation } = useAnimationsContext();
  const [showDeleteAnimationLayer, setShowDeleteAnimationLayer] = useState(false);

  const handleCreateNewAnimation = () => {
    if (!selectedElementID) return;
    try {
      createNewAnimation(selectedElementID);
    } catch (err) {
      console.error(err);
      // TODO: show error message in toast
      setShowDeleteAnimationLayer(false);
    }
  };

  const elementSelect = (name: string) => {
    setSelectedElementId(name);
  };

  const deleteAnimationLayer = (id: string) => {
    try {
      deleteAnimation(id);
      setShowDeleteAnimationLayer(false);
    } catch (err) {
      console.error(err);
      // TODO: show error message in toast
      setShowDeleteAnimationLayer(false);
    }
  };

  return (
    <div className="text-sm font-normal">
      <div className="mb-2 flex items-center justify-between ">
        <span>Layers</span>
        <button aria-label="add layer" onClick={handleCreateNewAnimation}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-6 w-6 cursor-pointer"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      </div>

      <div className="flex flex-col items-start gap-4 font-thin">
        {animations &&
          animations.map(({ id, name, config }, index) => {
            return (
              <div key={index} className="w-full">
                <Disclosure>
                  <div>
                    <div className="flex w-full cursor-pointer items-center gap-2">
                      <Disclosure.Button>
                        <ChevronRightIcon className="w-4 text-slate-medium ui-open:rotate-90 ui-open:transform" />
                      </Disclosure.Button>
                      <span
                        className={`${selectedElementID === name ? 'text-accent' : ''}`}
                        onClick={() => elementSelect(name)}
                      >
                        {name}
                      </span>
                      <span>
                        <TrashIcon
                          className="w-4 text-dark-primary transition ease-in-out hover:-translate-y-[2px] dark:text-white"
                          onClick={() => setShowDeleteAnimationLayer(true)}
                        />
                        <ConfirmDialog
                          openDialog={showDeleteAnimationLayer}
                          onDialogClose={setShowDeleteAnimationLayer}
                          title="Delete Animation Layer"
                          message="Are you sure you want to delete this animation layer?"
                          confirmCallback={() => deleteAnimationLayer(id)}
                        />
                      </span>
                    </div>
                  </div>
                  <Disclosure.Panel className="ml-6 flex flex-col pt-2 text-slate-medium">
                    <span>duration: {config.animationDuration}</span>
                    <span>delay: {config.animationDelay}</span>
                    <span>iteration: {config.animationInterationCount}</span>
                    <span>direction {config.animationDirection}</span>
                    <span>timing function: {config.animationTimingFunction}</span>
                    <span>fill mode: {config.animationFillMode}</span>
                  </Disclosure.Panel>
                </Disclosure>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export { Layers };
