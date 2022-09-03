<?php

namespace Database\Seeders;

use App\Models\Comment;
use Illuminate\Database\Seeder;
use App\Models\Posts;
use App\Models\User;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        User::create(
            [
                'username' => 'deaafrizal',
                'email' => 'aphrodeosubarno@gmail.com',
                'email_verified_at' => now(),
                'password' => bcrypt('12345')
            ]
        );
        User::factory()->count(20)->create();
        Posts::factory()->count(100)->create();
        Comment::factory()->count(30)->create();
    }
}
