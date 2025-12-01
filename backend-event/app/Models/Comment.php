<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'event_id',
        'content',
        'image',
        'emoji',
        'parent_id',
        'lft',
        'rgt',
        'depth',
        'status',
        'moderation_notes',
        'like_count',
        'reply_count',
        'status_flag',
        'sequence',
        'version',
        'created_user_id',
        'updated_user_id',
    ];
}
