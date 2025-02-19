<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    public function team() {
        return $this->belongsTo(Team::class);
    }

    public function userFrom() {
        return $this->belongsTo(User::class, 'user_id_from');
    }

    public function userTo() {
        return $this->belongsTo(User::class, 'user_id_to');
    }
}
