<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Posts>
 */
class PostsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $id = User::pluck('id');
        return [
            'description' => fake()->paragraph(1, true),
            'user_id' => fake()->randomElement($id),
            'author' => 'testing',
        ];
    }
}
