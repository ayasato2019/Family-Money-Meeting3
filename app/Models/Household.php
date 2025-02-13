<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;


class Household extends Model
{
    protected $fillable = [
        'team_id',
        'price',
        'date',
        'achieve',
        'is_share',
        'images',
        'memo',
        'comment_id',
    ];
}
