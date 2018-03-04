const functions = require('firebase-functions');

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

  res.send(JSON.stringify({
    speech: "Bバスパークです",
    disploayText: "B bass park"
  }));
});

