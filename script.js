function myFunction(zipcode) {
    //alert("Your zip code is " + zipcode);
    var target = document.getElementById("weatherResults");
    target.innerHTML += "<br>Your zip code is " + zipcode;
}