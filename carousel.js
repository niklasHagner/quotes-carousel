
$(function () {
    window.paused = false;
    initQuoteCarousel();
});

// window.setInterval(function () {

// }, 5000);

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
    return window.paused;
};

function initQuoteCarousel() {
    var $quotesWrapper = $(".cust-quotes");
    var $quotes = $quotesWrapper.find("blockquote");
    if (!$quotes.length)
        throw new Error("No quote text!");

    //Prepare for resizing fonts
    window.paddingHeight = 320
    window.winWidth = $(window).width()
    window.winHeight = $(window).height() - window.paddingHeight
    console.log("window", window.winWidth + "x" + window.winHeight);

    $quotesWrapper.find("blockquote:first").detach().appendTo($quotesWrapper);
    let $quote = $quotesWrapper.find("blockquote:first")
    fixText($quote);

    var selectNextQuote = function () {
        $quotesWrapper.find("blockquote:first").detach().appendTo($quotesWrapper);
        let $quote = $quotesWrapper.find("blockquote:first")
        fixText($quote);

        //next
        if (!window.paused)
            setTimeout(selectNextQuote, $quote.data("timeout"));
    };
    setTimeout(selectNextQuote, $quotes.filter(":first").data("timeout"));
};

function fixText($quote) {

    let para = $quote.find("p:first"),
        color = randomizeColor();
        w = para.width() * 2,
        h = para.height(),
        txt = para.html(),
        charCount = txt.length,
        size = w / charCount,
        heightPerRow = 100,
        maxVH = 20,
        minVH = 5,
        rowVH = 5,
        rowCount = h / heightPerRow,
        diffVHBasedOnChars = maxVH - (charCount / 5),
        /*magic fontisze calculation */
        diffVH = maxVH - (rowCount*1.4),
        fontVH = Math.max(minVH, Math.max(minVH, diffVH)),
        logColor = 'background: black; color:' + color,
        logMessage = '%c rowCount:' + rowCount + ', WxH:' + w + 'x' + h + ', fontVH ' + fontVH + ', charCount:' + charCount + ' color: ' + color;
    para.css('font-size', fontVH + 'vh');
    console.log(logMessage, logColor);
}

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
