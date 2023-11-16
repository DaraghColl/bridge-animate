import { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import { useSelectedElementContext } from '../../state/selected-element';
import { useCanvasContext } from '../../state/canvas';
import { Zoom } from './zoom';
import { CanvasViewOptions } from '../canvas-view-options/canvas-view-options';
import { TransformTool } from '../transform-tool/transform-tool';

const Canvas: FC = () => {
  const { setSelectedElementId } = useSelectedElementContext();
  const [zoom, setZoom] = useState(100);
  const [backgroundColor, setBackgroundColor] = useState('#131315');
  const canvasRef = useRef(null);
  const { userSvg } = useCanvasContext();

  const changeZoom = (zoomType: 'minus' | 'plus') => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const canvas = document.getElementById('canvas')! as any; // using any as TS does not accept 'zoom' property
    if (!canvas) return;

    canvas.style.zoom = `${zoomType === 'minus' ? zoom - 10 : zoom + 10}%`;

    setZoom(zoomType === 'minus' ? zoom - 10 : zoom + 10);
  };

  const onBackgroundColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    const canvas = document.getElementById('canvas')!; // using any as TS does not accept 'zoom' property
    if (!canvas) return;

    setBackgroundColor(e.target.value);
    canvas.style.backgroundColor = e.target.value;
  };

  useEffect(() => {
    const canvas = document.getElementById('canvas')!;
    canvas.addEventListener('click', (event): void => {
      const { target } = event;
      if (
        !target ||
        (target as HTMLElement).getAttribute('id') === 'canvas' ||
        (target as HTMLElement).getAttribute('id') === 'canvas_svg_container'
      )
        return;

      setSelectedElementId((target as HTMLElement).getAttribute('id'));
    });
  }, [setSelectedElementId]);

  return (
    <div className="relative flex basis-3/5 items-center justify-center rounded-md">
      <CanvasViewOptions />
      <Zoom onChangeZoom={changeZoom} />
      <TransformTool />
      <span className="absolute left-5 top-10 select-none">{zoom}%</span>
      <div id="canvas" ref={canvasRef} className="flex h-full w-full items-center justify-around rounded-md">
        {userSvg && <div id="canvas_svg_container" dangerouslySetInnerHTML={{ __html: userSvg }} />}
      </div>
      <div className="absolute bottom-2 right-2 flex gap-2">
        <input
          aria-label="canvas background color"
          className="canvas-bg-color-picker"
          value={backgroundColor}
          onChange={(e) => onBackgroundColorChange(e)}
          name="canvas-color"
          type="color"
        />
      </div>
    </div>
  );
};

export { Canvas };
