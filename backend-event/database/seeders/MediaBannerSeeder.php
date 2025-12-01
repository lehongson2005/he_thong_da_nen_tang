<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\MediaBanner;

class MediaBannerSeeder extends Seeder
{
    public function run(): void
    {
        // Tạo 25 banner ngẫu nhiên
        MediaBanner::factory()
            ->count(20)
            ->create();

        // Hoặc tạo với các loại banner khác nhau
        // MediaBanner::factory()
        //     ->count(5)
        //     ->currentlyActive()
        //     ->highPriority()
        //     ->forHomepage()
        //     ->create();

        // MediaBanner::factory()
        //     ->count(3)
        //     ->academicEvent()
        //     ->active()
        //     ->create();

        // MediaBanner::factory()
        //     ->count(3)
        //     ->culturalEvent()
        //     ->active()
        //     ->create();

        // MediaBanner::factory()
        //     ->count(2)
        //     ->admission()
        //     ->active()
        //     ->create();

        // MediaBanner::factory()
        //     ->count(2)
        //     ->sports()
        //     ->active()
        //     ->create();

        // MediaBanner::factory()
        //     ->count(3)
        //     ->upcoming()
        //     ->create();

        // MediaBanner::factory()
        //     ->count(5)
        //     ->expired()
        //     ->create();
    }
}