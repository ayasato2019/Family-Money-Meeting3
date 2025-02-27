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
        Schema::create('histories', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')
                ->constrained('users')
                ->onDelete('cascade');
            $table->unsignedBigInteger('goal_id');
            $table->integer('category'); //1貯金 2投資 3必要 4欲しい 5寄付
            $table->integer('amount');
            $table->date('date'); // 貯金した日
            $table->string('images')->nullable(); //レシートとか
            $table->boolean('is_shared')->default(false);
            $table->text('memo')->nullable();
            $table->foreignId('comment_id')
                ->nullable()
                ->constrained('comments')
                ->onDelete('set null');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('histories');
    }
};
