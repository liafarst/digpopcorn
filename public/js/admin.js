$(document).ready(function () {

    var currentPage = window.location.pathname.split("/").pop();

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    $('#readyButton').on('click', readyButton);

    $('#collectedButton').on('click', collectedButton);

    $('#deleteButton').on('click', deleteButton);

    function readyButton() {
        var orderID = $(this).parent().parent().parent().children().first().text().split('#')[1];
        var action = "READY";
        sendMail(orderID);
        performAction(orderID, action);
    }

    function collectedButton() {
        var orderID = $(this).parent().parent().parent().children().first().text().split('#')[1];
        var action = "COLLECTED";
        performAction(orderID, action);
    }

    function deleteButton() {
        var orderID = $(this).parent().parent().parent().children().first().text().split('#')[1];
        var action = "DELETE";
        performAction(orderID, action);
    }

    var interval = 5000;  // 1000 = 1 second

    function checkOrders() {
        $.ajax({
            type: 'POST',
            url: '/digpopcorn/public/admin-area/check-orders',
            data: {currentPage: currentPage},
            success: function (data) {
                $("#ordersTable tr").remove();

                if (data.orders.length < 1) {
                    $('#ordersTable tbody').append('<tr class="row100 body"><td colspan="5"><h5>Keine Bestellungen</h5></td></tr>');
                } else {

                    // buttons
                    switch (currentPage) {
                        case "new-orders":
                            var buttons = '<div class="btn-group" role="group" aria-label="Basic example"><button id="readyButton" class="btn btn-success">Fertig</button><button id="deleteButton" class="btn btn-danger">Löschen</button></div>';
                            break;
                        case "ready-orders":
                            var buttons = '<div class="btn-group" role="group" aria-label="Basic example"><button id="collectedButton" class="btn btn-success">Abgeholt</button><button id="deleteButton" class="btn btn-danger">Löschen</button></div>';
                            break;
                        case "received-orders":
                            var buttons = "";
                            break;
                    }

                    // change table
                    data.orders.forEach(function (order) {

                        var updatedAt = "-";
                        if (currentPage == "received-orders") {
                            updatedAt = order.updated_at;
                            updatedAt = getHours(updatedAt) + ":" + getMinutes(updatedAt);
                        }

                        if (currentPage != "received-orders") {
                            $('#ordersTable tbody').append('<tr class="row100 body"><td class="cell100 column1">#' + order.id + '</td><td class="cell100 column2">' + order.name + '</td><td class="cell100 column3">' + order.phone_number + '</td><td class="cell100 column4">' + order.company + '</td><td class="cell100 column5">' + getHours(order.created_at) + ":" + getMinutes(order.created_at) + '</td><td class="cell100 column6">' + updatedAt + '</td><td class="cell100 column7">' + buttons + '</td></tr>');
                        } else {
                            $('#ordersTable tbody').append('<tr class="row100 body"><td class="cell100 column1">#' + order.id + '</td><td class="cell100 column2">' + order.name + '</td><td class="cell100 column3">' + order.phone_number + '</td><td class="cell100 column4">' + order.company + '</td><td class="cell100 column5">' + getHours(order.created_at) + ":" + getMinutes(order.created_at) + '</td><td class="cell100 column6">' + updatedAt + '</td></tr>');
                        }
                        $('#readyButton').on('click', readyButton);
                        $('#collectedButton').on('click', collectedButton);
                        $('#deleteButton').on('click', deleteButton);
                    });
                }
            },
            error: function () {
                // alert("Please refresh the page.");
            }
        });
    }

    setInterval(checkOrders, interval);

    function sendMail(orderID) {

        $.ajax({
            type: 'POST',
            url: '/digpopcorn/public/admin-area/send-mail',
            data: {orderID: orderID},
            success: function () {
                // alert("Email sent.");
            },
            error: function () {
                // alert("Action could not be performed.");
            }
        });

    }


    function performAction(orderID, action) {

        $.ajax({
            type: 'POST',
            url: '/digpopcorn/public/admin-area/change-order',
            data: {orderID: orderID, action: action},
            success: function (data) {
                if (data.message) {
                    checkOrders();
                } else {
                    alert("Something went wrong.");
                }
            },
            error: function () {
                alert("Action could not be performed.");
            }
        });
    }

    function getHours(timestamp) {
        return timestamp.split(" ")[1].split(":")[0];
    }

    function getMinutes(timestamp) {
        return timestamp.split(" ")[1].split(":")[1];
    }


});