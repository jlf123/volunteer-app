import Moment from 'moment';

describe('Volunteer Login', () => {
    before(() => {
        cy.visit('/view');
    });

    it('should navigate to the login screen', () => {
        cy.findByTestId('landing-button-group')
            .children()
            .last()
            .click();
    });

    it('should autocomplete while user is typing their name', () => {
        cy.wait(1000);
        cy.findByTestId('login-name').within(() => {
            cy.get('input').type('Test');
        });

        cy.findByText('Testing Tester').click();
        cy.findByTestId('login-toolbar-to-events')
            .children()
            .last()
            .click();
    });

    it('should autocomplete while the user is typing the event they are volunteering for', () => {
        cy.wait(100);
        cy.findByTestId('login-event').within(() => {
            cy.get('input').type('Test');
        });

        cy.findByText('Test Event').click();
        cy.findByTestId('login-toolbar-to-confirmation')
            .children()
            .last()
            .click();
    });

    it('should show a confirmation page with the name and event for the volunteer', () => {
        cy.findByTestId('confirmation-name').should(
            'contain',
            'Testing Tester'
        );
        cy.findByTestId('confirmation-event-and-time').should(
            'contain',
            'Test Event'
        );
    });

    it('should redirect back to the login page after 5 seconds', () => {
        cy.wait(5000);
        cy.location('hash').should('equal', '#/');
    });
});

describe('Volunteer signout', () => {
    before(() => {
        cy.visit('/view');
    });

    it('should navigate to the signout screen', () => {
        cy.findByTestId('landing-button-group')
            .children()
            .first()
            .click();
        cy.location('hash').should('equal', '#/signout/');
    });

    it('should autocomplete while the user is typing the event they are volunteering for', () => {
        cy.wait(100);
        cy.findByTestId('signout-name').within(() => {
            cy.get('input').type('Test');
        });

        cy.findByText('Testing Tester').click();
    });

    it('should display a message that the volunteer has been signed out', () => {
        cy.findByTestId('signout-toolbar')
            .children()
            .last()
            .click();
        cy.findByText("Ok! You're all set. Thank you!");
    });

    it('should redirect back to the login page after 3 seconds', () => {
      cy.wait(3000);
      cy.location('hash').should('equal', '#/');
  });
});
