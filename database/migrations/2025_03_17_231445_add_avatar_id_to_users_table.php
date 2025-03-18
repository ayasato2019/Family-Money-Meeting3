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
        Schema::table('users', function (Blueprint $table) {
            Schema::table('users', function (Blueprint $table) {
                // 1. 外部キー制約を削除
                $table->dropForeign(['avatar']);

                // 2. avatar カラムを変更（デフォルト値 1 を設定）
                $table->bigInteger('avatar')->unsigned()->default(1)->nullable()->change();

                // 3. 外部キー制約を再追加
                $table->foreign('avatar')->references('id')->on('avatars')->onDelete('SET NULL');
            });
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['avatar']);
            $table->bigInteger('avatar')->unsigned()->nullable()->change();
            $table->foreign('avatar')->references('id')->on('avatars')->onDelete('SET NULL');
        });
    }
};
