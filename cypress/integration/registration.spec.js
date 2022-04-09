describe("register", function () {
  it("find the register since home page", function () {
    cy.visit("/");
    cy.contains("Se connecter").click();
    cy.contains("S’inscrire").click();
    cy.url().should("include", "/registration");
  });

  it("go back to the login page if i d'ont want register", function () {
    cy.visit("/");
    cy.contains("Se connecter").click();
    cy.contains("S’inscrire").click();
    cy.url().should("include", "/registration");
    cy.get("[data-cy='backBtn']").click();
    cy.url().should("include", "/login");
  });

  it("create a account to acces to the dashboard", function () {
    cy.visit("/registration");
    cy.get("[data-cy='email']").type("test@gmail.com");
    cy.get('[data-cy="password"]').type("azertyuiop");
    cy.get('[data-cy="confirmPassword"]').type("azertyuiop");
    cy.get('[data-cy="nickName"]').type("Jo la Frite ");
    cy.get('[data-cy="datePicker"]').type("2020-05-01", { force: true });
    cy.get('[data-cy="firstname"]').type("Hello");
    cy.get('[data-cy="lastname"]').type("World");
    cy.get('[data-cy="formRegister"]').submit();
    cy.url().should("include", "/login");
    cy.get('[data-cy="succesMessage"]').should("exist");
    cy.contains("vous pouvez desormais vous connecter");
  });

  it("passwords are not sames", function () {
    cy.visit("/registration");
    cy.get("[data-cy='email']").type("test2@gmail.com");
    cy.get('[data-cy="password"]').type("azertyuiop");
    cy.get('[data-cy="confirmPassword"]').type("azertyui");
    cy.get('[data-cy="errorMessage"]').should("exist");
    cy.contains("la confirmation du mot de passe ne correspond pas");
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
    cy.get('[data-cy="formRegister"]').submit();
    cy.get('[data-cy="errorMessage"]').should("exist");
    cy.contains("vous possèdez déja un compte avec cette adresse");
  });
});
