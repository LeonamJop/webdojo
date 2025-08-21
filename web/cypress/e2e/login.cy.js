describe("Login", () => {
  beforeEach(() => {
    cy.start();
  });
  it("Deve logar com sucesso", () => {
    cy.submitLoginForm('papito@webdojo.com', 'katana123')

    cy.get('[data-cy="user-name"]')
      .should("be.visible")
      .and("have.text", "Fernando Papito");

    cy.get('[data-cy="welcome-message"]')
      .should("be.visible")
      .and(
        "have.text",
        "Olá QA, esse é o seu Dojo para aprender Automação de Testes."
      );
    
    cy.url().should('include', '/dashboard')
  });

  it("Não deve logar com senha inválida", () => {
    cy.submitLoginForm('papito@webdojo.com', '654321')

    cy.contains("button", "Entrar").click();

    cy.contains('Acesso negado! Tente novamente.')
      .should('be.visible');
  });

  it("Não deve logar com e-mail não cadastrado", () => {
    cy.submitLoginForm('404@webdojo.com', 'katana123')

    cy.contains("button", "Entrar").click();

    cy.contains('Acesso negado! Tente novamente.')
      .should('be.visible');
  });
});
