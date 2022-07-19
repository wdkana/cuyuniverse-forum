<?php

use App\Http\Controllers\AuthorController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PostsController;
use App\Http\Controllers\OuterController;
use App\Http\Controllers\CommentController;
use Illuminate\Support\Facades\Route;

// ..
// dont use PREFIX for this main routes!
// ..

// outer class

Route::controller(OuterController::class)->name('outer.')->group(
    function () {
        Route::get('/', 'index')->name('main');
        Route::get('/posts', 'PostsAll')->name('posts');
        Route::post('/posts', 'MorePosts')->name('posts.more');
        Route::get('/post/{id}', 'find')->name('byId');
    }
);

Route::controller(AuthorController::class)->name('author.')->group(
    function () {
        Route::get('/author/{author}', 'profile')->name('profile');
        Route::get('/cuypeople/status', 'userOnlineStatus')->name('status');
    }
);

Route::controller(CommentController::class)->name('comment.')->group(
    function () {
        Route::get('/comment/{post_id}', 'index')->name('main');
    }
);

// user dashboard authorized grup
Route::controller(DashboardController::class)->middleware(['auth', 'verified'])->name('dash.')->group(
    function () {
        Route::get('/dashboard', 'index')->name('main');
        Route::get('/dashboard/setting', 'setting')->name('setting');
    }
);

//user dashboard posts
Route::controller(PostsController::class)->middleware(['auth', 'verified'])->name('posts.')->group(
    function () {
        Route::get('/dashboard/posts', 'show')->name('main');
        Route::get('/dashboard/posts/create', 'create')->name('create');
        Route::post('/dashboard/posts', 'store')->name('store');
        Route::post('/dashboard/posts/delete', 'destroy')->name('remove');
    }
);

require __DIR__ . '/auth.php';
