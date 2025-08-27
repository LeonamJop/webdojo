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
        
        //Campo Tags
        const techs = ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Cypress'];

        techs.forEach((tech) => {
            cy.get('input[placeholder="Digite uma tecnologia e pressione Enter"]')
                .type(`${tech}{enter}`);

            cy.contains('label', 'Tecnologias')
                .parent().contains('span', tech)
                .should('be.visible');
        });

        //Submissão do Formulário
        cy.contains('label', 'termos de uso')
            .find('input')
            .check()
            .should('be.checked');
        
        cy.contains('button', 'Enviar formulário')
            .click();
        
        cy.contains('Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.')
            .should('be.visible');
    });

    //Validação de cores e classes
    it('Deve verificar os campos obrigatórios', () => {
        cy.contains("button", "Enviar formulário").click();

        cy.get('#name')
            .should('have.class', 'border-red-500')
            .and('have.css', 'border-color', 'rgb(239, 68, 68)');
        
        cy.contains("p", "Digite nome e sobrenome")
            .should("be.visible")
            .and("have.class", "text-red-400")
            .and('have.css', 'color', 'rgb(248, 113, 113)');

        cy.get('#email')
            .should('have.class', 'border-red-500')
            .and('have.css', 'border-color', 'rgb(239, 68, 68)');

        cy.contains("p", "Informe um email válido")
            .should("be.visible")
            .and("have.class", "text-red-400")
            .and('have.css', 'color', 'rgb(248, 113, 113)');

        cy.contains("p", "Você precisa aceitar os termos de uso")
            .should("be.visible")
            .and("have.class", "text-red-400")
            .and('have.css', 'color', 'rgb(248, 113, 113)');
    });
});