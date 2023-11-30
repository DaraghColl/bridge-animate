import { FC } from 'react';
import { ViewfinderCircleIcon } from '@heroicons/react/24/outline';
import { useThemeContext } from '@/shared/state/theme/theme';
import { ThemeToggle } from '@shared/components/theme-toggle/theme-toggle.tsx';
import { Tooltip } from 'react-tooltip';

const ProjectsListNavbar: FC = () => {
  const { theme } = useThemeContext();
  return (
    <div className="mt-5 flex w-full justify-around rounded-md bg-transparent">
      <div className="flex items-center gap-2 rounded-lg bg-white p-4 text-sm  dark:bg-dark-secondary">
        <Tooltip anchorSelect="#list_home" place="top" variant={theme === 'dark' ? 'light' : 'dark'} delayShow={800}>
          home
        </Tooltip>
        <span id="list_home">
          <ViewfinderCircleIcon className="h-4 w-4 cursor-pointer" />
        </span>
        <Tooltip
          anchorSelect="#list_toggle_theme"
          place="top"
          variant={theme === 'dark' ? 'light' : 'dark'}
          delayShow={800}
        >
          toggle theme
        </Tooltip>
        <span id="list_toggle_theme" className="flex items-center">
          <ThemeToggle />
        </span>
      </div>
    </div>
  );
};

export { ProjectsListNavbar };
