<?php

use App\Http\Controllers\MadingController;
use App\Http\Controllers\NewsController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// outer class
Route::get('/', [NewsController::class, 'showLatest'])->name('home');
Route::get('/mading', [MadingController::class, 'index'])->name('mading');
Route::get('/news', [NewsController::class, 'index'])->name('news');

// user authorized grup
Route::prefix('dashboard')->middleware(['auth', 'verified'])->group(
    function () {
        Route::get('/', function () {
            return Inertia::render('Dashboard/Index', [
                'title' => 'DASHBOARD'
            ]);
        })->name('dashboard');
        Route::get('/setting', function () {
            return Inertia::render('Dashboard/Setting', [
                'page' => 'SETTING',
                'next' => 'POSTINGAN SAYA',
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
