describe("register", function () {
  beforeEach(() => {
    cy.signup({ email: "dave.lopper@gmail.com", password: "azertyuiop" });
    cy.visit("/registration");
  });
  it("find the register since home page", function () {
    cy.visit("/");
    cy.contains("Se connecter").click();
    cy.contains("S’inscrire").click();
    cy.url().should("include", "/registration");
  });

  it("go back to the login page if i don't want register", function () {
    cy.visit("/");
    cy.contains("Se connecter").click();
    cy.contains("S’inscrire").click();
    cy.url().should("include", "/registration");
    cy.get("[data-cy='backBtn']").click();
    cy.url().should("include", "/login");
  });

  it("create a account ", function () {
    cy.get("[data-cy='email']").type("dave@mail.com");
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

  it("passwords are not sames", function () {
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

  it("le mail de l'utilisateur existe déja", function () {
    cy.visit("/registration");
    cy.get("[data-cy='email']").type("dave.lopper@mail.com");
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
