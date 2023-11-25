import { FC, Fragment, useEffect } from 'react';
import { useSelectedElementContext } from '@state/selected-element';
import { KeyframeTime, useAnimationsContext } from '@state/animations';
import { keyframeTimes } from '@constants/constants';
import { usePrevious } from '@hooks/use-previous/use-previous';

const Keyframe: FC = () => {
  const { selectedElementID } = useSelectedElementContext();
  const previousSelectedElementId = usePrevious(selectedElementID);
  const { animations, createKeyframe, deleteKeyframe, selectedKeyFrameTime, setSelectedKeyFrameTime } =
    useAnimationsContext();
  const checkIfKeyframeExists = (keyframeTime: KeyframeTime) => {
    if (!animations) return;

    const selectedAnimation = animations?.find((animation) => animation.name === selectedElementID);
    const hasKeyframe = selectedAnimation?.keyframes.find((keyframe) => keyframe.time === keyframeTime);

    return !!hasKeyframe;
  };

  const deleteSelectedKeyframe = (keyframeTime: KeyframeTime) => {
    if (!selectedElementID) return;

    try {
      deleteKeyframe(selectedElementID, keyframeTime as KeyframeTime);
      setSelectedKeyFrameTime(null);
      const selectedElement = document.getElementById(selectedElementID);

      if (selectedElement) {
        selectedElement.removeAttribute('style');
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (selectedElementID !== previousSelectedElementId) {
      setSelectedKeyFrameTime(null);
    }
  }, [previousSelectedElementId, selectedElementID, setSelectedKeyFrameTime]);

  return (
    <div className="flex flex-col items-center justify-around">
      {selectedElementID && animations && animations?.length > 0 && animations !== null && (
        <div className="relative flex h-1 w-full items-center justify-between rounded-sm bg-light-secondary dark:bg-white">
          {keyframeTimes.map((keyframeTime, index) => {
            return (
              <Fragment key={index}>
                <div
                  className={`h-5 w-5 rotate-45 cursor-pointer rounded-sm ${
                    selectedKeyFrameTime === keyframeTime ? 'border-white-500 border-2' : ''
                  }
                  ${checkIfKeyframeExists(keyframeTime) ? 'bg-accent' : 'bg-slate-400'}
                  `}
                  onClick={() => {
                    if (checkIfKeyframeExists(keyframeTime)) {
                      setSelectedKeyFrameTime(keyframeTime);
                    }
                  }}
                  onDoubleClick={() => {
                    checkIfKeyframeExists(keyframeTime)
                      ? deleteSelectedKeyframe(keyframeTime as KeyframeTime)
                      : createKeyframe(selectedElementID, keyframeTime as KeyframeTime);
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
