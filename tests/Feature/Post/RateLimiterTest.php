<?php

namespace Tests\Feature\Post;

use App\Models\Posts;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Str;
use Tests\TestCase;

class RateLimiterTest extends TestCase
{
    use RefreshDatabase;

    private User $authenticatedUser;

    public function setUp(): void
    {
        parent::setUp();
        /**
         * @var User $user
         */
        $user = User::factory()->createOne();
        $user->token = Str::random(60);
        $user->save();

        $this->actingAs($user);
        $this->authenticatedUser = $user;
    }

    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_should_rate_limited_for_post()
    {
        Config::set('rate-limit.post', 1);
        $data = [
            'token' => $this->authenticatedUser->token,
            'description' => 'test post',
        ];
        $storePost = function () use ($data) {
            return $this->post(route('posts.store'), $data);
        };
        $storePost->call($this);
        /**
         * @var \Illuminate\Testing\TestResponse $response
         */
        $response = $storePost->call($this);
        $response->assertRedirect(url('/'));
        $response->assertSessionHas("message", "Too many attempts");
    }

    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_should_rate_limited_for_comment_in_same_post()
    {
        Config::set('rate-limit.comment', 1);
        $post = Posts::factory()->create();
        $data = [
            'token' => $this->authenticatedUser->token,
            'description' => 'test comment in post ' . $post->getKey(),
            'post_id' => $post->getKey(),
        ];
        $storeComment = function () use ($data) {
            return $this->post(route('posts.storeComment'), $data);
        };
        $storeComment->call($this);
        /**
         * @var \Illuminate\Testing\TestResponse $response
         */
        $response = $storeComment->call($this);
        $response->assertRedirect(url('/'));
        $response->assertSessionHas("message", "Too many attempts");
    }

    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_should_not_rate_limited_for_comment_in_different_post()
    {
        Config::set('rate-limit.comment', 1);
        $post1 = Posts::factory()->create();
        $post2 = Posts::factory()->create();

        $data1 = [
            'token' => $this->authenticatedUser->token,
            'description' => 'test comment in post ' . $post1->getKey(),
            'post_id' => $post1->getKey(),
        ];
        $data2 = [
            'token' => $this->authenticatedUser->token,
            'description' => 'test comment in post ' . $post2->getKey(),
            'post_id' => $post2->getKey(),
        ];

        $storeComment = function ($data) {
            return $this->post(route('posts.storeComment'), $data);
        };
        $successMessage = 'Komentar telah dikirim';
        /**
         * @var \Illuminate\Testing\TestResponse $response1
         */
        $response1 = $storeComment->call($this, $data1);
        $response1->assertRedirect(route('outer.byId', ['id' => $post1->getKey()]));
        $response1->assertSessionHas("message", $successMessage);

        /**
         * @var \Illuminate\Testing\TestResponse $response2
         */
        $response2 = $storeComment->call($this, $data2);
        $response2->assertRedirect(route('outer.byId', ['id' => $post2->getKey()]));
        $response2->assertSessionHas("message", $successMessage);
    }
}
