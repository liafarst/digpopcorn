$(document).ready(function () {

    $('#makeOffer').on('click', function (){
        var countryCode = $('#countryCode').text();
        var phoneNumber = $('#phoneNumber').val();
        var name = $('#name').val();
        var email = $('#email').val();
        var company = $('#company').val();
        var processData = $('#processData').is(":checked");

        if(!countryCode || !phoneNumber || !name || !email || !company || !processData){
            $('#errorAlert').removeClass('d-none');
        }else{
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

});
