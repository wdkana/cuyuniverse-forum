<?php

namespace App\Http\Controllers;

use App\Models\Posts;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Support\Str;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard/Index', [
            'title' => 'DASHBOARD'
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

    public function update_photo(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpg,png,jpeg,gif,svg|max:1000',
            'token' => 'required'
        ]);

        $users = new User();
        $user = $users->where('id', Auth::user()->id)->where('token', Auth::user()->token)->first();

        if ($request->hasFile('image')) {
            if ($user->image !== NULL) {
                Storage::delete('images/' . $user->image);
            }
            $fileName = Auth::user()->username . Str::random(60) . "." . $request->image->getClientOriginalExtension();
            $filePath = $request->file('image')->storeAs('images', $fileName);
            $user->image = $fileName;
        }
        $user->save();

        return to_route('dash.main')->with('message', 'Avatar berhasil diganti');
    }
}
