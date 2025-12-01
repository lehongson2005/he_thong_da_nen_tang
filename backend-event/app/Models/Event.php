<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'event_type',
        'date_gregorian',
        'date_lunar',
        'address',
        'latitude',
        'longitude',
        'city',
        'country',
        'image',
        'gallery',
        'category_id',
        'status',
        'privacy',
        'start_time',
        'end_time',
        'is_all_day',
        'capacity',
        'price',
        'currency',
        'organizer_name',
        'organizer_phone',
        'organizer_email',
        'status_flag',
        'sequence',
        'version',
        'created_user_id',
        'updated_user_id',
    ];
}
