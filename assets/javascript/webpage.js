
console.log("test?");

function add_topic_button() {


    if (!$("#" + $("input").val()).length) {
        var new_button = $("<button></button>");
        new_button.attr("id", $("input").val());
        new_button.text(new_button.attr("id"));
        $("#images").append(new_button);
        $("input:text").val("");
    }
    else
        alert("Topic already exists!");
    //$("input").val()
}

$("document").ready(function () {

    var foo = $("#topic")
    foo.html("<h1>Select a topic: ");
    var input = $('<input type="text"></input>');
    var submit = $('<input type="button" value="click me" onclick="add_topic_button()"></input>');
    foo.append(input);
    foo.append(submit);






});

