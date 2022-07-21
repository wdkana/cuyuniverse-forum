<?php

namespace App\Http\Controllers;

use App\Http\Resources\PostsCollection;
use App\Models\Comment;
use App\Models\Posts;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard/Index', [
            'title' => 'DASHBOARD',
        ]);
    }

    public function notification()
    {
        $posts = Posts::where('user_id', Auth::user()->id)->has('comments', '>', 0)->with('comments')->get()->map(function ($item) {
            return $item->comments;
        });

        return Inertia::render('Dashboard/Notification', [
            'page' => 'COMMENTS',
            'next' => 'MANAGE MY POST',
            'nextRoute' => 'dash.main',
            'comments' => $posts,
        ]);
    }

    public function manage_posts()
    {
        return Inertia::render('Dashboard/PostManagement', [
            'title' => "MANAGE MY POST",
            'nextRoute' => 'dash.main'
        ]);
    }
}
