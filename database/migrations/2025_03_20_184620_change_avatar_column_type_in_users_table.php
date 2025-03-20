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
            // 既存の `foreign key` を削除（ある場合のみ）
            $table->dropForeign(['avatar']);

            // `avatar` を `string` に変更し、NOT NULL & デフォルト値を設定
            $table->string('avatar')->default('avatar_1.png')->notNull()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // `avatar` を `integer` に戻す（必要なら）
            $table->integer('avatar')->nullable()->change();

            // 外部キーを元に戻す（必要なら）
            $table->foreign('avatar')->references('id')->on('avatars')->onDelete('set null');
        });
    }
};
