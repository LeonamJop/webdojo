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
            .should('have.value', '656.025.300-70');

        //Campo Checkbox
        const discoveryChannels = [
            'Instagram',
            'LinkedIn',
            'Udemy',
            'YouTube',
            'Indicação de Amigo'
        ]

        discoveryChannels.forEach((channel)=> {
            cy.contains('label', channel)
                .find('input')
                .check()
                .should('be.checked')
        });

        //Campo Upload
        cy.get('input[type="file"]')
            .selectFile('./cypress/fixtures/document.pdf', {force: true})
            .should(($input) => {
                expect($input[0].files[0].name).to.equal('document.pdf');
            });
        
        //Campo Textarea
        cy.get('textarea[placeholder="Descreva mais detalhes sobre sua necessidade"]')
            .type('Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.')
            .should('have.value', 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.');

    });
});