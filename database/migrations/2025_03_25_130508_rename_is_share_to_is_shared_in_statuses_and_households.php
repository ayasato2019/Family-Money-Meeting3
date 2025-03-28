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
        Schema::table('statuses', function (Blueprint $table) {
            $table->renameColumn('is_share', 'is_shared');
        });

        Schema::table('households', function (Blueprint $table) {
            $table->renameColumn('is_share', 'is_shared');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('statuses', function (Blueprint $table) {
            $table->renameColumn('is_shared', 'is_share');
        });

        Schema::table('households', function (Blueprint $table) {
            $table->renameColumn('is_shared', 'is_share');
        });
    }
};
