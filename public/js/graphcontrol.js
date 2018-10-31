var h;

var scaleX1 = 80; // 80 pixels for 1 order
var scaleY1 = 20; // 20 pixels for 1 minute
var scaleX2 = 24; // 24 pixels for 1 order
var scaleY2 = 14; // 14 pixels for 1 minute
var scaleX3 = 24; // 24 pixels for 1 order
var scaleY3 = 14; // 14 pixels for 1 minute
var scaleX4 = 28; // 28 pixels for 30 minutes
var scaleY4 = 23; // 23 pixels for 1 order

$(document).ready(function () {

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    draw('1');
    draw('2');
    draw('3');
    draw('4');

    function draw(canvasNumber) {
        var canvasID = 'canvas' + canvasNumber;
        var canvas = document.getElementById(canvasID);
        if (null == canvas || !canvas.getContext) return;

        var axes = {};
        var ctx = canvas.getContext("2d");
        axes.x0 = .5 + .5 * canvas.width;  // x0 pixels from left to x=0
        axes.y0 = .5 + .5 * canvas.height; // y0 pixels from top to y=0
        // axes.scaleX = scaleX;
        // axes.scaleY = scaleY;
        // axes.doNegativeX = true;

        // h = document.getElementById(canvasID).height - 50;

        // paint axes
        showAxes(ctx, axes);

        // paint legend
        showLegend(ctx, canvasNumber);

        // add functions
        switch (canvasNumber) {
            case '1':
                addFunctions1(ctx);
                break;
            case '2':
                addFunctions2(ctx);
                break;
            case '3':
                addFunctions3(ctx);
                break;
            case '4':
                addFunctions4(ctx);
                break;
        }

        // ctx.font = "bold 26px Arial";
        // ctx.fillStyle = "black";
        // ctx.textAlign = "right";

        // numbers on x
        // for (var i = 2 * scaleX1; i <= 1800; i += scaleX1) {
        //     ctx.fillText(i / scaleX1 - 1, i, 380);
        // }
        // numbers on y
        // for (var i = 80; i <= 400; i += 80) {
        //     ctx.fillText(coolNumbersDots(i * scaleY), 90, 420 - i);
        // }
    }

// paint axes
    function showAxes(ctx, axes) {

        var x0 = axes.x0, w = ctx.canvas.width;
        var y0 = axes.y0, h = ctx.canvas.height - 50;
        ctx.strokeStyle = "rgb(0,0,0)";
        ctx.fillStyle = "rgb(0,0,0)";
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

    function showLegend(ctx, canvasNumber) {

        h = ctx.canvas.height - 50;
        var temp;

        if (canvasNumber === '1') {
            temp = h + 50;
        } else {
            temp = h + 50;
        }


        ctx.fillStyle = "black";
        ctx.textAlign = "left";

        if (canvasNumber === '1') {
            ctx.font = "bold 20px Arial";

            // red line
            ctx.beginPath();
            ctx.strokeStyle = "rgb(205,0,103)";
            ctx.moveTo(1130, 50);
            ctx.lineTo(1180, 50);
            ctx.stroke();

            // red text
            ctx.fillText("Tatsächliche Fertigstellungszeit", 1200, 55);

            // blue line
            ctx.beginPath();
            ctx.strokeStyle = "rgb(0,84,156)";
            ctx.moveTo(1130, 30);
            ctx.lineTo(1180, 30);
            ctx.stroke();

            // blue text
            ctx.fillText("Prognostizierte Fertigstellungszeit", 1200, 35);

            // X mark
            ctx.textAlign = "right";
            ctx.font = "bold 20px Arial";
            ctx.fillText("Bestellungen", 1770, 340);

            // Y mark
            ctx.textAlign = "left";
            ctx.fillText(" \u0394t in Minuten", 120, 20);

            // numbers on x
            for (var i = scaleX1; i <= scaleX1 * 20; i += scaleX1) {
                ctx.fillText(i / scaleX1, i + 10, 380);
            }
            ctx.textAlign = "right";
            // numbers on y
            for (var i = 2 * scaleY1; i <= scaleY1 * 16; i += scaleY1) {
                if (i / scaleY1 % 2 == 1) {
                    ctx.fillText(i / scaleY1 - 1, 70, temp - 20 - i);
                }
            }

        } else {

            var xName = '';
            var yName = '';
            var redName = '';
            var blueName = '';

            switch (canvasNumber) {
                case '2':
                    ctx.textAlign = "left";
                    ctx.font = "bold 14px Arial";

                    // line
                    ctx.beginPath();
                    ctx.strokeStyle = "rgb(72, 130, 20)";
                    ctx.moveTo(290, 30);
                    ctx.lineTo(340, 30);
                    ctx.stroke();

                    // text
                    ctx.fillText('Zeit bis zur Abholung', 350, 35);

                    // X mark
                    ctx.textAlign = "right";
                    ctx.font = "bold 16px Arial";
                    ctx.fillText('Bestellungen', 570, 290);

                    // Y mark
                    ctx.textAlign = "left";
                    ctx.fillText(' \u0394t in Minuten', 120, 20);
                    // numbers on x
                    for (var i = scaleX2; i <= scaleX2 * 16; i += scaleX2) {
                        ctx.fillText(i / scaleX2, i + 70, 330);
                    }
                    ctx.textAlign = "right";
                    // numbers on y
                    for (var i = 2 * scaleY2; i <= scaleY2 * 21; i += scaleY2) {
                        if (i / scaleY2 % 2 == 1) {
                            ctx.fillText(i / scaleY2 - 1, 70, temp - 30 - i);
                        }
                    }
                    break;
                case '3':
                    ctx.textAlign = "left";
                    ctx.font = "bold 14px Arial";

                    // red line
                    ctx.beginPath();
                    ctx.strokeStyle = "rgb(0,0,205)";
                    ctx.moveTo(290, 30);
                    ctx.lineTo(340, 30);
                    ctx.stroke();

                    // red text
                    ctx.fillText('Abweichung zwischen tatsächlicher', 350, 35);
                    ctx.fillText(' und prognostizierter Fertigstellungszeit', 285, 55);

                    // X mark
                    ctx.textAlign = "right";
                    ctx.font = "bold 16px Arial";
                    ctx.fillText('Bestellungen', 570, 290);

                    // Y mark
                    ctx.textAlign = "left";
                    ctx.fillText(' \u0394t in Minuten', 120, 20);
                    // numbers on x
                    for (var i = scaleX3; i <= scaleX3 * 16; i += scaleX3) {
                        ctx.fillText(i / scaleX3, i + 70, 330);
                    }
                    ctx.textAlign = "right";
                    // numbers on y
                    for (var i = 2 * scaleY3; i <= scaleY3 * 21; i += scaleY3) {
                        if (i / scaleY3 % 2 == 1) {
                            ctx.fillText(i / scaleY3 - 1, 70, temp - 30 - i);
                        }
                    }
                    break;
                case '4':
                    ctx.textAlign = "right";
                    ctx.font = "bold 14px Arial";
                    // numbers on y
                    for (var i = 2 * scaleY4; i <= scaleY4 * 16; i += scaleY4) {
                        if (i / scaleY4 % 2 == 1) {
                            ctx.fillText(i / scaleY4 - 1, 70, temp - 20 - i);
                        }
                    }
                    ctx.textAlign = "left";
                    ctx.font = "bold 14px Arial";

                    // red line
                    ctx.beginPath();
                    ctx.strokeStyle = "rgb(255,0,0)";
                    ctx.moveTo(290, 30);
                    ctx.lineTo(340, 30);
                    ctx.stroke();

                    // red text
                    ctx.fillText('Anzahl Bestellungen je Zeiteinheit', 350, 35);

                    // X mark
                    ctx.textAlign = "right";
                    ctx.font = "bold 16px Arial";
                    ctx.fillText('t', 570, 290);

                    // Y mark
                    ctx.textAlign = "left";
                    ctx.fillText('Bestellungen', 120, 20);
                    break;
            }
        }
    }

    function addFunctions1(ctx) {

        $.ajax({
            type: 'POST',
            url: '/digpopcorn/public/get-stats',
            data: {canvasNumber: 1},
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
                    ctx.lineTo(x * scaleX1 + 100, 350 - ETAVal * scaleY1);
                    ctx.moveTo(x * scaleX1 + 100, 350 - ETAVal * scaleY1);
                    ctx.arc(x * scaleX1 + 100, 350 - ETAVal * scaleY1, 3, 0, Math.PI * 2, true);
                    x++;
                });
                ctx.stroke();

                ctx.strokeStyle = "rgb(205,0,103)";
                ctx.fillStyle = "rgb(205,0,103)";

                x = 0;
                ctx.beginPath();
                readyAtVals.forEach(function (readyAtVal) {
                    ctx.lineTo(x * scaleX1 + 100, 350 - readyAtVal * scaleY1);
                    ctx.moveTo(x * scaleX1 + 100, 350 - readyAtVal * scaleY1);
                    ctx.arc(x * scaleX1 + 100, 350 - readyAtVal * scaleY1, 3, 0, Math.PI * 2, true);
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
                alert("Stats could not be fetched1.");
            }
        });

    }

    function addFunctions2(ctx) {

        $.ajax({
            type: 'POST',
            url: '/digpopcorn/public/get-stats',
            data: {canvasNumber: 2},
            success: function (data) {
                var x = 0;
                var collectedAtVals = [];

                data.orders.forEach(function (order) {
                    var orderedAt = timeToMinutes(order.ordered_at);

                    var collectedAt = timeToMinutes(order.collected_at);

                    collectedAtVals.push(collectedAt - orderedAt);

                });

                ctx.strokeStyle = "rgb(72, 130, 20)";
                // ctx.fillStyle = "rgb(3,201,28)";

                x = 0;
                ctx.beginPath();
                collectedAtVals.forEach(function (collectedAtVal) {
                    ctx.lineTo(x * scaleX2 + 100, h - collectedAtVal * scaleY2);
                    ctx.moveTo(x * scaleX2 + 100, h - collectedAtVal * scaleY2);
                    ctx.arc(x * scaleX2 + 100, h - collectedAtVal * scaleY2, 3, 0, Math.PI * 2, true);
                    x++;
                });
                ctx.stroke();
            },
            error: function () {
                alert("Stats could not be fetched2.");
            }
        });

    }

    function addFunctions3(ctx) {

        $.ajax({
            type: 'POST',
            url: '/digpopcorn/public/get-stats',
            data: {canvasNumber: 3},
            success: function (data) {

                var x = 0;
                var diffVals = [];

                data.orders.forEach(function (order) {
                    var ETA = timeToMinutes(order.ETA);
                    var readyAt = timeToMinutes(order.ready_at);

                    diffVals.push(Math.abs(ETA - readyAt));

                });

                ctx.strokeStyle = "rgb(0,0,205)";

                ctx.beginPath();

                diffVals.forEach(function (diffVal) {
                    ctx.lineTo(x * scaleX3 + 100, h - diffVal * scaleY3);
                    ctx.moveTo(x * scaleX3 + 100, h - diffVal * scaleY3);
                    ctx.arc(x * scaleX3 + 100, h - diffVal * scaleY3, 3, 0, Math.PI * 2, true);
                    x++;
                });

                ctx.stroke();

            },
            error: function () {
                alert("Stats could not be fetched3.");
            }
        });

    }

    function addFunctions4(ctx) {

        h = ctx.canvas.height - 50;

        $.ajax({
            type: 'POST',
            url: '/digpopcorn/public/get-stats',
            data: {canvasNumber: 4},
            success: function (data) {

                var now = timeToMinutes(data.now);

                ctx.beginPath();

                ctx.strokeStyle = "rgb(255,0,0)";
                // ctx.fillStyle = "rgb(205,0,103)";

                var idx = 0;
                for (var i = now - 480; i <= now; i += 30) {
                    var counter = 0;
                    data.orders.forEach(function (order) {
                        if (timeToMinutes(order.ordered_at) > i && timeToMinutes(order.ordered_at) < i + 30) {
                            counter++;
                        }
                    });
                    // X
                    if (idx % 4 == 0) {
                        ctx.fillText(minutesToTime(i), idx * scaleX4 + 80, 330);
                    }

                    ctx.lineTo(idx * scaleX4 + 100, h - counter * scaleY4);
                    ctx.moveTo(idx * scaleX4 + 100, h - counter * scaleY4);
                    ctx.arc(idx * scaleX4 + 100, h - counter * scaleY4, 3, 0, Math.PI * 2, true);

                    idx++;
                }

                ctx.stroke();
            },
            error: function () {
                alert("Stats could not be fetched4.");
            }
        });

    }

    function timeToMinutes(time) {
        return +time.split(":")[0] * 60 + +time.split(":")[1];
    }

    function minutesToTime(minutes) {
        var x = Math.floor(minutes / 60);
        var y = minutes % 60;
        if (x < 10) {
            x = '0' + x;
        }
        if (y < 10) {
            y = '0' + y;
        }
        return x + ':' + y;
    }

});