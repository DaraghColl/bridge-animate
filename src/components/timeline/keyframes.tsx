import { FC, Fragment } from 'react';
import { useSelectedElementContext } from '../../state/selected-element';
import { KeyframeTime, useAnimationsContext } from '../../state/animations';

const keyframes: string[] = ['0', '0.25', '0.50', '0.75', '1'];

// interface KeyframeProps {
//   handlePlayAnimation: () => void;
// }

const Keyframe: FC = () => {
  const { selectedElementID } = useSelectedElementContext();
  const { animations, createKeyframe, selectedKeyFrameTime } = useAnimationsContext();

  return (
    <div className="flex flex-col items-center justify-around">
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
    </div>
  );
};

export { Keyframe };
