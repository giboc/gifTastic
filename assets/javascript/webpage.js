var button_types = ["btn btn-primary",
    "btn btn-secondary",
    "btn btn-success",
    "btn btn-danger",
    "btn btn-warning",
    "btn btn-info",
    "btn btn-light",
    "btn btn-dark"
];



const API_KEY = "yNTDajMxofLDpXDTp4DQTAABU6oxM4fQ";
const IMAGE_COUNT = 10;

function add_topic_button() {
    $("input").val($("input").val().trim()); //Error handling. Remove excess whitespaces to prevent errors.
    if ($("input").val() == "")
        alert("We can't add a blank topic!"); //More error handling, since blank topics break everything.
    else {
        var random_button = Math.floor(Math.random() * 8);
        if (!$("#" + $("input").val()).length) {
            var new_button = $('<button type="button" class="m-1">');
            new_button.addClass(button_types[random_button]);
            new_button.attr("id", $("input").val());
            new_button.attr("offset", 0);
            new_button.text(new_button.attr("id"));
            var empty_image_set = new_button.click(generate_images);
            $("#topics").append(new_button);
            $("input").val("");
        }
        else
            alert("Topic already exists!");
    }
}

function generate_images() {
    var offset = parseInt($(this).attr("offset"));
    console.log("Offset beginning: " + offset);
    var search_term=this.id;
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + search_term + "&api_key=" + API_KEY + "&limit=" + IMAGE_COUNT + "&offset=" + offset;
    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        if (response.data.length === 0) {
            alert("No images with that tag.");
            return true; 
            
        }
        else {
            console.log("else testing?");
            var iter; 
            if (response.data.length === IMAGE_COUNT)
                iter = IMAGE_COUNT;
            else
                iter = response.data.length;

            console.log("iter value: " + iter); 
            for (var i = 0; i < iter; i++) {
                console.log("forloop testing");
                var image_object = $('<div class="m-2">');

                image_object.append('<p class = "my-0 mx-2">Rating: ' + response.data[i].rating + '</p>');
                image_object.append('<image src="' + response.data[i].images.fixed_height_still.url + '">');
                $("#images").append(image_object);
            }
        }
    });

    $(this).attr("offset", offset + IMAGE_COUNT);

    console.log("Offset end: " + $(this).attr("offset"));

}

function play_pause() {

    if (this.src == this.src.replace("_s", "")) {
        console.log(this.src);
        this.src = this.src.replace(".gif", "_s.gif");
        console.log(this.src);
    }
    else {
        console.log(this.src);
        this.src = this.src.replace("_s.gif", ".gif");
        console.log(this.src);
    }
}

$("document").ready(function () {
    $("button").click(function (event) {
        event.preventDefault();
        add_topic_button();
    });
    $("body").on("click", "img", play_pause);
});

