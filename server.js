// const cors = require("cors");
const jsonServer = require("json-server");
const path = require("path");
const IP = require("ip");

const app = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "data", "db.json"));
const middleware = jsonServer.defaults();
const port = process.env.PORT || 5001;

// Enable all CORS requests.
// app.use(cors());

// Index route message.

app.get("/", (_req, res) => {
  const ipAddress = IP.address();
  res.send(ipAddress);
});

// Generic logging middleware.
app.use(middleware);

// Mount routes.
app.use("/api", router);

// Error handler.
app.use(
  ({ status = 500, message = "Internal server error." }, _req, res, _next) => {
    res.status(status).json({ error: message });
  }
);

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
