$(function () {
  $("#searchBtn").on("click", handleSearch);

  // API key: 3cb3221cf83645ed701a2873e477b9b9
  // Tulsa
  // https://api.openweathermap.org/data/2.5/forecast?q=tulsa&units=imperial&appid=3cb3221cf83645ed701a2873e477b9b9

  function handleSearch() {
    event.preventDefault();
    var city = $("#city-input").val();

    var APIKey = "3cb3221cf83645ed701a2873e477b9b9";

    var currentURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&units=imperial&appid=" +
      APIKey;

    $.ajax({
      url: currentURL,
      method: "GET",
    }).then(function (response) {
      var currentTemp = response.main.temp;
      var currentHumidity = response.main.humidity;
      var currentWind = response.wind.speed;
      var lat = response.coord.lat;
      var lon = response.coord.lon;
      $("#currentTemp").html(currentTemp + "°F");
      $("#currentHumidity").html(currentHumidity + "%");
      $("#currentWind").html(currentWind + " MPH");
    });

    // var uvURL =
    //   "https://api.openweathermap.org/data/2.5/uvi?appid=" +
    //   APIKey +
    //   "&lat=" +
    //   lat +
    //   "&lon=" +
    //   lon;

    // $.ajax({
    //   url: currentURL,
    //   method: "GET",
    // }).then(function (response) {
    //   console.log(response);
    //   // var currentUV =
    // });

    var forecastURL =
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      city +
      "&units=imperial&appid=" +
      APIKey;

    $.ajax({
      url: forecastURL,
      method: "GET",
    }).then(function (response) {
      var forecastDays = [];
      console.log(forecastDays);
      forecastDays.push(response.list[0]);
      forecastDays.push(response.list[8]);
      forecastDays.push(response.list[16]);
      forecastDays.push(response.list[24]);
      forecastDays.push(response.list[32]);
      console.log(forecastDays);
      $("#currentCity").html("<h2>" + response.city.name + "<h2>");

      //   $("#forecast").html(
      //     "<pre>" + JSON.stringify(forecastDays, null, 2) + "</pre>"
      //   );
      for (var i = 0; i < forecastDays.length; i++) {
        var forecastContainer = $("<div>").addClass("forecast-day");
        var dateEl = $("<div>").html(forecastDays[i].dt_txt);
        var iconEl = $("<div>").html(forecastDays[i].weather[0].icon);
        var tempEl = $("<div>").text("Temp: 80F");
        var humidityEl = $("<div>").text("Humidity: 35%");

        forecastContainer.append(dateEl, iconEl, tempEl, humidityEl);
        $("#forecast").append(forecastContainer);
      }
    });
  }
});
