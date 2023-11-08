import { FC } from 'react';
import { Disclosure } from '@headlessui/react';
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

      <div className="flex flex-col items-start gap-4 py-2 font-thin">
        {animations &&
          animations.map(({ name, config }, index) => {
            return (
              <div key={index}>
                <Disclosure>
                  <Disclosure.Button
                    className={`${selectedElementID === name ? 'text-indigo-600' : ''}`}
                    onClick={() => handleElementSelect(name)}
                  >
                    {name}
                  </Disclosure.Button>
                  <Disclosure.Panel className="ml-2 flex flex-col text-slate-500">
                    <span>name: {config.animationName}</span>
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
