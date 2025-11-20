<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\View>
 */
class ViewFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'event_id' => $this->faker->numberBetween(1, 10),
            'user_id' => 1,
            'view_count' => $this->faker->numberBetween(1, 1000),
            'last_viewed_at' => $this->faker->dateTimeThisMonth(),
            'first_viewed_at' => $this->faker->dateTimeThisMonth(),
            'session_id' => $this->faker->uuid,
            'ip_address' => $this->faker->ipv4,
            'user_agent' => $this->faker->userAgent,
            'source' => $this->faker->randomElement(['direct', 'google', 'facebook']),
            'daily_views' => $this->faker->numberBetween(1, 100),
            'weekly_views' => $this->faker->numberBetween(10, 500),
            'monthly_views' => $this->faker->numberBetween(50, 2000),
            'status_flag' => $this->faker->randomElement([0, 1]),
            'sequence' => $this->faker->numberBetween(0, 100),
            'version' => 1,
            'created_user_id' => 1,
            'updated_user_id' => 1,
        ];
    }
}
