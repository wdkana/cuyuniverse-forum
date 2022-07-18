<?php

namespace App\Http\Controllers;

use App\Http\Resources\PostsCollection;
use Inertia\Inertia;
use App\Models\Posts;
use Illuminate\Http\Request;

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
            'description' => "Selamat Datang Di Cuy Universe Posts Portal",
            'posts' => $posts,
        ]);
    }

    public function search(Request $request)
    {
        $posts = Posts::search($request->text)->get();
        return Inertia::render('Posts', [
            'filteredNews' => $posts,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('Dashboard/CreateNews', [
            'page' => 'BUAT POSTING',
            'next' => 'POSTINGAN SAYA',
            'nextRoute' => 'my.posts'
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
                'title' => 'required|string|min:4|max:50',
                'description' => 'required|string|min:4|max:200',
                'category' => 'required|string|min:2|max:20'
            ]
        );
        $posts = new Posts();
        $posts->title = $request->title;
        $posts->description = $request->description;
        $posts->category = $request->category;
        $posts->author = auth()->user()->username;
        $posts->save();
        return to_route('my.posts')->with('message', 'Berita Berhasil Dibuat');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Posts  $posts
     * @return \Illuminate\Http\Response
     */
    public function show()
    {
        $posts = Posts::where('author', auth()->user()->username)->get();
        return Inertia::render('Dashboard/MyNews', [
            'data' => $posts,
            'page' => 'POSTINGAN SAYA',
            'next' => 'BUAT POSTINGAN',
            'nextRoute' => 'form.posts'
        ]);
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
        return to_route('my.posts');
    }
}
