import { Timeline } from '@/features/project-animation/components/timeline/timeline';
import { ElementList } from '@/features/project-animation/components/element-list/element-list';
import { Canvas } from '@/features/project-animation/components/canvas/canvas';
import { StyleControls } from '@/features/project-animation/components/style-controls/style-controls';
import { Layers } from '@/features/project-animation/components/layers/layers';
import { AnimationConfig } from '@/features/project-animation/components/animation-config/animation-config';

function ProjectAnimation() {
  return (
    <main className="flex h-screen flex-col gap-4 bg-light-secondary p-4 text-dark-primary dark:bg-dark-primary dark:text-white">
      <div className="flex h-2/3 min-h-0 flex-row gap-4">
        <div className="basis-1/5 overflow-scroll rounded-md bg-white p-2 dark:bg-dark-secondary">
          <ElementList />
        </div>
        <Canvas />
        <div
          id="controls"
          className="w-[240px] min-w-[240px] basis-1/5 overflow-scroll rounded-md bg-white dark:bg-dark-secondary"
        >
          <StyleControls />
        </div>
      </div>
      <div className="flex h-1/3 min-h-0 gap-4">
        <div className="basis-1/4 overflow-x-hidden overflow-y-scroll rounded-md bg-white p-2 text-dark-primary dark:bg-dark-secondary dark:text-white">
          <Layers />
        </div>
        <Timeline />
        <div className="basis-1/4 overflow-scroll rounded-md bg-white p-2 text-dark-primary dark:bg-dark-secondary dark:text-white">
          <AnimationConfig />
        </div>
      </div>
    </main>
  );
}

export { ProjectAnimation };
