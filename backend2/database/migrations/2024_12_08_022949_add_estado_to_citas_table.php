<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
{
    Schema::table('citas', function (Blueprint $table) {
        $table->string('estado')->default('confirmada');
    });
}

public function down()
{
    Schema::table('citas', function (Blueprint $table) {
        $table->dropColumn('estado');
    });
}

};
