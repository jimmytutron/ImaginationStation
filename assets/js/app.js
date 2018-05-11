  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCRjgzhFtpaSGzAgTrnXRxGq_FTOZolzrI",
    authDomain: "codersbay-80fd1.firebaseapp.com",
    databaseURL: "https://codersbay-80fd1.firebaseio.com",
    projectId: "codersbay-80fd1",
    storageBucket: "codersbay-80fd1.appspot.com",
    messagingSenderId: "144690877924"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  $("#add-train").on("click", function(event){

      event.preventDefault();

      var trainName = $("#train-name").val().trim();
      var destination = $("#destination").val().trim();
      var firstTrainTime = $("#first-train-time").val().trim();
      var frequency = $("#frequency").val().trim();

      var trainData = {
        trainName : trainName,
        destination : destination,
        firstTrainTime : firstTrainTime,
        frequency : frequency
      };

      database.ref().push(trainData);
  });

      // Firebase watcher + initial loader HINT: This code behaves similarly to .on("value")
    database.ref().on("child_added", function(childSnapshot, prevChildKey) {
      
      // Log everything that's coming out of snapshot
      console.log(childSnapshot.val());

      var trainName = childSnapshot.val().trainName;
      var destination = childSnapshot.val().destination;
      var firstTrainTime = childSnapshot.val().firstTrainTime;
      var frequency = childSnapshot.val().frequency;

// First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTrainTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = parseInt(diffTime % frequency);
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
      
      // full list of items to the well
      $("#train-list").append(
        "<tr><td>" + trainName + 
        "</td><td>" + destination + 
        "</td><td>" + frequency + 
        "</td><td>" + moment(nextTrain).format("hh:mm") + 
        "</td><td>" + tMinutesTillTrain + "</td></tr>");
            
      // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });

    // Firebase watcher + initial loader + order/limit HINT: .on("child_added"
    database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
      // storing the snapshot.val() in a variable for convenience
      var sv = snapshot.val();

      // Console.loging the last user's data
      console.log(sv.trainName);
      console.log(sv.destination);
      console.log(sv.firstTrainTime);
      console.log(sv.frequency);
    });