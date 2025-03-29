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
        Schema::table('comments', function (Blueprint $table) {
            $table->tinyInteger('target_type')
                ->default(0) // SQLite対策でデフォルト値を指定
                ->after('user_id_to')
                ->comment('0=household, 1=saving, 2=investment, 3=need, 4=want, 5=donation');

            $table->unsignedBigInteger('target_id')
                ->nullable() // NULL許容にしておくと安全
                ->after('target_type');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('comments', function (Blueprint $table) {
            $table->dropColumn(['target_type', 'target_id']);
        });
    }
};
