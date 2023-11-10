import { FC, useEffect, useState, useCallback, MouseEvent as ReactMouseEvent } from 'react';
import { useSelectedElementContext } from '../../state/selected-element';
import { useAnimationsContext } from '../../state/animations';

export type TransformType = 'y' | 'x' | 'rotate';

const TransformTool: FC = () => {
  const { selectedElementID } = useSelectedElementContext();
  const { createKeyframeStyles, selectedKeyFrameTime } = useAnimationsContext();
  const [usingTransformTool, setUsingTransformTool] = useState(false);
  const [transformSelected, setUsingTransformSelected] = useState<TransformType | null>(null);
  const [transformSelectedPosition, setTransformSelectedPosition] = useState<{ x: number; y: number } | null>(null);
  const heart = document.getElementById('heart-svg');

  const handleMouseMovement = useCallback(
    (event: MouseEvent) => {
      if (!transformSelectedPosition || !heart) return;

      if (!selectedElementID || !selectedKeyFrameTime) return;
      if (transformSelected === 'y') {
        let totalY = 0;
        if (event.clientY > transformSelectedPosition.y) {
          totalY = event.clientY - transformSelectedPosition.y;
          createKeyframeStyles(selectedElementID, 'translateY', totalY.toString());
          // heart.style.transform = `translateY(${totalY}px)`;
        }
        if (event.clientY < transformSelectedPosition.y) {
          totalY = transformSelectedPosition.y - event.clientY;
          createKeyframeStyles(selectedElementID, 'translateY', (-totalY).toString());
        }
      }

      if (transformSelected === 'x') {
        let totalX = 0;
        if (event.clientX > transformSelectedPosition.x) {
          totalX = event.clientX - transformSelectedPosition.x;
          createKeyframeStyles(selectedElementID, 'translateX', totalX.toString());
        }

        if (event.clientX < transformSelectedPosition.x) {
          totalX = transformSelectedPosition.x - event.clientX;
          createKeyframeStyles(selectedElementID, 'translateX', (-totalX).toString());
        }
      }

      if (transformSelected === 'rotate') {
        let totalRotate = 0;
        if (event.clientY > transformSelectedPosition.y) {
          totalRotate = event.clientY - transformSelectedPosition.y;
          if (totalRotate > 360) {
            totalRotate = 360;
          }
          createKeyframeStyles(selectedElementID, 'rotate', totalRotate.toString());
        }
      }
    },
    [
      createKeyframeStyles,
      heart,
      selectedElementID,
      selectedKeyFrameTime,
      transformSelected,
      transformSelectedPosition,
    ],
  );

  const mouseDown = (event: ReactMouseEvent<SVGCircleElement | SVGPathElement>, transformType: TransformType) => {
    setUsingTransformSelected(transformType);
    setUsingTransformTool(true);
    setTransformSelectedPosition({ x: event.clientX, y: event.clientY });
  };

  const mouseUp = useCallback(() => {
    document.removeEventListener('mousemove', handleMouseMovement);
    setUsingTransformTool(false);
  }, [handleMouseMovement]);

  useEffect(() => {
    if (usingTransformTool) {
      document.addEventListener('mousemove', handleMouseMovement);
      document.addEventListener('mouseup', mouseUp);
    }
  }, [mouseUp, handleMouseMovement, usingTransformTool]);

  return (
    <div className="absolute right-10 top-20">
      <svg id="transform-tool" className="h-16 w-16" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
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
            className={
              transformSelected === 'y' ? 'cursor-pointer border-b-2 border-gray-100 stroke-white' : 'cursor-pointer'
            }
            cx="2.5"
            cy="2.5"
            r="2.5"
            fill="#6366F1"
            onMouseDown={(e) => mouseDown(e, 'y')}
          />
          <circle
            id="transform-x-plus"
            className={transformSelected === 'x' ? 'cursor-pointer border-b-2 stroke-white' : 'cursor-pointer'}
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
                ? 'cursor-pointer stroke-white dark:stroke-white'
                : 'cursor-pointer stroke-indigo-500'
            }
            onMouseDown={(e) => mouseDown(e, 'rotate')}
          />
        </g>
      </svg>
    </div>
  );
};

export { TransformTool };
