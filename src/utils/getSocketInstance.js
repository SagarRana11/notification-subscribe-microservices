const socket = require("socket.io");

const getSocketInstance = (server) => {
  //testing is needed
  return socket(server);
};

module.exports = { getSocketInstance };
