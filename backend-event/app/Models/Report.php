<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Report extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'reportable_id',
        'reportable_type',
        'reason',
        'status',
        'admin_notes',
        'resolved_by',
        'resolved_at',
        'status_flag',
        'sequence',
        'version',
        'created_user_id',
        'updated_user_id',
    ];
}
