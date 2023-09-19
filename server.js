const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

app.use(express.static("public"));
app.use("/node_modules", express.static("node_modules"));
app.post("/api/coneData", (req, res) => {
  const coneData = req.body;
  console.log("Received cone data:", coneData);
  res.json({ status: "Data received" });
});

app.get("/", (req, res) => {
  res.send("App get");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
