<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Avatar extends Model
{
    /** @use HasFactory<\Database\Factories\AvatarFactory> */
    use HasFactory;
    protected $fillable = [
        'type',
    ];

    public function getUrlAttribute(): string
    {
        return asset('storage/avatars/' . $this->id . '.png');
    }
}
