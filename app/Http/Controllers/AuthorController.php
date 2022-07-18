<?php

namespace App\Http\Controllers;

use App\Models\Posts;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AuthorController extends Controller
{
    public function profile($author)
    {
        $data = Posts::orderByDesc('id')->where('author', $author)->paginate(10);
        return Inertia::render('Author', [
            'title' => $author,
            'root' => "HOME",
            'description' => "Profile $author",
            'posts' => $data,
        ]);
    }
}
