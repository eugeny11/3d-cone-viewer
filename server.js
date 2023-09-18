const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("App get");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});