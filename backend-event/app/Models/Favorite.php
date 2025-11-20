<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Favorite extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'event_id',
        'status_flag',
        'sequence',
        'version',
        'created_user_id',
        'updated_user_id',
    ];
}
