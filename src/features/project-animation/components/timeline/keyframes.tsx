import { FC, Fragment, useEffect } from 'react';
import { flushSync } from 'react-dom';
import { useSelectedElementContext } from '../../state/selected-element/selected-element';
import { Animation, KeyframeTime, useAnimationsContext } from '../../state/animations/animations';
import { keyframeTimes } from '../../constants/constants';
import { usePrevious } from '@shared/hooks/use-previous/use-previous';

interface KeyframeProps {
  animation: Animation;
}

const Keyframe: FC<KeyframeProps> = (props) => {
  const { animation } = props;

  const { selectedElementID, setSelectedElementId } = useSelectedElementContext();
  const previousSelectedElementId = usePrevious(selectedElementID);
  const { animations, createKeyframe, deleteKeyframe, selectedKeyFrameTime, setSelectedKeyFrameTime } =
    useAnimationsContext();

  const onKeyframeSelect = (animationName: string, keyframeTime: KeyframeTime) => {
    flushSync(() => {
      setSelectedElementId(animationName);
    });
    if (checkIfKeyframeExists(keyframeTime)) {
      setSelectedKeyFrameTime(keyframeTime);
    }
  };

  const checkIfKeyframeExists = (keyframeTime: KeyframeTime) => {
    if (!animations) return;

    // const selectedAnimation = animations?.find((animation) => animation.name === selectedElementID);
    // const hasKeyframe = selectedAnimation?.keyframes.find((keyframe) => keyframe.time === keyframeTime);

    const hasKeyframe = animation?.keyframes.find((keyframe) => keyframe.time === keyframeTime);

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
    <div className="mb-2 flex flex-col items-center justify-around px-1 text-sm">
      {selectedElementID && animations && animations?.length > 0 && animations !== null && (
        <div className="flex w-full items-center gap-4">
          <div className="w-1/6 cursor-pointer">
            <span className={`${selectedElementID === animation.name ? 'text-accent' : ''}`}>{animation.name}</span>
          </div>
          <div className="mb-4 mt-4 w-5/6">
            <div className="relative flex h-1 w-full items-center justify-between rounded-sm bg-light-secondary dark:bg-white">
              {keyframeTimes.map((keyframeTime, index) => {
                return (
                  <Fragment key={index}>
                    <div
                      className={`h-4 w-4 rotate-45 cursor-pointer rounded-sm ${
                        selectedElementID === animation.name && selectedKeyFrameTime === keyframeTime
                          ? 'border-white-500 border-2'
                          : ''
                      }
                  ${checkIfKeyframeExists(keyframeTime) ? 'bg-accent' : 'bg-slate-400'}
                  `}
                      onClick={() => {
                        onKeyframeSelect(animation.name, keyframeTime);
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
          </div>
        </div>
      )}
    </div>
  );
};

export { Keyframe };
