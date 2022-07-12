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
            'page' => 'Buat Berita'
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
                'title' => 'required|string',
                'description' => 'required|string|max:50|min:4',
                'category' => 'required|string|max:20|min:2'
            ]
        );
        $news = new News();
        $news->title = $request->title;
        $news->description = $request->description;
        $news->category = $request->category;
        $news->author = auth()->user()->email;
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
        $news = News::where('author', auth()->user()->email)->get();
        return Inertia::render('Dashboard/MyNews', [
            'data' => $news,
            'page' => 'Berita Saya'
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
