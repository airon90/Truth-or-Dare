var DARE_ID = [];
var TRUTH_ID = [];
var DARE = "Dare";
var TRUTH = "Truth";
var TRUTH_SOURCE = "../script/output.json";
var DARE_SOURCE = "../script/output.json";
var SOURCE = "../script/outpput.json"; //with both truth and dare
var turn = "1";
var idAvailable = [];

function timer(milliseconds) {
    /* Animate the bootstrap progress bar to reach 100% in a time in ms set */
    $(".progress-bar").animate({
        width: "100%"
    }, milliseconds);
}

timer(2000);


/**
    Truth or Dare functions
*/
function truth() {
    /* Load a truth from the json file */
    'use strict';
    getFromJSON(TRUTH_SOURCE, TRUTH);
}

function random() {
    'use strict';
}

function dare() {
    /* load a dare from tje json file */
    'use strict';
    CHOICE = "Dare";
    getFromJSON(DARE_SOURCE, DARE);
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
            loadJSON(TRUTH_SOURCE);
            loadJSON(DARE_SOURCE);
        })
}


function isValid(type, id) {
    /* Check if the id is available and is the good type */
    var validator = getIDsFromType(type);

    if (id in validator) && (id in idAvailable) {
        return true;
    }
    return false
}

function getIDsFromType(type) {
    /* Get the dare ID or the Truth ID table */
    var idType;
    
    if (type === DARE) {
        idType = DARE_ID;
    } else if (type === TRUTH) {
        idType = TRUTH_ID;
    }

    return idType;
}

function removeID(id) {
    /* Remove an id used from the available id*/
    var index = idAvailable.indexOf(id);

    if (index > -1) {
        idAvailable.splice(index, 1);
    }
}


function isBootStrapStyle(style) {
    if (style in BOOTSTRAP_STYLE) {
        return true;
    } else {
        return false;
    }
}

function getFromJSON(source, choice) {
    /* Get the JSON file and do the logic to get a truth or dare from the JSON file based on the choice */
    $.getJSON(source, function (json) {
        var c = -1;

        $("#type-action").text(choice + ": ");
        c = randomChoice(json);

        if (c > 0) {
            $("#text-action").text(json[c].summary);
        } else {
            $("#text-action").text("You've completed all the " + CHOICE);
        }
    });
}


function randomChoice(jsonObj) {
    var id = getRandomID(jsonObj);
    console.log("random - " + id);

    /*for (var i = 0; i < jsonObj.length; i++) {
        console.log("[i] - " + jsonObj[i].id)
        if (jsonObj[i].id == id) {
            
            break;
        }
    }*/

    return id;
}

function getRandomID(jsonObj) {
    var randomID = -1;
    var temp = 0;

    /*if (ID.length > 0) {
        while (!(randomID in ID)) {
            temp++;
            if (temp > 10) {
                break;
            }
            randomID = ID[Math.floor(Math.random() * ID.length)];
        };
        USED_ID.push(randomID);
    }*/
    return randomID;
}

/* SHOULD NOT BE NEEDED
function generateID(json){
    ID = Array.from(Array(json.length).keys()); //create a table full from 0 to json length
    ID = ID.filter(function (x) {
        return USED_ID.indexOf(x) < 0
    }) //remove IDs
}
*/
