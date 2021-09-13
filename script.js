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

function remove_extra_keys(objects) {
    var new_array = [];
    for (var i = 0; i < objects.length; i++) {
        var new_obj = {};
        for (var key in objects[i]) {
            if (key == "name" || key == "shortForecast" || key == "temperature") {
                new_obj[key] = objects[i][key];
            }
        }
        new_array.push(new_obj);
    }
    return new_array
}

function CreateTableFromJSON(forecast) {
    // https://www.encodedna.com/javascript/populate-json-data-to-html-table-using-javascript.htm
    var col = [];
    for (var i = 0; i < forecast.length; i++) {
        for (var key in forecast[i]) {
            if (col.indexOf(key) === -1) {
                col.push(key);
            }
        }
    }
    // CREATE DYNAMIC TABLE.
    var table = document.createElement("table");

    // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

    var tr = table.insertRow(-1);                   // TABLE ROW.

    for (var i = 0; i < col.length; i++) {
        var th = document.createElement("th");      // TABLE HEADER.
        th.innerHTML = col[i];
        tr.appendChild(th);
    }

    // ADD JSON DATA TO THE TABLE AS ROWS.
    for (var i = 0; i < forecast.length; i++) {

        tr = table.insertRow(-1);

        for (var j = 0; j < col.length; j++) {
            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = forecast[i][col[j]];
        }
    }

    // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
    var divContainer = document.getElementById("weatherResults");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);
}

async function myFunction(zipcode) {
    var lat_long = await get_geocode(zipcode)
    var grid = await get_nws_grid(lat_long.lat, lat_long.lng)
    var forcast = await get_forcast(grid[0], grid[1], grid[2])
    periods = forcast.properties.periods;
    console.log(periods)
    periods = remove_extra_keys(periods);
    console.log(periods);
    CreateTableFromJSON(periods);
}