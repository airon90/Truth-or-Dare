/*!

    Truth Or Dare v1.0 - 2017
    -------------------------

    The JSON file for the truth or dare should be like:
        id - The unique id of the truth or dare should be following starting at 0 (depreciated, with indexing function)
        type - The type is either "Truth" or "Dare"
        level - From 0 to 5, 0 - disgusting, 1 - stupid, 2 - normal, 3 - soft, 4 - sexy, 5 - hot
        summary - The explaination of the truth or the dare to do
        time - The time set in seconds for the timer
        turns - The number of turn the dare stays
        
*/

/**
    ----------------------------------------------------------
                        Variables
    ----------------------------------------------------------
*/
var SOURCE = "output.json"; //with both truth and dare
//var PATH = location.pathname.substring(0, location.pathname.lastIndexOf('/') + 1); //Local path to the file
var PATH = "";
var LOCALHOST = location.protocol + "//" + location.hostname + (location.port ? ":" + location.port : "") + "/src/"; //For when on a webserver
var turn = 0;
var idAvailable = [];
var index = [[], [], [], [], [], []];
var turnPerStage = 15;
var inputjson, gameType, stages;

var DARE = {
    name: "Dare",
    id: []
};
var TRUTH = {
    name: "Truth",
    id: []
};
var original = {
    name: "original",
    levels: [2, 3, 4, 5], //level available for the game, levels 0, 1 and 2 share the same probability
    //weight: [0.4, 0.4, 0.2, 0], s
    weight: [
        [0.4, 0.4, 0.2, 0],
        [0.35, 0.4, 0.2, 0.05],
        [0.1, 0.25, 0.4, 0.25],
        [0, 0.1, 0.3, 0.6]
    ], //Associated weight of the level to arrive, chance of each getting selected
    stageDare: [
        ["At every game's stages, there will be a <i>sexy</i> special dare for all players"],
        ["Withdraw one of your cloth"],
        ["Keep just your undies on"],
        ["All players must undress"]
    ]
};
var soft = {
    name: "soft",
    levels: [2, 3],
    weight: [
        [0.9, 0.1],
        [0.8, 0.2],
        [0.7, 0.3],
        [0.6, 0.4]
    ],
    stageDare: []
};
var sexy = {
    name: "sexy",
    levels: [3, 4, 5],
    weight: [
        [0.7, 0.3, 0],
        [0.5, 0.4, 0.1],
        [0.25, 0.5, 0.25],
        [0.1, 0.3, 0.6]
    ],
    stageDare: original.stageDare
};
var custom = {
    name: "custom",
    levels: [],
    weight: [],
    stageDare: []
};

/**
    ----------------------------------------------------------
                        Update the view
    ----------------------------------------------------------
*/

function playSound(ms){
    /* play the "buzzer sound twice */
    var buzzer = $("#buzzer")[0];

    setTimeout(function () {
        buzzer.currentTime = 0;
        buzzer.play();
    }, ms);

}

function timer(seconds) {
    /* Animate the bootstrap progress bar to reach 100% in a time in ms set */
    "use strict";

    var milliseconds = seconds * 1000;

    $(".progress-bar").stop();
    $(".progress-bar").animate({
        width: "0%"
    }, 100);
    $(".progress-bar").animate({
        width: "100%"
    }, milliseconds);
    
    playSound(milliseconds);

}

function addStageAlert(stage) {
    /* Create a sweet alert with the stage message */
    if (gameType.stageDare[stage] !== []) {
        swal({
            title: "<div style='color:#AD4080'><span class='glyphicon glyphicon-fire'></span> Special dare!</div>",
            text: "<div style='color:#985E80'>" + gameType.stageDare[stage] + "</div>",
            html: true
        });
    }

}

function addMoreView() {
    /* Make the html to load the file visible in the page */
    $("#settings-placeholder").toggle();
    $("#input").val(turnPerStage);
}

function showFilesDetails(files) {
    /* List some properties of the uploaded file to show that it has been uploaded */
    var output = [];

    for (var i = 0, f = files[i]; i < files.length; i++) {
        output.push("<li><strong>", escape(f.name), "</strong> (", f.type || "n/a", ") - ",
            f.size, " bytes, last modified: ",
            f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : "n/a",
            "</li>");
    }
    $("#list").html("<ul>" + output.join("") + "</ul>");
}


function clearLabel() {
    /* Remove the label from the label section */

    $("#labels").html("");

}

function addLabel(style, name) {
    /* This will add labels in the view the bootStrapType is to make the CSS  */

    $("#labels").append("<span class='label label-" + style + "'>" + name + "</span></br>");

}

function addLevelLabel(level) {
    /* Add a label based on the level of the truth or dare question */
    var style, name;
    switch (level) {
        case "0":
            name = "disgusting";
            style = "success";
            break;
        case "1":
            name = "stupid";
            style = "info";
            break;
        case "2":
            name = "normal";
            style = "default";
            break;
        case "3":
            name = "soft";
            style = "warning";
            break;
        case "4":
            name = "sexy";
            style = "danger";
            break;
        case "5":
            name = "hot";
            style = "pink";
            break;
        default:
            return;
    }
    addLabel(style, name);
}

function updateLabels(object) {
    /* Upadte label based on the value of the object, a json[id] */

    if (object["time"] !== "") {
        addLabel("default", "timer");
        timer(object["time"]);

    }
    if (object["turns"] !== "") {
        addLabel("default", "turns");
    }

    addLevelLabel(object["level"]);
}

function updateView(id, type, stage) {
    /* Update the view when clicking on a Truth/Random/Dare button */
    var item = inputjson[id];

    clearLabel();
    addLabel("primary", type);
    $("#type-action").text(type + ": ");

    if (id >= 0) {
        updateLabels(item);

        $("#text-action").text(item.summary);

    } else {
        $("#text-action").text("You've completed all the " + type);
    }

    $("#turn").text(turn);
    if (turn - 1 === stages[stage]) {
        addStageAlert(stage);
    }

    $("#alert-placeholder").hide();
}

function checkRadioBox(id, check) {
    $("#" + id).prop("checked", check);
}

function setCheckBox(min, max, check) {
    var realID, i;

    for (i = min; i <= max; i++) {
        realID = "#check" + i;
        $(realID).prop("checked", check);
    }
}


/** 
    ----------------------------------------------------------
                            Game logic
    ----------------------------------------------------------
*/

function indexing(json) {
    /* To be called when loading the json to index truths and dares IDs */
    var i, item;

    for (i = 0; i < json.length; i++) {
        item = json[i];

        index[item.level].push(i);

        if (item.type === TRUTH.name) {
            TRUTH.id.push(i);
        } else if (item.type === DARE.name) {
            DARE.id.push(i);
        }

    }

    idAvailable = TRUTH.id.concat(DARE.id);
}

function setStages() {
    var v;
    stages = [];
    for (var i = 0; i < gameType.weight.length; i++) {
        v = i * turnPerStage;
        stages.push(v);
    }
}

function getStage() {
    /* Get the stage we're in based on the turn */
    var i = 0;

    while (i < stages.length - 1) {
        if (stages[i] >= turn) {
            return i;
        }
        i++;
    }

    return i;
}

function removeID(id) {
    /* Remove an id used from the available id*/
    var i;
    var findex = idAvailable.indexOf(id);

    //Remove the id from the availables
    if (findex > -1) {
        idAvailable.splice(findex, 1);
    }

    //Remove the id from the index (all possible)
    for (i = 0; i < index.length; i++) {
        findex = index[i].indexOf(id);
        if (findex > -1) {
            index[i].splice(findex, 1);
            break;
        }
    }
}

function getPossibilities(array, available) {
    /* Return the common value of the two arrays */
    var i, item;
    var result = [];

    for (i = 0; i < array.length; i++) {
        item = array[i];
        for (var j = 0; j < available.length; j++) {
            if (item === available[j]) {
                result.push(item);
            }
        }
    }

    return result;
}

function getRandomID(array) {
    /* Get a random id of the input array and removes it from index and idAvailable */
    var id = -1;
    var randomIndex;

    if (array.length > 0) {
        randomIndex = Math.floor(Math.random() * array.length);
        id = array[randomIndex];
        removeID(id);
    }

    return id;
}

function getFromIndex(level) {
    /* The level 0,1 and 2 share the same probability weight, else it's index[level] when called */
    var result = [];
    var possibilities = [];

    if (level === 2) {
        result = index[0].concat(index[1], index[2]);
    } else {
        result = index[level];
    }

    return result;
}

function getRandomArray(stage) {
    /* The wider the weight the higher the chance to get above the random number, levels are associated with weight in the gameType var */
    var weights = gameType.weight[stage];
    var random = Math.random(),
        sum = 0,
        findex = weights.length - 1;

    for (var i = 0; i < findex; ++i) {
        sum += weights[i];
        if (random < sum) {
            findex = i;
            break; //not necessary
        }
    }


    return getFromIndex(gameType.levels[findex]);

}

function choose(tod) {
    /* Apply the logic to get a random truth or dare based on the type, the array is the indexed list of truth or dare */
    var currentStage = getStage();
    var available = getRandomArray(currentStage);
    var possibilities = getPossibilities(tod.id, available);

    if (possibilities.length === 0) {
        possibilities = getPossibilities(tod.id, idAvailable);
    }

    turn++;
    updateView(getRandomID(possibilities), tod.name, currentStage);
}

/**
    ----------------------------------------------------------
                        UI Handling
    ----------------------------------------------------------
*/

function matchRadioMode(id) {
    /* Check the Checkbox based on the Checked radio button, modify the game based on the input */
    var min, max;

    switch (id) {
        case original.name:
            min = 0;
            max = 5;
            gameType = original;
            break;
        case soft.name:
            min = 0;
            max = 3;
            gameType = soft;
            break;
        case sexy.name:
            min = 3;
            max = 5;
            gameType = sexy;
            break;
        default:
            gameType = custom;
            return;
    }

    setStages(); //To match the stage with the current gameType
    setCheckBox(0, 5, false);
    setCheckBox(min, max, true);
}

function setNewIDAvailable() {
    /* The checkbox are in the same order (0 to 5) as the level (0 to 5), 
    so it checks if the checkbox are checked and store it in a array
    Then, it concats all of the selected level's question from index into one board in idAvailable */
    var clickedIndex = [],
        i;
    var checkID = "";
    custom.levels = [];

    for (i = 0; i <= 5; i++) {
        checkID = "#check" + i;
        if ($(checkID).prop("checked")) {
            clickedIndex.push(i);
        }
    }

    custom.levels = clickedIndex;

    for (i = 0; i < clickedIndex.length; i++) {
        idAvailable.concat(index[clickedIndex[i]]);
    }
}

function truth() {
    /* Choose a truth in the available id */
    "use strict";
    choose(TRUTH);
}

function dare() {
    /* choose a dare in the available id */
    "use strict";
    choose(DARE);
}

function random() {
    /* Choose a truth or a Dare randomly*/
    "use strict";
    if (Math.round(Math.random())) {
        truth();
    } else {
        dare();
    }
}

$(document).ready(function () {
    /* Adds listeners when game is ready */
    $(".checkbox").change(function () {
        checkRadioBox(custom.name, true); //Go Custom when a checkbox is ticked
        setNewIDAvailable();
    });

    $(".funkyradio").find("[type='radio']").change(function () {
        // "this" will contain a reference to the changed radiobox   
        if (this.checked) {
            matchRadioMode(this.id);
        }
    });
    $("input[type='number']").change(function () {
        turnPerStage = parseInt($("#input").val());
        setStages();

    });

});

/**
    ----------------------------------------------------------
                    JSON source file Handler
    ----------------------------------------------------------
*/

function loadJSONfromfile(file) {
    /* Index and store the json in inputjson */
    var reader = new FileReader();

    // Closure to capture the file information.
    reader.onload = (function (theFile) {
        return function (e) {
            try {
                inputjson = JSON.parse(e.target.result);
                indexing(inputjson);
            } catch (err) {
                swal("Error", "Error when trying to parse json : " + err, "error");
            }
        };
    }(file));

    try {
        reader.readAsText(file);
        swal("Success!", "File has been successfully loaded", "success");
    } catch (err) {
        /* If you click on cancel while loading an input file it can break */
        swal("Error", err, "error");
    }
}

function handleFileSelect(evt) {
    /* The first file loaded is considered as the .json file in case of multiple input,  */
    var files = evt.target.files; // FileList object

    showFilesDetails(files);
    loadJSONfromfile(files[0]);
}

function localfileEnabling() {
    /* Check if the File API is supported and change the html to load a file in settings*/
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        addMoreView();
        $("#files").bind("change", handleFileSelect);
    } else {
        swal("No Luck!", "The File APIs are not fully supported in this browser.", "error");
    }
}

function getJSON(source) {
    $.getJSON(source, function (json) {
        indexing(json);
        inputjson = json;
    }).fail(function () {
        swal("Error", "The file at " + source + " couldn't be loaded. Try uploading it in settings", "error");
        localfileEnabling();
    });
}

function loadJSON(source) {
    $.get(LOCALHOST + source)
        .done(function () {
            getJSON(LOCALHOST + source);
        }).fail(function () {
            getJSON(PATH + source);
        });
}

window.onload = function () {
    /* to load the json and do the indexing when the window is loading */
    timer(1);
    matchRadioMode(original.name);
    loadJSON(SOURCE);
};
