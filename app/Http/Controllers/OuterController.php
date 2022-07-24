<?php

namespace App\Http\Controllers;

use App\Http\Resources\PostResource;
use App\Http\Resources\PostsCollection;
use App\Models\Posts;
use App\Models\SavedPosts;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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

  public function Teams()
  {
    return Inertia::render('Teams', [
      'title' => "TEAMS",
      'root' => "TEAMS",
      'description' => "Cuy Universe Teams",
    ]);
  }

  public function postsAll(Request $request)
  {
    $posts = Posts::query()->with(['comments', 'users:id,image'])
      ->when($request->search, fn ($q, $key) => $q->where('description', 'like', "%{$key}%"))
      ->when($request->filtered, function ($q, $value) {
        switch ($value) {
          case 'latest':
            $q->latest();
            break;
          case 'oldest':
            $q->oldest();
            break;

          default:
            abort(404);
            break;
        }
      });

    return inertia('Posts', [
      'title' => "POSTINGAN CUYPEOPLE",
      'root' => 'HOME',
      'description' => "Semua postingan dari CuyPeople tersedia disini",
      'posts' => PostResource::collection($posts->latest()->paginate()->withQueryString()),
      'filter' => $request->only(['search', 'page'])
    ]);
  }

  public function find($post_id)
  {
    $posts = Posts::with('comments.users:username,image')->withCount('likes')->where('id', $post_id)->first();

    if ($posts == null) {
      return abort(404);
    }

    if (Auth::user()) {
      $isSavedPost = SavedPosts::where('post_id', $post_id)->where('user_id', Auth::user()->id)->get();
    }

    return Inertia::render('Post', [
      'posts' => $posts->only(['id', 'description', 'image', 'author', 'created_at', 'likes_count']),
      'is_saved_post' => Auth::user() ? !count($isSavedPost) == 0 : null,
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

  public function MorePosts(Request $request)
  {
    $posts = Posts::query()
      ->when($request->keyword, fn ($q, $key) => $q->where('description', 'like', "%{$key}%"))
      ->with(['comments', 'users:id,image'])
      ->paginate(12);

    return response()->json($posts, 200);
  }
}
