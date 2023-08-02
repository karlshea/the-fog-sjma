var textBlock = "";

const fogFiller = [
    "------------------",
    "~~~~~~~~~",
    "~~~-----~~~~~",
    "........... ",
    "+++++",
    "----",
    "________",
    "______------",
    "------______",
    "+++++-------",
    "~~~~~~+++",
    " ",
    " ",
    " ",
    " "
];

const fogPhraseOne = [
    " As a barrier to military and capitalist progress. ",
    " As an obstacle to military and commercial advancement. ",
    " As disruptive to military and economic projects. "
];

const fogPhraseTwo = [
    " As a symbol of the fear of the unknown. ",
    " As a figure in horror narratives. ",
    " As an embodiment of uncertainty. "
];

const fogPhraseThree = [
    " As a positive model for trans embodiment. ",
    " As an aspirational figure for trans visibility. ",
    " As the relatable monster in an allegory of trans liberation. "
];

const fogWords = [
    " The Fog: ",
    " An artwork in three acts. ",
    " Exploring our relationship to fog: ",
    fogPhraseOne[getRandomInt(fogPhraseOne.length)],
    fogPhraseTwo[getRandomInt(fogPhraseTwo.length)],
    fogPhraseThree[getRandomInt(fogPhraseThree.length)]
];

window.onload = makeTextFog; 

function makeTextFog() {
    buildText();
    var fogP = document.createElement("p");
    fogP.style.padding = "5%";
    //fogP.style.paddingBottom = "10%";
    fogP.style.margin = 0;
    fogP.style.textAlign = "center";
    var fogText = document.createTextNode(textBlock);
    fogP.appendChild(fogText);
    var currentDiv = document.getElementById("div1");
    currentDiv.style.borderTopLeftRadius = getRandomInt(200)+"px";
    currentDiv.style.borderTopRightRadius = getRandomInt(200)+"px";
    currentDiv.style.borderBottomLeftRadius = getRandomInt(200)+"px";
    currentDiv.style.borderBottomRightRadius = getRandomInt(200)+"px";
    var parentDiv = document.getElementById("mc");
    currentDiv.appendChild(fogP);
    window.scrollTo(0,-100);
    console.log("done")
}

function buildText() {
    var textCounter = 0;
    while (textBlock.length <= 2500) {
        var cloudOrText = getRandomInt(20);
        console.log(cloudOrText);
        if (cloudOrText <=18) {
            textBlock = textBlock+fogFiller[getRandomInt(fogFiller.length)];
        } else {
            if ( textCounter < fogWords.length && textBlock.length > 500) {
                textBlock = textBlock+fogWords[textCounter];
                textCounter++;
            }
        }
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}