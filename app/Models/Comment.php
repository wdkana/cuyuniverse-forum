<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;

    public function posts()
    {
        return $this->belongsTo(Posts::class, 'post_id', 'id');
    }

    public function users()
    {
        return $this->belongsTo(Posts::class, 'user_id', 'id');
    }
}
