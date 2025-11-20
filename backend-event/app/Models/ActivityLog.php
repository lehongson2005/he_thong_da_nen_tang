<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ActivityLog extends Model
{
    use HasFactory;

    protected $fillable = [
        'action',
        'model_type',
        'model_id',
        'old_values',
        'new_values',
        'user_id',
        'description',
        'ip_address',
        'user_agent',
        'status_flag',
        'sequence',
        'version',
        'created_user_id',
        'updated_user_id',
    ];
}
