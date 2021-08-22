function myFunction(zipcode) {
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