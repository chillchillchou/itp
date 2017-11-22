var timezone = [];
var city = [];

function preload() {
  cityData = loadJSON("cityobject.json");
}


let sunlight;
let curentTimezone = 0;

function setup() {

  noCanvas();
  //create a slider to control what time to display for each city. The value of the slider represents the timezone that gets the most sunlight or is 12:00 at noon.
  //e.g.: if slider.value=0, then cities in timezone 0 are at 12:00pm. All other timezone's time change accordingly.
  //so if timezone.index==slider.Value, timezone[index][cities][12].show()
  sunlight=createSlider(0,24,curentTimezone,1);
  // var cities = Object.keys(cityData);
  updateImages(curentTimezone)
}

function draw() {
  if(sunlight.value() != curentTimezone){
    print("time  z chnges");
    curentTimezone = sunlight.value();
    updateImages(curentTimezone);
  }

}

function updateImages(t){
  // this line delets everything in the container div elment,
  // because we are about to populate it with new images.
  document.getElementById("container").innerHTML = "";
  
  var timezones = cityData.timezones;
  var positionX = 20;
  var positionY = 100;
  var zoneTextPosX=60;
  var zoneTextPosY=50;
  var current_r = t;
  var t = current_r;
  for (i = 0; i < timezones.length; i++) { //loop through all 24 time zoens
    timezoneText=createP("Timezone: "+i);
    timezoneText.parent("#container");
    timezoneText.position(zoneTextPosX,zoneTextPosY);
    print("getting imges for " + t);
    for (j = 0; j < timezones[i].length; j++) { //loop through all cities in each timezone
      var currentCity = timezones[i][j];
      var pictures = [];
      try{
        var currentImage = createImg(currentCity.path + t + currentCity.format); //./ciites/london/london0.png
        currentImage.position(positionX, positionY);
        currentImage.parent("#container");
        currentImage.show();
      }catch(err){
        print("seems like there isn't any ", currentCity.path + t + currentCity.format);
        print("here is the offcicl error message " + err);

      }
      // for (var t = 0; t < 24; t++) {
      //   var currentImage = createImg(currentCity.path + t + currentCity.format); //./ciites/london/london0.png
      //   // if timezone index == sliderValue, show image (t=12) and hide others;
      //   if (t==i){
      //     currentImage.show();
      //   }
      //   else{
      //     currentImage.hide();
      //   }
      //   pictures.push(currentImage);
      //   currentImage.position(positionX, positionY);
      // }
      positionY = positionY + 150;
    }
    t++;
    if(t > 23){
      let diff = t-23;
      t=diff-1
    }
    positionX = positionX + 250;
    positionY = 100;
    zoneTextPosX=zoneTextPosX+255;
  }
}




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
function City(namep, photosp, timezone) {
  this.name = namep;
  this.photos = photosp;
  this.timezone = timezone;
}
