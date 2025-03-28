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
            $table->unsignedBigInteger('user_id')->nullable()->after('team_id'); // team_id の後ろに user_id を追加
            $table->foreign('user_id')->references('id')->on('users')->onDelete('set null'); // users テーブルと外部キー制約を設定

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('households', function (Blueprint $table) {
            $table->dropForeign(['user_id']); // 外部キー制約の削除
            $table->dropColumn('user_id'); // user_id カラムを削除
        });
    }
};
