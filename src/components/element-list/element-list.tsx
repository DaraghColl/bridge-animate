import { FC, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useSelectedElementContext } from '../../state/selected-element';

const setElementIds = (elements: Element[]): Element[] => {
  const elementsWithIds = elements.map((element) => {
    if (!element.getAttribute('id')) {
      element.setAttribute('id', `animate-${uuidv4()}`);
      element.setAttribute('data-generated-animate-id', 'true');
    }

    return element;
  });

  return elementsWithIds;
};

const ElementList: FC = () => {
  const [elements, setElements] = useState<Element[] | null>(null);
  const { selectedElementID, setSelectedElementId } = useSelectedElementContext();

  const handleElementSelect = (element: Element) => {
    setSelectedElementId(element.getAttribute('id'));
  };

  useEffect(() => {
    const canvas = document.getElementById('canvas');

    if (canvas) {
      const allElements = canvas.getElementsByTagName('*');
      const allElementsArray = [...allElements];

      const elementsWithIds = setElementIds(allElementsArray);

      setElements(elementsWithIds);
    }
  }, []);

  return (
    <div>
      {!elements && <h1 data-cy="no_svg_message">No SVG in canvas</h1>}

      {elements &&
        elements.map((element, index) => {
          return (
            <div
              key={index}
              className={`cursor-pointer px-4 py-2 ${
                selectedElementID === element.getAttribute('id') ? 'text-indigo-600' : ''
              }`}
              onClick={() => handleElementSelect(element)}
            >
              <span className="text-sm font-normal">{element.getAttribute('id') ?? element.tagName}</span>
            </div>
          );
        })}
    </div>
  );
};

export { ElementList };
