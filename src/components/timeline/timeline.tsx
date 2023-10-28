import { ChangeEvent, FC, useState } from 'react';
import { Layers } from './layers';
import { Keyframe } from './keyframes';
import { useAnimationsContext } from '../../state/animations';

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
          duration: 5000,
          fill: 'auto',
          easing: 'ease-in-out',
          iterations: 1,
        });

        elementAnimation?.finish();

        setAnimationsToPay((prevAnimations) => [...prevAnimations, elementAnimation]);
      });
    }
  };

  return (
    <div className=" flex h-1/4 gap-4 rounded-md">
      <div className="basis-1/4 overflow-scroll bg-dark-secondary p-2">
        <Layers />
      </div>
      <div className="flex basis-3/4 flex-col gap-8 overflow-scroll bg-dark-secondary p-4">
        <div className="flex gap-5">
          <div className="flex basis-3/4 items-center">
            <input
              id="scrubber"
              type="range"
              className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
              onChange={(e: ChangeEvent<HTMLInputElement>) => onScrubChange(e)}
              min="0"
              max="5000"
              disabled={animationsToPay.length <= 0}
            ></input>
          </div>
          <div className="flex basis-1/4 items-center gap-4">
            <button
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              onClick={handleSetAnimation}
            >
              Set
            </button>
            <button
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              onClick={handlePlayAnimation}
            >
              Play
            </button>
            <button
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              onClick={handlePauseAnimation}
            >
              Pause
            </button>
          </div>
        </div>

        <Keyframe />
      </div>
    </div>
  );
};

export { Timeline };
