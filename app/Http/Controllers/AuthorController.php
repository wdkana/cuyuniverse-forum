<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
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


    protected $filtered_user = [];
    public function userOnlineStatus(Request $request)
    {
        $users = User::query()->withCount(['posts', 'comments'])->when($request->search, fn ($q, $key) => $q->where('username', 'like', "%{$key}%"))->where('email_verified_at', '!=', NULL);


        $user = $users->latest()->paginate(8)->map(function ($items) {
            $this->filtered_user['username'] = $items->username;
            $this->filtered_user['is_online'] = Cache::has('user-is-online-' . $items->id);
            $this->filtered_user['last_seen'] = Carbon::parse($items->last_seen)->diffForHumans();
            $this->filtered_user['total_post'] = $items->posts_count;
            $this->filtered_user['total_comment'] = $items->comments_count;
            $this->filtered_user['author_image'] = $items->image;
            return $this->filtered_user;
        });

        return Inertia::render('AuthorList', [
            "title" => "CUY PEOPLE STATS",
            'root' => "HOME",
            "description" => "Pengguna aktif dan non-aktif di Cuy Universe",
            "data" => $user,
            "meta" => UserResource::collection($users->latest()->paginate(8)),
            "filter" => $request->only(['search', 'page'])
        ]);
    }
}
