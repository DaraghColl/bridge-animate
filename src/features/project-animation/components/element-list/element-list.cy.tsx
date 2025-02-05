/* eslint-disable react-refresh/only-export-components */
import { ElementList } from './element-list';
import {
  SelectedElementProvider,
  useSelectedElementContext,
} from '@/features/project-animation/state/selected-element/selected-element';
import { ThemeProvider } from '@shared/state/theme/theme';
import { CanvasProvider, useCanvasContext } from '@/features/project-animation/state/canvas/canvas';
import { useEffect } from 'react';

const MockCanvas = () => {
  const { setUserSvg } = useCanvasContext();
  useEffect(() => {
    setUserSvg('test');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div id="canvas">
      <div id="canvas_svg_container">
        <svg id="mock_svg" width="200" height="200" viewBox="0 0 98 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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

const MockSelectedElementText = () => {
  const { selectedElementID } = useSelectedElementContext();

  return <div data-cy="mock_selected_element_id">{selectedElementID}</div>;
};

describe('ElementList component', () => {
  it('should show no element in canvas message', () => {
    cy.mount(
      <SelectedElementProvider>
        <CanvasProvider>
          <ThemeProvider>
            <ElementList />
          </ThemeProvider>
        </CanvasProvider>
      </SelectedElementProvider>,
    );

    cy.get('[data-cy="import_svg"]').should('be.visible');
  });

  it('should show parent element', () => {
    cy.mount(
      <SelectedElementProvider>
        <CanvasProvider>
          <ThemeProvider>
            <MockCanvas />
            <ElementList />
          </ThemeProvider>
        </CanvasProvider>
      </SelectedElementProvider>,
    );

    cy.contains('div', 'mock_svg');
  });

  it('should set selected element id on click', () => {
    cy.mount(
      <SelectedElementProvider>
        <CanvasProvider>
          <ThemeProvider>
            <MockCanvas />
            <ElementList />
            <MockSelectedElementText />
          </ThemeProvider>
        </CanvasProvider>
      </SelectedElementProvider>,
    );

    cy.contains('button', 'mock_svg').click({ force: true });

    cy.get('[data-cy="mock_selected_element_id"]').contains('mock_svg');
  });
});
