const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.testFunc = functions.https.onRequest((req, res) => {
  res.send("TEST");
});

//this function returns json object of stage info you desired.
exports.fetchStageInfo = functions.https.onRequest((req, res) => {
  //const query = req.body.result.resolvedQuery;
  const parameters = req.body.result.parameters;
  const terms = parameters['terms'];
  const rule = parameters['rule'];

  const database = admin.database();
  const ref = database.ref('stages');

  //TODO:Parse terms

  let speech = "";
  let displayText = "";

  if ( rule === "A") {
    ref.child('regular/stage').once("value").then((snapshot) => {
      snapshot.some((childSnapshot) => {

      });
    }).catch((err) => {
      console.error("Error: ", err);
    });
  } else if ( rule === "B") {
    ref.child('gachi/stage').once("value").then((snapshot) => {
      snapshot.some((childSnapshot) => {

      });
    }).catch((err) => {
      console.error("Error: ", err);
    });
  } else if ( rule === "C") {
    ref.child('league/stage').once("value").then((snapshot) => {
      snapshot.some((childSnapshot) => {

      });
    }).catch((err) => {
      console.error("Error: ", err);
    });
  }

  res.send(JSON.stringify({
    speech: "Bbass",
    disploayText: "Bbass"
  }));
});

