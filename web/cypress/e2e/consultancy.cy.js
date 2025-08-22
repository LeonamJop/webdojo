describe('Formulário de consultoria', () => {
    beforeEach(() => {
        cy.start();
        cy.submitLoginForm('papito@webdojo.com', 'katana123');
        cy.goTo('Formulários', 'Consultoria');
    });

    it('Deve solicitar consultoria individual', () => {
        //Campo Nome
        cy.get('input[placeholder="Digite seu nome completo"]')
            .type('Leonam Silva');

        //Campo E-mail
        cy.get('input[placeholder="Digite seu email"]')
            .type('papito@webdojo.com');

        //Campo Telefone
        cy.get('input[placeholder="(00) 00000-0000"]')
            .type('11999991000')
            .should('have.value', '(11) 99999-1000');

        //Campo Select
        //XPath: //label[text()="Tipo de Consultoria"]/..//select
        cy.contains('label','Tipo de Consultoria')
            .parent()
            .find('select')
            .select('Individual');

        //Campo Radio
        //XPath: //span[text()="Pessoa Física"]/../input
        cy.contains('label', 'Pessoa Física')
            .find('input')
            .check()
            .should('be.checked');

        cy.contains('label', 'Pessoa Jurídica')
            .find('input')
            .should('be.not.checked');

        //Campo CPF
        cy.contains('label', 'CPF')
            .parent().find('input')
            .type('65602530070')
            .should('have.value', '656.025.300-70')
    });
});