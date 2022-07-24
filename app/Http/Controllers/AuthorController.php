<?php

namespace App\Http\Controllers;

use App\Models\Posts;
use App\Models\User;
use Inertia\Inertia;
use Carbon\Carbon;
use Illuminate\Support\Facades\Cache;

class AuthorController extends Controller
{
    public function profile($author)
    {
        $user = User::where('username', $author)->get();
        if ($user == null) {
            return abort(404);
        }
        $posts = Posts::orderByDesc('id')->where('author', $author)->with('comments')->paginate(10);
        return Inertia::render('Author', [
            'title' => $author,
            'root' => "HOME",
            'author' => $user[0]->username,
            'author_image' => $user[0]->image,
            'is_online' => $user[0]->token ? true : false,
            'posts' => $posts
        ]);
    }

    public $data = [];

    public function userOnlineStatus()
    {
        $users = User::where('email_verified_at', '!=', NULL)->with(['posts', 'comments'])->get();
        $user = $users->map(function ($items) {
            $data['username'] = $items->username;
            $data['is_online'] = Cache::has('user-is-online-' . $items->id);
            $data['last_seen'] = Carbon::parse($items->last_seen)->diffForHumans();
            $data['total_post'] = count($items->posts);
            $data['total_comment'] = count($items->comments);
            $data['author_image'] = $items->image;
            return $data;
        });

        return Inertia::render('AuthorList', [
            "title" => "CUY PEOPLE STATS",
            'root' => "HOME",
            "description" => "Pengguna aktif dan non-aktif di Cuy Universe",
            "data" => $user
        ]);
    }
}
