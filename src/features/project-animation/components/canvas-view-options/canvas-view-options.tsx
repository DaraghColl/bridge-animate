import { Squares2X2Icon } from '@heroicons/react/24/outline';
import { Tooltip } from 'react-tooltip';
import { useThemeContext } from '@/shared/state/theme/theme.tsx';
import { ExportAnimation } from '../export-animation/export-animation.tsx';
import { ThemeToggle } from '@shared/components/theme-toggle/theme-toggle.tsx';

const CanvasViewOptions = () => {
  const { theme } = useThemeContext();

  return (
    <div className="absolute top-0 flex w-full justify-around rounded-md bg-transparent">
      <div className="flex items-center gap-2 rounded-lg bg-white p-4 text-sm dark:bg-dark-secondary">
        <Tooltip
          anchorSelect="#canvas_projects"
          place="top"
          variant={theme === 'dark' ? 'light' : 'dark'}
          delayShow={800}
        >
          back to projects
        </Tooltip>
        <span id="canvas_projects">
          <Squares2X2Icon className="h-4 w-4 cursor-pointer" id="" />
        </span>
        <Tooltip
          anchorSelect="#canvas_toggle_theme"
          place="top"
          variant={theme === 'dark' ? 'light' : 'dark'}
          delayShow={800}
        >
          toggle theme
        </Tooltip>
        <span className="flex items-center" id="canvas_toggle_theme">
          <ThemeToggle />
        </span>
        <Tooltip
          anchorSelect="#export_animations"
          place="top"
          variant={theme === 'dark' ? 'light' : 'dark'}
          delayShow={800}
        >
          export code
        </Tooltip>
        <span id="export_animations">
          <ExportAnimation />
        </span>
      </div>
    </div>
  );
};

export { CanvasViewOptions };
