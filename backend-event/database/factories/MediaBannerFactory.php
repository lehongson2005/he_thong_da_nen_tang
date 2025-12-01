<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\MediaBanner;
use App\Models\User;
use Carbon\Carbon;

class MediaBannerFactory extends Factory
{
    protected $model = MediaBanner::class;

    public function definition()
    {
        $user_id = User::inRandomOrder()->first()?->id ?? 1;

        // Dữ liệu banner thật
        $banners = [
            [
                'title' => 'Chào mừng Tân sinh viên K2025',
                'image' => 'https://res.cloudinary.com/dehyiodml/image/upload/v1757312171/events/img_7bd1a077-2312-41d3-925d-ea57370432d1.png',
                'link'  => 'https://event.tdc.edu.vn',
            ],
            [
                'title' => 'AN TOÀN THÔNG TIN BẠN CẦN BIẾT | FIT_TDC',
                'image' => 'https://res.cloudinary.com/dehyiodml/image/upload/v1757056709/events/img_36c86409-c358-47ac-8d32-b2ac174e2494.jpg',
                'link'  => 'https://event.tdc.edu.vn/storage/uploads/events/attt-1.png',
            ],
            [
                'title' => 'Hội nghị kiện toàn Ban Chấp hành Đoàn Khoa Công nghệ Thông tin nhiệm kỳ 2025',
                'image' => 'https://fit.tdc.edu.vn/assets/images/news/ae1.jpg',
                'link'  => 'https://fit.tdc.edu.vn/assets/images/news/ae1.jpg',
            ],
            [
                'title' => 'Tuyển Cộng Tác Viên Đoàn - Hội Khoa Công Nghệ Thông Tin',
                'image' => 'https://fit.tdc.edu.vn/assets/images/news/z7066474363565-73bcf911b2329ab6899128a280327f78-20251001110225-e.jpg',
                'link'  => 'https://fit.tdc.edu.vn/assets/images/news/z7066474363565-73bcf911b2329ab6899128a280327f78-20251001110225-e.jpg',
            ],
            [
                'title' => 'Lễ kỷ niệm 43 năm ngày Nhà giáo Việt Nam 20/11',
                'image' => 'https://media.tdc.edu.vn/Media/1_TH1082/FolderFunc/202511/Images/img-0133jpg-20251120022814-e.jpg',
                'link'  => 'https://media.tdc.edu.vn/Media/1_TH1082/FolderFunc/202511/Images/img-0133jpg-20251120022814-e.jpg',
            ],
        ];

        $banner = $this->faker->randomElement($banners);

        return [
            'media_title' => $banner['title'],
            'media_image_url' => $banner['image'],
            'media_detail_link' => $banner['link'],
            'media_publish_from' => Carbon::now()->subDays(rand(0, 10)),
            'media_publish_to' => Carbon::now()->addDays(rand(5, 30)),
            'media_is_active' => true,
            'media_order' => $this->faker->numberBetween(1, 10),
            'status_flag' => 1,
            'sequence' => $this->faker->numberBetween(1, 50),
            'version' => 1,
            'created_user_id' => $user_id,
            'updated_user_id' => $user_id,
        ];
    }

    public function active()
    {
        return $this->state(fn(array $attr) => ['media_is_active' => true, 'status_flag' => 1]);
    }

    public function inactive()
    {
        return $this->state(fn(array $attr) => ['media_is_active' => false, 'status_flag' => 0]);
    }
}
