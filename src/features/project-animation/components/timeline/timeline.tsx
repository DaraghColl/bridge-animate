import { ChangeEvent, FC, Fragment, useEffect, useRef, useState } from 'react';
import { KeyframeTime, useAnimationsContext } from '../../state/animations/animations.tsx';
import { keyframeTimes } from '../../constants/constants';
import { useCreateJSAnimations } from '../../hooks/use-create-js-animations.tsx/use-create-js-animations.tsx';
import { useSelectedElementContext } from '../../state/selected-element/selected-element.tsx';
import { usePrevious } from '@shared/hooks/use-previous/use-previous.tsx';
import { Keyframe } from './keyframes';
import { PlayControls } from './play-controls/play-controls.tsx';

const Timeline: FC = () => {
  const { selectedElementID } = useSelectedElementContext();
  const { animations, isPlaying, setIsPlaying } = useAnimationsContext();
  const { animationsToPay } = useCreateJSAnimations();
  const scrubberRef = useRef<HTMLInputElement>(null);
  const previousSelectedElementId = usePrevious(selectedElementID);
  const [scrubberValue, setScrubberValue] = useState<number>(0);
  let requestAnimation: number;

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

    const selectedElement = document.getElementById(selectedElementID);

    if (selectedElement) {
      selectedElement.removeAttribute('style');
    }

    if (previousSelectedElementId && previousSelectedElementId !== selectedElementID) {
      const previousSelectedElement = document.getElementById(previousSelectedElementId);
      if (!previousSelectedElement) return;
      previousSelectedElement.removeAttribute('style');
    }

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

  useEffect(() => {
    if (!selectedElementID) return;

    if (isPlaying) {
      document.getElementById(selectedElementID)?.classList.remove('outline', 'outline-accent');
    } else if (!isPlaying) {
      document.getElementById(selectedElementID)?.classList.add('outline', 'outline-accent');
    }
  }, [isPlaying, selectedElementID]);

  const keyframePercentageMap: Record<KeyframeTime, string> = {
    '0': '0%',
    '0.25': '25%',
    '0.50': '50%',
    '0.75': '75%',
    '1': '100%',
  };

  return (
    <div className="relative flex basis-3/4 flex-col gap-4 overflow-scroll rounded-md bg-white text-dark-primary dark:bg-dark-secondary dark:text-white">
      {animations && animations.length <= 0 && (
        <span className="text-sm tracking-wide">Select Element and add an animation layer</span>
      )}
      {animations && animations.length > 0 && (
        <Fragment>
          <div className="flex h-full flex-col">
            <div className="sticky top-0 z-10 flex w-full gap-4 bg-white px-4 pb-4 pt-2 dark:bg-dark-secondary">
              <PlayControls
                playAnimation={playAnimation}
                pauseAnimation={pauseAnimation}
                stopAnimation={stopAnimation}
              />
              {/* scrub */}
              <div className="w-5/6">
                <div className="flex items-center justify-between">
                  {keyframeTimes.map((time) => (
                    <div className="text-sm" key={time}>
                      {keyframePercentageMap[time]}
                    </div>
                  ))}
                </div>
                <div className="mt-5 flex items-center">
                  <input
                    ref={scrubberRef}
                    value={scrubberValue}
                    id="scrubber"
                    type="range"
                    className="h-1 w-full cursor-pointer appearance-none rounded-lg bg-light-secondary accent-accent"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => onScrubChange(e)}
                    min="0"
                    max="2500"
                    disabled={animationsToPay.length <= 0}
                  ></input>
                </div>
              </div>
              {/* scrub */}
            </div>

            <div className="mt-4 flex flex-col gap-4 px-4">
              <div className="overflow-scroll">
                {animations.map((animation) => {
                  return <Keyframe animation={animation} />;
                })}
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </div>
  );
};

export { Timeline };
