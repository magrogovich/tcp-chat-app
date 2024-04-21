const net = require("net");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const client = new net.Socket();

// Connect to the server
client.connect(3000, "localhost", () => {
  console.log("Connected to server");
});

// Listen for data from the server
client.on("data", (data) => {
  console.log(`target@output: ${data}`);
});

// Read user input and send it to the server
rl.on("line", (input) => {
  client.write(`${input}`);
});

// Handle client disconnection
client.on("close", () => {
  console.log("Connection closed");
});

