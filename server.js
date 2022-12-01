"use strict";

const Hapi = require("@hapi/hapi");

const init = async () => {
  const server = Hapi.Server({
    host: "localhost",
    port: 3001,
  });

  server.route([
    {
      method: "GET",
      path: "/",
      handler: (request, h) => {
        return "<h1>Hello World!</h1>";
      },
    },
    {
      method: "GET",
      path: "/users/{user?}",
      handler: (request, h) => {
        if (request.params.soccer) {
          return `<h1>Hello ${request.params.user}</h1>`;
        } else {
          return `<h1>Hello Stranger!</h1>`;
        }
      },
    },
    {
      method: "GET",
      path: "/{any*}",
      handler: (request, h) => {
        return "<h1>Oh no! You must be lost!</h1>";
      },
    },
  ]);

  await server.start();
  console.log(`Server started on: ${server.info.uri}`);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
