var textBlock = "";

const fogFillerA1 = [
    "----",
    "~~~~",
    "~~~---~~",
    "..... ",
    "+++",
    "--",
    "_____",
    "___----",
    "---_____",
    "++++---",
    "~~~~+++",
    " ",
    " "
];

const fogWords1A1 = [
    " During WWII, allied forces developed a system called Fog Investigation and Dispersal Operation or FIDO to disperse fog on military runways through the use of walls of flame. ",
    " While technically effective at briefly clearing fog, the system was impractical as it used vast quantities of fuel and was discontinued after the war. "
];

const fogWords2A1 = [
    " From foghorns to the “fog of war” to military efforts to disperse fog, the phenomenon has long been at odds with militaristic and capitalistic ideas of progress and control. ",
    " In obscuring coasts, roads, and runways, fog denies us the situational awareness upon which so much of contemporary life is built. ",
    " In its denial of ocular slight, fog highlights the value we place on seeing as knowing and opens up space to consider who gets to see and to what ends do they use that sight? "
]

window.onload = makeTextFog; 

function makeTextFog1() {
    buildText();
    var fogP = document.createElement("p");
    fogP.style.padding = "5%";
    //fogP.style.paddingBottom = "10%";
    fogP.style.margin = 0;
    fogP.style.textAlign = "center";
    var fogText = document.createTextNode(textBlock);
    fogP.appendChild(fogText);
    var currentDiv = document.getElementById("a1-th");
    currentDiv.style.height = "auto";
    var parentDiv = document.getElementById("a1-c");
    currentDiv.appendChild(fogP);
    window.scrollTo(0,-100);
    console.log("done")
}

function buildText1() {
    var textCounter = 0;
    while (textBlock.length <= 750) {
        var cloudOrText = getRandomInt(20);
        console.log(cloudOrText);
        if (cloudOrText <=15) {
            textBlock = textBlock+fogFillera1[getRandomInt(fogFillera1.length)];
        } else {
            if ( textCounter < fogWords2a1.length && textBlock.length > 100) {
                textBlock = textBlock+fogWords2a1[textCounter];
                textCounter++;
            }
        }
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}