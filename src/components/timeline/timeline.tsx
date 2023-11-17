import { ChangeEvent, FC, Fragment, useRef, useState } from 'react';
import { Keyframe } from './keyframes';
import { KeyframeTime, useAnimationsContext } from '../../state/animations';
import { keyframeTimes } from '../../constants/constants';
import { useCreateJSAnimations } from '../../hooks/use-create-js-animations.tsx/use-create-js-animations.tsx';
import { useSelectedElementContext } from '../../state/selected-element.tsx';
import { usePrevious } from '../../hooks/use-previous/use-previous.tsx';

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

  const handlePlayAnimation = () => {
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
        cancelGetAnimationTime();
      });
    });
  };

  const handlePauseAnimation = () => {
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

  const handleStopAnimation = () => {
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

  const keyframePercentageMap: Record<KeyframeTime, string> = {
    '0': '0%',
    '0.25': '25%',
    '0.50': '50%',
    '0.75': '75%',
    '1': '100%',
  };

  return (
    <div className="relative flex basis-3/4 flex-col gap-4 overflow-scroll bg-white p-4 dark:bg-dark-secondary">
      {animations && animations.length <= 0 && (
        <span className="text-sm tracking-wide">Select Element and add an animation layer</span>
      )}
      {animations && animations.length > 0 && (
        <Fragment>
          <div className="flex items-center justify-between">
            {keyframeTimes.map((time) => (
              <div key={time}>{keyframePercentageMap[time]}</div>
            ))}
          </div>
          <div className="mb-5 flex items-center">
            <input
              ref={scrubberRef}
              value={scrubberValue}
              id="scrubber"
              type="range"
              className="bg-light-secondary h-1 w-full cursor-pointer appearance-none rounded-lg accent-indigo-600"
              onChange={(e: ChangeEvent<HTMLInputElement>) => onScrubChange(e)}
              min="0"
              max="2500"
              disabled={animationsToPay.length <= 0}
            ></input>
          </div>
          <Keyframe />

          <div className="absolute bottom-2 flex w-full justify-center">
            <div className="right-2 flex basis-1/4 items-center gap-4">
              <button
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={handleStopAnimation}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5.25 7.5A2.25 2.25 0 017.5 5.25h9a2.25 2.25 0 012.25 2.25v9a2.25 2.25 0 01-2.25 2.25h-9a2.25 2.25 0 01-2.25-2.25v-9z"
                  />
                </svg>
              </button>
              <button
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={handlePlayAnimation}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
                  />
                </svg>
              </button>
              <button
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={handlePauseAnimation}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
                </svg>
              </button>
            </div>
          </div>
        </Fragment>
      )}
    </div>
  );
};

export { Timeline };
