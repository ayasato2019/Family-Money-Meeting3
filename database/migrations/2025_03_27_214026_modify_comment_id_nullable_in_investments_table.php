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
        Schema::table('investments', function (Blueprint $table) {
            $table->unsignedBigInteger('comment_id')->nullable()->default(0)->change();        });

        Schema::table('needs', function (Blueprint $table) {
            $table->unsignedBigInteger('comment_id')->nullable()->default(0)->change();        });

        Schema::table('wants', function (Blueprint $table) {
            $table->unsignedBigInteger('comment_id')->nullable()->default(0)->change();        });

        Schema::table('donations', function (Blueprint $table) {
            $table->unsignedBigInteger('comment_id')->nullable()->default(0)->change();        });

}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('investments', function (Blueprint $table) {
            $table->unsignedBigInteger('comment_id')->nullable(false)->default(null)->change();
        });
        Schema::table('needs', function (Blueprint $table) {
            $table->unsignedBigInteger('comment_id')->nullable(false)->default(null)->change();
        });
        Schema::table('wants', function (Blueprint $table) {
            $table->unsignedBigInteger('comment_id')->nullable(false)->default(null)->change();
        });
        Schema::table('donations', function (Blueprint $table) {
            $table->unsignedBigInteger('comment_id')->nullable(false)->default(null)->change();
        });
    }
};
