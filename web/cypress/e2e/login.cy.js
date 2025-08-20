describe("Login", () => {
  beforeEach(() => {
    cy.viewport(1440, 900);
    cy.visit("http://localhost:3000/");
  });

  it("Deve logar com sucesso", () => {
    cy.get("#email").type("papito@webdojo.com");
    cy.get("#password").type("katana123");

    cy.contains("button", "Entrar").click();

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
    cy.get("#email").type("papito@webdojo.com");
    cy.get("#password").type("654321");

    cy.contains("button", "Entrar").click();

    cy.contains('Acesso negado! Tente novamente.')
      .should('be.visible');
  });

  it("Não deve logar com e-mail não cadastrado", () => {
    cy.get("#email").type("404@webdojo.com");
    cy.get("#password").type("katana123");

    cy.contains("button", "Entrar").click();

    cy.contains('Acesso negado! Tente novamente.')
      .should('be.visible');
  });
});
