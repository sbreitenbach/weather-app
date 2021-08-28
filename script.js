function get_geocode(zipcode) {
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "JSESSIONID=061C62770675DB09C1B910E03608BA2F");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch("http://www.mapquestapi.com/geocoding/v1/address?key=paBljA5O7dNn6iVSmZEQGDGQSfP0BWeK&location="+zipcode, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}


function myFunction(zipcode) {
    get_geocode(zipcode);
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
