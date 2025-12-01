<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Notification>
 */
class NotificationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => 1,
            'event_id' => $this->faker->numberBetween(1, 10),
            'title' => $this->faker->sentence,
            'message' => $this->faker->paragraph,
            'is_read' => $this->faker->boolean,
            'send_date' => $this->faker->dateTimeThisMonth(),
            'read_at' => $this->faker->optional()->dateTimeThisMonth(),
            'recalled_at' => $this->faker->optional()->dateTimeThisMonth(),
            'type' => $this->faker->randomElement(['system', 'event', 'reminder', 'marketing']),
            'action_url' => $this->faker->url,
            'data' => json_encode(['foo' => 'bar']),
            'priority' => $this->faker->randomElement(['low', 'normal', 'high', 'urgent']),
            'status_flag' => $this->faker->randomElement([0, 1]),
            'sequence' => $this->faker->numberBetween(0, 100),
            'version' => 1,
            'created_user_id' => 1,
            'updated_user_id' => 1,
        ];
    }
}
