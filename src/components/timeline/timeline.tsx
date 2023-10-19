import { FC } from 'react';
import { Layers } from './layers';
import { Keyframes } from './keyframes';

const Timeline: FC = () => {
  return (
    <div className="grid h-1/4 grid-cols-[20%_80%]">
      <div className="border-2 border-indigo-800 p-2">
        <Layers />
      </div>
      <div className="border-2 border-indigo-800 p-4">
        <Keyframes />
      </div>
    </div>
  );
};

export { Timeline };
