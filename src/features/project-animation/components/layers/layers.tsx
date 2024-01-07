import { FC, useState } from 'react';
import { Square3Stack3DIcon, PlusCircleIcon } from '@heroicons/react/24/solid';
import { Tooltip } from 'react-tooltip';
import { useAnimationsContext } from '../../state/animations/animations';
import { useThemeContext } from '@/shared/state/theme/theme.tsx';
import { useSelectedElementContext } from '../../state/selected-element/selected-element';

const Layers: FC = () => {
  const { selectedElementID, setSelectedElementId } = useSelectedElementContext();
  const { animations, createNewAnimation } = useAnimationsContext();
  const { theme } = useThemeContext();

  const [_, setShowDeleteAnimationLayer] = useState(false);

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

  return (
    <div className="p-2 text-sm  font-normal">
      <div className="mb-2 flex items-center justify-between ">
        <div className="flex items-center gap-2">
          <Square3Stack3DIcon className="h-4 w-4" />
          <span>Layers</span>
        </div>
        <Tooltip
          anchorSelect="#layer_add_layer"
          place="top"
          variant={theme === 'dark' ? 'light' : 'dark'}
          delayShow={800}
        >
          add layer
        </Tooltip>
        <button id="layer_add_layer" aria-label="add layer" onClick={handleCreateNewAnimation}>
          <PlusCircleIcon className="h-6 w-6" />
        </button>
      </div>

      <div className="flex flex-col items-start gap-4 font-thin">
        {animations &&
          animations.map(({ name }, index) => {
            return (
              <div key={index} className="w-full">
                <div className="flex w-full cursor-pointer items-center gap-2">
                  <span
                    className={`${selectedElementID === name ? 'text-accent' : ''}`}
                    onClick={() => elementSelect(name)}
                  >
                    {name}
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
