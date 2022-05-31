const dateOfDay = new Date();

describe("invitations", function () {
  describe("addInvitations", function () {
    beforeEach(() => {
      cy.task("deleteAllUsers");
      cy.setupCurrentUser();
      cy.task("createUser", {
        firstname: "userOne",
        lastname: "One",
        email: "one@gmail.com",
        password: "onepass",
      });

      cy.task("createUser", {
        firstname: "userTwo",
        lastname: "two",
        email: "two@gmail.com",
        password: "twopass",
      });

      cy.task("createUser", {
        firstname: "userThree",
        lastname: "Three",
        email: "three@gmail.com",
        password: "threepass",
      });

      cy.task("createUser", {
        firstname: "userFour",
        lastname: "Four",
        email: "four@gmail.com",
        password: "fourpass",
      });

      cy.task("createUser", {
        firstname: "creator",
        lastname: "creator",
        email: "creator@gmail.com",
        password: "creatorpass",
      })
        .then((user) => {
          cy.task("createEvent", {
            title: "mon event test",
            description: "lorem ipsum patatum et tatadoum ",
            date: dateOfDay,
            hour: "12:30",
            address: "50 rue de la soif, LYON",
            typeEvent: "Au resto",
            authorId: user.id,
          });
        })
        .then((e) => {
          cy.task("getAllUsers").then(
            async (users) =>
              await users.map((u) => {
                cy.task("createInvit", {
                  guestId: u.id,
                  eventId: e.id,
                  status: "PENDING",
                });
              })
          );
        });
    });

    it(" can't acces to update invitations on event", function () {
      cy.visit("/events");
      cy.contains("mon event test").click();
      cy.contains("Membres invités : ");
    });

    it.only("can manage invitation", function () {
      cy.task("findUserByEmail", "visitor@website.com").then((u) => {
        cy.task("createEvent", {
          title: "evenement currentUser",
          description: "lorem ipsum patatum et tatadoum ",
          date: dateOfDay,
          hour: "12:30",
          address: "50 rue de la soif, LYON",
          typeEvent: "Au resto",
          authorId: u.id,
        }).then((e) => {
          cy.visit("/events");
          cy.contains("evenement currentUser").click();
          cy.get('[data-cy="addInvitLink"]').click();
          cy.url().should("include", `/events/${e.id}/invitations`);
          cy.contains("aucun invité pour votre évènement");
          cy.contains("userOne");
          cy.contains("userTwo");
          cy.contains("userThree");
          cy.contains("userFour");
          cy.contains("creator");
          cy.get('[data-cy="addBtn0"]').click();
          cy.contains("nombre d'invités : 1");
          cy.get('[data-cy="addBtn0"]').click();
          cy.contains("nombre d'invités : 2");
          cy.get('[data-cy="addBtn0"]').click();
          cy.contains("nombre d'invités : 3");
          cy.get('[data-cy="addBtn0"]').click();
          cy.contains("nombre d'invités : 4");
          cy.get('[data-cy="addBtn0"]').click();
          cy.contains("nombre d'invités : 5");
          cy.contains("Tous vos amis sont déjà ivités à cet évènement.");
          cy.get('[data-cy="deleteBtn0"]').click();
          cy.contains("nombre d'invités : 4");
          cy.get('[data-cy="deleteBtn0"]').click();
          cy.contains("nombre d'invités : 3");
          cy.get('[data-cy="deleteBtn0"]').click();
          cy.contains("nombre d'invités : 2");
          cy.get('[data-cy="deleteBtn0"]').click();
          cy.contains("nombre d'invités : 1");
          cy.get('[data-cy="deleteBtn0"]').click();
          cy.contains("aucun invité pour votre évènement");
        });
      });
    });
  });
});
