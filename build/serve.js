"use strict";

const liveServer = require("live-server");

const params = {
  mount: [["/", "./example/"]],
  watch: ["./example/"],
  wait: 1000
};

liveServer.start(params);
