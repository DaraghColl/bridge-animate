import { Dispatch, FC, SetStateAction } from 'react';
import { ArchiveBoxIcon, PlusCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { AnimationProject } from '../../pages/project-list';
import { Tooltip } from '@/shared/components/tooltip/tooltip';

interface ListWithAnimationsProps {
  animationProjects: AnimationProject[];
  createNewAnimation: Dispatch<SetStateAction<boolean>>;
}

const ListWithAnimations: FC<ListWithAnimationsProps> = (props) => {
  const { animationProjects, createNewAnimation } = props;
  return (
    <div className="text-sm tracking-wide">
      <h2 className="font-bold">Your Animations</h2>
      <table className="font mt-8 w-full table-auto border-separate border-spacing-2 font-thin">
        <thead>
          <tr className="text-slate-medium">
            <th className="pb-3 text-left font-medium">Name</th>
            <th className="pb-3 text-left font-medium">Created</th>
            <th className="pb-3 text-left font-medium ">Actions</th>
          </tr>
        </thead>
        <tbody>
          {animationProjects.map((animation) => {
            return (
              <tr key={animation.id}>
                <td className="cursor-pointer pb-4">{animation.name}</td>
                <td className="pb-4">{animation.createdAt.toLocaleDateString('en-US')}</td>
                <td className="flex gap-2 pb-4">
                  <button className="cursor-pointer transition-all ease-in-out hover:scale-110">
                    <Tooltip message="delete animation" position="bottom">
                      <XCircleIcon className="h-5 w-5" />
                    </Tooltip>
                  </button>
                  <button className="pointer-events-none cursor-pointer transition-all ease-in-out hover:scale-110">
                    <Tooltip message="archive animation" position="bottom">
                      <ArchiveBoxIcon className="h-5 w-5" />
                    </Tooltip>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button
        className="flex items-center justify-around gap-2 rounded-md bg-accent px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all ease-in-out hover:scale-105 hover:bg-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        onClick={() => createNewAnimation(true)}
      >
        <div className="flex items-center gap-2">
          <PlusCircleIcon className="h-4 w-4 text-white" />
          <span>new animation</span>
        </div>
      </button>
    </div>
  );
};

export { ListWithAnimations };
