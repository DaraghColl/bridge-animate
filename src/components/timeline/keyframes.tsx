import { FC, Fragment } from 'react';
import { useSelectedElementContext } from '../../state/selected-element';
import { KeyframeTime, useAnimationsContext } from '../../state/animations';

const keyframes: KeyframeTime[] = ['0', '0.25', '0.50', '0.75', '1'];

const Keyframe: FC = () => {
  const { selectedElementID } = useSelectedElementContext();
  const { animations, createKeyframe, selectedKeyFrameTime } = useAnimationsContext();
  const checkIfKeyframeExists = (keyframeTime: KeyframeTime) => {
    if (!animations) return;

    const selectedAnimation = animations?.find((animation) => animation.name === selectedElementID);
    const hasKeyframe = selectedAnimation?.keyframes.find((keyframe) => keyframe.time === keyframeTime);

    return hasKeyframe;
  };

  return (
    <div className="flex flex-col items-center justify-around">
      {selectedElementID && animations && animations?.length > 0 && animations !== null && (
        <div className="relatice bg-white-400 flex h-1 w-full items-center justify-between rounded-sm bg-white">
          {keyframes.map((keyframe, index) => {
            return (
              <Fragment key={index}>
                <div
                  className={`h-5 w-5 rotate-45 cursor-pointer rounded-sm bg-white ${
                    selectedKeyFrameTime === keyframe ? 'border-2 border-white' : ''
                  }
                  ${checkIfKeyframeExists(keyframe) ? 'bg-indigo-500' : ''}
                  `}
                  onClick={() => {
                    createKeyframe(selectedElementID, keyframe as KeyframeTime);
                  }}
                />
              </Fragment>
            );
          })}
        </div>
      )}
    </div>
  );
};

export { Keyframe };
