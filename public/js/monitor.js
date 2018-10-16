$(document).ready(function () {

    var currentPage = window.location.pathname.split("/").pop();

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    var interval = 5000;  // 1000 = 1 second

    function checkOrders() {
        $.ajax({
            type: 'POST',
            url: '/digpopcorn/public/dashboard',
            success: function (data) {
                $("#dashboardTable tr").remove();

                if (data.orders.length < 1) {
                    $('#dashboardTable tbody').append('<tr class="row100 body"><td colspan="5"><h5>Keine neue Bestellungen</h5></td></tr>');
                } else {
                    data.orders.forEach(function (order) {
                        $('#dashboardTable tbody').append('<tr class="row100 body"><td class="cell100 column1">#' + order.id + '</td><td class="cell100 column2">' + initials(order.name) + '</td><td class="cell100 column3">' + germanStatus(order.status) + '</td><td class="cell100 column4">' + order.ETA + ' Uhr</td></tr>');
                    });
                }
            },
            error: function () {
                // alert("Please refresh the page.");
            }
        });
    }

    setInterval(checkOrders, interval);

    function initials(names) {
        var initials = "";
        names.split(" ").forEach(function (name) {
            initials += name.charAt(0) + ". ";
        });
        return initials;
    }

    function germanStatus(status) {
        switch (status) {
            case "IN PROGRESS":
                return "Bestellt";
            case "READY TO COLLECT":
                return "Fertig zur Abholung";
            case "RECEIVED":
                return "Abgeholt";
            default:
                return "Unknown status.";
        }
    }


});
