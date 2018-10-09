<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Order;

class OrdersController extends Controller {

    public static function index() {
        $orders = Order::where('status', 'IN PROGRESS')->get();

        return view('pages.dashboard')->with('orders', $orders);
    }

    public static function makeOrder() {
        $number = request()->input('number');
        $name = request()->input('name');
        $email = request()->input('email');
        $company = request()->input('company');

        $order = new Order();

        $order->phone_number = $number;
        $order->name = $name;
        $order->email = $email;
        $order->company = $company;

        $orders = Order::where('status', 'RECEIVED')->get();

        if (sizeof($orders) > 10) {
            $seconds = 0;
            $i = 0;
            foreach ($orders as $ord) {
                $diff = strtotime($ord->updated_at) - strtotime($ord->created_at);
                $seconds += $diff;
                $i++;
            }
            $order->ETA = date('H:i', strtotime('now +' . (floor($seconds / $i)) . ' seconds'));
        } else {
            $order->ETA = date('H:i', strtotime('now +3 minutes'));
        }

        $order->status = 'IN PROGRESS';

        $order->save();

        return response()->json([
            'order' => $order
        ]);
    }

    public static function changeOrder() {
        $orderID = request()->input('orderID');
        $action = request()->input('action');

        $order = Order::find($orderID);
        if (!empty($order)) {
            switch ($action) {
                case "READY":
                    $order->status = "READY TO COLLECT";
                    $order->save();
                    return response()->json([
                        'message' => 'Status changed to READY TO COLLECT.'
                    ]);
                    break;
                case "COLLECTED":
                    $order->status = "RECEIVED";
                    $order->save();
                    return response()->json([
                        'message' => 'Status changed to RECEIVED.'
                    ]);
                    break;
                case "DELETE":
                    $order->delete();
                    return response()->json([
                        'message' => 'Order deleted successfully.'
                    ]);
                    break;
                default:
                    break;
            }
        }
    }

    public static function checkOrders() {
        $currentPage = request()->input('currentPage');

        switch ($currentPage) {
            case "new-orders":
                $orders = Order::where('status', 'IN PROGRESS')->orderBy('created_at', 'asc')->get();
                return response()->json(['orders' => $orders]);
                break;
            case "ready-orders":
                $orders = Order::where('status', 'READY TO COLLECT')->orderBy('created_at', 'asc')->get();
                return response()->json(['orders' => $orders]);
                break;
            case "received-orders":
                $orders = Order::where('status', 'RECEIVED')->orderBy('created_at', 'asc')->get();
                return response()->json(['orders' => $orders]);
                break;
            default:
                break;
        }


        return response()->json([
            'message' => 'Order deleted successfully.'
        ]);
    }

    public static function dashboard() {
        $orders = Order::where('status', 'IN PROGRESS')->orderBy('created_at', 'asc')->get();
        return response()->json(['orders' => $orders]);
    }


}
