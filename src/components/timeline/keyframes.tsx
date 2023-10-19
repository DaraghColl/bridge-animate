import { FC } from 'react';

const Keyframes: FC = () => {
  return (
    <div className="flex flex-col items-center justify-around">
      <Keyframe />
    </div>
  );
};

const Keyframe: FC = () => {
  return (
    <div className="flex h-2 w-full items-center justify-between rounded-sm bg-gray-800">
      <div className="h-5 w-5 cursor-pointer rounded-full border-2 border-gray-800 bg-white"></div>
      <div className="h-5 w-5 cursor-pointer rounded-full border-2 border-gray-800 bg-white"></div>
      <div className="h-5 w-5 cursor-pointer rounded-full border-2 border-gray-800 bg-white"></div>
      <div className="h-5 w-5 cursor-pointer rounded-full border-2 border-gray-800 bg-white"></div>
    </div>
  );
};

export { Keyframes };
