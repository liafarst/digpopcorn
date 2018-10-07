@extends('layouts.main')

@section('content')

    @include('inc.stepper')

    <div class="container my-5" style="max-width:600px;">

        <!-- First Step -->
        <div class="row" id="step-1">
            <div class="col-md-12">
                <h3 class="font-weight-bold pl-0 my-4"><strong>Bestellung</strong></h3>
                <div id="errorAlert" class="alert alert-danger d-none" role="alert">
                    Bitte fühlen Sie alle Felder.
                </div>
                <div class="input-group my-3">
                    <div class="input-group-prepend">
                        <button id="countryCode" class="btn btn-outline-primary dropdown-toggle" type="button"
                                data-toggle="dropdown"
                                aria-haspopup="true" aria-expanded="false">+49
                        </button>
                        <div class="dropdown-menu">
                            <a class="dropdown-item country-code" id="Germany" value="+49" style="cursor:pointer">
                                <img src="{{ URL::asset('images/Germany.jpg') }}" alt="" style="width:30px">
                                +49 Germany
                            </a>
                            <a class="dropdown-item country-code" id="UK" value="+44" style="cursor:pointer">
                                <img src="{{ URL::asset('images/United Kingdom.png') }}" alt="" style="width:30px">
                                +44 United Kingdom
                            </a>
                            <a class="dropdown-item country-code" id="France" value="+33" style="cursor:pointer">
                                <img src="{{ URL::asset('images/France.png') }}" alt="" style="width:30px">
                                +33 France
                            </a>
                            <a class="dropdown-item country-code" id="Belgium" value="+32" style="cursor:pointer">
                                <img src="{{ URL::asset('images/Belgium.png') }}" alt="" style="width:30px">
                                +32 Belgium
                            </a>
                            <a class="dropdown-item country-code" id="Netherlands" value="+31"
                               style="cursor:pointer">
                                <img src="{{ URL::asset('images/Netherlands.png') }}" alt="" style="width:30px">
                                +31 Netherlands
                            </a>
                            <a class="dropdown-item country-code" id="USA" value="+1" style="cursor:pointer">
                                <img src="{{ URL::asset('images/USA.png') }}" alt="" style="width:30px">
                                +1 USA
                            </a>
                            <div role="separator" class="dropdown-divider"></div>
                            <h3 class="dropdown-header">Andere</h3>
                            <div class="container">
                                <div class="row">
                                    <input id="other" class="my-2 form-control" type="text" placeholder="Ländercode" style="width:50px">
                                </div>
                            </div>
                        </div>
                    </div>
                    <input type="number" id="phoneNumber" class="form-control" placeholder="Telefonnummer"
                           required="required">
                </div>
                <div class="input-group my-3">
                    <input type="text" id="name" class="form-control" placeholder="Name" required="required">
                </div>
                <div class="input-group my-3">
                    <input type="email" id="email" class="form-control" placeholder="Email" required="required">
                </div>
                <div class="input-group my-3">
                    <input type="text" id="company" class="form-control" placeholder="Unternehmen"
                           required="required">
                </div>

                <label class="custom-control custom-checkbox mb-2 mr-sm-2 mb-sm-0">
                    <input id="processData" type="checkbox" class="custom-control-input" required="required">
                    <span class="custom-control-indicator"></span>
                    <span class="custom-control-description">Ich stimme zu, dass meine persönlichen Daten verarbeitet werden</span>
                </label>
                <button id="makeOffer" class="btn btn-primary btn-rounded float-right my-3" type="button">Popcorn bestellen</button>
            </div>
        </div>

        <!-- Second Step -->
        <div class="row d-none" id="step-2">
            <div class="col-md-12">
                <h3 class="font-weight-bold pl-0 my-4"><strong>Abholung</strong></h3>
                <h1>ETA: 2 Minuten</h1>
                <img src="{{ URL::asset('images/map.png') }}" alt="" style="width:400px">
                <div class="d-inline-block ml-3" style="vertical-align:top;">
                    <h2>Stände</h2>
                    <ul>
                        <li>5: USU</li>
                        <li>23: LogObject</li>
                        <li>38: TOP Mehrwert</li>
                    </ul>
                </div>
                <br>
            </div>
        </div>

        <!-- Third Step -->
        <div class="row d-none" id="step-3">
            <div class="col-md-12">
                <h3 class="font-weight-bold pl-0 my-4"><strong>Feedback</strong></h3>
            </div>
        </div>

    </div>
@endsection
