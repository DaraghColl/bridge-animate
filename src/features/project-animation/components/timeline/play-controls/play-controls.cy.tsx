import { PlayControls } from './play-controls';

describe('Play Controls component', () => {
  it('should call function params when corresponding button was clicked', () => {
    const playSpy = cy.spy().as('playSpy');
    const pauseSpy = cy.spy().as('pauseSpy');
    const stopSpy = cy.spy().as('stopSpy');

    cy.mount(<PlayControls playAnimation={playSpy} pauseAnimation={pauseSpy} stopAnimation={stopSpy} />);

    cy.get('[data-cy="play_controls_play"]').click();
    cy.get('@playSpy').should('have.been.called');

    cy.get('[data-cy="play_controls_pause"]').click();
    cy.get('@pauseSpy').should('have.been.called');

    cy.get('[data-cy="play_controls_stop"]').click();
    cy.get('@stopSpy').should('have.been.called');
  });
});
