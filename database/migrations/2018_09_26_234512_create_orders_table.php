<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->increments('id');
            $table->string('phone_number');
            $table->string('name');
            $table->string('email');
            $table->string('company');
            $table->string('ordered_at');
            $table->string('ETA');
            $table->string('ready_at')->default('0');
            $table->string('collected_at')->default('0');
            $table->text('feedback');
            $table->enum('status', ['IN PROGRESS', 'READY TO COLLECT', 'RECEIVED']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('orders');
    }
}
