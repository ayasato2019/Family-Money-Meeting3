<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Schema::table('users', function (Blueprint $table) {
        //     // 外部キーを削除
        //     $table->dropForeign('users_avatar_foreign');
        // });

        Schema::table('users', function (Blueprint $table) {
            // avatar を NOT NULL に変更（型そのまま）
            $table->unsignedBigInteger('avatar')->default(1)->nullable(false)->change();
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // avatar を nullable に戻す
            $table->unsignedBigInteger('avatar')->nullable()->default(null)->change();

            // // 外部キーを復元
            // $table->foreign('avatar')->references('id')->on('avatars')->onDelete('set null');
        });
    }
};

