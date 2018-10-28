@extends('layouts.monitor')

@section('content')
    <div class="limiter">
        <div class="container-table100">
            <div class="wrap-table100">
                <div class="table100 ver1 m-b-110">
                    <div class="table100-head">
                        <table>
                            <thead>
                            <tr class="row100 head">
                                <th class="cell100 column1">Bestellungsnummer</th>
                                <th class="cell100 column2">Name</th>
                                <th class="cell100 column3">Zustand</th>
                                <th class="cell100 column4">Prognostizierte Fertigstellungszeit</th>
                            </tr>
                            </thead>
                        </table>
                    </div>

                    <div class="table100-body js-pscroll">
                        <table id="dashboardTable">
                            <tbody>
                            @if(count($orders) > 0)
                                @foreach($orders as $order)
                                    <tr class="row100 body">
                                        <td class="cell100 column1">#{{ $order->id }}</td>
                                        <td class="cell100 column2">{{ App\Helpers\CustomHelpers::initials($order->name) }}</td>
                                        <td class="cell100 column3">{{ App\Helpers\CustomHelpers::germanStatus($order->status) }}</td>
                                        <td class="cell100 column4">{{ $order->ETA }} Uhr</td>
                                    </tr>
                                @endforeach
                            @else
                                <tr class="row100 body">
                                    <td colspan="5"><h5>Keine Bestellungen</h5></td>
                                </tr>
                            @endif
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
