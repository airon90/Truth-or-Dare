var DARE_ID = [];
var TRUTH_ID = [];
var DARE = "Dare";
var TRUTH = "Truth";
var SOURCE = "../script/output.json"; //with both truth and dare
var turn = "1";
var test;
var idAvailable = [];
var BOOTSTRAP_STYLE = ["Default", "Primary", "Success", "Info", "Warning", "Danger"];

function timer(seconds) {
    'use strict';
    /* Animate the bootstrap progress bar to reach 100% in a time in ms set */
    var milliseconds = seconds * 1000;

    $(".progress-bar").stop();
    $(".progress-bar").animate({
        width: "0%"
    }, 100);
    $(".progress-bar").animate({
        width: "100%"
    }, milliseconds);
}

timer(10);


/**
    Truth or Dare functions
*/
function truth() {
    /* Load a truth from the json file */
    'use strict';
    generate(TRUTH_ID, TRUTH);
}

function random() {
    'use strict';
}

function dare() {
    /* load a dare from tje json file */
    'use strict';
    generate(DARE_ID, DARE);
}

/** 
    The JSON file for the truth or dare should be like:
        id - The unique id of the truth or dare
        type - The type is either "Truth" or "Dare"
        level - From 0 to 5, 0 - disgusting, 1 - stupid, 2 - normal, 3 - soft, 4 - sexy, 5 - hot
        summary - The explaination of the truth or the dare to do
        time - The time set in seconds for the timer
        turns - The number of turn the dare stays

*/

function indexing(json) {
    /* To be called when loading the json to index truths and dares IDs */
    var i;

    for (i = 0; i < json.length; i++) {
        console.log(json[i].type);

        if (json[i].type === TRUTH) {
            TRUTH_ID.push(json[i].id);
        } else if (json[i].type === DARE) {
            DARE_ID.push(json[i].id);
        }
    }

    idAvailable = TRUTH_ID.concat(DARE_ID);
    console.log(idAvailable);
}


function loadJSON(source) {
    /* Get the JSON file and do the logic to get a truth or dare from the JSON file based on the choice */
    $.getJSON(source, function (json) {
        indexing(json);
        console.log("Truth: " + TRUTH_ID + " Dare: " + DARE_ID);
    });
}


window.onload = function () {
    /* to load the json and do the indexing when the window is loading */
    $.get(SOURCE)
        .done(function () {
            loadJSON(SOURCE)
        }).fail(function () {
            alert("The file couldn't be loaded")
        })
}

function removeID(id) {
    /* Remove an id used from the available id*/
    var index = idAvailable.indexOf(id);
    console.log(id + " " + index + " removed!");

    if (index > -1) {
        idAvailable.splice(index, 1);

    }
}


function generate(array, type) {
    var possibilities = getPossibilities(array);
    var randomID = getRandomID(possibilities);

    updateView(randomID, type);
}

function getPossibilities(array) {
    var i, item;
    var result = [];

    for (i = 0; i < array.length; i++) {
        item = array[i];
        for (var j = 0; j < idAvailable.length; j++) {
            if (item == idAvailable[j]) {
                result.push(item);
            }
        }
    }

    return result;
}

function getRandomID(array) {
    var id = -1;
    var randomIndex;

    if (array.length > 0) {
        randomIndex = Math.floor(Math.random() * array.length);
        id = array[randomIndex];
        removeID(id);
    }

    return id;
}


/**
 
  To update the view
 
*/
function bsStyliser(style) {
    if ($.inArray(style, BOOTSTRAP_STYLE)) {
        return style;
    } else {
        return "Default";
    }
}

function addAlert(style, title, message) {
    /* Create an alert with a bootStrapType for the style, a title and a message */

    $('#alert_placeholder').html('<div class="alert alert-' + bsStyliser(style) + '"><button type="button" class="close" data-dismiss="alert">&times;</button><strong>' + title + '</strong>' + message + '</div>');

}

function clearLabel() {
    /* Remove the label from the label section */

    $("#labels").html("");

}

function addLabel(style, name) {
    /* This will add labels in the view the bootStrapType is to make the CSS  */

    $("#labels").append('<span class="label label-' + style + '">' + name + '</span></br>');

}

function nextTurn() {
    turn++;
    $("#turn").text(turn);
}

function updateView(id, type) {
    clearLabel();
    $.getJSON(SOURCE, function (json) {

        $("#type-action").text(type + ": ");
        addLabel("info", type);

        if (id >= 0) {
            updateLabels(json[id]);

            $("#text-action").text(json[id].summary);

        } else {
            $("#text-action").text("You've completed all the " + type);
        }
    });

    nextTurn();
}

function updateLabels(object) {
    console.log(object);
    if (object['time'] != '') {
        addLabel("default", "timer");
        timer(object['time']);

    }
    if (object['turns'] != '') {
        addLabel("default", "turns");
    }
}
