<?php

namespace Database\Factories;

use App\Models\Posts;
use App\Models\User;
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
    public function definition()
    {
        $post_id = Posts::pluck('id');
        $user_id = User::pluck('id');
        return [
            'description' => fake()->paragraph(1, true),
            'post_id' => fake()->randomElement($post_id),
            'user_id' => fake()->randomElement($user_id),
        ];
    }
}
