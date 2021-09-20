function is_valid_zip(zipcode) {
    if (zipcode.length != 5) {
        alert("Please enter a 5 digit zipcode")
        return false
    }
    if (isNaN(zipcode)) {
        alert("Please enter a numerical zipcode")
        return false
    }
    else {
        return true
    }
}

async function get_geocode(zipcode) {
    var myHeaders = new Headers();

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    const response = await fetch("https://www.mapquestapi.com/geocoding/v1/address?key=paBljA5O7dNn6iVSmZEQGDGQSfP0BWeK&location=" + zipcode, requestOptions);
    const json = await response.json();
    return json.results[0].locations[0].latLng
}

async function get_nws_grid(lat, lng) {
    var myHeaders = new Headers();
    myHeaders.append("User-Agent", "https://github.com/sbreitenbach/weather-app");


    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    const response = await fetch("https://api.weather.gov/points/" + lat + "," + lng, requestOptions);
    const json = await response.json();
    return [json.properties.gridId, json.properties.gridX, json.properties.gridY]
}

async function get_forcast(grid_id, grid_x, grid_y) {
    var myHeaders = new Headers();
    myHeaders.append("User-Agent", "https://github.com/sbreitenbach/weather-app");


    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    const response = await fetch("https://api.weather.gov/gridpoints/" + grid_id + "/" + grid_x + "," + grid_y + "/forecast", requestOptions);
    const json = await response.json();
    return json
}

//https://www.aspsnippets.com/Articles/Create-dynamic-Table-in-HTML-at-runtime-using-JavaScript.aspx
function GenerateTable(weather) {

    //Create a HTML Table element.
    var table = document.createElement("TABLE");
    table.border = "1";

    //Get the count of columns.
    var columnCount = weather[0].length;

    //Add the header row.
    var row = table.insertRow(-1);
    for (var i = 0; i < columnCount; i++) {
        var headerCell = document.createElement("TH");
        headerCell.innerHTML = weather[0][i];
        row.appendChild(headerCell);
    }

    //Add the data rows.
    for (var j = 1; j < weather.length; j++) {
        row = table.insertRow(-1);
        for (var k = 0; k < columnCount; k++) {
            var cell = row.insertCell(-1);
            cell.innerHTML = weather[j][k];
        }
    }

    var dvTable = document.getElementById("weatherResults");
    dvTable.innerHTML = "";
    dvTable.appendChild(table);
}


function create_weater_array(objects) {
    var weather_array = [];
    weather_array.push(["Time", "Temperature", "Forcast", "Icon"]);
    for (var i = 0; i < objects.length; i++) {
        let period_array = [];
        let time = objects[i].name;
        let temp_degrees = objects[i].temperature;
        let temperature_unnit = objects[i].temperatureUnit;
        let temp = temp_degrees + "°" + temperature_unnit;
        let short_forecast = objects[i].shortForecast;
        let icon = objects[i].icon;
        let img = document.createElement('img');
        img.src = icon;
        icon = img.outerHTML;
        period_array.push(time, temp, short_forecast,icon);
        weather_array.push(period_array);
    }
    return weather_array
}

// https://stackoverflow.com/questions/53799108/how-to-add-a-loading-animation-while-fetch-data-from-api-vanilla-js
async function myFunction(zipcode) {
    if (is_valid_zip(zipcode)) {
        //https://tobiasahlin.com/spinkit/
        let loader = `<div class="sk-folding-cube">
        <div class="sk-cube1 sk-cube"></div>
        <div class="sk-cube2 sk-cube"></div>
        <div class="sk-cube4 sk-cube"></div>
        <div class="sk-cube3 sk-cube"></div>
      </div>`;
        document.getElementById('weatherResults').innerHTML = loader;
        var lat_long = await get_geocode(zipcode)
        var grid = await get_nws_grid(lat_long.lat, lat_long.lng)
        var forcast = await get_forcast(grid[0], grid[1], grid[2])
        periods = forcast.properties.periods;
        var weather = create_weater_array(periods)
        GenerateTable(weather);
    }
}