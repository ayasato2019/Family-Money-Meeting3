<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Saving extends Model
{
    protected $fillable = [
        'user_id',
        'goal_id',
        'title',
        'amount',
        'deadline',
        'level',
        'achieve',
        'images',
        'is_shared',
        'memo',
    ];
}
