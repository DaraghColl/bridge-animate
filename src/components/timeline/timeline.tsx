import { ChangeEvent, FC, Fragment, useState } from 'react';
import { Layers } from './layers';
import { Keyframe } from './keyframes';
import { KeyframeTime, useAnimationsContext } from '../../state/animations';
import { keyframeTimes } from '../../constants/constants';

interface StyleObjectKeys {
  [key: string]: string | number | null | undefined;
}
interface StyleObject extends StyleObjectKeys {
  opacity?: string | null;
  rotate?: string | null;
  translateX?: string | null;
  translateY?: string | null;
  offset: number;
}

interface FormattedStyleObject extends StyleObjectKeys {
  opacity?: string | null;
  transform?: string | null;
  offset: number;
}

const Timeline: FC = () => {
  const { animations } = useAnimationsContext();
  const [isPlaying, setIsPlaying] = useState(false);
  const [animationsToPay, setAnimationsToPay] = useState<(Animation | undefined)[]>([]);

  const handlePauseAnimation = () => {
    setIsPlaying(false);
    if (isPlaying) {
      animationsToPay.forEach((animation) => {
        if (animation) {
          animation.pause();
        }
      });
    }
  };

  const handlePlayAnimation = () => {
    setIsPlaying(true);
    animationsToPay.forEach((animation) => {
      if (animation) {
        animation.play();
      }
    });
  };

  const onScrubChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!animations?.length) return;

    const time = e.currentTarget.value;
    animationsToPay.forEach((animation) => {
      if (animation) {
        animation.currentTime = Number(time);
      }

      handlePauseAnimation();
    });
  };

  const handleSetAnimation = () => {
    if (animations) {
      // loop through all elements with animations
      animations.forEach((animation) => {
        const elementToAnimate = document.getElementById(animation.name);
        // const javascriptFormattedAnimations: Keyframe[] = [];
        const javascriptFormattedAnimations: FormattedStyleObject[] = [];

        animation.keyframes.forEach(({ styles, time }) => {
          const animationStyleObject: StyleObject = {
            opacity: null,
            rotate: null,
            translateX: null,
            translateY: null,
            offset: Number(time),
          };

          for (const [key, value] of Object.entries(styles)) {
            if (value !== null && value !== '') {
              if (key === 'translateX' || key === 'translateY') {
                animationStyleObject[key] = `${key}(${value}px)`;
              } else if (key === 'rotate') {
                animationStyleObject[key] = `${key}(${value}deg)`;
              } else {
                animationStyleObject[key] = value;
              }
            }
          }
          javascriptFormattedAnimations.push(animationStyleObject);
        });

        const formatTransform = javascriptFormattedAnimations.map(
          ({ opacity, rotate, translateX, translateY, offset }) => {
            return {
              opacity: opacity ? opacity : '1',
              transform: `${rotate ? rotate : ''} ${translateX ? translateX : ''} ${translateY ? translateY : ''}`,
              offset: offset,
            };
          },
        );

        const elementAnimation = elementToAnimate?.animate(formatTransform, {
          duration: 2500,
          fill: 'auto',
          easing: 'ease-in-out',
          iterations: 1,
        });

        elementAnimation?.finish();

        setAnimationsToPay((prevAnimations) => [...prevAnimations, elementAnimation]);
      });
    }
  };

  const keyframePercentageMap: Record<KeyframeTime, string> = {
    '0': '0%',
    '0.25': '25%',
    '0.50': '50%',
    '0.75': '75%',
    '1': '100%',
  };

  return (
    <div className=" flex h-1/3 gap-4 rounded-md">
      <div className="basis-1/4 overflow-scroll bg-dark-secondary p-2">
        <Layers />
      </div>
      <div className="relative flex basis-3/4 flex-col gap-4 overflow-scroll bg-dark-secondary p-4">
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
                id="scrubber"
                type="range"
                className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-indigo-500"
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
                  className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                  onClick={handleSetAnimation}
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
                      d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                    />
                  </svg>
                </button>
                <button
                  className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
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
                  className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
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
    </div>
  );
};

export { Timeline };
