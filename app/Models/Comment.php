<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    protected $fillable = [
        'team_id',
        'user_id_from',
        'user_id_to',
        'target_type',
        'target_id',
        'comment'
    ];

    public function team() {
        return $this->belongsTo(Team::class);
    }

    public function sender() {
        return $this->belongsTo(User::class, 'user_id_from');
    }

    public function receiver() {
        return $this->belongsTo(User::class, 'user_id_to');
    }
}
