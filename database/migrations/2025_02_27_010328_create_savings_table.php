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
        Schema::create('savings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')
                ->constrained('users')
                ->onDelete('cascade');
            $table->unsignedBigInteger('goal_id');
            $table->string('title');
            $table->decimal('amount', 11, 0);
            $table->date('deadline');
            $table->boolean('achieve');
            $table->unsignedInteger('level'); // 1=長期 2=中期 3=短期
            $table->string('images')->nullable(); //イメージ画像
            $table->boolean('is_shared')->default(false);
            $table->foreignId('comment_id')
                ->nullable()
                ->constrained('comments')
                ->onDelete('set null');
            $table->text('memo')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('savings');
    }
};
