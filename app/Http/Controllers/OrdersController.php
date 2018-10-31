<?php

namespace App\Http\Controllers;

use App\Mail\OrderReady;
use Illuminate\Http\Request;
use App\Order;
use Carbon\Carbon;
use Illuminate\Support\Facades\Mail;
use Faker\Provider\DateTime;

class OrdersController extends Controller {

    public static function index() {
        $orders = Order::whereDate('created_at', Carbon::today())->orderBy('created_at', 'desc')->take(10)->orderBy('ETA', 'asc')->get();

        return view('pages.dashboard')->with('orders', $orders);
    }

    public static function stats() {
        return view('pages.stats');
    }

    public static function getStats() {

        $canvasNumber = request()->input('canvasNumber');

        switch ($canvasNumber) {
            case '1':
                $orders = Order::whereDate('created_at', Carbon::today())->where('status', 'RECEIVED')->orderBy('created_at', 'desc')->take(20)->get();
//                $orders = Order::where('status', 'RECEIVED')->orderBy('created_at', 'desc')->take(20)->get();

                return response()->json([
                    'orders' => $orders
                ]);
            case '2':
                $orders = Order::whereDate('created_at', Carbon::today())->where('status', 'RECEIVED')->orderBy('created_at', 'desc')->take(16)->get();
//                $orders = Order::where('status', 'RECEIVED')->orderBy('created_at', 'desc')->take(16)->get();

                return response()->json([
                    'orders' => $orders
                ]);
            case '3':
                $orders = Order::whereDate('created_at', Carbon::today())->where('status', 'RECEIVED')->orderBy('created_at', 'desc')->take(16)->get();
//                $orders = Order::where('status', 'RECEIVED')->orderBy('created_at', 'desc')->take(16)->get();

                return response()->json([
                    'orders' => $orders
                ]);
            case '4':
                // TODO
                $orders = Order::whereDate('created_at', Carbon::today())->whereRaw('created_at >= now() - interval 600 minute')->orderBy('created_at', 'asc')->get();
//                $orders = Order::whereRaw('created_at >= now() - interval 180 minute')->orderBy('created_at', 'asc')->get();
                return response()->json([
                    'orders' => $orders,
                    'now' => date("H:i"),
                ]);
        }
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

        $order->ordered_at = date('H:i', strtotime('now'));

        $order->status = 'IN PROGRESS';
        $order->feedback = 'empty';

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
                    $order->ready_at = date('H:i', strtotime('now'));
                    $order->save();
                    return response()->json([
                        'message' => 'Status changed to READY TO COLLECT.'
                    ]);
                    break;
                case "COLLECTED":
                    $order->status = "RECEIVED";
                    $order->collected_at = date('H:i', strtotime('now'));
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
                $orders = Order::whereDate('created_at', Carbon::today())->where('status', 'IN PROGRESS')->orderBy('created_at', 'desc')->get();
                return response()->json(['orders' => $orders]);
            case "ready-orders":
                $orders = Order::whereDate('created_at', Carbon::today())->where('status', 'READY TO COLLECT')->orderBy('created_at', 'desc')->get();
                return response()->json(['orders' => $orders]);
            case "received-orders":
                $orders = Order::whereDate('created_at', Carbon::today())->where('status', 'RECEIVED')->orderBy('created_at', 'desc')->get();
                return response()->json(['orders' => $orders]);
            default:
                break;
        }
    }

    public static function dashboard() {
        $orders = Order::whereDate('created_at', Carbon::today())->orderBy('created_at', 'desc')->take(10)->orderByRaw("FIELD(status, \"IN PROGRESS\", \"READY TO COLLECT\", \"RECEIVED\")")->orderBy('ETA', 'asc')->get();
        return response()->json(['orders' => $orders]);
    }

    public function sendMail() {
        $orderID = request()->input('orderID');

        $order = Order::find($orderID);
        $email = $order->email;
        $ETA = $order->ETA;

        Mail::to($email)->subject('Smartcorn: Ihre Popcornbestllung liegt nun abholbereit am Stand des FIR')->send(new OrderReady($ETA, $orderID));
    }

    public function showFeedback(Request $request, $orderID) {
        if (!$orderID) {
            return view('pages.feedback')->with('order', null);
        }

        $order = Order::find($orderID);

        if (!$order) {
            return view('pages.feedback')->with('order', null);
        }

        if ($order->status != 'RECEIVED') {
            return view('pages.feedback')->with('order', null);
        }

        if ($order->feedback != 'empty') {
            return view('pages.feedback')->with('order', null);
        }

        return view('pages.feedback')->with('order', $order);
    }

    public function sendFeedback() {
        $orderID = request()->input('orderID');
        $feedback = request()->input('feedback');

        $order = Order::find($orderID);
        if (!$order) {
            return view('errors.main');
        }

        if ($order->feedback != 'empty') {
            return view('errors.main');
        }

        $order->feedback = $feedback;
        $order->save();

        return view('pages.order')->with('message', 'Ihre Rückmeldung wurde erfolgreich gesendet.');

    }

}
