<?php

namespace Tests\Feature\Notification;

use App\Http\Controllers\PostsController;
use App\Models\Posts;
use App\Models\User;
use App\Notifications\UserMentioned;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Str;
use Tests\TestCase;

class MentionNotificationTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->actingAs($this->createUserForTest("test_user"));
    }

    public function createUserForTest($username)
    {
        return User::create([
            'username' => $username,
            'email' => fake()->safeEmail(),
            'email_verified_at' => now(),
            'password' => '$2y$10$kU.qEAgKyORo2jjiDE/svum3m.L/b5yqbhMCKpnkDhoNnoZrhGZei', // password
            'remember_token' => Str::random(10),
        ]);
    }

    public function test_mention_users()
    {
        Notification::fake();
        $usernames = collect(["@farel", "@ilham", "@windah"]);
        $notifiables = [];
        $usernames->map(function ($username) use (&$notifiables) {
            $cleanUsername = Str::after($username, '@');
            $notifiables[] = $this->createUserForTest($cleanUsername);
            return $cleanUsername;
        });

        $usernamesString = implode(", ", $usernames->toArray());
        $post = Posts::factory()->create();

        $controller = new PostsController();
        $controller->mentionUsers($usernamesString, $post);
        Notification::assertSentTo($notifiables, UserMentioned::class);
        Notification::assertCount($usernames->count());
    }

    public function test_mention_users_with_username_only_alpha_dash()
    {
        Notification::fake();
        $usernames = collect(["@farel123", "@ilham_god", "@windah-test", "@iniBreakRulesUsername*"]);
        $notifiables = [];
        $usernames->map(function ($username) use (&$notifiables) {
            $cleanUsername = Str::after($username, '@');
            $notifiables[] = $this->createUserForTest($cleanUsername);
            return $cleanUsername;
        });

        $usernamesString = implode(", ", $usernames->toArray());
        $post = Posts::factory()->create();

        $controller = new PostsController();
        $controller->mentionUsers($usernamesString, $post);

        $notified = array_slice($notifiables, 0, count($notifiables) - 1);
        Notification::assertSentTo($notified, UserMentioned::class);
        Notification::assertCount($usernames->count() - 1);
        Notification::assertNotSentTo($notifiables[$usernames->count() - 1], UserMentioned::class, 1);
    }
}
