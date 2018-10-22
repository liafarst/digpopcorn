@extends('layouts.main')

@section('content')

    @include('inc.stepper')

    <div class="container my-5">

        @if(!empty($order))

            @php
                $orderedMinutes = \App\Helpers\CustomHelpers::timeToMinutes($order->ordered_at);
                $ETAMinutes = \App\Helpers\CustomHelpers::timeToMinutes($order->ETA) - $orderedMinutes;
                $readyMinutes = \App\Helpers\CustomHelpers::timeToMinutes($order->ready_at) - $orderedMinutes;
                $collectedMinutes = \App\Helpers\CustomHelpers::timeToMinutes($order->collected_at);
            @endphp

            <form action="../send-feedback" method="POST">
                {!! csrf_field() !!}
                <input type="hidden" name="orderID" value="{{ $order->id }}">
                <div class="card rounded-0">
                    <div class="card-header p-0">
                        <div class="bg-fir text-white text-left py-2 pl-5">
                            <p class="m-0">1. Bestellt um {{ $order->ordered_at }} Uhr</p>
                            <p class="m-0">2. Geschätzte Fertigungszeit {{ $order->ETA }} Uhr</p>
                            <p class="m-0">3. Tatsächliche Fertigungszeit {{ $order->ready_at }} Uhr</p>
                            <p class="m-0">4. Abgeholt um {{ $order->collected_at }} Uhr</p>
                        </div>
                    </div>
                    <div class="card-body p-3">
                        <div id="progress-container">
                            <span id="timeOrdered" time="{{ $orderedMinutes }}" class="timeSpan" style="left:0">1</span>
                            <span id="timeETA" time="{{ $ETAMinutes }}" class="timeSpan">2</span>
                            <span id="timeReady" time="{{ $readyMinutes }}" class="timeSpan">3</span>
                            <span id="timeCollected" time="{{ $collectedMinutes }}" class="timeSpan"
                                  style="right:0">4</span>
                            <span id="timeOrderedNumber" class="timeSpanNumberOver" style="left:-10px">{{ $order->ordered_at }}
                                Uhr</span>
                            <span id="timeETANumber" class="timeSpanNumberUnder">{{ $order->ETA }} Uhr</span>
                            <span id="timeReadyNumber" class="timeSpanNumberUnder">{{ $order->ready_at }} Uhr</span>
                            <span id="timeCollectedNumber" class="timeSpanNumberOver" style="right:-10px">{{ $order->collected_at }}
                                Uhr</span>
                            <hr class="progress-line mx-auto">
                        </div>
                        <h3>Ihr Feedback</h3>
                        <div class="form-group">
                            <div class="input-group mb-2">
                                <textarea class="form-control" name="feedback" style="resize: none;height:200px;"
                                          required></textarea>
                            </div>
                        </div>

                        <div class="text-center">
                            <input type="submit" value="Feedback geben" class="btn bg-fir btn-block rounded-0 py-2">
                        </div>
                    </div>
                </div>
            </form>
        @else
            <h3>Sie haben eine falsche Bestellungsnummer eingegeben.</h3>
        @endif
    </div>
@endsection
