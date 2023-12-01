import { FC } from 'react';
import { PlayIcon, PauseIcon, StopIcon } from '@heroicons/react/24/outline';
import { Button } from '@/shared/components/button/button';

interface PlayControlsProps {
  playAnimation: () => void;
  pauseAnimation: () => void;
  stopAnimation: () => void;
}

const PlayControls: FC<PlayControlsProps> = (props) => {
  const { playAnimation, pauseAnimation, stopAnimation } = props;

  return (
    <div className="flex w-1/6 gap-2" data-cy="play_controls">
      <Button variant="ghost" color="inherit" rounded="md" onClick={stopAnimation} data-cy="play_controls_stop">
        <div className="flex items-center gap-2">
          <StopIcon className="h-4 w-4 text-dark-primary dark:text-white" />
        </div>
      </Button>
      <Button variant="ghost" color="inherit" rounded="md" onClick={playAnimation} data-cy="play_controls_play">
        <div className="flex items-center gap-2">
          <PlayIcon className="h-4 w-4 text-dark-primary dark:text-white" />
        </div>
      </Button>
      <Button variant="ghost" color="inherit" rounded="md" onClick={pauseAnimation} data-cy="play_controls_pause">
        <div className="flex items-center gap-2">
          <PauseIcon className="h-4 w-4 text-dark-primary dark:text-white" />
        </div>
      </Button>
    </div>
  );
};

export { PlayControls };
