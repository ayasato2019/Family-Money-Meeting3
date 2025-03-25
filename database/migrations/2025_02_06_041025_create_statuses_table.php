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
        Schema::create('statuses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users');
            $table->integer('saving')->default(0);
            $table->integer('investment')->default(0);
            $table->integer('need')->default(0);
            $table->integer('want')->default(0);
            $table->integer('donation')->default(0);
            $table->integer('game_level')->default(0);
            $table->integer('game_life')->default(4);
            $table->integer('is_share')->default(0); //０=非公開 1=公開
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('statuses');
    }
};
