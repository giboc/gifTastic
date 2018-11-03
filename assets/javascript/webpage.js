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
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + this.id + "&api_key=" + API_KEY + "&limit=10" + "&offset=" + offset;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        for (var i = 0; i < 10; i++) {
            var image_object = $('<div class="m-2">');
            image_object.append('<p class = "my-0 mx-2">Rating: ' + response.data[i].rating + '</p>');
            image_object.append('<image src="' + response.data[i].images.fixed_height_still.url + '">');
            $("#images").append(image_object);
        }
    });

    $(this).attr("offset", offset + 10);
    console.log($(this).attr("offset"));
}

function play_pause() {

    if (this.src == this.src.replace("_s", "")){
        console.log(this.src);
        this.src = this.src.replace(".gif", "_s.gif");
        console.log(this.src);
    }
    else{
        console.log(this.src);
        this.src = this.src.replace("_s.gif", ".gif");
        console.log(this.src);
    }
}

$("document").ready(function () {
    $("button").click(function () {
        event.preventDefault();
        add_topic_button();
    });
    $("body").on("click", "img", play_pause);
});

