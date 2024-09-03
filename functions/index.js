
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors")({origin: true});

admin.initializeApp();

exports.api = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    if (req.method === "OPTIONS") {
      res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
      res.set("Access-Control-Allow-Headers", "Content-Type");
      res.status(204).send("");
      return;
    }

    // Handle POST requests
    if (req.method === "POST") {
      const data = req.body;
      // Perform operations with Firebase Realtime Database
      admin.database().ref("/users/signup").push(data)
          .then(() => res.status(200).send("Data saved successfully"))
          .catch((error) => res.status(500).send(`Error: ${error.message}`));
    } else {
      res.status(405).send("Method Not Allowed");
    }
  });
});
