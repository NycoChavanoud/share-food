describe("login", function () {
  describe("withoutSession", function () {
    beforeEach(() => {
      cy.signup({ email: "dave.lopper@mail.com", password: "azertyuiop" });
      cy.visit("/login");
    });

    it.only("login with goods informations", function () {
      cy.get("[data-cy='email']").type("dave.lopper@mail.com");
      cy.get('[data-cy="password"]').type("azertyuiop");
      cy.get('[data-cy="formLogin"]').submit();
      cy.contains("connecté en tant que");
      cy.contains(" Dave Lopper");
    });

    it("find the login on the home page", function () {
      cy.visit("/");
      cy.contains("Se connecter").click();
      cy.url().should("include", "/login");
      cy.contains("S’inscrire");
    });

    it("not goods 'login' informations", function () {
      cy.get("[data-cy='email']").type("mail@mail.com");
      cy.get('[data-cy="password"]').type("aaazzzeeezzz");
      cy.get('[data-cy="formLogin"]').submit();
      cy.get('[data-cy="errorMessage"]').should("exist");
      cy.contains("Echec de connexion");
    });
  });
});

//VOIR POUR INTEGRER CES TEST DANS LE CODE CI-DESSUS...?

describe("withSession", function () {
  it("try to go on each pages", function () {
    cy.visit("/login");
    cy.get("[data-cy='email']").type("dave.lopper@mail.com");
    cy.get('[data-cy="password"]').type("azertyuiop");
    cy.get('[data-cy="formLogin"]').submit();
    cy.contains(" Dave Lopper");
    cy.get('[cy-data="logoHome"]').click();
    cy.url().should("include", "/dashboard");
    cy.visit("/login");
    cy.contains(" Dave Lopper");
    cy.get('[cy-data="logoEvent"]').click();
    cy.url().should("include", "/event");
    cy.visit("/login");
    cy.contains(" Dave Lopper");
    cy.get('[cy-data="logoCrew"]').click();
    cy.url().should("include", "/crew");
    cy.visit("/login");
    cy.contains(" Dave Lopper");
    cy.get('[cy-data="logoFriend"]').click();
    cy.url().should("include", "/friend");
    cy.visit("/login");
    cy.contains(" Dave Lopper");
    cy.get('[cy-data="logoLogOut"]').click();
    cy.url().should("include", "/login");
  });
});
