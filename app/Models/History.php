<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class History extends Model
{
    protected $fillable = [
        'user_id',
        'category',
        'goal_group_id',
        'amount_saved',
        'date_saved',
        'memo',
        'is_shared',
    ];
}
