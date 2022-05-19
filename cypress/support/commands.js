// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add(
  "signup",
  ({
    email = "visitor@website.com",
    password = "verysecure",
    firstname = "Dave",
    lastname = "Lopper",
    nickName = "DavidHasseloff",
    birthday = "1982-06-08",
    favoritePlate = "pastaBox",
    city = "Lyon",
    description = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis facilis exercitationem laborum molestias natus reprehenderit earum vero non, neque minus at aut commodi recusandae possimus amet delectus? Beatae, tempora quae! Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis facilis exercitationem laborum molestias natus reprehenderit earum vero non, neque minus at aut commodi recusandae possimus amet delectus? Beatae, tempora quae!",
  } = {}) => {
    cy.dataSession({
      name: "userInDb",
      setup: () => {
        cy.task("deleteUserByEmail", email);
        cy.task("createUser", {
          email,
          password,
          firstname,
          lastname,
          birthday,
          city,
          favoritePlate,
          description,
          nickName,
        }).then((user) => {
          return Promise.resolve(user);
        });
      },
      validate: (saved) => {
        return cy.task("findUserByEmail", saved.email).then((user) => {
          if (user?.email === email) return Promise.resolve(!!user);
          else return Promise.resolve(false);
        });
      },
    });
  }
);

Cypress.Commands.add(
  "login",
  ({ email = "visitor@website.com", password = "verysecure" } = {}) => {
    cy.dataSession({
      name: "userSession",
      setup: () => {
        cy.visit("/login");
        cy.get('[ data-cy="email"]').type(email);
        cy.get('[ data-cy="password"]').type(password);
        cy.get('[data-cy="formLogin"]').submit();
        cy.contains("connecté");
        cy.getCookie("next-auth.session-token")
          .should("exist")
          .then((cookie) => {
            return cy
              .request({
                url: "/api/profile/me",
                failOnStatusCode: false,
                headers: {
                  Cookie: `next-auth.session-token=${cookie.value}`,
                },
              })
              .then(({ body: user }) =>
                Promise.resolve({
                  cookie,
                  user,
                })
              );
          });
      },
      validate: (saved) => {
        return cy
          .request({
            url: "/api/profile/me",
            failOnStatusCode: false,
            headers: {
              Cookie: `next-auth.session-token=${saved.cookie.value}`,
            },
          })
          .then(({ body: user }) =>
            Promise.resolve(
              user.email === saved.user.email && user.role === saved.user.role
            )
          );
      },
      recreate: (saved) => {
        cy.setCookie("next-auth.session-token", saved.cookie.value);
      },
      dependsOn: ["userInDb"],
    });
  }
);

Cypress.Commands.add(
  "setupCurrentUser",
  ({
    email = "visitor@website.com",
    password = "verysecure",
    firstname = "Dave",
    lastname = "Lopper",
    nickName = "DavidHasseloff",
    birthday = "1982-06-08",
    favoritePlate = "pastaBox",
    city = "Lyon",
    description = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis facilis exercitationem laborum molestias natus reprehenderit earum vero non, neque minus at aut commodi recusandae possimus amet delectus? Beatae, tempora quae! Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis facilis exercitationem laborum molestias natus reprehenderit earum vero non, neque minus at aut commodi recusandae possimus amet delectus? Beatae, tempora quae!",
  } = {}) => {
    cy.dataSession({
      name: "currentUser",
      setup: () => {
        cy.signup({
          email,
          password,
          firstname,
          lastname,
          birthday,
          city,
          favoritePlate,
          description,
          nickName,
        });
        cy.login({ email, password });
        cy.get("@userSession").then((session) => session.user);
      },
      validate: () => false,
    });
  }
);
