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
  const { animations, createKeyframe } = useAnimationsContext();

  const handlePlayAnimation = () => {
    const animationsList: Keyframe[] | PropertyIndexedKeyframes | { [x: string]: string }[] | null = [];
    if (animations) {
      // loop through all elements with animations
      animations.forEach((animation) => {
        const elementToAnimate = document.getElementById(animation.name);

        // loop through all keyframes within elements
        animation?.keyframes.forEach((keyframe) => {
          // convert style string to animation style object ('opacity: 0' to opacity: 0)
          keyframe.styles.forEach((style) => {
            const styleFormattedForAnimation = style.split(':');
            const styleProp = styleFormattedForAnimation[0];

            if (animationsList) {
              // remove previous style if exists
              animationsList.forEach((animation, index) => {
                if (animation[styleProp] || animation['transform']) {
                  animationsList.splice(index, 1);
                }
              });
            }

            if (styleProp === 'translateX' || styleProp === 'translateY') {
              animationsList.push({
                transform: `${styleProp}(${styleFormattedForAnimation[1]}px)`,
              });
            } else if (styleProp === 'rotate') {
              animationsList.push({
                transform: `${styleProp}(${styleFormattedForAnimation[1]}deg)`,
              });
            } else {
              animationsList.push({
                [styleProp]: styleFormattedForAnimation[1],
              });
            }
          });
          elementToAnimate?.animate(animationsList, {
            // timing options
            duration: 1500,
            fill: 'none',
            easing: 'ease-in-out',
            iterations: 10,
          });
        });
      });
    }
  };

  return (
    <div className="bg-white-400 flex h-2 w-full items-center justify-between rounded-sm bg-white">
      {selectedElementID &&
        animations?.length &&
        animations !== undefined &&
        keyframes.map((keyframe, index) => {
          return (
            <Fragment key={index}>
              <div
                className="h-5 w-5 rotate-45 cursor-pointer rounded-sm bg-white"
                onClick={() => {
                  createKeyframe(selectedElementID, keyframe as KeyframeTime);
                }}
              ></div>
            </Fragment>
          );
        })}
      <button className="pt-10" onClick={handlePlayAnimation}>
        Play Animation
      </button>
    </div>
  );
};

export { Keyframes };
