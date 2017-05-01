
$(function () {
    window.paused = false;
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
    $(".cust-quotes blockquote p").css("color", random_color);
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

var $quotesWrapper = null;
function initQuoteCarousel() {
    $quotesWrapper = $(".cust-quotes");
    var $quotes = $quotesWrapper.find("blockquote");
    if (!$quotes.length)
        throw new Error("No quote text!");

    //Prepare for resizing fonts
    window.paddingHeight = 320
    window.winWidth = $(window).width()
    window.winHeight = $(window).height() - window.paddingHeight
    console.log("window", window.winWidth + "x" + window.winHeight);

    selectNextQuote();
};

var selectNextQuote = function () {
    $quotesWrapper.find("blockquote:first").detach().appendTo($quotesWrapper);
    let $quote = $quotesWrapper.find("blockquote:first")
    //fixText($quote);
    fitFontToCoverHeight($quote.find("p:first"), window.innerHeight);
    $quote.css("color", randomizeColor());

    //next
    if (!window.paused)
        setTimeout(selectNextQuote, $quote.data("timeout"));
};

function fixText($quote) {

    let text = $quote.find("p:first"),
        color = randomizeColor();
    w = text.width() * 2,
        h = text.height(),
        txt = text.html(),
        charCount = txt.length,
        size = w / charCount,
        heightPerRow = 100,
        maxVH = 20,
        minVH = 5,
        rowVH = 5,
        rowCount = h / heightPerRow,
        diffVHBasedOnChars = maxVH - (charCount / 5),
        /*magic fontisze calculation */
        diffVH = maxVH - (rowCount * 1.4),
        fontVH = Math.max(minVH, Math.max(minVH, diffVH)),
        logColor = 'background: black; color:' + color,
        logMessage = '%c rowCount:' + rowCount + ', WxH:' + w + 'x' + h + ', fontVH ' + fontVH + ', charCount:' + charCount + ' color: ' + color;
    text.css('font-size', fontVH + 'vh');
    console.log(logMessage, logColor);
}

function fitFontToCoverHeight($text, desiredHeight) {
    var attempts = 0;
    while (attempts < 10) {
        var textHeight = $text.height();
        var fontSize = parseInt($text.css("fontSize") || 20);
        const diff = desiredHeight - textHeight;
        if (diff > 0 && diff <= 300) { //close enough
            return;
        }
        else if (diff > 0) { //bigger font
            fontSize *= Math.round(diff/100) ;
        }
        else if (diff < 0) { //smaller font
            fontSize *= 0.75;
        }
        $text.css("fontSize", fontSize + "px");
        attempts += 1;
    }


}
