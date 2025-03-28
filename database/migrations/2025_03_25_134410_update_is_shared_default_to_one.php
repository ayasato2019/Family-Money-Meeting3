<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateIsSharedDefaultToOne extends Migration
{
    public function up(): void
    {
        Schema::table('statuses', function (Blueprint $table) {
            $table->integer('is_shared')->default(1)->change();
        });

        Schema::table('households', function (Blueprint $table) {
            $table->boolean('is_shared')->default(1)->change();
        });

        Schema::table('savings', function (Blueprint $table) {
            $table->boolean('is_shared')->default(1)->change();
        });
    }

    public function down(): void
    {
        Schema::table('statuses', function (Blueprint $table) {
            $table->integer('is_shared')->default(0)->change();
        });

        Schema::table('households', function (Blueprint $table) {
            $table->boolean('is_shared')->default(0)->change();
        });

        Schema::table('savings', function (Blueprint $table) {
            $table->boolean('is_shared')->default(0)->change();
        });
    }
}
