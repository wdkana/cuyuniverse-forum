<?php

namespace App\Http\Controllers;

use App\Http\Resources\NewsCollection;
use Inertia\Inertia;
use App\Models\News;
use Illuminate\Http\Request;

class NewsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $news = new NewsCollection(News::orderByDesc('id')->paginate(8));
        return Inertia::render('News', [
            'title' => "CUY UNIVERSE HOME",
            'description' => "Selamat Datang Di Cuy Universe News Portal",
            'news' => $news,
        ]);
    }

    public function showLatest()
    {
        $news = new NewsCollection(News::lazy()->take(4)->shuffle()->all());
        return Inertia::render('Home', [
            'title' => "CUY UNIVERSE HOME",
            'description' => "Selamat Datang Di Cuy Universe News Portal",
            'news' => $news,
        ]);
    }



    public function search(Request $request)
    {
        $news = News::search($request->text)->get();
        return Inertia::render('News', [
            'filteredNews' => $news,
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
            'page' => 'BUAT BERITA',
            'next' => 'BERITA SAYA',
            'nextRoute' => 'my.news'
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
        $news = new News();
        $news->title = $request->title;
        $news->description = $request->description;
        $news->category = $request->category;
        $news->author = auth()->user()->username;
        $news->save();
        return to_route('my.news')->with('message', 'Berita Berhasil Dibuat');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\News  $news
     * @return \Illuminate\Http\Response
     */
    public function show()
    {
        $news = News::where('author', auth()->user()->username)->get();
        return Inertia::render('Dashboard/MyNews', [
            'data' => $news,
            'page' => 'BERITA SAYA',
            'next' => 'BUAT BERITA',
            'nextRoute' => 'form.news'
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\News  $news
     * @return \Illuminate\Http\Response
     */
    public function edit(News $news)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\News  $news
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, News $news)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\News  $news
     * @return \Illuminate\Http\Response
     */
    public function destroy(News $news)
    {
        //
    }
}
