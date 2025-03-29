<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Status extends Model
{
    protected $fillable = [
        'user_id',
        'saving',
        'investment',
        'need',
        'want',
        'donation',
        'is_shared',
    ];
}
