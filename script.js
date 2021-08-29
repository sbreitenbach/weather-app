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


async function myFunction(zipcode) {
    var lat_long = await get_geocode(zipcode)
    var grid = await get_nws_grid(lat_long.lat, lat_long.lng)
    var forcast = await get_forcast(grid[0], grid[1], grid[2])
    console.log(forcast);
    var target = document.getElementById("weatherResults");
    target.innerHTML += `
    <table>
        <tr>
            <th>Monday</th>
            <th>Tuseday</th>
            <th>Wednesday</th>
            <th>Thursday</th>
            <th>Friday</th>
        </tr>
        <tr>
            <td>Sunny</td>
            <td>Cloudy</td>
            <td>Sunny</td>
            <td>Rainy</td>
            <td>Partly Cloudy</td>
        </tr>
    </table>`;
}