$(document).ready(function () {

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    draw();

});

var scaleX = 50; // 50 pixels for 1 order
var scaleY = 40; // 40 pixels for 1 minute
var h;

function draw() {
    var canvas = document.getElementById("canvas");
    if (null == canvas || !canvas.getContext) return;

    axes = {};
    ctx = canvas.getContext("2d");
    axes.x0 = .5 + .5 * canvas.width;  // x0 pixels from left to x=0
    axes.y0 = .5 + .5 * canvas.height; // y0 pixels from top to y=0
    axes.scaleX = scaleX;
    axes.scaleY = scaleY;
    axes.doNegativeX = true;
    h = ctx.canvas.height - 50;

    // paint axes
    showAxes();

    // paint legend
    showLegend();

    ctx.font = "bold 20px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "right";

    // numbers on x
    // for (var i = 300; i <= 1100; i += scaleX) {
    //     ctx.fillText(Math.round((i - 100) / scaleX), i, 430);
    // }
    // numbers on y
    // for (var i = 80; i <= 400; i += 80) {
    //     ctx.fillText(coolNumbersDots(i * scaleY), 90, 420 - i);
    // }

    addFunctions();
}

// paint axes
function showAxes() {
    var x0 = axes.x0, w = ctx.canvas.width;
    var y0 = axes.y0, h = ctx.canvas.height - 50;
    ctx.strokeStyle = "rgb(0,84,156)";
    ctx.fillStyle = "rgb(0,84,156)";
    ctx.lineWidth = 3;

    // X axis
    ctx.beginPath();
    ctx.moveTo(100, h + 2);
    ctx.lineTo(w - 20, h + 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(w - 10, h + 2);
    ctx.lineTo(w - 20, h - 8);
    ctx.lineTo(w - 20, h + 12);
    ctx.fill();

    // Y axis
    ctx.beginPath();
    ctx.moveTo(100, h + 5);
    ctx.lineTo(100, 10);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(100, 0);
    ctx.lineTo(90, 10);
    ctx.lineTo(110, 10);
    ctx.fill();
}

function showLegend() {
    ctx.fillStyle = "black";
    ctx.font = "bold 20px Arial";
    ctx.textAlign = "left";

    // red line
    ctx.beginPath();
    ctx.strokeStyle = "rgb(205,0,103)";
    ctx.moveTo(500, 30);
    ctx.lineTo(550, 30);
    ctx.stroke();

    // red text
    ctx.fillText("Tatsächliche Fertigungszeit", 560, 35);

    // blue line
    ctx.beginPath();
    ctx.strokeStyle = "rgb(0,84,156)";
    ctx.moveTo(500, 10);
    ctx.lineTo(550, 10);
    ctx.stroke();

    // blue text
    ctx.fillText("Geschätzte Fertigungszeit", 560, 15);

    // years
    ctx.textAlign = "right";
    ctx.fillText("Bestellungen", 1130, 390);

    ctx.textAlign = "left";
    ctx.fillText(" \u0394t in Minuten", 120, 20);
}

function addFunctions() {

    $.ajax({
        type: 'POST',
        url: '/digpopcorn/public/get-stats',
        data: {empty: null},
        success: function (data) {

            var x = 0;
            var ETAVals = [];
            var readyAtVals = [];
            var collectedAtVals = [];

            data.orders.forEach(function (order) {
                var orderedAt = timeToMinutes(order.ordered_at);

                var ETA = timeToMinutes(order.ETA);
                var readyAt = timeToMinutes(order.ready_at);
                var collectedAt = timeToMinutes(order.collected_at);

                ETAVals.push(ETA - orderedAt);
                readyAtVals.push(readyAt - orderedAt);
                collectedAtVals.push(collectedAt - orderedAt);

            });

            ctx.beginPath();
            ETAVals.forEach(function (ETAVal) {
                ctx.lineTo(x * scaleX + 100, h - ETAVal * scaleY);
                ctx.moveTo(x * scaleX + 100, h - ETAVal * scaleY);
                x++;
            });
            ctx.stroke();

            ctx.strokeStyle = "rgb(205,0,103)";
            ctx.fillStyle = "rgb(205,0,103)";

            x = 0;
            ctx.beginPath();
            readyAtVals.forEach(function (readyAtVal) {
                ctx.lineTo(x * scaleX + 100, h - readyAtVal * scaleY);
                ctx.moveTo(x * scaleX + 100, h - readyAtVal * scaleY);
                x++;
            });
            ctx.stroke();

            // ctx.strokeStyle = "rgb(3,201,28)";
            // ctx.fillStyle = "rgb(3,201,28)";
            //
            // x = 0;
            // ctx.beginPath();
            // collectedAtVals.forEach(function (collectedAtVal) {
            //     ctx.lineTo(x * scaleX + 100, h - collectedAtVal * scaleY);
            //     ctx.moveTo(x * scaleX + 100, h - collectedAtVal * scaleY);
            //     x++;
            // });
            // ctx.stroke();
        },
        error: function () {
            alert("Stats could not be fetched.");
        }
    });

}

function timeToMinutes(time) {
    return +time.split(".")[0] * 60 + +time.split(".")[1];
}