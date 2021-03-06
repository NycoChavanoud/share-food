/// <reference types="cypress" />
const User = require("../../models/user");
const Event = require("../../models/event");
const Inviations = require("../../models/invitations");

// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */

// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  on("task", {
    cleanDb: async () => Promise.all([User.deleteManyUsers()]),
    deleteAllUsers: User.deleteManyUsers,
    findUserByEmail: User.findByEmail,
    createUser: User.createUser,
    deleteUserByEmail: User.deleteUserByEmail,
    getAllUsers: User.getAllUsers,
    createEvent: Event.createEvent,
    deleteAllEvents: Event.deleteManyEvents,
    createInvit: Inviations.createOneGuestForEvent,
  });
  return config;
};
