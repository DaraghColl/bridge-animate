import { FC, Fragment, useEffect } from 'react';
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const animationsList: Keyframe[] = [];

  useEffect(() => {
    // console.log(animations);
  }, [animationsList]);

  const handleSetAnimationStyles = () => {
    if (animations) {
      // loop through all elements with animations
      animations.forEach((animation) => {
        // loop through all keyframes within elements
        animation?.keyframes.forEach((keyframe) => {
          // convert style string to animation style object ('opacity: 0' to opacity: 0)
          keyframe.styles.forEach((style) => {
            const styleFormattedForAnimation = style.split(':');
            const styleProp = styleFormattedForAnimation[0];

            // if (animationsList) {
            //   // remove previous style if exists
            //   animationsList.forEach((animation, index) => {
            //     if (animation[styleProp] || animation['transform']) {
            //       animationsList.splice(index, 1);
            //     }
            //   });
            // }

            if (styleProp === 'translateX' || styleProp === 'translateY') {
              animationsList.push({
                transform: `${styleProp}(${styleFormattedForAnimation[1]}px)`,
                offset: Number(keyframe.time),
              });
            } else if (styleProp === 'rotate') {
              animationsList.push({
                transform: `${styleProp}(${styleFormattedForAnimation[1]}deg)`,
                offset: Number(keyframe.time),
              });
            } else {
              animationsList.push({
                [styleProp]: styleFormattedForAnimation[1],
                offset: Number(keyframe.time),
              });
            }
          });
        });
      });
    }
  };

  const handlePlayAnimation = () => {
    if (animations) {
      console.warn(animations);
      // loop through all elements with animations
      animations.forEach((animation) => {
        const elementToAnimate = document.getElementById(animation.name);

        elementToAnimate?.animate(animationsList, {
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
          onClick={handleSetAnimationStyles}
        >
          Set Animation styles
        </button>
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
