<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create a main user first
        $user = \App\Models\User::factory()->create([
            'name' => 'Hong Son',
            'email' => 'hongson@example.com',
            'password' => \Illuminate\Support\Facades\Hash::make('1'),
            'role' => 'admin',
            'created_user_id' => 1,
            'updated_user_id' => 1,
        ]);

        \App\Models\User::factory(10)->create();
        \App\Models\Category::factory(10)->create();
        \App\Models\Tag::factory(10)->create();
        \App\Models\Event::factory(10)->create();
        \App\Models\Comment::factory(10)->create();
        \App\Models\Favorite::factory(10)->create();
        \App\Models\Notification::factory(10)->create();
        \App\Models\Report::factory(10)->create();
        \App\Models\Setting::factory(10)->create();
        \App\Models\View::factory(10)->create();
        \App\Models\ActivityLog::factory(10)->create();
        $this->call(MediaBannerSeeder::class);
    }
}
