import { FC, Fragment, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Disclosure } from '@headlessui/react';
import { ChevronRightIcon } from '@heroicons/react/24/solid';
import { useSelectedElementContext } from '../../state/selected-element';
import { useCanvasContext } from '../../state/canvas';
import { ImportSvg } from '../import-svg/import-svg';

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
  const { userSvg } = useCanvasContext();

  const mapElementsChildNodes = (element: Element) => {
    const handleElementSelect = (element: Element) => {
      setSelectedElementId(element.getAttribute('id'));
    };

    return (
      <div>
        {element.hasChildNodes() && (
          <Disclosure>
            {({ open }) => (
              <Fragment>
                <div className="flex w-full cursor-pointer items-center gap-2 text-sm font-normal">
                  <Disclosure.Button>
                    <ChevronRightIcon
                      className={open ? ' w-4 rotate-90 transform text-slate-medium' : 'w-4 text-slate-medium'}
                    />
                  </Disclosure.Button>
                  <button aria-label="set selected element" onClick={() => handleElementSelect(element)}>
                    <span
                      className={
                        selectedElementID === element.getAttribute('id')
                          ? 'whitespace-nowrap text-accent'
                          : 'whitespace-nowrap'
                      }
                    >
                      {element.getAttribute('id') ?? element.tagName}
                    </span>
                  </button>
                </div>
                <Disclosure.Panel className="ml-2 pt-2">
                  {[...element.children].map((childNode) => {
                    return <Fragment key={childNode.id}>{mapElementsChildNodes(childNode)}</Fragment>;
                  })}
                </Disclosure.Panel>
              </Fragment>
            )}
          </Disclosure>
        )}
        {!element.hasChildNodes() && (
          <button
            aria-label="set selected element"
            className="ml-6 mt-1 cursor-pointer"
            onClick={() => handleElementSelect(element)}
          >
            <span
              className={
                selectedElementID === element.getAttribute('id') ? 'whitespace-nowrap text-accent' : 'whitespace-nowrap'
              }
            >
              {element.getAttribute('id') ?? element.tagName}
            </span>
          </button>
        )}
      </div>
    );
  };

  useEffect(() => {
    const canvas = document.getElementById('canvas');

    if (canvas) {
      const allElements = canvas.getElementsByTagName('*');
      const allElementsArray = [...allElements];

      // remove svg container from selected elements
      allElementsArray.splice(0, 1);

      const elementsWithIds = setElementIds(allElementsArray);

      if (elementsWithIds.length <= 0) return;

      setElements(elementsWithIds);
    }
  }, [userSvg]);

  return (
    <div>
      <div>
        <ImportSvg />
      </div>
      {elements && userSvg && <div className="p-2">{mapElementsChildNodes(elements[0])}</div>}
    </div>
  );
};
export { ElementList };
