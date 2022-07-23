<?php

namespace App\Http\Controllers;

use App\Http\Resources\PostsCollection;
use App\Models\Posts;
use Illuminate\Http\Request;
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
      'posts' => $posts->only(['id', 'description', 'image', 'author', 'created_at', 'likes_count']),
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
    $posts = Posts::when(!is_null($request->keyword), function ($q) use ($request) {
      $q->where('description', 'like', "%$request->keyword%");
    })
      ->with(['comments', 'users:id,image'])
      ->paginate(12);

    return response()->json($posts, 200);
  }
}
