<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Posts;
use App\Models\SavedPosts;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

final class DashboardController extends Controller
{

    private function checkCliRateLimiter(string $postType, $perMinute = 4): \Illuminate\Http\RedirectResponse|null
    {
        $key = "cli-store-{$postType}-" . Auth::id();
        if (RateLimiter::tooManyAttempts($key, $perMinute)) {
            return to_route('dash.integration')->with('message', 'Silahkan coba lagi dalam 1 menit kedepan');
        }

        RateLimiter::hit($key);
        return null;
    }

    public function index()
    {
        $user = User::find(Auth::user()->id);

        if ($user->token == null) {
            $user->token = Str::random(60);
            $user->save();
            return back();
        }

        return Inertia::render('Dashboard/Index', [
            'title' => 'DASHBOARD',
        ]);
    }

    public function integration()
    {
        return Inertia::render('Dashboard/Integration', [
            'title' => 'CUYUNIVERSE INTEGRATION',
            'next' => 'DASHBOARD',
            'nextRoute' => 'dash.main',
        ]);
    }

    public function setting()
    {
        return Inertia::render('Dashboard/Setting', [
            'title' => 'USER PROFILE',
            'next' => 'DASHBOARD',
            'nextRoute' => 'dash.main',
        ]);
    }

    public function changePassword()
    {
        return Inertia::render('Dashboard/ChangePassword', [
            'title' => 'CHANGE PASSWORD',
            'next' => 'PROFILE',
            'nextRoute' => 'dash.setting.profile',
        ]);
    }

    public function notification()
    {
        $notifications = Auth::user()->unreadNotifications;

        return Inertia::render('Dashboard/Notification', [
            'notifications' => $notifications,
            'title' => 'NOTIFICATION',
            'next' => 'DASHBOARD',
            'nextRoute' => 'dash.main',
        ]);
    }

    public function markNotificationAsRead($id)
    {
        $notification = Auth::user()->notifications->find($id);

        $notification->markAsRead();
    }

    public function showSavedPost()
    {
        $savedPosts = SavedPosts::orderByDesc('id')->where('user_id', auth()->user()->id)->with(['posts.users', 'comments'])->get();
        return Inertia::render('Dashboard/SavedPosts', [
            'data' => $savedPosts,
            'title' => 'SAVED POST',
            'page' => 'Postingan yang anda simpan',
            'next' => 'BUAT POSTINGAN',
            'nextRoute' => 'posts.main'
        ]);
    }

    public function stats()
    {
        $posts = Posts::where('author', auth()->user()->username)->withCount('likes')->get();
        $likes_count = 0;

        foreach ($posts as $post) {
            $likes_count += $post->likes_count;
        }

        return Inertia::render('Dashboard/Stats', [
            'title' => 'STATISTICS',
            'next' => 'DASHBOARD',
            'nextRoute' => 'dash.main',
            'likes_count' => $likes_count,
            'posts_count' => $posts->count(),
        ]);
    }

    public function update_photo(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpg,png,jpeg,gif|max:1048',
            'token' => 'required',
        ]);

        $users = new User();
        $user = $users->where('id', Auth::user()->id)->where('token', Auth::user()->token)->first();

        if ($request->hasFile('image')) {
            if (null !== $user->image) {
                Storage::delete('images/' . $user->image);
            }
            $fileName = Auth::user()->username . Str::random(60) . '.' . $request->image->getClientOriginalExtension();
            $filePath = $request->file('image')->storeAs('images', $fileName);
            $user->image = $fileName;
        }
        $user->save();

        return to_route('dash.setting.profile')->with('message', 'Avatar berhasil diganti');
    }

    public function update_username(Request $request)
    {
        $request->validate([
            'username' => 'required|string|min:4|max:40|unique:users|alpha_dash',
            'token' => 'required',
        ]);

        $users = User::find(Auth::user()->id)->where('token', $request->token);
        $users->update([
            'username' => $request->username,
        ]);

        return to_route('dash.main')->with('message', 'Username berhasil diganti');
    }

    public function updatePassword(Request $request)
    {
        $request->validate([
            'oldPassword' => 'required|current_password:web',
            'newPassword' => 'required|min:8|confirmed|different:oldPassword',
            'token' => 'required',
        ]);

        $users = User::find(Auth::user()->id)->where('token', $request->token);
        $users->update([
            'password' => Hash::make($request->newPassword),
        ]);

        return to_route('dash.setting.profile')->with('message', 'Password berhasil diganti');
    }

    public function cli_integration(Request $request)
    {
        if ($redirect = $this->checkCliRateLimiter("cli", Config::get('rate-limit.cli'))) {
            return $redirect;
        }
        $request->validate(
            [
                'isActive' => 'required|boolean',
            ],
        );

        $users = User::find(Auth::user()->id)->where('token', $request->token);
        $users->update([
            'secret' => $request->isActive ? Str::random(20) : NULL,
            'cuycli' => $request->isActive ? 1 : 0
        ]);

        return redirect()->back()->with('message', $request->isActive ? 'Integrasi Cuy CLI berhasil diaktifkan ✔' : 'Integrasi Cuy CLI berhasil di non-aktifkan 🔻');
    }
}
