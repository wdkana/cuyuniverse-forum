<?php

use App\Http\Controllers\NewsController;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// outer class
Route::get('/', [NewsController::class, 'showLatest'])->middleware('throttle:50,1');
Route::get('/news', [NewsController::class, 'index'])->name('news')->middleware('throttle:50,1');;

// user authorized grup
Route::prefix('dashboard')->middleware(['auth', 'verified'])->group(
    function () {
        Route::get('/', function () {
            return Inertia::render('Dashboard/Index');
        })->name('dashboard');
        Route::get('/setting', function () {
            return Inertia::render('Dashboard/Setting', [
                'page' => 'Setting',
                'next' => 'Berita Saya',
                'nextRoute' => 'my.news'
            ]);
        })->name('setting');
        Route::get('/news', [NewsController::class, 'show'])->name('my.news');
        Route::post('/news', [NewsController::class, 'store'])->name('create.news');
        Route::get('/news/create', [NewsController::class, 'create'])->name('form.news');
        Route::post('/news/delete', [NewsController::class, 'destroy'])->name('delete.news');
    }
);

require __DIR__ . '/auth.php';
