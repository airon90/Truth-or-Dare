var USED_ID = [];
var ID = [];
var TURN = 0;
var CHOICE = "Dare";
var myJson;

function timer(milliseconds) {
    $(".progress-bar").animate({
        width: "100%"
    }, milliseconds);
}

timer(2000);

/* Truth or Dare functions */
function truth() {
    'use strict';
    CHOICE = "Truth";
    console.log(localStorage.getItem("ID"));
    getFromJSON("/script/output.json");
    console.log(localStorage.getItem("ID"));
}

function random() {
    'use strict';
}

function dare() {
    'use strict';
    CHOICE = "Dare";
    getFromJSON("/script/output.json");
    console.log("id " + ID);
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


//Load JSON with JQuery
$.getJSON("/script/output.json", function (json) {
    $("#type-action").text(json[0].type + ": ");
    $("#text-action").text(json[0].summary);
    localStorage.setItem("ID", json[0].id);
    console.log(localStorage.getItem("ID"));

});

localStorage.setItem("ID", "test");
console.log(localStorage.getItem("ID"));

//Make sure global storage works

if (typeof (Storage) !== "undefined") {
    // Code for localStorage/sessionStorage.
} else {
    // Sorry! No Web Storage support..
    alert("The app won’t work. Your browser does not support HTML5, please try with another one");
}

function myFunction() {
    var str = "0,1,2,3,4,5,6";
    var res = str.split(",");
    var test = res.toString();
    document.getElementById("demo").innerHTML = res[2] + " " + "'" + test + "'";
}



function getFromJSON(source) {
    $.getJSON(source, function (json) {

        var c = -1;

        ID.push(1);
        $("#type-action").text(CHOICE + ": ");
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

function generateID(json) {
    ID = Array.from(Array(json.length).keys());
    ID = ID.filter(function (x) {
        return USED_ID.indexOf(x) < 0
    })
}

function getRandomID(jsonObj) {
    var randomID = -1;
    var temp = 0;
    generateID(jsonObj);

    if (ID.length > 0) {
        while (!(randomID in ID)) {
            temp++;
            if (temp > 10) {
                break;
            }
            randomID = ID[Math.floor(Math.random() * ID.length)];
        };
        USED_ID.push(randomID);
    }
    return randomID;
}
