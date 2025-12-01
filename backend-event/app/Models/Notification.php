<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'event_id',
        'title',
        'message',
        'is_read',
        'send_date',
        'read_at',
        'recalled_at',
        'type',
        'action_url',
        'data',
        'priority',
        'status_flag',
        'sequence',
        'version',
        'created_user_id',
        'updated_user_id',
    ];
}
