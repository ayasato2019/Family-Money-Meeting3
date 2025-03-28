<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'team_id',
        'avatar',
        'email',
        'birth_date',
        'role',
        'is_active',
        'password'
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * アバターのURLを取得
     */
    // public function getAvatarUrlAttribute(): string
    // {
    //     // `avatar` が 1 〜 5 の数値なら対応する画像を返す
    //     if ($this->avatar && is_numeric($this->avatar)) {
    //         return asset("assets/images/avatar/avatar_{$this->avatar}.webp");
    //     }

    //     // デフォルトアバター
    //     return asset("assets/images/avatar/avatar_1.webp");
    // }
}
