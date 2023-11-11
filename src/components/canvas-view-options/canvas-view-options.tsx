import { Squares2X2Icon } from '@heroicons/react/24/outline';
import { ThemeToggle } from '../theme-toggle/theme-toggle';
import { ExportAnimation } from '../export-animation/export-animation.tsx';

const CanvasViewOptions = () => {
  return (
    <div className="absolute top-0 flex w-full justify-around rounded-md bg-transparent">
      <div className="flex items-center gap-2 rounded-lg bg-white p-4 text-sm dark:bg-dark-secondary">
        <div>
          <Squares2X2Icon className="h-4 w-4 cursor-pointer" />
        </div>
        <div className="flex">
          <ThemeToggle />
        </div>
        <div>
          <ExportAnimation />
        </div>
      </div>
    </div>
  );
};

export { CanvasViewOptions };
