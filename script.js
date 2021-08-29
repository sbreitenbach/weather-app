async function get_geocode(zipcode) {
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "JSESSIONID=061C62770675DB09C1B910E03608BA2F");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    const response = await fetch("https://www.mapquestapi.com/geocoding/v1/address?key=paBljA5O7dNn6iVSmZEQGDGQSfP0BWeK&location=" + zipcode, requestOptions);
    const json = await response.json();
    return json.results[0].locations[0].latLng
}

async function myFunction(zipcode) {
    var lat_long = await get_geocode(zipcode)
    console.log(lat_long);
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