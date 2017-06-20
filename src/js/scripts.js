var DARE_ID = [];
var TRUTH_ID = [];
var DARE = "Dare";
var TRUTH = "Truth";
var TURN = 0;
var CHOICE = "";
var TRUTH_SOURCE = "../script/output.json";
var DARE_SOURCE = "../script/output.json";


function timer(milliseconds) {
    /* Animate the bootstrap progress bar to reach 100% in a time in ms set */
    $(".progress-bar").animate({
        width: "100%"
    }, milliseconds);
}

timer(2000);

//Make sure global storage works
window.onload = function () {
    if (typeof (Storage) !== "undefined") {
        // Code for localStorage/sessionStorage.
        console.log("w Truth: " + TRUTH_ID + " Dare: " + DARE_ID);
        loadJSON(TRUTH_SOURCE);
    } else {
        // Sorry! No Web Storage support..
        alert("The app won’t work. Your browser does not support HTML5, please try with another one");
    }
}


/**
    Truth or Dare functions
*/
function truth() {
    'use strict';
    console.log("bt Truth: " + TRUTH_ID + " Dare: " + DARE_ID);
    getFromJSON(TRUTH_SOURCE, TRUTH);
    console.log("at Truth: " + TRUTH_ID + " Dare: " + DARE_ID);
}

function random() {
    'use strict';
}

function dare() {
    'use strict';
    CHOICE = "Dare";
    getFromJSON(DARE_SOURCE, DARE);
}


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
}

function setArrayLocal(name, array) {
    /* Transform the array into text to save it in localStorage */
    var text = array.toString();
    localStorage.setItem(name, text);
}

function getArrayLocal(name) {
    /* Take an a string in local storage and return the array parsed from it */
    var text = localStorage.getItem(name);
    return text.split(",");
}

function loadJSON(source) {
    /* Get the JSON file and do the logic to get a truth or dare from the JSON file based on the choice */
    $.getJSON(source, function (json) {
        indexing(json);
        console.log("Truth: " + TRUTH_ID + " Dare: " + DARE_ID);
    });
}


function isValid(type, id) {
    /* Check if the id is used and is the good type */
    var validator = getIDsFromType(type);
    
    if (id in validator) {
        return true;
    }
    return false
}

function getIDsFromType(type) {
    var arrayIDs = null;
    if (type === DARE) {
        arrayIDs = DARE_ID;
    } else if (type === TRUTH) {
        arrayIDs = TRUTH_ID;
    }

    return arrayIDs;
}

function setIDsfromType(type, arrayIDs) {
    if (type === DARE) {
        DARE_ID = arrayIDs;
    } else if (type === TRUTH) {
        TRUTH_ID = arrayIDs;
    }

}

function setUsedID(type, id) {
    var arrayIDs = getIDsFromType(type);
    var index = arrayIDs.indexOf(id);

    if (index > -1) {
        array.splice(index, 1);
    }

    setIDsfromType(type, arrayIDs);
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

        localStorage.setItem("ID", c);
        console.log(localStorage.getItem("ID"));
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


function generateID(json) {
    /* Depreciated */
    ID = Array.from(Array(json.length).keys()); //create a table full from 0 to json length
    ID = ID.filter(function (x) {
            return USED_ID.indexOf(x) < 0
        }) //remove IDs
}
