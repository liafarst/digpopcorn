<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Order;

class UsersController extends Controller {

    public static function indexNew() {
        $orders = Order::where('status', 'IN PROGRESS')->get();

        return view('pages.adminarea.dashboard')->with('data', ['orders' => $orders, 'table' => 1]);

    }

    public static function indexReady() {
        $orders = Order::where('status', 'READY TO COLLECT')->get();

        return view('pages.adminarea.dashboard')->with('data', ['orders' => $orders, 'table' => 2]);
    }

    public static function indexReceived() {
        $orders = Order::where('status', 'RECEIVED')->get();

        return view('pages.adminarea.dashboard')->with('data', ['orders' => $orders, 'table' => 3]);
    }

}
