import { ChangeEvent, FC, Fragment, useRef, useState } from 'react';
import { useAnimationsContext } from '../../state/animations/animations.tsx';
import { useCreateJSAnimations } from '../../hooks/use-create-js-animations.tsx/use-create-js-animations.tsx';
import { useSelectedElementContext } from '../../state/selected-element/selected-element.tsx';
import { Keyframes } from './keyframes/keyframes.tsx';
import { PlayControls } from './play-controls/play-controls.tsx';
import { Scrubber } from './scrubber/scrubber.tsx';

const Timeline: FC = () => {
  const { selectedElementID } = useSelectedElementContext();
  const { animations, isPlaying, setIsPlaying } = useAnimationsContext();
  const { animationsToPay } = useCreateJSAnimations();
  const scrubberRef = useRef<HTMLInputElement>(null);
  const [scrubberValue, setScrubberValue] = useState<number>(0);
  let requestAnimation: number;

  if (selectedElementID) {
    if (isPlaying) {
      document.getElementById(selectedElementID)?.classList.remove('outline', 'outline-accent');
    } else if (!isPlaying) {
      document.getElementById(selectedElementID)?.classList.add('outline', 'outline-accent');
    }
  }

  // use this function to make the timeline move using requestAnimationFrame
  const getAnimationTime = () => {
    setScrubberValue(Number(animationsToPay[0].currentTime));
    requestAnimation = requestAnimationFrame(getAnimationTime);
  };

  const cancelGetAnimationTime = () => {
    cancelAnimationFrame(requestAnimation);
  };

  const playAnimation = () => {
    if (!selectedElementID) return;

    setIsPlaying(true);
    getAnimationTime();
    animationsToPay.forEach((animation) => {
      if (animation) {
        animation.play();
      }
      animation.addEventListener('finish', () => {
        setIsPlaying(false);
        cancelGetAnimationTime();
      });
    });
  };

  const pauseAnimation = () => {
    // have to create a finish event to trigger stop animation frame being called
    const fakePauseEvent = new Event('finish');

    setIsPlaying(false);
    cancelGetAnimationTime();

    if (isPlaying) {
      animationsToPay.forEach((animation) => {
        if (animation) {
          animation.pause();
          animation.dispatchEvent(fakePauseEvent);
        }
      });
    }

    // manually set scrub value because finish event above will set to zero
    if (scrubberRef?.current) {
      setScrubberValue(Number(scrubberRef.current.value));
    }
  };

  const stopAnimation = () => {
    cancelGetAnimationTime();
    setIsPlaying(false);
    cancelGetAnimationTime();

    animationsToPay.forEach((animation) => {
      if (animation) {
        animation.finish();
      }
    });

    if (scrubberRef?.current) {
      setScrubberValue(Number(0));
    }
  };

  const onScrubChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!animations?.length) return;

    const time = e.currentTarget.value;
    setScrubberValue(Number(time));
    animationsToPay.forEach((animation) => {
      if (animation) {
        animation.currentTime = Number(time);
        animation.pause();
      }
    });
  };

  return (
    <div className="relative flex basis-3/4 flex-col gap-4 overflow-scroll rounded-md bg-white text-dark-primary dark:bg-dark-secondary dark:text-white">
      <Fragment>
        <div className="flex h-full flex-col">
          <div className="sticky top-0 z-10 flex w-full gap-4 border-light-secondary bg-white pb-2 pr-4 pt-2 dark:bg-dark-secondary">
            <div className="flex w-1/6 justify-center gap-2 pt-2" data-cy="play_controls">
              <PlayControls
                playAnimation={playAnimation}
                pauseAnimation={pauseAnimation}
                stopAnimation={stopAnimation}
              />
            </div>
            <Scrubber
              scrubberRef={scrubberRef}
              scrubberValue={scrubberValue}
              animationsToPay={animationsToPay}
              onScrubChange={onScrubChange}
            />
          </div>
          <div className="flex flex-col gap-4 pr-4 pt-4">
            <div className="overflow-scroll">
              {animations &&
                animations.map((animation) => {
                  return <Keyframes animation={animation} key={animation.id} />;
                })}
            </div>
          </div>
        </div>
      </Fragment>
    </div>
  );
};

export { Timeline };
