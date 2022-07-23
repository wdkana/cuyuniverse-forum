<?php

namespace App\Http\Controllers;

use App\Http\Resources\PostsCollection;
use App\Models\Posts;
use App\Models\User;
use GuzzleHttp\Psr7\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class OuterController extends Controller
{
    public function index()
    {
        $posts = new PostsCollection(Posts::with(['comments', 'users:id,image'])->lazy()->shuffle()->take(4)->all());
        return Inertia::render('Home', [
            'title' => "HOME",
            'root' => "HOME",
            'description' => "Selamat Datang Di Cuy Universe Portal",
            'posts' => $posts,
        ]);
    }

    public function PostsAll()
    {
        $posts = new PostsCollection(Posts::orderByDesc('id')->with(['comments', 'users:id,image'])->paginate(12));

        return Inertia::render('Posts', [
            'title' => "POSTINGAN CUYPEOPLE",
            'root' => 'HOME',
            'description' => "Semua postingan dari CuyPeople tersedia disini",
            'posts' => $posts,
        ]);
    }

    public function find($post_id)
    {
        $posts = Posts::with('comments.users:username,image')->withCount('likes')->where('id', $post_id)->first();
        if ($posts == null) {
            return abort(404);
        }

        return Inertia::render('Post', [
            'posts' => $posts->only(['id', 'description', 'author', 'created_at', 'likes_count']),
            'comments' => $posts->comments,
            'author_image' => $posts->users->image,
            'title' => "Postingan Dari CuyPeople",
            'description' => "komentari postingan ini",
            'next' => 'HOME',
            'root' => 'HOME',
            'page' => 'POSTING COMMENT',
            'nextRoute' => 'outer.main'
        ]);
    }
}
