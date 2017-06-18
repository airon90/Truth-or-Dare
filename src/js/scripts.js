/* Boot Strap Progress Bar */
//var bars = document.getElementsByClassName("progress-bar progress-success");
//bars[0].style.width = "50%";
//$(".progress-bar").css('width', '70%');
$(".progress-bar").animate({
    width: "100%"
}, 10000);

/* Truth or Dare functions */
function truth() {
    'use strict';
}

function random() {
    'use strict';
}

function dare() {
    'use strict';
}


//Load JSON with JQuery
$.getJSON("/script/output.json", function (json) {
    $("#text").text(json[0].type +": " + json[0].summary);
});
