var timezone = [];
var city = [];
var currentTimezone = 0;
var initialTimezone = 0;
var fromSerials = []; //array to store all the data from serials
//load json file that store all city infomation and image paths

function preload() {
  cityData = loadJSON("cityobject.json");
}

// var sunlight; //slider that indicates sunlight

function setup() {

  noCanvas();

  //create serial comunnication
  serial = new p5.SerialPort(); // make a new instance of  serialport librar
  serial.on('list', printList); // callback function for serialport list event
  serial.on('data', serialEvent); // callback for new data coming in
  serial.list(); // list the serial ports
  serial.open("/dev/cu.usbmodem1421"); // open a port

  //create a slider to control what time to display for each city. The value of the slider represents the timezone that gets the most sunlight or is 12:00 at noon.
  //e.g.: if slider.value=0, then cities in timezone 0 are at 12:00pm. All other timezone's time change accordingly.
  //update images to disply every time the slider value changes
  updateImages(initialTimezone);
}

function draw() {
  //if the slider value changes, updage images in draw
  // if (initialTimezone!= maxTimezone) {
  //   print("time z chnges");
  //   updateImages(maxTimezone);
  // }
}

function updateImages(t) {
  // this line delets everything in the container div elment,
  // because we are about to populate it with new images.
  document.getElementById("label-container").innerHTML = "";
  document.getElementById("image-container").innerHTML = "";
 //time is the time to display for each timezone
  var time = 12 - t;
  //if time<0, time changed to night in the last time. e.g., -1 = 23:00pm
  if (time < 0) {
    time = 24 + time;
  }

  var timezones = cityData.timezones; //access the timezone array in json file
  // var positionX = 20; //specify initial x position for the first column of photos (timezone 0)
  // var positionY = 200; //specify intial y position for the first city in the timezone 0
  var positionX = window.innerWidth / 2; //specify initial x position for the first column of photos (timezone 0)
  var positionY = window.innerHeight / 2; //specify intial y position for the first city in the timezone 0
  var zoneTextPosX = 60; //specify the position to display timezone text
  var zoneTextPosY = 50;
  // var current_r = t;
  // var t = current_r;

  for (i = 0; i < timezones.length; i++) { //loop through all 24 time zoens
    //create timezone title text for each timezone
    // timezoneText = createP("Timezone: " + i + time+":00");
    // timezoneText.parent("#label-container");
    // timezoneText.position(zoneTextPosX, zoneTextPosY);
    //print slider value
    print("timezone" + t + "is at noon");
    //here we specify the time to display for timezone 0;
    //if t (serial value) is 0, timezone 0 is 12:00pm;
    //if serial value is 1, timezone 1 is 12:00 which means timezone 0 is 11:00;
    //so the time of the timezone 0 is : (12-sliderValue);

    //loop through all cities in each timezone
    let timezoneContainer = createDiv("GMT+" + i + "   " + ("0" + time).slice(-2)+":00");
    timezoneContainer.id("container"+String(i));
    timezoneContainer.class("container");
    timezoneContainer.position(positionX, positionY);
    document.getElementById("container"+String(i)).style.transform = "rotate("+String(i*15)+"deg) translate(0px, 400px)";

    timezoneContainer.parent("#image-container");
    for (j = 0; j < timezones[i].length; j++) {

      var currentCity = timezones[i][j];
      // var pictures = [];


      try {
        var currentImage = createImg(currentCity.path + time + currentCity.format); //./ciites/london/london0.png
        currentImage.id("image"+String(i)+String(j));
        // currentImage.position(positionX, positionY);
        // currentImage.style.transform = "rotate(45deg)";

        currentImage.parent("#container"+String(i));
        currentImage.show();
      } catch (err) {
        //this is for debugging
        print("seems like there isn't any ", currentCity.path + t + currentCity.format);
        print("here is the offcicl error message " + err);
      }
      // positionY = positionY + 150;
    }

    //the time increases while timezone number increases
    time = time + 1;
    //if time > 23, time goes back to 0 (for a new day)
    if (time > 23) {
      time = time - 24;
    }
    // positionX = positionX + 250;
    // positionY = 200;
    zoneTextPosX = zoneTextPosX + 255;
  }
}

//serial staff down there
//print serial port lists
function printList(portList) {
  for (var i = 0; i < portList.length; i++) {
    // Display the list the console:
    console.log(i + " " + portList[i]);
  }
}

function serialEvent() {
  // this is called when data is recieved, data will then live in fromSerial
  var stringFromSerial = serial.readLine(); // reads everything till the new line charecter
  if (stringFromSerial.length > 0) { // is something there ?
    var trimmedString = trim(stringFromSerial); // get rid of all white space
    var myArray = split(trimmedString, ","); // splits the string into an array on commas
    //get items in the array and turn them into integers
    fromSerials = [];

    for (i = 0; i < 14; i++) {
      var currentSerial = Number(myArray[i]);
      // console.log("Timezone " + i + ": " + n);
      // if (n > 350) {
      //   prevTimezone = currentTimezone;
      //   currentTimezone = i;
      // }
      fromSerials.push(currentSerial);//push serial data into array fromSerials

      //console.log(currentSerial);
    }

    var maxTimezone = fromSerials.indexOf(Math.max.apply(Math, fromSerials));
    console.log(Math.max.apply(Math, fromSerials));
    console.log("max timezone is"+maxTimezone);
    console.log(fromSerials);
    updateImages(maxTimezone);
  }
}


// window.onload = function() {
// 	Maptastic("image-container");
// };


//all things below don't matter



    // prevTimezone=currentTimezone;
    // currentTimezone=maxTimezone;

    // fromSerial0 = Number(myArray[0]); // get the first item in the array and turn into integer
    // fromSerial1 = Number(myArray[1]); // get the second item in the array and turn into integer
    // fromSerial2 = Number(myArray[2]);
    // fromSerial2 = Number(myArray[3]);
    // fromSerial4 = Number(myArray[4]);
    // fromSerial5 = Number(myArray[5]);

    //loop through all serial value, if one the sensor's reading is larger than 350, set the timezone to currentTimeZone
    // for (i = 0; i < 15; i++) {
    //   if (fromSerials[i] > 350) {
    //     prevTimezone = currentTimezone;
    //     currentTimezone = i;
    //   }
    // }










// for (var i = 0; i < city; i++) {
// var currentCity = cityData[cities[i]];
//
// var cityPictures = [];
// for (var t = 0; t < 24; t++) {
//   cityPictures.push(
//     createImg("./cities/" + currentCity.path + "/" + currentCity.path + t + ".png")//./ciites/london/london0.png
//   );
// }

//
// var littlecity = new City(currentCity.name, currentCity.pictures, currentCity.timezone);
// city.push(littlecity);
// var time = city[i].timezone;
//
// timezone[time] = timezone[time] || []; // Check if current timezone array exists, initialize empty array if not
// timezone[time].push(city[i]); // push new city into correct timezone array

//JSON FILE SHOULD INITILIZE THE OBJECTS CITY[]
//read json
//photosp = ["img1.jpg", "imag.jpg"..........]

// }
// console.log(timezone);
// }



// City class
// namep is String
// photosp is []
// timezone is Integer
