import { FC, useEffect, useState, useCallback, MouseEvent as ReactMouseEvent } from 'react';
import { useSelectedElementContext } from '../../state/selected-element';
import { useAnimationsContext } from '../../state/animations';

export type TransformType = 'y' | 'x' | 'rotate';
interface KeyframeTransforms {
  x: number;
  y: number;
  rotate: number;
}

const TransformTool: FC = () => {
  const { selectedElementID } = useSelectedElementContext();
  const { createKeyframeStyles, selectedKeyFrameTime, animations } = useAnimationsContext();
  const [currentKeyframeTransforms, setCurrentKeyframeTransforms] = useState<KeyframeTransforms>({
    x: 0,
    y: 0,
    rotate: 0,
  });

  const [usingTransformTool, setUsingTransformTool] = useState(false);
  const [transformSelected, setUsingTransformSelected] = useState<TransformType | null>(null);
  const [transformSelectedPosition, setTransformSelectedPosition] = useState<{ x: number; y: number } | null>(null);

  const handleTransformPositionChange = () => {
    if (animations && animations?.length <= 0) return;

    const currentKeyframe = animations
      ?.find((animation) => animation.name === selectedElementID)
      ?.keyframes.find((keyframe) => keyframe.time === selectedKeyFrameTime)?.styles;

    if (!currentKeyframe) return;

    setCurrentKeyframeTransforms({
      x: Number(currentKeyframe.translateX),
      y: Number(currentKeyframe.translateY),
      rotate: Number(currentKeyframe.rotate),
    });
  };

  useEffect(() => {
    handleTransformPositionChange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedElementID, selectedKeyFrameTime]);

  const handleMouseMovement = useCallback(
    (event: MouseEvent) => {
      if (!transformSelectedPosition) return;

      if (!selectedElementID || !selectedKeyFrameTime) return;

      if (transformSelected === 'y') {
        let totalY = 0;
        const currentTranslateY = Number(currentKeyframeTransforms.y);

        if (event.clientY > transformSelectedPosition.y) {
          const movement = event.clientY - transformSelectedPosition.y;
          totalY = currentTranslateY + movement;
          createKeyframeStyles(selectedElementID, 'translateY', totalY.toString());
        }

        if (event.clientY < transformSelectedPosition.y) {
          const movement = event.clientY - transformSelectedPosition.y;
          totalY -= currentTranslateY + movement;
          createKeyframeStyles(selectedElementID, 'translateY', (-totalY).toString());
        }
      }

      if (transformSelected === 'x') {
        let totalX = 0;
        const currentTranslateX = Number(currentKeyframeTransforms.x);

        if (event.clientX > transformSelectedPosition.x) {
          const movement = event.clientX - transformSelectedPosition.x;
          totalX = currentTranslateX + movement;
          createKeyframeStyles(selectedElementID, 'translateX', totalX.toString());
        }

        if (event.clientX < transformSelectedPosition.x) {
          const movement = event.clientX - transformSelectedPosition.x;
          totalX -= currentTranslateX + movement;
          createKeyframeStyles(selectedElementID, 'translateX', (-totalX).toString());
        }
      }

      if (transformSelected === 'rotate') {
        let totalRotate = 0;
        const currentRotate = Number(currentKeyframeTransforms.rotate);
        if (event.clientY > transformSelectedPosition.y) {
          totalRotate = event.clientY - transformSelectedPosition.y + currentRotate;
        }
        if (event.clientY < transformSelectedPosition.y) {
          totalRotate = event.clientY - transformSelectedPosition.y + currentRotate;
        }

        if (totalRotate < -360) {
          totalRotate = -360;
        }
        if (totalRotate > 360) {
          totalRotate = 360;
        }
        createKeyframeStyles(selectedElementID, 'rotate', totalRotate.toString());
      }
    },
    [
      createKeyframeStyles,
      currentKeyframeTransforms,
      selectedElementID,
      selectedKeyFrameTime,
      transformSelected,
      transformSelectedPosition,
    ],
  );

  const mouseDown = (
    event: ReactMouseEvent<SVGCircleElement | SVGPathElement | SVGGElement>,
    transformType: TransformType,
  ) => {
    setUsingTransformSelected(transformType);
    setUsingTransformTool(true);
    setTransformSelectedPosition({ x: event.clientX, y: event.clientY });
  };

  const mouseUp = useCallback(() => {
    document.removeEventListener('mousemove', handleMouseMovement);
    setUsingTransformTool(false);
    handleTransformPositionChange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleMouseMovement]);

  useEffect(() => {
    if (usingTransformTool) {
      document.addEventListener('mousemove', handleMouseMovement);
      document.addEventListener('mouseup', mouseUp);
    }
  }, [mouseUp, handleMouseMovement, usingTransformTool]);

  return (
    <div className="absolute right-2 top-2">
      <svg id="transform-tool" className="h-14 w-14" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="transform">
          <path
            id="transform-lines"
            className="stroke-dark-secondary dark:stroke-white"
            d="M2.5 3V10.5H10"
            stroke="black"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle
            id="transform-y-minus"
            className={transformSelected === 'y' ? 'cursor-pointer stroke-black dark:stroke-white' : 'cursor-pointer'}
            cx="2.5"
            cy="2.5"
            r="2.5"
            fill="#6366F1"
            onMouseDown={(e) => mouseDown(e, 'y')}
          />
          <circle
            id="transform-x-plus"
            className={transformSelected === 'x' ? 'cursor-pointer stroke-black dark:stroke-white' : 'cursor-pointer'}
            cx="10.5"
            cy="10.5"
            r="2.5"
            fill="#6366F1"
            onMouseDown={(e) => mouseDown(e, 'x')}
          />
          <path
            id="transform-rotate"
            d="M8 1C9.33333 1.16667 11.7 2.3 10.5 5.5"
            className={
              transformSelected === 'rotate'
                ? 'cursor-pointer stroke-black dark:stroke-white'
                : 'cursor-pointer stroke-accent'
            }
            onMouseDown={(e) => mouseDown(e, 'rotate')}
          />
        </g>
      </svg>
    </div>
  );
};

export { TransformTool };
