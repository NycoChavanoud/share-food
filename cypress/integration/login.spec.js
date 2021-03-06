describe("login", function () {
  describe("withoutSession", function () {
    beforeEach(() => {
      cy.task("deleteAllUsers");
      cy.signup({ email: "dave.lopper@gmail.com", password: "azertyuiop" });
      cy.visit("/login");
    });

    it("login with correct credentials", function () {
      cy.get("[data-cy='email']").type("dave.lopper@gmail.com");
      cy.get('[data-cy="password"]').type("azertyuiop");
      cy.get('[data-cy="formLogin"]').submit();
      cy.contains("connecté en tant que");
      cy.contains(" Dave Lopper");
    });

    it("it is accessible from the homepage", function () {
      cy.visit("/");
      cy.contains("Se connecter").click();
      cy.url().should("include", "/login");
    });

    it("it prints an error with incorrect credentials", function () {
      cy.get("[data-cy='email']").type("mail@mail.com");
      cy.get('[data-cy="password"]').type("aaazzzeeezzz");
      cy.get('[data-cy="formLogin"]').submit();
      cy.get('[data-cy="errorMessage"]').should("exist");
      cy.contains("Échec de connexion");
    });
  });
});
