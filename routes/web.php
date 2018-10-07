<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('pages.order');
})->name('main');

Route::get('/dashboard', 'OrdersController@index')->name('dashboard');

Route::get('/impressum', function () {
    return view('pages.impressum');
})->name('impressum');

Route::get('/privacy-policy', function () {
    return view('pages.privacypolicy');
})->name('privacy-policy');

Route::post('/make-order', 'OrdersController@makeOrder')->name('make-order');

Route::group(['prefix' => 'admin-area'], function () {
    Route::get('/', 'Auth\LoginController@showLoginForm');
    Route::get('/login', 'Auth\LoginController@showLoginForm')->name('login');
    Route::post('/login', 'Auth\LoginController@login');
    Route::post('/logout', 'Auth\LoginController@logout')->name('logout');
    Route::get('/new-orders', 'UsersController@indexNew');
    Route::get('/ready-orders', 'UsersController@indexReady');
    Route::get('/received-orders', 'UsersController@indexReceived');
    Route::post('/check-orders', 'OrdersController@checkOrders');
    Route::post('/change-order', 'OrdersController@changeOrder');
});

Route::get('/home', 'HomeController@index')->name('home');