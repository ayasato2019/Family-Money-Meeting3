<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('households', function (Blueprint $table) {
            $table->tinyInteger('plus')->default(0)->after('price');
            $table->tinyInteger('minus')->default(0)->after('plus');
        });

        Schema::table('investments', function (Blueprint $table) {
            $table->tinyInteger('plus')->default(0)->after('price');
            $table->tinyInteger('minus')->default(0)->after('plus');
        });

        Schema::table('needs', function (Blueprint $table) {
            $table->tinyInteger('plus')->default(0)->after('price');
            $table->tinyInteger('minus')->default(0)->after('plus');
        });

        Schema::table('wants', function (Blueprint $table) {
            $table->tinyInteger('plus')->default(0)->after('price');
            $table->tinyInteger('minus')->default(0)->after('plus');
        });

        Schema::table('donations', function (Blueprint $table) {
            $table->tinyInteger('plus')->default(0)->after('price');
            $table->tinyInteger('minus')->default(0)->after('plus');
        });

        Schema::table('teams', function (Blueprint $table) {
            $table->integer('total_household')->default(0)->after('team_name');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('households', function (Blueprint $table) {
            $table->dropColumn(['plus', 'minus']);
        });

        Schema::table('investments', function (Blueprint $table) {
            $table->dropColumn(['plus', 'minus']);
        });

        Schema::table('needs', function (Blueprint $table) {
            $table->dropColumn(['plus', 'minus']);
        });

        Schema::table('wants', function (Blueprint $table) {
            $table->dropColumn(['plus', 'minus']);
        });

        Schema::table('donations', function (Blueprint $table) {
            $table->dropColumn(['plus', 'minus']);
        });

        Schema::table('teams', function (Blueprint $table) {
            $table->dropColumn('total_household');
        });
    }
};
