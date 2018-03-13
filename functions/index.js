const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

//
const TWO_HOURS_MS = 2 * 60 * 60 * 1000;

exports.testFunc = functions.https.onRequest((req, res) => {
  res.send("TEST");
});

//this function returns json object of stage info you desired.
exports.fetchStageInfo = functions.https.onRequest((req, res) => {
  //const query = req.body.result.resolvedQuery;
  const parameters = req.body.result.parameters;
  const terms = parameters['Terms'];
  const rule = parameters['Rule'];

  const database = admin.database();
  const ref = database.ref('stages');

  let targetTime = new Date();
  console.log("CurrentTime: ", targetTime);
  //TODO:Parse terms
  if (terms === "今") {
    //nothing todo
  } else if (terms === "次") {
    target = new Date();
    targetTime.setHours(target.getHours() + 2);
  }
  console.log("TargetTime: ", targetTime);

  const targetTime_ms = targetTime.getTime();

  ref.child("regular/stage").once("value").then((snap) => {
    snap.forEach((item) => {
      const start = item.child("start").val();
    });
    return true;
  }).catch((err) => {
    console.error("Error: ", err);
  });

  let speech = "";
  let displayText = "";

  let stages = [];

  let targetStageRef;
  if ( rule === "レギュラーマッチ") {
    targetStageRef = ref.child('regular/stage');
  } else if (rule === "ガチマッチ") {
    targetStageRef = ref.child('gachi/stage');
  } else if (rule === "リーグマッチ") {
    targetStageRef = ref.child('league/stage');
  }

  let itemFound = false;
  targetStageRef.once("value").then((snapshot) => {
    snapshot.forEach((childSnapshot) => {
      //targetTime_msよりstart_tが後で、誤差が2時間未満
      //start_time is sec, not ms.
      const start_time = childSnapshot.child('start_t').val() * 1000;
      const gap = targetTime_ms - start_time;
      console.log("start_time: ", start_time);
      console.log("targetTime_ms: ", targetTime_ms);
      console.log("gap", gap);
      console.log("TWO_HOURS: ", TWO_HOURS_MS);
      if( start_time < targetTime_ms && gap < TWO_HOURS_MS) {
        console.log("stages found");
        stages.push(childSnapshot.child('stage_A').val());
        stages.push(childSnapshot.child('stage_B').val());
        itemFound = true;
        return itemFound;
      }
      return itemFound;
    });
    return itemFound;
  }).then((result) => {
    console.log("Result: ", result);
    if(result) {

      //must be send response here.
      speech = terms + "の" + rule + "のステージは、" + stages[0] + "と" + stages[1] + "です";
      res.send(JSON.stringify({
        speech: speech,
        displayText: "regular"
        })
      );
      return true;
    }
    else {
      return false;
    }
  }).catch((err) => {
    console.error("Error: ", err);
  });

});

