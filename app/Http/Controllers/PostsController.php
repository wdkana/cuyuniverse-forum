<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\StoreCommentRequest;
use App\Http\Requests\StorePostsRequest;
use App\Http\Resources\PostsCollection;
use App\Models\Comment;
use App\Models\Like;
use App\Models\Posts;
use App\Models\SavedPosts;
use App\Models\User;
use App\Notifications\UserComment;
use App\Notifications\UserLike;
use App\Notifications\UserMentioned;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class PostsController extends Controller
{
    public function index()
    {
        return Inertia::render('Posts', [
            'title' => 'POSTS',
            'root' => 'HOME',
            'description' => 'Selamat Datang Di Cuy Universe Portal',
            'posts' => new PostsCollection(Posts::orderByDesc('id')->paginate(8)),
        ]);
    }
    public function store(StorePostsRequest $request)
    {
        if ($redirect = $this->checkRateLimiter('post', Config::get('rate-limit.post'))) {
            return $redirect;
        }
        $request->validated();
        $hashtag = Str::replace('#', '', $request->tags);

        $posts = new Posts();

        if ($request->hasFile('image')) {
            $fileName = Auth::user()->username . Str::random(60) . '.' . $request->image->getClientOriginalExtension();
            $request->file('image')->storeAs('images/posts', $fileName);
            $posts->image = $fileName;
        }

        $posts->description = $request->description;
        $posts->author = auth()->user()->username;
        $posts->user_id = auth()->user()->id;
        $posts->hashtag = $request->tags ? $hashtag : null;
        $posts->save();
        $this->mentionUsers($request->description, $posts);

        return to_route('posts.main')->with('message', 'Posting Berhasil');
    }

    public function show()
    {
        return Inertia::render('Dashboard/MyPosts', [
            'data' => Posts::orderByDesc('id')->where('author', auth()->user()->username)->with('comments')->get(),
            'page' => 'POSTINGAN SAYA',
            'next' => 'BUAT POSTINGAN',
            'nextRoute' => 'dash.main',
        ]);
    }

    public function storeComment(StoreCommentRequest $request)
    {
        $request->validated();

        $comment = new Comment([
            'description' => $request->description,
            'commentartor' => auth()->user()->username,
        ]);

        $post = Posts::find($request->post_id);

        if ($redirect = $this->checkRateLimiter('comment-in-' . $post->getKey(), Config::get('rate-limit.comment'))) {
            return $redirect;
        }

        $saveComment = $post->comments()->save($comment);

        $user = User::find($post->user_id);

        if (Auth::id() !== $post->user_id) {
            $user->notify(new UserComment($saveComment));
        }

        $this->mentionUsers($request->description, $post);

        return to_route('outer.byId', ['id' => $request->post_id])->with('message', 'Komentar telah dikirim');
    }

    public function storeLike(Request $request)
    {
        $postLiked = Like::where('post_id', $request->post_id)->where('user_id', Auth::user()->id)->first();

        if (!$postLiked) {
            $like = Like::create([
                'post_id' => $request->post_id,
                'user_id' => Auth::user()->id,
            ]);

            if (Auth::id() !== $like->post->users->id) {
                $like->post->users->notify(new UserLike($like));
            }

            return to_route('outer.byId', ['id' => $request->post_id])->with('message', 'Post telah dilike!');
        }
        $postLiked->delete();

        return to_route('outer.byId', ['id' => $request->post_id])->with('message', 'Post telah didislike!');
    }

    public function storeSavedPosts(Request $request)
    {
        $savedPosts = SavedPosts::where('post_id', $request->post_id)->where('user_id', Auth::user()->id)->first();

        if (!$savedPosts) {
            SavedPosts::create([
                'post_id' => $request->post_id,
                'user_id' => Auth::user()->id,
            ]);

            return to_route('outer.byId', ['id' => $request->post_id])->with('message', 'Post telah disimpan!');
        }
        $savedPosts->delete();

        return to_route('outer.byId', ['id' => $request->post_id])->with('message', 'Post telah dihapus!');
    }

    public function destroy()
    {
        Posts::where('id', request()->id)->where('user_id', Auth::user()->id)->delete();

        return to_route('posts.main');
    }

    public function mentionUsers(string $content, Posts $post)
    {
        $pattern = '/(?:^| )(@[A-Za-z0-9-_]+)/m';
        $mentionedUsers = [];

        $res = \preg_match_all($pattern, $content, $mentionedUsers);

        if (!$res || empty($mentionedUsers[1])) {
            return;
        }
        $mentionedUsers = \array_map(function ($username) {
            return Str::after($username, '@');
        }, $mentionedUsers[1]);

        $notifyUsers = User::whereIn('username', $mentionedUsers)->get();

        Notification::send($notifyUsers, new UserMentioned(Auth::user(), $post));
    }

    private function checkRateLimiter(string $postType, $perMinute = 5): \Illuminate\Http\RedirectResponse|null
    {
        $key = 'posts-store-{$postType}-' . Auth::id();
        if (RateLimiter::tooManyAttempts($key, $perMinute)) {
            return redirect()->back()->with('message', 'Too many attempts');
        }
        RateLimiter::hit($key);

        return null;
    }
}
