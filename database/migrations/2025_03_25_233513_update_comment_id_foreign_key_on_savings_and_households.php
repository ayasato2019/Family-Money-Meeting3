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
        // commentsテーブルにgroup_idカラムを追加（存在しない場合のみ）
        if (!Schema::hasColumn('comments', 'group_id')) {
            Schema::table('comments', function (Blueprint $table) {
                $table->unsignedBigInteger('group_id')->default(0)->nullable()->after('id');
            });
        }

        // savingsテーブルにcomment_idカラムを追加（存在しない場合のみ）
        if (!Schema::hasColumn('savings', 'comment_id')) {
            Schema::table('savings', function (Blueprint $table) {
                $table->unsignedBigInteger('comment_id')->default(0)->nullable()->after('id');
            });
        }

        // householdsテーブルにcomment_idカラムを追加（存在しない場合のみ）
        if (!Schema::hasColumn('households', 'comment_id')) {
            Schema::table('households', function (Blueprint $table) {
                $table->unsignedBigInteger('comment_id')->default(0)->nullable()->after('id');
            });
        }

        // group_idとcomment_idを関連付け（外部キー制約なし）
        Schema::table('comments', function (Blueprint $table) {
            $table->index('group_id'); // インデックスを追加してパフォーマンス向上
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // savingsテーブルからcomment_idを削除
        Schema::table('savings', function (Blueprint $table) {
            $table->dropColumn('comment_id');
        });

        // householdsテーブルからcomment_idを削除
        Schema::table('households', function (Blueprint $table) {
            $table->dropColumn('comment_id');
        });

        // commentsテーブルからgroup_idを削除
        Schema::table('comments', function (Blueprint $table) {
            $table->dropColumn('group_id');
        });
    }
};
