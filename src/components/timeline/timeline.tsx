import { FC } from 'react';
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

  const handlePlayAnimation = () => {
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

        elementToAnimate?.animate(formatTransform, {
          duration: 1500,
          fill: 'auto',
          easing: 'ease-in-out',
          iterations: 1,
        });
      });
    }
  };

  return (
    <div className=" flex h-1/4 gap-4 rounded-md">
      <div className="basis-1/4 overflow-scroll bg-dark-secondary p-2">
        <Layers />
      </div>
      <div className="flex basis-3/4 flex-col gap-8 overflow-scroll bg-dark-secondary p-4">
        {/* {animations?.map(() => {
          return <Keyframe />;
        })} */}
        <Keyframe />
        <div className="absolute bottom-5 right-5 mt-10 flex gap-4">
          <button
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            onClick={handlePlayAnimation}
          >
            Play Animation
          </button>
        </div>
      </div>
    </div>
  );
};

export { Timeline };
