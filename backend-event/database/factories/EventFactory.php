<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Event>
 */
class EventFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => $this->faker->sentence,
            'description' => $this->faker->paragraph,
            'event_type' => $this->faker->randomElement(['world', 'vietnam']),
            'date_gregorian' => $this->faker->date(),
            'date_lunar' => $this->faker->date(),
            'address' => $this->faker->address,
            'latitude' => $this->faker->latitude,
            'longitude' => $this->faker->longitude,
            'city' => $this->faker->city,
            'country' => $this->faker->country,
            'image' => $this->faker->imageUrl(),
            'gallery' => json_encode([$this->faker->imageUrl(), $this->faker->imageUrl()]),
            'category_id' => $this->faker->numberBetween(1, 10),
            'status' => $this->faker->randomElement(['draft', 'published', 'cancelled']),
            'privacy' => $this->faker->randomElement(['public', 'private', 'friends']),
            'start_time' => $this->faker->time(),
            'end_time' => $this->faker->time(),
            'is_all_day' => $this->faker->boolean,
            'capacity' => $this->faker->numberBetween(50, 500),
            'price' => $this->faker->randomFloat(2, 0, 1000),
            'currency' => 'VND',
            'organizer_name' => $this->faker->name,
            'organizer_phone' => $this->faker->phoneNumber,
            'organizer_email' => $this->faker->email,
            'status_flag' => $this->faker->randomElement([0, 1]),
            'sequence' => $this->faker->numberBetween(0, 100),
            'version' => 1,
            'created_user_id' => 1,
            'updated_user_id' => 1,
        ];
    }
}
