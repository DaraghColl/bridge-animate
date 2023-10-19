import { FC } from 'react';
import { useAnimationsContext } from '../../state/animations';
import { useSelectedElementContext } from '../../state/selected-element';

const Layers: FC = () => {
  const { selectedElementID } = useSelectedElementContext();
  const { animations, createNewAnimation } = useAnimationsContext();

  const handleCreateNewAnimation = () => {
    if (selectedElementID) {
      createNewAnimation(selectedElementID);
    }
  };

  return (
    <div className="text-gray-50 ">
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
          animations.map((animation, index) => {
            return <div key={index}>{animation.name}</div>;
          })}
      </div>
    </div>
  );
};

export { Layers };
