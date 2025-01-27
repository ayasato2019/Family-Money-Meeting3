<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->integer('team_id')->nullable();  // team_idをnullableにして追加
            $table->string('email')->nullable()->change();  // emailカラムをnullableに変更
            $table->timestamp('email_verified_at')->nullable()->change();  // email_verified_atカラムをnullableに変更
            $table->string('password')->nullable()->change();  // passwordカラムをnullableに変更
            $table->date('birth_date')->nullable();  // birth_dateカラムをnullableとして追加
            $table->integer('admin_type')->nullable();  // admin_typeカラムをnullableとして追加
        });
    }

    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'team_id',
                'birth_date',
                'admin_type',
            ]);
            // emailやpasswordの変更を元に戻す処理を追加する
            $table->string('email')->nullable(false)->change();  // emailをnullableにしないように変更
            $table->timestamp('email_verified_at')->nullable(false)->change();  // email_verified_atをnullableにしないように変更
            $table->string('password')->nullable(false)->change();  // passwordをnullableにしないように変更
        });
    }
};
