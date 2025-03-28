<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // 外部キーが存在するかチェックしてから削除
        $sm = Schema::getConnection()->getDoctrineSchemaManager();
        $doctrineTable = $sm->listTableDetails('users');
        if ($doctrineTable->hasForeignKey('users_avatar_foreign')) {
            Schema::table('users', function (Blueprint $table) {
                $table->dropForeign('users_avatar_foreign');
            });
        }

        // avatar カラムを NOT NULL に変更（例）
        Schema::table('users', function (Blueprint $table) {
            $table->unsignedBigInteger('avatar')->default(1)->nullable(false)->change();
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->unsignedBigInteger('avatar')->nullable()->default(null)->change();
            $table->foreign('avatar')->references('id')->on('avatars')->onDelete('set null');
        });
    }
};
