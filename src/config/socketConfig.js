const io = require("socket.io-client");
const url = 'http://192.168.3.242:5001'
class ConnectSocket {
  constructor() {
    if (ConnectSocket.instance) return ConnectSocket.instance;
    ConnectSocket.instance = this;
    return this;
  }
  connect() {
    if (!this.socket) {
      this.socket = io(url);
      console.log("Socket connected");
    }
    return this;
  }

  emit(event, data) {
    if (this.socket) {
      this.socket.emit(event, data);
    }
  }
}

const socketService = new ConnectSocket();
module.exports = socketService;
