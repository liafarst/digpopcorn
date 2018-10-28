<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Order;
use Carbon\Carbon;

class UsersController extends Controller {

    public static function indexNew() {
        $orders = Order::whereDate('created_at', Carbon::today())->where('status', 'IN PROGRESS')->orderBy('created_at', 'desc')->get();

        return view('pages.adminarea.dashboard')->with('data', ['orders' => $orders, 'table' => 1]);

    }

    public static function indexReady() {
        $orders = Order::whereDate('created_at', Carbon::today())->where('status', 'READY TO COLLECT')->orderBy('created_at', 'desc')->get();

        return view('pages.adminarea.dashboard')->with('data', ['orders' => $orders, 'table' => 2]);
    }

    public static function indexReceived() {
        $orders = Order::whereDate('created_at', Carbon::today())->where('status', 'RECEIVED')->orderBy('created_at', 'desc')->get();

        return view('pages.adminarea.dashboard')->with('data', ['orders' => $orders, 'table' => 3]);
    }

}
