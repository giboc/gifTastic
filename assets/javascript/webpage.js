//This array is used to randomly generate colors for the topic buttons.
var button_types = ["btn btn-primary",
    "btn btn-secondary",
    "btn btn-success",
    "btn btn-danger",
    "btn btn-warning",
    "btn btn-info",
    "btn btn-light",
    "btn btn-dark"
];

//Constant variables. API_KEY is the giphy api key given to us.
// IMAGE_COUNT is for the number of images you want to generate per click.
const API_KEY = "yNTDajMxofLDpXDTp4DQTAABU6oxM4fQ";
const IMAGE_COUNT = 10;

//This function is called whenever the "add search button" is clicked.
//This will then create a clickable button that generates the pictures of that topic.
//Instead of using a static array, and appending to the end, I chose to dynamically generate the buttons.
//Slightly different, but I thought this was cooler.
function add_topic_button() {
    $("input").val($("input").val().trim()); //Error handling. Remove excess whitespaces to prevent errors.
    if ($("input").val() == "")
        alert("We can't add a blank topic!"); //More error handling, since blank topics break everything.
    else {
        var random_button = Math.floor(Math.random() * 8);
        //If the length of the id is 0, we can assume the id doesn't exist.
        //Thus, create the button. If the length is not 0, the id already exists so we prevent the creation of a duplicate button.
        if (!$("#" + $("input").val()).length) {
            var new_button = $('<button type="button" class="m-1">');
            new_button.addClass(button_types[random_button]);
            new_button.attr("id", $("input").val());
            new_button.attr("offset", 0); //This offset is for generating more pictures. Without it, the same 10 images will be generated.
            new_button.text(new_button.attr("id"));
            new_button.click(generate_images);
            $("#topics").append(new_button);
            $("input").val("");
        }
        else
            alert("Topic already exists!");
    }
}

function generate_images() {
    var offset = parseInt($(this).attr("offset"));
    var search_term = this.id;
    //We modify the limit query to show the next set of 10 with the offset. It's set to 0 initially so it's the first set.
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + search_term + "&api_key=" + API_KEY + "&limit=" + IMAGE_COUNT + "&offset=" + offset;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        if (response.data.length === 0) 
            alert("No images with that tag.");
        else {
            var iter; //We use this var to prevent overflow in the for loop.

            //I also feel that I messed up the logic here, but I couldn't find a giphy search result that yielded a small enough
            //search result to test this.
            if (response.data.length === IMAGE_COUNT)
                iter = IMAGE_COUNT; //If the length of the data is sufficient, print all.
            else
                iter = response.data.length;//Otherwise return only the length of the data.

            for (var i = 0; i < iter; i++) {
                var image_object = $('<div class="m-2">');
                image_object.append('<p class = "my-0 mx-2">Rating: ' + response.data[i].rating + '</p>');
                image_object.append('<image src="' + response.data[i].images.fixed_height_still.url + '">');
                $("#images").append(image_object);
            }
        }
    });
    $(this).attr("offset", offset + IMAGE_COUNT); //At the end, increase the offset by the number of images shown.
}


//function that plays/pauses the gif.
//All it does is swap out the still .gif for the animated .gif.
//Turns out the the only difference in the URL is that the still has '_s' before the '.gif'
//This function checks to see if the url is same if '_s' is taken out.
//If it's the same, the URL is the same URL, and thus we can assume it's the animated gif.
//We then replace the URL to the still version with the '_s'.
//Otherwise, the URL is the still version, so we remove to the '_s' to animate it.
function play_pause() {
    if (this.src == this.src.replace("_s", "")) 
        this.src = this.src.replace(".gif", "_s.gif"); 
    else
        this.src = this.src.replace("_s.gif", ".gif");
}

$("document").ready(function () {
    $("button").click(function (event) {
        event.preventDefault();
        add_topic_button();
    });
    $("body").on("click", "img", play_pause);
});

