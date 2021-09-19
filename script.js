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
    for (var i = 1; i < weather.length; i++) {
        row = table.insertRow(-1);
        for (var j = 0; j < columnCount; j++) {
            var cell = row.insertCell(-1);
            cell.innerHTML = weather[i][j];
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
        period_array = [];
        name = objects[i].name;
        temp_degrees = objects[i].temperature;
        temperature_unnit = objects[i].temperatureUnit;
        temp = temp_degrees + "°" + temperature_unnit;
        short_forecast = objects[i].shortForecast;
        icon = objects[i].icon;
        var img = document.createElement('img');
        img.src = icon;
        icon = img.outerHTML;
        period_array.push(name, temp, short_forecast,icon);
        weather_array.push(period_array);
    }
    return weather_array
}

async function myFunction(zipcode) {
    if (is_valid_zip(zipcode)) {
        var lat_long = await get_geocode(zipcode)
        var grid = await get_nws_grid(lat_long.lat, lat_long.lng)
        var forcast = await get_forcast(grid[0], grid[1], grid[2])
        periods = forcast.properties.periods;
        var weather = create_weater_array(periods)
        GenerateTable(weather);
    }
}