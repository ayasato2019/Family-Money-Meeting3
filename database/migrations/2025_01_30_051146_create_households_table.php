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
        Schema::create('households', function (Blueprint $table) {
            $table->id();
            $table->foreignId('team_id') // 外部キーを追加
                ->constrained('teams') // `teams` テーブルの `id` に紐づけ
                ->onDelete('cascade');
            $table->string('title');
            $table->decimal('price', 11, 0);
            $table->date('date');
            $table->boolean('achieve');
            $table->boolean('is_share');
            $table->string('images')->nullable(); //画像は必須ではない
            $table->text('memo')->nullable(); //メモは必須ではない
            $table->integer('comment_id')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('households');
    }
};
