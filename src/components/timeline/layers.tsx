import { FC } from 'react';
import { useAnimationsContext } from '../../state/animations';
import { useSelectedElementContext } from '../../state/selected-element';

const Layers: FC = () => {
  const { selectedElementID, setSelectedElementId } = useSelectedElementContext();
  const { animations, createNewAnimation } = useAnimationsContext();

  const handleCreateNewAnimation = () => {
    if (selectedElementID) {
      createNewAnimation(selectedElementID);
    }
  };

  const handleElementSelect = (name: string) => {
    setSelectedElementId(name);
  };

  return (
    <div className="text-sm font-normal text-gray-50">
      <div className="flex items-center justify-between">
        <span>Layers</span>
        <button onClick={handleCreateNewAnimation}>
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

      <div className="py-2 font-thin">
        {animations &&
          animations.map(({ name }, index) => {
            return (
              <div
                key={index}
                className={`${selectedElementID === name ? 'text-indigo-600' : ''}`}
                onClick={() => handleElementSelect(name)}
              >
                {name}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export { Layers };
