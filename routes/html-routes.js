// Requiring path to so we can use relative routes to our HTML files
var path = require("path");
var db = require("../models");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  app.get("/", function(req, res) {
    db.User.findAll({}).then(function(dbUsers) {
      res.render("signup", {
        users: dbUsers
      });
    });
  });

  app.get("/login", function(req, res) {
    db.User.findAll({}).then(function(dbUsers) {
      res.render("login", {
        users: dbUsers
      });
    });
  });

  app.get("/dashboard", isAuthenticated, function(req, res) {
    db.Dev.findAll({}).then(function(dbDevs) {
      db.Project.findAll({}).then(function(dbProjects) {
        res.render("dashboard", {
          devs: dbDevs,
          projects: dbProjects
        });
      });
    });
  });

  // app.get("/dashboard/:clientName", isAuthenticated, function(req, res) {
  //   db.Dev.findAll({}).then(function(dbDevs) {
  //     db.Project.findAll({
  //       where: {
  //         client_name: req.params.client,
  //         project_name: req.params.projectName
  //       }
  //     }).then(function(dbProjects) {
  //       res.render("dashboard", {
  //         devs: dbDevs,
  //         projects: dbProjects
  //       });
  //     });
  //   });
  // });
};
