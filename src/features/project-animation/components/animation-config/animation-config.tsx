import { Cog6ToothIcon } from '@heroicons/react/24/outline';
import { FC, useEffect, useState } from 'react';
import {
  useAnimationsContext,
  AnimationConfig,
  AnimationConfigProperties,
} from '@/features/project-animation/state/animations';
import { useSelectedElementContext } from '@/features/project-animation/state/selected-element';

const timingFunctinOptions: { value: string; title: string }[] = [
  {
    title: 'linear',
    value: 'linear',
  },
  {
    title: 'ease',
    value: 'ease',
  },
  {
    title: 'ease in',
    value: 'ease-in',
  },
  {
    title: 'ease out',
    value: 'ease-out',
  },
  {
    title: 'ease in out',
    value: 'ease-in-out',
  },
];

const directionOptions: { value: string; title: string }[] = [
  {
    title: 'normal',
    value: 'normal',
  },
  {
    title: 'reverse',
    value: 'reverse',
  },
  {
    title: 'alternate',
    value: 'alternate',
  },
  {
    title: 'alternate-reverse',
    value: 'alternate-reverse',
  },
];

const fillModeOptions: { value: string; title: string }[] = [
  {
    title: 'none',
    value: 'none',
  },
  {
    title: 'forwards',
    value: 'forwards',
  },
  {
    title: 'backwards',
    value: 'backwards',
  },
  {
    title: 'both',
    value: 'both',
  },
];

const AnimationConfig: FC = () => {
  const { selectedElementID } = useSelectedElementContext();
  const { animations, updateAnimationConfig } = useAnimationsContext();
  const [selectedAnimationConfig, setSelectedAnimationConfig] = useState<AnimationConfig | null>(null);

  const handleInputChange = (configProperty: AnimationConfigProperties, e: string) => {
    if (!selectedElementID) return;
    updateAnimationConfig(selectedElementID, configProperty, e);
  };

  useEffect(() => {
    if (!selectedElementID || !animations) return;
    const selected = animations.findIndex((animation) => animation.name === selectedElementID);

    if (selected === -1) return;

    setSelectedAnimationConfig(animations[selected].config);
  }, [animations, selectedElementID]);

  return (
    <div className="w-full p-2 text-sm font-normal text-dark-primary dark:text-white">
      <div className="flex items-center gap-2">
        <Cog6ToothIcon className="h-4 w-4" />
        <span>Config</span>
      </div>

      {selectedAnimationConfig && (
        <div className="flex flex-col pt-2">
          {/* duration */}
          <div className="flex items-center gap-2 pb-4">
            <label className="w-1/3" htmlFor="duration">
              duration
            </label>
            <div className="w-2/3">
              <input
                name="duration"
                type="number"
                className="w-full rounded-sm bg-light-secondary px-2  py-1 text-dark-primary outline-none dark:bg-dark-primary dark:dark:text-gray-100"
                onBlur={(e) => handleInputChange('animationDuration', e.target.value)}
                onChange={(e) => handleInputChange('animationDuration', e.target.value)}
                value={selectedAnimationConfig.animationDuration ? selectedAnimationConfig.animationDuration : ''}
              />
            </div>
          </div>
          {/* delay */}
          <div className="flex items-center gap-2 pb-4">
            <label className="w-1/3" htmlFor="delay">
              delay
            </label>
            <div className="w-2/3">
              <input
                name="delay"
                type="number"
                className="w-full rounded-sm bg-light-secondary px-2  py-1 text-dark-primary outline-none dark:bg-dark-primary dark:dark:text-gray-100"
                onBlur={(e) => handleInputChange('animationDelay', e.target.value)}
                onChange={(e) => handleInputChange('animationDelay', e.target.value)}
                value={selectedAnimationConfig.animationDelay ? selectedAnimationConfig.animationDelay : ''}
              />
            </div>
          </div>
          {/* iteration */}
          <div className="flex items-center gap-2 pb-4">
            <label className="w-1/3" htmlFor="iteration">
              iteration
            </label>
            <div className="w-2/3">
              <input
                name="iteration"
                type="text"
                className="w-full rounded-sm bg-light-secondary px-2  py-1 text-dark-primary outline-none dark:bg-dark-primary dark:dark:text-gray-100"
                onBlur={(e) => handleInputChange('animationInterationCount', e.target.value)}
                onChange={(e) => handleInputChange('animationInterationCount', e.target.value)}
                value={
                  selectedAnimationConfig.animationInterationCount
                    ? selectedAnimationConfig.animationInterationCount
                    : ''
                }
              />
            </div>
          </div>
          {/* direction */}
          <div className="flex items-center gap-2 pb-4">
            <label className="w-1/3" htmlFor="direction">
              direction
            </label>
            <select
              name="direction"
              className="w-2/3 rounded-sm bg-light-secondary px-2  py-1 text-dark-primary outline-none dark:bg-dark-primary dark:dark:text-gray-100"
              onBlur={(e) => handleInputChange('animationDirection', e.target.value)}
              onChange={(e) => handleInputChange('animationDirection', e.target.value)}
            >
              {directionOptions.map((direrction) => {
                return (
                  <option key={direrction.value} value={direrction.value}>
                    {direrction.title}
                  </option>
                );
              })}
            </select>
          </div>
          {/* timing */}
          <div className="flex items-center gap-2 pb-4">
            <label className="w-1/3" htmlFor="timing">
              timing
            </label>
            <select
              name="timing"
              className="w-2/3 rounded-sm bg-light-secondary px-2  py-1 text-dark-primary outline-none dark:bg-dark-primary dark:dark:text-gray-100"
              onBlur={(e) => handleInputChange('animationTimingFunction', e.target.value)}
              onChange={(e) => handleInputChange('animationTimingFunction', e.target.value)}
            >
              {timingFunctinOptions.map((timing) => {
                return (
                  <option key={timing.value} value={timing.value}>
                    {timing.title}
                  </option>
                );
              })}
            </select>
          </div>
          {/* fill mode */}
          <div className="flex items-center gap-2 pb-4">
            <label className="w-1/3" htmlFor="fill">
              fill mode
            </label>
            <select
              name="fill"
              className="w-2/3 rounded-sm bg-light-secondary px-2  py-1 text-dark-primary outline-none dark:bg-dark-primary dark:dark:text-gray-100"
              onBlur={(e) => handleInputChange('animationFillMode', e.target.value)}
              onChange={(e) => handleInputChange('animationFillMode', e.target.value)}
            >
              {fillModeOptions.map((fill) => {
                return (
                  <option key={fill.value} value={fill.value}>
                    {fill.title}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export { AnimationConfig };
