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

      console.log(trainName, destination, firstTrainTime, frequency);


  });