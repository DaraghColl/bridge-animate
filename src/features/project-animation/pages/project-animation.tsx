import { FC, Fragment, useState } from 'react';
import { SelectedElementProvider } from '../state/selected-element/selected-element';
import { AnimationsProvider } from '../state/animations/animations';
import { CanvasProvider } from '../state/canvas/canvas';
import { Timeline } from '../components/timeline/timeline';
import { ElementList } from '../components/element-list/element-list';
import { Canvas } from '../components/canvas/canvas';
import { StyleControls } from '../components/style-controls/style-controls';
import { Layers } from '../components/layers/layers';
import { AnimationConfig } from '../components/animation-config/animation-config';
import { StandardDialog } from '@/shared/components/standard-dialog/standard-dialog';
import { Button } from '@/shared/components/button/button';

const ProjectAnimation: FC = () => {
  const [showDemoDialog, setShowDemoDialog] = useState(true);
  return (
    <SelectedElementProvider>
      <AnimationsProvider>
        <CanvasProvider>
          <Fragment>
            <StandardDialog
              title="This is a demo version of the app"
              openDialog={showDemoDialog}
              onDialogClose={() => setShowDemoDialog(false)}
            >
              <div className="mb-4 flex flex-col gap-2 px-2">
                <p>It has been laoded with an svg and some animations.</p>
                <p>Use the play controls to play the animation, and the scrubber to move through the animation.</p>
                <p>Select a keyframe in the timeline to show style options</p>
              </div>
              <Button variant="filled" color="accent" rounded="md" onClick={() => setShowDemoDialog(false)}>
                Close
              </Button>
            </StandardDialog>
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
          </Fragment>
        </CanvasProvider>
      </AnimationsProvider>
    </SelectedElementProvider>
  );
};

export { ProjectAnimation };
