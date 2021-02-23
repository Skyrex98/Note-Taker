const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const fs = require("fs");
router.get("/notes/getAll", (req, res) => {
  fs.readFile(
    path.join(__dirname + "/db/data.json"),
    "utf8",
    function readFileCallback(err, data) {
      if (err) {
      } else {
        data = JSON.parse(data);
        res.json({ title: "Count", data: data.notes });
      }
    }
  );
});

router.post("/notes/post-note", (req, res) => {
  const { title, description } = req.body;
  console.log(req.body);
  fs.readFile(
    path.join(__dirname + "/db/data.json"),
    "utf8",
    function readFileCallback(err, data) {
      if (err) {
        return res.status(500).json({
          success: false,
          error: "Error While Getting Qoutes",
        });
      } else {
        let obj = JSON.parse(data); //now it an object
        obj.notes.push({
          id: uuidv4(),
          title: title,
          description: description,
        }); //add some data
        let json = JSON.stringify(obj); //convert it back to json
        fs.writeFile(
          path.join(__dirname + "/db/data.json"),
          json,
          "utf8",
          () => {
            res.json({ success: true });
          }
        ); // write it back
      }
    }
  );
});

router.post("/notes/delete-note", (req, res) => {
  const { id } = req.body;

  /*

const index = users.findIndex((user) => user.id === id);

  if (index !== -1) return users.splice(index, 1)[0];

  */

  fs.readFile(
    path.join(__dirname + "/db/data.json"),
    "utf8",
    function readFileCallback(err, data) {
      if (err) {
        return res.status(500).json({
          success: false,
          error: "Error While Getting Qoutes",
        });
      } else {
        data = JSON.parse(data);
        let notes = data.notes;
        for (let i = 0; i < notes.length; i++) {
          if (notes[i].id == id) {
            notes.splice(i, 1);
          }
        }
        data.notes = notes;
        let json = JSON.stringify(data); //convert it back to json
        fs.writeFile(
          path.join(__dirname + "/db/data.json"),
          json,
          "utf8",
          () => {
            res.json({ success: true });
          }
        ); // write it back
      }
    }
  );
});

module.exports = router;
