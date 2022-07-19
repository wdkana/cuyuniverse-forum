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
        $posts = new PostsCollection(Posts::lazy()->shuffle()->take(4)->all());
        return Inertia::render('Home', [
            'title' => "HOME",
            'root' => "HOME",
            'description' => "Selamat Datang Di Cuy Universe Portal",
            'posts' => $posts,
        ]);
    }

    public function PostsAll()
    {
        $posts = new PostsCollection(Posts::orderByDesc('id')->paginate(10));
        return Inertia::render('Posts', [
            'title' => "POSTINGAN CUYPEOPLE",
            'root' => 'HOME',
            'description' => "Semua postingan dari CuyPeople tersedia disini",
            'posts' => $posts,
        ]);
    }
}
