let getLocation = document.getElementById("getLocation");
let loading = document.getElementById("loading");
loading.style.display = "none";
let longitude;
let latitude;
let map;

function loadMapScript() {
  if (typeof Microsoft !== "undefined") {
    initializeMap();
  } else {
    var scriptUrl = "https://www.bing.com/api/maps/mapcontrol?key=YOUR_API_KEY&callback=initializeMap";

    let script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.defer = true;
    script.src = scriptUrl;

    document.body.appendChild(script);
  }
}

function initializeMap() {
  map = new Microsoft.Maps.Map("#myMap", {
    credentials: "Air - qpW_C0y - zs3ixctgYQwqcozndID7AezO5e05nTS2XEiXQf13Wu4oweVO8m2o",
  });
}

loadMapScript();

const fetchLocation = () => {
  loading.style.display = "block";
  navigator.geolocation.getCurrentPosition(
    (position) => {
      longitude = position.coords.longitude;
      latitude = position.coords.latitude;
      let loc = new Microsoft.Maps.Location(latitude, longitude);
      let pin = new Microsoft.Maps.Pushpin(loc);
      map.entities.push(pin);
      map.setView({ center: loc, zoom: 15 });
      loading.style.display = "none";
    },
    (error) => {
      console.log(error.message);
    }
  );
};

getLocation.addEventListener("click", fetchLocation);
