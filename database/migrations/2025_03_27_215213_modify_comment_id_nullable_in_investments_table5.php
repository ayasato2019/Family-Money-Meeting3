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
        // 既存の NULL 値を 0 に更新
        DB::table('investments')->whereNull('comment_id')->update(['comment_id' => 0]);
        DB::table('needs')->whereNull('comment_id')->update(['comment_id' => 0]);
        DB::table('wants')->whereNull('comment_id')->update(['comment_id' => 0]);
        DB::table('donations')->whereNull('comment_id')->update(['comment_id' => 0]);

        // comment_id を NOT NULL に変更
        Schema::table('investments', function (Blueprint $table) {
            $table->unsignedBigInteger('comment_id')->default(0)->change();
        });

        Schema::table('needs', function (Blueprint $table) {
            $table->unsignedBigInteger('comment_id')->default(0)->change();
        });

        Schema::table('wants', function (Blueprint $table) {
            $table->unsignedBigInteger('comment_id')->default(0)->change();
        });

        Schema::table('donations', function (Blueprint $table) {
            $table->unsignedBigInteger('comment_id')->default(0)->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // 変更を元に戻す
        Schema::table('investments', function (Blueprint $table) {
            $table->unsignedBigInteger('comment_id')->nullable()->change();
        });
        Schema::table('needs', function (Blueprint $table) {
            $table->unsignedBigInteger('comment_id')->nullable()->change();
        });
        Schema::table('wants', function (Blueprint $table) {
            $table->unsignedBigInteger('comment_id')->nullable()->change();
        });
        Schema::table('donations', function (Blueprint $table) {
            $table->unsignedBigInteger('comment_id')->nullable()->change();
        });
    }
};
