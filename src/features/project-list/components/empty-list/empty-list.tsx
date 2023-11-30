import { Dispatch, FC, SetStateAction } from 'react';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { EmptyListIllustration } from './empty-list-illustration';
import { Button } from '@shared/components/button/button';

interface EmptyListProps {
  createNewAnimation: Dispatch<SetStateAction<boolean>>;
}

const EmptyList: FC<EmptyListProps> = (props) => {
  const { createNewAnimation } = props;
  return (
    <div className="mt-5 flex flex-col items-center text-sm font-thin tracking-wide">
      <EmptyListIllustration />
      <h2 className="mb-5">You have no animations yet!</h2>
      <Button variant="filled" color="accent" rounded="md" onClick={() => createNewAnimation(true)}>
        <div className="flex items-center gap-2">
          <PlusCircleIcon className="h-4 w-4 text-white" />
          <span>create new animation</span>
        </div>
      </Button>
    </div>
  );
};

export { EmptyList };
