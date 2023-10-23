import { FC, Fragment } from 'react';
import { useSelectedElementContext } from '../../state/selected-element';
import { KeyframeTime, useAnimationsContext } from '../../state/animations';

const Keyframes: FC = () => {
  return (
    <div className="flex flex-col items-center justify-around">
      <Keyframe />
    </div>
  );
};

const keyframes: string[] = ['0', '0.25', '0.50', '0.75', '1'];

const Keyframe: FC = () => {
  const { selectedElementID } = useSelectedElementContext();
  const { animations, createKeyframe, selectedKeyFrameTime } = useAnimationsContext();
  const javascriptFormattedAnimations: Keyframe[] = [];

  const handlePlayAnimation = () => {
    if (animations) {
      // loop through all elements with animations
      animations.forEach((animation) => {
        const elementToAnimate = document.getElementById(animation.name);

        animation.keyframes.forEach(({ styles, time }) => {
          for (const [key, value] of Object.entries(styles)) {
            if (value !== null && value !== '') {
              if (key === 'translateX' || key === 'translateY') {
                javascriptFormattedAnimations.push({
                  transform: `${key}(${value}px)`,
                  offset: Number(time),
                });
              } else if (key === 'rotate') {
                javascriptFormattedAnimations.push({
                  transform: `${key}(${value}deg)`,
                  offset: Number(time),
                });
              } else {
                javascriptFormattedAnimations.push({
                  [key]: value,
                  offset: Number(time),
                });
              }
            }
          }
        });

        // join all transforms as js animate groups all transforms - {transform: 'rotate translate...'}
        const joinedTransforms = javascriptFormattedAnimations.map((jt) => jt.transform).join(' ');
        const animsWithoutTransforms = javascriptFormattedAnimations.filter((awt) => !awt.transform);
        const joinedAnims = [...animsWithoutTransforms, { transform: joinedTransforms }];

        elementToAnimate?.animate(joinedAnims, {
          // timing options
          duration: 1500,
          fill: 'none',
          easing: 'ease-in-out',
          iterations: 1,
        });
      });
    }
  };

  return (
    <Fragment>
      {selectedElementID && animations && animations?.length > 0 && animations !== null && (
        <div className="relatice bg-white-400 flex h-2 w-full items-center justify-between rounded-sm bg-white">
          {keyframes.map((keyframe, index) => {
            return (
              <Fragment key={index}>
                <div
                  className={`h-5 w-5 rotate-45 cursor-pointer rounded-sm bg-white ${
                    selectedKeyFrameTime === keyframe ? 'border-4 border-indigo-500' : ''
                  }`}
                  onClick={() => {
                    createKeyframe(selectedElementID, keyframe as KeyframeTime);
                  }}
                ></div>
              </Fragment>
            );
          })}
        </div>
      )}
      <div className="absolute bottom-5 right-5 mt-10 flex gap-4">
        <button
          className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          onClick={handlePlayAnimation}
        >
          Play Animation
        </button>
      </div>
    </Fragment>
  );
};

export { Keyframes };
