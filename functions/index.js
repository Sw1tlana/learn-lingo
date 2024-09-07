const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors")({origin: true});

admin.initializeApp();


exports.api = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    if (req.method === "OPTIONS") {
      res.set("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
      res.set("Access-Control-Allow-Headers", "Content-Type");
      res.status(204).send("");
      return;
    }

    const dbRef = admin.database().ref("/users/signup");

    switch (req.method) {
      case "POST": {
        const postData = req.body;
        if (!postData || typeof postData !== "object") {
          res.status(400).send("Invalid data format");
          return;
        }

        dbRef.push(postData)
            .then(() => res.status(200).send("Data saved successfully"))
            .catch((error) => res.status(500).send(`Error: ${error.message}`));
        break;
      }

      case "GET": {
        dbRef.once("value")
            .then((snapshot) => {
              const data = snapshot.val();
              res.status(200).json(data);
            })
            .catch((error) => res.status(500).send(`Error: ${error.message}`));
        break;
      }

      case "PUT": {
        const putData = req.body;
        const putKey = req.query.key;

        if (!putKey || !putData || typeof putData !== "object") {
          res.status(400).send("Invalid request data");
          return;
        }

        dbRef.child(putKey).update(putData)
            .then(() => res.status(200).send("Data updated successfully"))
            .catch((error) => res.status(500).send(`Error: ${error.message}`));
        break;
      }

      case "DELETE": {
        const deleteKey = req.query.key;

        if (!deleteKey) {
          res.status(400).send("Missing key");
          return;
        }

        dbRef.child(deleteKey).remove()
            .then(() => res.status(200).send("Data deleted successfully"))
            .catch((error) => res.status(500).send(`Error: ${error.message}`));
        break;
      }

      default:
        res.status(405).send("Method Not Allowed");
    }
  });
});
