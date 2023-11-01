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
      <span className="absolute right-2 top-10">{zoom}%</span>
      <div id="canvas">
        <svg width="200" height="200" viewBox="0 0 98 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="circles">
            <circle id="circle-3" cx="86" cy="12" r="12" fill="#EC4899" />
            <circle id="circle-2" cx="49" cy="12" r="12" fill="#6366F1" />
            <circle id="circle-1" cx="12" cy="12" r="12" fill="#3B82F6" />
          </g>
        </svg>
      </div>
    </div>
  );
};

export { Canvas };
