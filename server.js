const path = require("path");
const express = require("express");
const app = express();
const fs = require("fs");

//importing routes

const apiRoutes = require("./Develop/routes/api");

app.use(express.static(path.join(__dirname, "Develop/public")));
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.get("/my-notes", (req, res) => {
  res.sendFile(path.join(__dirname, "Develop/public/notes.html"));
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "Develop/public/index.html"));
});
app.use("/api", apiRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server Started At Port ${PORT}`);
});
