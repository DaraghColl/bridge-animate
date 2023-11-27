import { Dispatch, FC, SetStateAction } from 'react';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { EmptyListIllustration } from './empty-list-illustration';

interface EmptyListProps {
  createNewAnimation: Dispatch<SetStateAction<boolean>>;
}

const EmptyList: FC<EmptyListProps> = (props) => {
  const { createNewAnimation } = props;
  return (
    <div className="mt-5 flex flex-col items-center text-sm font-thin tracking-wide">
      <EmptyListIllustration />
      <h2>You have no animations yet!</h2>
      <button
        className="mt-5 flex items-center justify-around gap-2 rounded-md bg-accent px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all ease-in-out hover:scale-105 hover:bg-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        onClick={() => createNewAnimation(true)}
      >
        <div className="flex items-center gap-2">
          <PlusCircleIcon className="h-4 w-4 text-white" />
          <span>create new animation</span>
        </div>
      </button>
    </div>
  );
};

export { EmptyList };
