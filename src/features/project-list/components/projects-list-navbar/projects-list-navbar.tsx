import { FC } from 'react';
import { ViewfinderCircleIcon } from '@heroicons/react/24/outline';
import { ThemeToggle } from '@shared/components/theme-toggle/theme-toggle.tsx';
import { Tooltip } from '@shared/components/tooltip/tooltip.tsx';

const ProjectsListNavbar: FC = () => {
  return (
    <div className="mt-5 flex w-full justify-around rounded-md bg-transparent">
      <div className="flex items-center gap-2 rounded-lg bg-white p-4 text-sm  dark:bg-dark-secondary">
        <Tooltip message="home" position="bottom">
          <ViewfinderCircleIcon className="h-4 w-4 cursor-pointer" />
        </Tooltip>
        <Tooltip message="toggle theme" position="bottom">
          <ThemeToggle />
        </Tooltip>
      </div>
    </div>
  );
};

export { ProjectsListNavbar };
