<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Report>
 */
class ReportFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $reportable = $this->faker->randomElement([\App\Models\Event::class, \App\Models\Comment::class]);

        return [
            'user_id' => 1,
            'reportable_id' => $reportable::factory(),
            'reportable_type' => $reportable,
            'reason' => $this->faker->paragraph,
            'status' => $this->faker->randomElement(['pending', 'resolved', 'rejected']),
            'admin_notes' => $this->faker->optional()->sentence,
            'resolved_by' => $this->faker->optional()->numberBetween(1, 10),
            'resolved_at' => $this->faker->optional()->dateTimeThisMonth(),
            'status_flag' => $this->faker->randomElement([0, 1]),
            'sequence' => $this->faker->numberBetween(0, 100),
            'version' => 1,
            'created_user_id' => 1,
            'updated_user_id' => 1,
        ];
    }
}
