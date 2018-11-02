@extends('layouts.monitor')

@section('content')
    <h2 class="text-center font-fir mt-2">Anzeige der Vorhersagegenauigkeit bei der Zeitberechnung</h2>
    <div class="mx-auto mt-3" style="width:1800px;height:400px;position:relative;border: 2px solid #0067a4;">
        <canvas id="canvas1" width="1800" height="400"></canvas>
    </div>
    <h4 class="text-center font-fir mt-2">Text text</h4>
    <div class="text-center">
        <div class="mx-auto mt-3 d-inline-block"
             style="width:600px;height:350px;position:relative;border: 2px solid #0067a4;">
            <canvas id="canvas2" width="600" height="350"></canvas>
        </div>

        <div class="mx-auto mt-3 d-inline-block"
             style="width:600px;height:350px;position:relative;border: 2px solid #0067a4;">
            <canvas id="canvas3" width="600" height="350"></canvas>
        </div>

        <div class="mx-auto mt-3 d-inline-block"
             style="width:600px;height:350px;position:relative;border: 2px solid #0067a4;">
            <canvas id="canvas4" width="600" height="350"></canvas>
        </div>
    </div>
@endsection

@section('includes')
    <script>
        setInterval(function () {
            window.location = 'http://localhost/digpopcorn/public/dashboard';
        }, 30000);
    </script>
@endsection
