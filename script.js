$(function () {
  $("#searchBtn").on("click", handleSearch);

  // API key: 3cb3221cf83645ed701a2873e477b9b9
  // Tulsa
  // https://api.openweathermap.org/data/2.5/forecast?q=tulsa&units=imperial&appid=3cb3221cf83645ed701a2873e477b9b9

  function handleSearch(event) {
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
      var currentTimestamp = response.dt;
      var currentDate = new Date(currentTimestamp * 1000).toLocaleDateString();
      var currentIcon = response.weather[0].icon;
      var currentImg = $("<img>").attr(
        "src",
        "http://openweathermap.org/img/wn/" + currentIcon + "@2x.png"
      );

      // Storing previous cities
      var previousCities = $("<div>").attr("id", "previous-cities");
      $("#cityCol").append(previousCities);
      var currentCity = response.name;
      localStorage.setItem("Previous City", currentCity);
      $("#previous-cities")
        .html(localStorage.getItem("Previous City"))
        .css("border", "dashed")
        .css("background-color", "darkgrey")
        .css("color", "black");

      var currentTemp = response.main.temp;
      var currentHumidity = response.main.humidity;
      var currentWind = response.wind.speed;
      var lat = response.coord.lat;
      var lon = response.coord.lon;
      $("#currentCity").html(
        "<h2>" + response.name + " (" + currentDate + ")" + "<h2>"
      );
      $("#currentCity").append(currentImg);
      $("#currentTemp").html("Temperature: " + currentTemp + "°F");
      $("#currentHumidity").html("Humidity: " + currentHumidity + "%");
      $("#currentWind").html("Wind Speed: " + currentWind + " MPH");

      var uvURL =
        "https://api.openweathermap.org/data/2.5/uvi?appid=" +
        APIKey +
        "&lat=" +
        lat +
        "&lon=" +
        lon;
      $.ajax({
        url: uvURL,
        method: "GET",
      }).then(function (response) {
        currentUV = response.value;
        $("#currentUV")
          .html("UV Index: " + currentUV)
          .width("130px");

        if (currentUV > 8) {
          $("#currentUV").css("background-color", "red");
          $("#currentUV").css("color", "white");
        } else if (currentUV < 2) {
          $("#currentUV").css("background-color", "green");
          $("#currentUV").css("color", "white");
        } else {
          $("#currentUV").css("background-color", "orange");
          $("#currentUV").css("color", "black");
        }
      });
    });

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
      forecastDays.push(response.list[0]);
      forecastDays.push(response.list[8]);
      forecastDays.push(response.list[16]);
      forecastDays.push(response.list[24]);
      forecastDays.push(response.list[32]);

      //   $("#forecast").html(
      //     "<pre>" + JSON.stringify(forecastDays, null, 2) + "</pre>"
      //   );
      var dateEl = [];
      for (var i = 0; i < forecastDays.length; i++) {
        var timestamp = forecastDays[i].dt;
        var date = new Date(timestamp * 1000).toLocaleDateString();
        dateEl.push(date);
        var icon = forecastDays[i].weather[0].icon;

        // var forecastContainer = $("<div>").addClass("forecast-day");
        var forecastCard = $("<div>")
          .addClass(
            "card text-white bg-primary mb-3 mr-3 pb-3 w-23 text-center"
          )
          .attr("id", "forecast-card")
          .attr("style", "max-width: 18rem");
        $("#forecast").append(forecastCard);

        var cardBody = $("<div>").addClass("card-body").attr("id", "cardBody");
        $("#forecast-card");
        forecastCard.append(cardBody);

        var cardTitle = $("<div>").addClass("card-title");
        $("#cardBody").append(cardTitle);
        forecastCard.append(cardTitle);
        cardTitle.html(dateEl[i]);

        var iconImg = $("<img>").addClass("icon-image");
        $(".card-text1").prepend(iconImg);
        iconImg.attr(
          "src",
          "http://openweathermap.org/img/wn/" + icon + "@2x.png"
        );
        forecastCard.append(iconImg);

        var cardTemp = $("<p>").addClass("card-text").attr("id", "cardTemp");
        cardTemp.html("Temp: " + forecastDays[i].main.temp + "°F");
        forecastCard.append(cardTemp);

        var cardHumidity = $("<p>")
          .addClass("card-text")
          .attr("id", "cardHumidity");
        cardHumidity.html("Humidity: " + forecastDays[i].main.humidity + "%");
        forecastCard.append(cardHumidity);
        // $(".card-text2").html(forecastDays[i].main.temp + "°F");
        // $(".card-text3").html(forecastDays[i].main.humidity + "%");

        // forecastContainer.prepend(dateEl, iconEl, tempEl, humidityEl);
        // $("#forecast").prepend(forecastContainer);
      }
    });
  }
});

// "src", "http://openweathermap.org/img/wn/" + forecastDays[i].weather[0].icon + "@2x.png"
