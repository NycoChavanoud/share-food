describe("register", function () {
  beforeEach(() => {
    cy.task("deleteAllUsers");
    cy.signup({ email: "dave.lopper@gmail.com", password: "azertyuiop" });
    cy.visit("/registration");
  });
  it("can find the register page from the home page", function () {
    cy.visit("/");
    cy.contains("Se connecter").click();
    cy.contains("S’inscrire").click();
    cy.url().should("include", "/registration");
  });

  it("can go back to the login page from the register page", function () {
    cy.visit("/");
    cy.contains("Se connecter").click();
    cy.contains("S’inscrire").click();
    cy.url().should("include", "/registration");
    cy.get("[data-cy='backBtn']").click();
    cy.url().should("include", "/login");
  });

  it("create a account ", function () {
    cy.get("[data-cy='email']").type("dave@gmail.com");
    cy.get('[data-cy="password"]').type("azertyuiop");
    cy.get('[data-cy="confirmPassword"]').type("azertyuiop");
    cy.get('[data-cy="nickName"]').type("Jo la Frite ");
    cy.get('[data-cy="datePicker"]').type("2020-05-01", { force: true });
    cy.get('[data-cy="firstname"]').type("Hello");
    cy.get('[data-cy="lastname"]').type("World");
    cy.get('[data-cy="favoritePlate"]').type("trutChoucroute");
    cy.get('[data-cy="formRegister"]').submit();
    cy.url().should("include", "/login");
  });

  it("shows an error message when passwords are not the same", function () {
    cy.visit("/registration");
    cy.get("[data-cy='email']").type("test2@gmail.com");
    cy.get('[data-cy="password"]').type("azertyuiop");
    cy.get('[data-cy="confirmPassword"]').type("azertyui");
    cy.get('[data-cy="nickName"]').type("Jo la Frite ");
    cy.get('[data-cy="datePicker"]').type("2020-05-01", { force: true });
    cy.get('[data-cy="firstname"]').type("Hello");
    cy.get('[data-cy="lastname"]').type("World");
    cy.get('[data-cy="favoritePlate"]').type("trutChoucroute");
    cy.get('[data-cy="formRegister"]').submit();
    cy.contains("Vos mots de passes ne sont pas identiques");
  });

  it("shows an error message when user already exist", function () {
    cy.visit("/registration");
    cy.get("[data-cy='email']").type("dave.lopper@gmail.com");
    cy.get('[data-cy="password"]').type("azertyuiop");
    cy.get('[data-cy="confirmPassword"]').type("azertyuiop");
    cy.get('[data-cy="nickName"]').type("Jo la Frite ");
    cy.get('[data-cy="datePicker"]').type("2020-05-01", { force: true });
    cy.get('[data-cy="firstname"]').type("Hello");
    cy.get('[data-cy="lastname"]').type("World");
    cy.get('[data-cy="favoritePlate"]').type("trutChoucroute");
    cy.get('[data-cy="formRegister"]').submit();
    cy.contains("Cet email possède déjà un compte");
  });
});
