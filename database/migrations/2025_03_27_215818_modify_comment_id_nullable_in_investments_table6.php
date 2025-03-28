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
            $table->unsignedBigInteger('comment_id')->nullable()->default(0)->change(); // デフォルト0を追加
        });

        Schema::table('needs', function (Blueprint $table) {
            $table->unsignedBigInteger('comment_id')->nullable()->default(0)->change(); // デフォルト0を追加
        });

        Schema::table('wants', function (Blueprint $table) {
            $table->unsignedBigInteger('comment_id')->nullable()->default(0)->change(); // デフォルト0を追加
        });

        Schema::table('donations', function (Blueprint $table) {
            $table->unsignedBigInteger('comment_id')->nullable()->default(0)->change(); // デフォルト0を追加
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // 変更を元に戻す
        Schema::table('investments', function (Blueprint $table) {
            $table->unsignedBigInteger('comment_id')->nullable(false)->change();
        });
        Schema::table('needs', function (Blueprint $table) {
            $table->unsignedBigInteger('comment_id')->nullable(false)->change();
        });
        Schema::table('wants', function (Blueprint $table) {
            $table->unsignedBigInteger('comment_id')->nullable(false)->change();
        });
        Schema::table('donations', function (Blueprint $table) {
            $table->unsignedBigInteger('comment_id')->nullable(false)->change();
        });
    }
};
