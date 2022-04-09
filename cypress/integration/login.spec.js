describe("login", function () {
  it("find the login on the home page", function () {
    cy.visit("/");
    cy.contains("Se connecter").click();
    cy.url().should("include", "/login");
    cy.contains("S’inscrire");
  });

  it("not goods 'login' informations", function () {
    cy.visit("/login");
    cy.get("[data-cy='email']").type("mail@mail.com");
    cy.get('[data-cy="password"]').type("aaazzzeeezzz");
    cy.get('[data-cy="formLogin"]').submit();
    cy.get('[data-cy="errorMessage"]').should("exist");
    cy.contains("identifiants inexistants - veuillez créer un compte");
  });

  it("login with goods informations", function () {
    cy.visit("/login");
    cy.get("[data-cy='email']").type("dave.lopper@mail.com");
    cy.get('[data-cy="password"]').type("azertyuiop");
    cy.get('[data-cy="formLogin"]').submit();
    cy.url().should("include", "/dashboard");
  });
});
