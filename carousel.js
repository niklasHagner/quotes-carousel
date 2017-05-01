
var $quotesWrapper = null;
var quotes = [];
const MARGIN = 230;

$(function () {
    window.paused = false;
    window.randomize = true;
    window.selectedQuoteIndexes = [];
    $quotesWrapper = $(".cust-quotes");
    quotes = $quotesWrapper.find("blockquote");
    initQuoteCarousel();
});

var colors = [
    'tomato',
    'steelblue',
    'lightsteelblue',
    'gold',
    'coral',
    'darksalmon',
    'lightgreen',
    'steelblue',
    'teal',
    '#eee',
    '#ff7900',
    'pink',
    'orange',
    'palevioletred',
    'mediumspringgreen',
    'bisque',
    'dodgerblue',
    'gold',
    'powderblue',
    'deepskyblue',
    'mediumseagreen',
    'lightblue',
    'papayawhip',
    'lightcoral',
    'chocolate',
    '#e6e8fa',
    'lightgreen'
];

function randomizeColor() {
    var random_color = colors[Math.floor(Math.random() * colors.length)];
    return random_color;
};

function pause() {
    window.paused = !window.paused;
    if (!window.paused) {
        initQuoteCarousel();
    }
    $(".btn-pause").toggleClass("active");
    return window.paused;
};

function randomize() {
    window.randomize = !window.randomize;
    $(".btn-randomize").toggleClass("active");
    return window.randomize;
};

function initQuoteCarousel() {

    var $quotes = $quotesWrapper.find("blockquote");
    if (!$quotes.length)
        throw new Error("No quote text!");

    selectNextQuote();
};

var selectNextQuote = function () {

    let selectedQuote = null;
    if (window.paused === false) {
        $("blockquote:first").remove();
        selectedQuote = window.randomize ? quotes[getRandomQuoteIndex(quotes)] : quotes[0];
        $(selectedQuote).insertBefore("blockquote:first");
        var desiredHeight = window.innerHeight - MARGIN;
        fitFontToCoverHeight($(selectedQuote).find("p:first"), desiredHeight);
        $(selectedQuote).find("p").css("color", randomizeColor());
        setTimeout(selectNextQuote, $(selectedQuote).data("timeout"));
    }
};

function getRandomQuoteIndex(quotes) {
    var max = quotes.length - 1,
        min = 0;
    var randomIndex = Math.floor(Math.random() * (max - min)) + min;
    window.selectedQuoteIndexes.push(randomIndex);
    return randomIndex;
}

function fitFontToCoverHeight($text, desiredHeight) {
    var attempts = 0;
    adaptFont($text, desiredHeight, attempts);
}

const MAX_ATTEMPTS = 10;
function adaptFont($text, desiredHeight, attempts) {
    attempts += 1;
    var textHeight = $text.height();
    var fontSize = parseInt($text.css("fontSize") || 20);
    const diff = textHeight - desiredHeight;
    const absoluteDiff = Math.abs(diff);
    if (absoluteDiff <= 50) { //fontsize is good enough
        return;
    }
    let fsChange = absoluteDiff * 0.05;
    fontSize = (diff < 0) ? fontSize + fsChange : fontSize - fsChange;
    $text.css("fontSize", fontSize + "px");
    if (attempts < MAX_ATTEMPTS) {
        setTimeout(() => adaptFont($text, desiredHeight, attempts), 20);
    }
}