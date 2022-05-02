const dateOfDay = new Date().toISOString().substring(0, 10);

const tomorow = () => {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  date.toISOString().substring(0, 10);
  return date;
};

const dateOfFutur = () => {
  const date = new Date();
  date.setDate(date.getDate() + 10);
  date.toISOString().substring(0, 10);
  return date;
};

const dateOfPast = () => {
  const date = new Date();
  date.setDate(date.getDate() - 10);
  date.toISOString().substring(0, 10);
  return date;
};

describe("event", function () {
  describe("create event", function () {
    beforeEach(() => {
      cy.setupCurrentUser();
    });

    it("acces to create event", function () {
      cy.visit("/");
      cy.get('[data-cy="logoEvent"]').click();
      cy.url().should("include", "/events");
      cy.contains("créer nouvel evenement");
      cy.get('[data-cy="createBtn"]').click();
      cy.url().should("include", "/events/create");
    });

    it("create a new event", function () {
      cy.visit("/events/create");
      cy.get('[data-cy="title"]').type("Mon evenement test");
      cy.get('[data-cy="description"]').type(
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. A qui, ullam hic dolor tempore harum quia? Minima autem quaerat, ab nulla possimus sapiente"
      );
      cy.get("select").select("Au resto");
      cy.get('[data-cy="address"]').type("50 rue de la soif, 69000 LYON");
      cy.get('[data-cy="formAddEvent"]').submit();
      cy.url().should("include", "/events");
      cy.contains("🦄 Super! tu as ajouté un nouvel évènement");
      cy.contains("Mon evenement test").click();
      cy.contains("Dave Lopper");
      cy.contains("Mon evenement test");
      cy.contains("50 rue de la soif, 69000 LYON");
      cy.contains(
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. A qui, ullam hic dolor tempore harum quia? Minima autem quaerat, ab nulla possimus sapiente"
      );
      cy.contains("Au resto");
    });

    it("delete a event", function () {
      cy.task("deleteAllEvents");
      cy.task("createEvent", {
        title: "mon évènement de test pour le delete",
        description: "lorem ipsum patatum et tatadoum ",
        date: "2122-01-01",
        hour: "12:30",
        address: "40 rue de la soif, LYON",
        typeEvent: "Au resto",
      });
      cy.visit("/events");
      cy.contains("mon évènement de test pour le delete").click();
      cy.get('[data-cy="btnDelete"]').click();
      cy.contains("Etes-vous certain de vouloir supprimer");
      cy.get('[data-cy="validateBtn"]').click();
      cy.contains("Ton évènement est supprimé");
      cy.url().should("include", "/events");
    });
  });

  describe("without session", function () {
    it("impossible to accès page event", function () {
      cy.task("deleteAllUsers");
      cy.visit("/events");
      cy.url().should("include", "/login");
      cy.contains("S’identifier");
    });
  });

  describe("testing the event list", function () {
    it("message if no events", function () {
      cy.setupCurrentUser();
      cy.task("deleteAllEvents");
      cy.signup({ email: "dave.lopper@gmail.com", password: "azertyuiop" });
      cy.visit("/events");
      cy.contains("chargement des données");
      cy.get('[data-cy="loader"]').should("exist");

      cy.contains("Aucun évènement prévu");
    });

    it("list of events", function () {
      cy.setupCurrentUser();
      cy.task("deleteAllEvents");
      cy.task("createEvent", {
        title: "event of the day",
        description: "lorem ipsum patatum et tatadoum ",
        date: dateOfDay,
        hour: "12:30",
        address: "50 rue de la soif, LYON",
        typeEvent: "Au bureau",
      });
      cy.task("createEvent", {
        title: "event of long futur",
        description: "lorem ipsum patatum et tatadoum ",
        date: dateOfFutur(),
        hour: "12:30",
        address: "51 rue de la soif, LYON",
        typeEvent: "Au resto",
      });
      cy.task("createEvent", {
        title: "event of tomorow",
        description: "lorem ipsum patatum et tatadoum ",
        date: tomorow(),
        hour: "12:30",
        address: "52 rue de la soif, LYON",
        typeEvent: "Au resto",
      });
      cy.task("createEvent", {
        title: "event of long past",
        description: "lorem ipsum patatum et tatadoum ",
        date: dateOfPast(),
        hour: "12:30",
        address: "53 rue de la soif, LYON",
        typeEvent: "Au resto",
      });
      cy.visit("/events");
      cy.contains("Aujourd'hui");
      cy.contains("j - 1");
      cy.contains("j - 10");
      cy.contains("event of long past").should("not.exist");
    });
  });
});
