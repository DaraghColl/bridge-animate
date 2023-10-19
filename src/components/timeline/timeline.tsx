import { FC } from 'react';
import { Layers } from './layers';
import { Keyframes } from './keyframes';

const Timeline: FC = () => {
  return (
    <div className=" flex h-1/4 gap-4 rounded-md">
      <div className="basis-1/4 overflow-scroll bg-dark-secondary p-2">
        <Layers />
      </div>
      <div className="basis-3/4 overflow-scroll bg-dark-secondary p-4">
        <Keyframes />
      </div>
    </div>
  );
};

export { Timeline };
