<?php

namespace App\Http\Controllers;

use App\Models\Posts;
use App\Models\User;
use Inertia\Inertia;
use Carbon\Carbon;
use Illuminate\Support\Facades\Cache;
use Illuminate\Http\Request;

class AuthorController extends Controller
{
    public function profile($author)
    {

        $user = User::where('username', $author)->first();

        if ($user == null) {
            return abort(404);
        }

        $posts = Posts::orderByDesc('id')->where('author', $author)->with('comments')->paginate(10);
        return Inertia::render('Author', [
            'title' => $author,
            'root' => "HOME",
            'author' => $user->username,
            'author_image' => $user->image,
            'is_online' => $user->token ? true : false,
            'posts' => $posts
        ]);
    }

    public $data = [];

    public function userOnlineStatus(Request $request)
    {
        $users = User::withCount(['posts', 'comments'])->when($request->search, fn ($q, $key) => $q->where('username', 'like', "%{$key}%"))->where('email_verified_at', '!=', NULL)->paginate(24);
        $user = $users->map(function ($items) {
            $data['username'] = $items->username;
            $data['is_online'] = Cache::has('user-is-online-' . $items->id);
            $data['last_seen'] = Carbon::parse($items->last_seen)->diffForHumans();
            $data['total_post'] = $items->posts_count;
            $data['total_comment'] = $items->comments_count;
            $data['author_image'] = $items->image;
            return $data;
        });

        return Inertia::render('AuthorList', [
            "title" => "CUY PEOPLE STATS",
            'root' => "HOME",
            "description" => "Pengguna aktif dan non-aktif di Cuy Universe",
            "users" => $users,
            "data" => $user,
            "filter" => $request->only(['search', 'page'])
        ]);
    }
}
