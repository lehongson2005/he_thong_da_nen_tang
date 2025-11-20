<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Comment>
 */
class CommentFactory extends Factory
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
            'content' => $this->faker->paragraph,
            'image' => $this->faker->imageUrl(),
            'emoji' => $this->faker->randomElement(['😀', '😂', '😍', '🤔', '😢']),
            'parent_id' => null,
            'status' => $this->faker->randomElement(['pending', 'approved', 'rejected']),
            'moderation_notes' => $this->faker->sentence,
            'like_count' => $this->faker->numberBetween(0, 100),
            'reply_count' => $this->faker->numberBetween(0, 20),
            'status_flag' => $this->faker->randomElement([0, 1]),
            'sequence' => $this->faker->numberBetween(0, 100),
            'version' => 1,
            'created_user_id' => 1,
            'updated_user_id' => 1,
        ];
    }
}
