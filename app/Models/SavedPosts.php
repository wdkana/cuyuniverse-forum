<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SavedPosts extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'post_id'];

    public function posts()
    {
        return $this->belongsTo(Posts::class, 'post_id', 'id');
    }

    public function comments()
    {
        return $this->hasMany(Comment::class, 'post_id', 'post_id');
    }

}
