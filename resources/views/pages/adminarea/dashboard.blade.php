@extends('layouts.admin')

@section('content')

    @if(Auth::check())

        <ul class="nav nav-tabs mx-auto my-5" style="width: 95%;">
            <li class="nav-item">
                <a class="nav-link @if($data['table'] == 1) active @endif" href="./new-orders">Neue Bestellungen</a>
            </li>
            <li class="nav-item">
                <a class="nav-link @if($data['table'] == 2) active @endif" href="./ready-orders">Fertige
                    Bestellungen</a>
            </li>
            <li class="nav-item">
                <a class="nav-link @if($data['table'] == 3) active @endif" href="./received-orders">Abgeholte
                    Bestellungen</a>
            </li>
        </ul>

        <div class="limiter">
            <div class="wrap-table100 mx-auto">
                <div class="table100 ver1 m-b-110">
                    <div class="table100-head">
                        <table>
                            <thead>
                            <tr class="row100 head">
                                <th class="cell100 column1">#</th>
                                <th class="cell100 column2">Name</th>
                                <th class="cell100 column3">Telefonnummer</th>
                                <th class="cell100 column4">Unternehmen</th>
                                <th class="cell100 column5">Bestellt um</th>
                                <th class="cell100 column6">Abgeholt um</th>
                                @if($data['table'] != 3)
                                    <th class="cell100 column7">Optionen</th>
                                @endif
                            </tr>
                            </thead>
                        </table>
                    </div>

                    <div class="table100-body js-pscroll">
                        <table id="ordersTable">
                            <tbody>
                            @if(count($data['orders']) > 0)
                                @foreach($data['orders'] as $order)
                                    <tr class="row100 body">
                                        <td class="cell100 column1">#{{ $order->id }}</td>
                                        <td class="cell100 column2">{{ $order->name }}</td>
                                        <td class="cell100 column3">{{ $order->phone_number }}</td>
                                        <td class="cell100 column4">{{ $order->company }}</td>
                                        <td class="cell100 column5">{{ Carbon\Carbon::parse($order->created_at)->format('H:i') }}
                                            Uhr
                                        </td>
                                        <td class="cell100 column6">
                                            @if($data['table'] == 3)
                                                {{ Carbon\Carbon::parse($order->updated_at)->format('H:i') }} Uhr
                                            @else
                                                -
                                            @endif
                                        </td>
                                        @if($data['table'] != 3)
                                            <td class="cell100 column7">
                                                @if($data['table'] == 1)
                                                    <div class="btn-group" role="group" aria-label="Basic example">
                                                        <button class="btn btn-success readyButton">Fertig</button>
                                                        <button class="btn btn-danger deleteButton">Löschen
                                                        </button>
                                                    </div>
                                                @endif
                                                @if($data['table'] == 2)
                                                    <div class="btn-group" role="group" aria-label="Basic example">
                                                        <button class="btn btn-success collectedButton">Abgeholt
                                                        </button>
                                                        <button class="btn btn-danger deleteButton">Löschen
                                                        </button>
                                                    </div>
                                                @endif
                                            </td>
                                        @endif
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

    @else
        Logged out.
    @endif
@endsection
