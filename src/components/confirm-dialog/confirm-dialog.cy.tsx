/* eslint-disable react-refresh/only-export-components */
import { Fragment, useState } from 'react';
import { ConfirmDialog } from './confirm-dialog';

const MockComponent = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const callback = () => {};

  return (
    <Fragment>
      <button data-cy="mock_component_dialog_button_open" onClick={() => setOpenDialog(true)}>
        Click
      </button>

      <ConfirmDialog
        confirmCallback={callback}
        onDialogClose={setOpenDialog}
        openDialog={openDialog}
        title="confirm dialog cypress test title"
        message="confirm dialog cypress test title"
      />
    </Fragment>
  );
};

describe('<ElementList />', () => {
  it('should open dialog on click', () => {
    cy.mount(<MockComponent />);

    cy.get('[data-cy="mock_component_dialog_button_open"]').click();

    cy.get('[data-cy="confirm_dialog"]').should('be.visible');
  });

  it('should open dialog on click and show title and message', () => {
    cy.mount(<MockComponent />);

    cy.get('[data-cy="mock_component_dialog_button_open"]').click();

    cy.get('[data-cy="confirm_dialog_title"]').contains('confirm dialog cypress test title');
    cy.get('[data-cy="confirm_dialog_message"]').contains('confirm dialog cypress test title');
  });

  it('should close dialog on cancel click', () => {
    cy.mount(<MockComponent />);

    cy.get('[data-cy="mock_component_dialog_button_open"]').click();
    cy.get('[data-cy="confirm_dialog"]').should('be.visible');

    cy.get('[data-cy="confirm_dialog_cancel"]').click();
    cy.get('[data-cy="confirm_dialog_message"]').should(($el) => {
      const doesNotExist = $el.length == 0;
      const isNotVisible = !$el.is('visible');
      const doesNotExistOrIsNotVisible = doesNotExist || isNotVisible;

      expect(doesNotExistOrIsNotVisible, 'does not exist or is not visible').to.be.true;
    });
  });
});
