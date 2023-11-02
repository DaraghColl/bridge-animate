import { FC, Fragment } from 'react';
import { useSelectedElementContext } from '../../state/selected-element';
import { KeyframeTime, useAnimationsContext } from '../../state/animations';
import { keyframeTimes } from '../../constants/constants';

const Keyframe: FC = () => {
  const { selectedElementID } = useSelectedElementContext();
  const { animations, createKeyframe, selectedKeyFrameTime, setSelectedKeyFrameTime } = useAnimationsContext();
  const checkIfKeyframeExists = (keyframeTime: KeyframeTime) => {
    if (!animations) return;

    const selectedAnimation = animations?.find((animation) => animation.name === selectedElementID);
    const hasKeyframe = selectedAnimation?.keyframes.find((keyframe) => keyframe.time === keyframeTime);

    return !!hasKeyframe;
  };

  return (
    <div className="flex flex-col items-center justify-around">
      {selectedElementID && animations && animations?.length > 0 && animations !== null && (
        <div className="bg-white-400 relative flex h-1 w-full items-center justify-between rounded-sm bg-white">
          {keyframeTimes.map((keyframeTime, index) => {
            return (
              <Fragment key={index}>
                <div
                  className={`h-5 w-5 rotate-45 cursor-pointer rounded-sm ${
                    selectedKeyFrameTime === keyframeTime ? 'border-white-500 border-2' : ''
                  }
                  ${checkIfKeyframeExists(keyframeTime) ? 'bg-indigo-500' : 'bg-slate-400'}
                  `}
                  onClick={() => {
                    if (checkIfKeyframeExists(keyframeTime)) {
                      setSelectedKeyFrameTime(keyframeTime);
                    }
                  }}
                  onDoubleClick={() => {
                    createKeyframe(selectedElementID, keyframeTime as KeyframeTime);
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
