import { FC, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

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
      {!elements && <h1>No element selected</h1>}

      {elements &&
        elements.map((element, index) => {
          return (
            <div key={index} className="px-4 py-2">
              {element.getAttribute('id') ?? element.tagName}
            </div>
          );
        })}
    </div>
  );
};

export { ElementList };
