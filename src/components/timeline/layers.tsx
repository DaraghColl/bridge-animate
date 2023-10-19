import { FC } from 'react';

const Layers: FC = () => {
  return (
    <div className="flex items-center justify-between">
      <span>Layers</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        className="h-6 w-6 cursor-pointer"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </div>
  );
};

export { Layers };
