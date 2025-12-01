<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class View extends Model
{
    use HasFactory;

    protected $fillable = [
        'event_id',
        'user_id',
        'view_count',
        'last_viewed_at',
        'first_viewed_at',
        'session_id',
        'ip_address',
        'user_agent',
        'source',
        'daily_views',
        'weekly_views',
        'monthly_views',
        'status_flag',
        'sequence',
        'version',
        'created_user_id',
        'updated_user_id',
    ];
}
