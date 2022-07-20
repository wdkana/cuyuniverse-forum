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
        $data = Posts::orderByDesc('id')->where('author', $author)->paginate(10);
        return Inertia::render('Author', [
            'title' => $author,
            'root' => "HOME",
            'description' => $author,
            'posts' => $data,
        ]);
    }

    public $data = [];

    public function userOnlineStatus()
    {
        $users = User::with(['posts', 'comments'])->where('email_verified_at', '!=', 'NULL')->get();
        $user = $users->map(function ($items) {
            $data['username'] = $items->username;
            $data['is_online'] = Cache::has('user-is-online-' . $items->id);
            $data['last_seen'] = Carbon::parse($items->last_seen)->diffForHumans();
            $data['total_post'] = count($items->posts);
            $data['total_comment'] = count($items->comments);
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
