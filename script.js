function get_lat_long(geocode_data)
{
    console.log(geocode_data.results[0].locations[0].latLng)
}

function get_geocode(zipcode) {
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "JSESSIONID=061C62770675DB09C1B910E03608BA2F");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch("http://www.mapquestapi.com/geocoding/v1/address?key=paBljA5O7dNn6iVSmZEQGDGQSfP0BWeK&location=" + zipcode, requestOptions)
    .then(function(response){
        // response is a json string
       return response.json();// convert it to a pure JavaScript object
   })
   .then(function(data){
        //Process Your data  
        get_lat_long(data);
   })
   .catch(function(err) {
       console.log(err);
     });
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
