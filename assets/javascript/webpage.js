
const API_KEY = "yNTDajMxofLDpXDTp4DQTAABU6oxM4fQ";

function add_topic_button() {

    if ($("input").val() == "")
        console.log("empty string!")
    else {


        if (!$("#" + $("input").val()).length) {
            var new_button = $("<button>");
            new_button.attr("id", $("input").val());
            new_button.attr("image_count",0);
            new_button.text(new_button.attr("id"));
            new_button.click(generate_images);
            $("#images").append(new_button);
            $("input:text").val("");
        }
        else
            alert("Topic already exists!");
        //$("input").val()
    }
}

function generate_images() {

    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + this.id + "&api_key=" + API_KEY + "&limit=10";

    
    console.log($(this).attr("image_count"));

    for (var i = 0; i < 3; i++) {

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            $("#testing").append('<image src="' + response.data.images.fixed_height.url + '">');
        });
    
    }
}

$("document").ready(function () {

    var foo = $("#topic")
    foo.html("<h1>Select a topic: ");
    var input = $('<input type="text"></input>');
    var submit = $("<input>");
    var submit = $('<input type="button" value="click me" onclick="add_topic_button()"></input>');
    foo.append(input);
    foo.append(submit);


    $("button").click(function () {
        console.log("a button was clicked!");
    });



});

