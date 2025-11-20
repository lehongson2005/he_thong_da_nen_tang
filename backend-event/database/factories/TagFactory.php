<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Tag>
 */
class TagFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->word,
            'slug' => $this->faker->unique()->slug,
            'color' => $this->faker->hexColor,
            'icon' => $this->faker->word,
            'type' => $this->faker->randomElement(['event', 'blog', 'general']),
            'is_active' => $this->faker->boolean,
            'is_featured' => $this->faker->boolean,
            'meta_title' => $this->faker->sentence,
            'meta_description' => $this->faker->paragraph,
            'usage_count' => $this->faker->numberBetween(0, 1000),
            'status_flag' => $this->faker->randomElement([0, 1]),
            'sequence' => $this->faker->numberBetween(0, 100),
            'version' => 1,
            'created_user_id' => 1,
            'updated_user_id' => 1,
        ];
    }
}
