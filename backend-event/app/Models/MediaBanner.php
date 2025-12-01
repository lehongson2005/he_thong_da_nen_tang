<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MediaBanner extends Model
{
    use HasFactory;

    protected $primaryKey = 'media_id';
    protected $table = 'media_banners';

    protected $fillable = [
        'media_title',
        'media_image_url',
        'media_detail_link',
        'media_publish_from',
        'media_publish_to',
        'media_is_active',
        'media_order',
        'status_flag',
        'sequence',
        'version',
        'created_user_id',
        'updated_user_id'
    ];

    public function scopeOrdered($query)
    {
        return $query->orderBy('media_order', 'asc'); // Hoặc ->orderBy('sequence', 'asc')
    }

    //tim kiem banner theo ten banner
    public static function searchBannerTitle(string $keyword)
    {
        return self::when($keyword, function ($q) use ($keyword) {
            $q->where('media_title', 'like', "%{$keyword}%"); // tìm bất kỳ vị trí nào
        })->ordered()->get()  // sắp xếp theo media_order
        ->transform(function ($banner) {
            if ($banner->media_image_url && !str_starts_with($banner->media_image_url, 'http')) {
                $banner->media_image_url = asset('storage/' . ltrim($banner->media_image_url, 'public/'));
            }
            return $banner;
        });
    }


}
