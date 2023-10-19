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
    <div className="bg-white-400 flex h-2 w-full items-center justify-between rounded-sm bg-white">
      <div className="h-5 w-5 rotate-45 cursor-pointer rounded-sm bg-white"></div>
      <div className="h-5 w-5 rotate-45 cursor-pointer rounded-sm bg-white"></div>
      <div className="h-5 w-5 rotate-45 cursor-pointer rounded-sm bg-white"></div>
      <div className="h-5 w-5 rotate-45 cursor-pointer rounded-sm bg-white"></div>
      <div className="h-5 w-5 rotate-45 cursor-pointer rounded-sm bg-white"></div>
    </div>
  );
};

export { Keyframes };
