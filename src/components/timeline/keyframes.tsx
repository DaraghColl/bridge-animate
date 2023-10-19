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
    </div>
  );
};

export { Keyframes };
