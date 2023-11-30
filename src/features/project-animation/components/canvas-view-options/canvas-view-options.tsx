import { Squares2X2Icon } from '@heroicons/react/24/outline';
import { ExportAnimation } from '../export-animation/export-animation.tsx';
import { ThemeToggle } from '@shared/components/theme-toggle/theme-toggle.tsx';
import { Tooltip } from '@shared/components/tooltip/tooltip.tsx';

const CanvasViewOptions = () => {
  return (
    <div className="absolute top-0 flex w-full justify-around rounded-md bg-transparent">
      <div className="flex items-center gap-2 rounded-lg bg-white p-4 text-sm dark:bg-dark-secondary">
        <Tooltip message="back to projects" position="bottom">
          <Squares2X2Icon className="h-4 w-4 cursor-pointer" />
        </Tooltip>
        <Tooltip message="toggle theme" position="bottom">
          <ThemeToggle />
        </Tooltip>
        <Tooltip message="export code" position="bottom">
          <ExportAnimation />
        </Tooltip>
      </div>
    </div>
  );
};

export { CanvasViewOptions };
