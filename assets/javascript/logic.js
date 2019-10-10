var apiKey = "rRXbzSTaRhDPan5iHyzLEm1l33aqF5Jr"
var giphyTopics = ["Twilight Sparkle", "Rarity", "Pinkie Pie", "Applejack", "Rainbow Dash", "Fluttershy"]

function renderButtons(str) { //function to render the buttons
    $("#buttons-view").empty();

    giphyTopics.forEach(function(str) { //goes through the array and creates a button for each giphy topic
        var button = $("<button>");
        button.addClass("giphy-button");
        button.attr("data-name", str);
        button.text(str);
        $(button).appendTo("#buttons-view");
        // $("<button class=giphy-button data-name="+str+">"+"BUTTON").appendTo("#buttons-view"); //This seems to be working incorrectly
    })

}

function giphyAnimate() { //function to animate or stop the gif when clicked
    // console.log("giphy click working");
    if ($(this).attr("data-state") === "still") {
        $(this).attr("data-state", "animate");
        $(this).attr("src", $(this).attr("data-animate"));
    } else {
        $(this).attr("data-state", "still");
        $(this).attr("src", $(this).attr("data-still"));
    }
}


function displayGiphys() { //function to display gifs
    $("#giphy-view").empty();
    $(".giphy-container").show();

    var giphyTopic = $(this).attr("data-name");

    $.ajax({
        url: "https://api.giphy.com/v1/gifs/search?api_key=rRXbzSTaRhDPan5iHyzLEm1l33aqF5Jr&q=" + giphyTopic + "&limit=18&offset=0&rating=PG-13&lang=en",
        method: "GET"
    }).then(function(response) {
        var results = response.data;
        
        for (i =0; i < results.length; i++) {
            var container = $("<container class=col-sm-4>")
            $(container).appendTo("#giphy-view");
            $("<div>Rating: "+results[i].rating+"</div>").appendTo(container);

            $("<img src="+results[i].images.fixed_width_still.url+" class=giphy data-still="+results[i].images.fixed_width_still.url+" data-animate="+results[i].images.fixed_width.url+" data-state=still>").appendTo(container);
        }
    })
}

//results[i].images.fixed_width.url for animated
//results[i].images.fixed_width_still.url

$("#add-giphy").on("click", function(event) { //adds a new topic
    event.preventDefault();
    let newSubject = $("#giphy-input").val().trim();

    if (!newSubject) {
        return alert("Search Topic can't be blank!")
    }

    console.log(newSubject)

    // console.log($("#giphy-input").val().trim());
    // giphyTopics.push($("#giphy-input").val().trim());
    giphyTopics.push(newSubject);

    // $("#add-giphy").text(""); 
    $("#giphy-form")[0].reset(); //resets the search text after you hit it
    renderButtons();
})



$(document).on("click", ".giphy-button", displayGiphys);

$(document).on("click", ".giphy", giphyAnimate);

$(".giphy-container").hide();

renderButtons();