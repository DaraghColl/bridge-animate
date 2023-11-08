import { FC, useEffect, useState } from 'react';
import { useSelectedElementContext } from '../../state/selected-element';
import { Zoom } from './zoom';

const Canvas: FC = () => {
  const { setSelectedElementId } = useSelectedElementContext();
  const [zoom, setZoom] = useState(100);

  const changeZoom = (zoomType: 'minus' | 'plus') => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const canvas = document.getElementById('canvas')! as any; // using any as TS does not accept 'zoom' property
    if (!canvas) return;

    canvas.style.zoom = `${zoomType === 'minus' ? zoom - 10 : zoom + 10}%`;

    setZoom(zoomType === 'minus' ? zoom - 10 : zoom + 10);
  };

  useEffect(() => {
    const canvas = document.getElementById('canvas')!;
    canvas.addEventListener('click', (event): void => {
      const { target } = event;
      if (target) {
        setSelectedElementId((target as HTMLElement).getAttribute('id'));
      }

      const controlPanel = document.getElementById('controls')!;
      controlPanel.querySelectorAll('input').forEach((element: HTMLInputElement) => {
        element.value = '';
      });
    });
  }, [setSelectedElementId]);

  return (
    <div className="relative flex basis-3/5 items-center justify-center rounded-md bg-dark-secondary">
      <Zoom onChangeZoom={changeZoom} />
      <span className="absolute right-4 top-10">{zoom}%</span>
      <div id="canvas">
        <svg
          id="heart-svg"
          width="200"
          height="200"
          viewBox="0 0 69 69"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid meet"
        >
          <g id="heart-group">
            <circle id="heart-background" cx="34.5" cy="34.5" r="34.5" fill="#131315" />
            <path
              id="heart"
              d="M46.25 29.3125C46.25 26.2063 43.6263 23.6875 40.39 23.6875C37.9713 23.6875 35.8937 25.095 35 27.1037C34.1063 25.095 32.0287 23.6875 29.6087 23.6875C26.375 23.6875 23.75 26.2063 23.75 29.3125C23.75 38.3375 35 44.3125 35 44.3125C35 44.3125 46.25 38.3375 46.25 29.3125Z"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </svg>
      </div>
    </div>
  );
};

export { Canvas };
