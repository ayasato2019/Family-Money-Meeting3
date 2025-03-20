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
            // `avatar` カラムの型変更 (string) & デフォルト値を `avatar_1.webp` に設定
            $table->string('avatar')->default('1')->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // 変更を元に戻す (デフォルトを `avatar_1.png` に戻す)
            $table->string('avatar')->default('avatar_1.png')->change();
        });
    }
};
