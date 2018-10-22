$(document).ready(function () {

    var orderedMinutes = $('#timeOrdered').attr('time');
    var ETAMinutes = $('#timeETA').attr('time');
    var readyMinutes = $('#timeReady').attr('time');
    var collectedMinutes = $('#timeCollected').attr('time');

    var totalMinutes = collectedMinutes - orderedMinutes;

    if(totalMinutes == 0){
        totalMinutes = 1;
    }

    adjustSpans(ETAMinutes, readyMinutes, totalMinutes);

    $('#makeOffer').on('click', function () {
        var countryCode = $('#countryCode').text();
        var phoneNumber = $('#phoneNumber').val();
        var name = $('#name').val();
        var email = $('#email').val();
        var company = $('#company').val();
        var processData = $('#processData').is(":checked");

        if (!countryCode || !phoneNumber || !name || !email || !company || !processData) {
            $('#errorAlert').removeClass('d-none');
        } else {
            var number = countryCode + "" + phoneNumber;
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });
            $.ajax({
                type: 'POST',
                url: '/digpopcorn/public/make-order',
                data: {number: number, name: name, email: email, company: company},
                success: function (data) {
                    $('#ETA').text(data.order.ETA);
                    $('#step-1').addClass('d-none');
                    $('#step-1-Button').removeClass('btn-primary');
                    $('#step-1-Button').addClass('btn-info');
                    $('#step-2').removeClass('d-none');
                    $('#step-2-Button').removeClass('btn-info');
                    $('#step-2-Button').addClass('btn-primary');
                },
                error: function () {
                    alert("Ihre Bestellung wurde nicht registriert. Bitte versuchen Sie nochmal.");
                }
            });
        }
    });

    $('.country-code').on('click', function () {
        $('#countryCode').text($(this).attr('value'));
    });

    $('#other').on('input', function () {
        $('#countryCode').text($(this).val());
    });

    $(window).resize(function () {
        adjustSpans(ETAMinutes, readyMinutes, totalMinutes);
    });

});

function adjustSpans(ETAMinutes, readyMinutes, totalMinutes) {
    var ETALeft = ETAMinutes * $('#progress-container').width() / totalMinutes;
    var readyLeft = readyMinutes * $('#progress-container').width() / totalMinutes;

    if (ETALeft <= 80) {
        ETALeft += 80;
    }

    if (readyLeft <= 80) {
        readyLeft += 80;
    }

    if (ETALeft >= $('#progress-container').width()) {
        ETALeft -= 120;
    }

    if (readyLeft >= $('#progress-container').width()) {
        readyLeft -= 120;
    }

    if (Math.abs(ETALeft - readyLeft) < 80) {
        if (ETALeft > readyLeft) {
            ETALeft += 40;
            readyLeft -= 40;
        } else {
            ETALeft -= 40;
            readyLeft += 40;
        }
    }

    $('#timeETA').css("left", ETALeft + 'px');
    $('#timeReady').css("left", readyLeft + 'px');

    $('#timeETANumber').css("left", ETALeft - 10 + 'px');
    $('#timeReadyNumber').css("left", readyLeft - 10 + 'px');
}
