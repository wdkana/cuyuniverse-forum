<?php

namespace App\Http\Controllers;

use App\Http\Middleware\isValidUser;
use App\Http\Resources\PostsCollection;
use App\Models\Comment;
use Inertia\Inertia;
use App\Models\Posts;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PostsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function index()
    {
        $posts = new PostsCollection(Posts::orderByDesc('id')->paginate(8));
        return Inertia::render('Posts', [
            'title' => "POSTS",
            'root' => "HOME",
            'description' => "Selamat Datang Di Cuy Universe Portal",
            'posts' => $posts,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('Dashboard/CreatePosts', [
            'page' => 'BUAT POSTING',
            'next' => 'POSTINGAN SAYA',
            'nextRoute' => 'posts.main'
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate(
            [
                'description' => 'required|string|min:4|max:200',
                'token' => 'required'
            ]
        );
        $posts = new Posts();
        $posts->description = $request->description;
        $posts->author = auth()->user()->username;
        $posts->user_id = auth()->user()->id;
        $posts->save();
        return to_route('posts.main')->with('message', 'Posting Berhasil');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Posts  $posts
     * @return \Illuminate\Http\Response
     */
    public function show()
    {
        $posts = Posts::orderByDesc('id')->where('author', auth()->user()->username)->with('comments')->get();
        return Inertia::render('Dashboard/MyPosts', [
            'data' => $posts,
            'page' => 'POSTINGAN SAYA',
            'next' => 'BUAT POSTINGAN',
            'nextRoute' => 'posts.create'
        ]);
    }

    public function storeComment(Request $request)
    {
        $request->validate(
            [
                'description' => 'required|string|min:2|max:80'
            ]
        );

        $comment = new Comment([
            'description' => $request->description,
            'commentartor' => auth()->user()->username
        ]);

        $post = Posts::find($request->post_id);

        $post->comments()->save($comment);

        return to_route('outer.byId', ['id' => $request->post_id])->with('message', 'Komentar telah dikirim');
    }

    public function edit(Posts $posts)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Posts  $posts
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Posts $posts)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Posts  $posts
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        Posts::where('id', $request->id)->delete();
        return to_route('posts.main');
    }
}
