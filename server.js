const net = require("net");
const readline = require("readline");

const server = net.createServer();

const clients = [];

server.on("connection", (socket) => {
  console.log("New client connected");

  // Add the new client to the array
  clients.push(socket);

  // Listen for data from the client
  socket.on("data", (data) => {
    // Broadcast the message to all clients except the sender
    clients.forEach((client) => {
      if (client !== socket) {
        client.write(data);
      }
    });
  });

  // Listen for client disconnection
  socket.on("end", () => {
    console.log("Client disconnected");
    // Remove the disconnected client from the array
    clients.splice(clients.indexOf(socket), 1);
  });
});

// Start the server on port 3000
server.listen(3000, () => {
  console.log("Server listening on port 3000");
});

