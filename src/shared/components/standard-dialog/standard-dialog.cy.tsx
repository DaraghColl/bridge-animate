/* eslint-disable react-refresh/only-export-components */
import { Fragment, useState } from 'react';
import { StandardDialog } from './standard-dialog';

const MockComponent = () => {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <Fragment>
      <button data-cy="mock_component_dialog_button_open" onClick={() => setOpenDialog(true)}>
        Click
      </button>

      <StandardDialog
        onDialogClose={setOpenDialog}
        openDialog={openDialog}
        title="standard dialog title"
        children={<span>standard dialog content</span>}
      />
    </Fragment>
  );
};

describe('Standard Dialog', () => {
  // it('should open dialog on click', () => {
  //   cy.mount(<MockComponent />);

  //   cy.get('[data-cy="mock_component_dialog_button_open"]').click();

  //   cy.get('[data-cy="standard_dialog"]').should('be.visible');
  // });

  it('should open dialog on click and show title and message', () => {
    cy.mount(<MockComponent />);

    cy.get('[data-cy="mock_component_dialog_button_open"]').click();

    cy.get('[data-cy="standard_dialog_title"]').contains('standard dialog title');
    cy.get('[data-cy="standard_dialog_content"]').contains('standard dialog content');
  });

  it('should close dialog on cancel click', () => {
    cy.mount(<MockComponent />);

    cy.get('[data-cy="mock_component_dialog_button_open"]').click();

    cy.get('body').click();
    cy.get('[data-cy="standard_dialog_title"]').should(($el) => {
      const doesNotExist = $el.length == 0;
      const isNotVisible = !$el.is('visible');
      const doesNotExistOrIsNotVisible = doesNotExist || isNotVisible;

      expect(doesNotExistOrIsNotVisible, 'does not exist or is not visible').to.be.true;
    });
  });
});
