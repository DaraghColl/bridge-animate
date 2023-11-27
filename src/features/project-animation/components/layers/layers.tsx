import { FC, useState } from 'react';
import { TrashIcon, Square3Stack3DIcon } from '@heroicons/react/24/solid';
import { useAnimationsContext } from '../../state/animations';
import { useSelectedElementContext } from '../../state/selected-element';
import { ConfirmDialog } from '@components/confirm-dialog/confirm-dialog';
import { Tooltip } from '@components/tooltip/tooltip';

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
    <div className="p-2 text-sm  font-normal">
      <div className="mb-2 flex items-center justify-between ">
        <div className="flex items-center gap-2">
          <Square3Stack3DIcon className="h-4 w-4" />
          <span>Layers</span>
        </div>
        <Tooltip message="add layer" position="left">
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
        </Tooltip>
      </div>

      <div className="flex flex-col items-start gap-4 font-thin">
        {animations &&
          animations.map(({ id, name }, index) => {
            return (
              <div key={index} className="w-full">
                <div className="flex w-full cursor-pointer items-center gap-2">
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
            );
          })}
      </div>
    </div>
  );
};

export { Layers };
