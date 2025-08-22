describe('Formulário de consultoria', () => {
    beforeEach(() => {
        cy.start();
        cy.submitLoginForm('papito@webdojo.com', 'katana123');
        cy.goTo('Formulários', 'Consultoria');
    });

    it('Deve solicitar consultoria individual', () => {
        cy.get('input[placeholder="Digite seu nome completo"]')
            .type('Leonam Silva');
    });
});