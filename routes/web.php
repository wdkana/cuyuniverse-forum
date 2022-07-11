<?php

use App\Http\Controllers\NewsController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [NewsController::class, 'index']);

//user authorized grup
Route::prefix('dashboard')->group(
    function () {
        Route::get('/', function () {
            return Inertia::render('Dashboard');
        })->name('dashboard');
        Route::get('/setting', function () {
            return Inertia::render('Setting');
        })->name('setting');
        Route::get('/news', [NewsController::class, 'show'])->name('my.news');
        Route::post('/news', [NewsController::class, 'store'])->name('create.news');
        Route::get('/news/create', [NewsController::class, 'create'])->name('form.news');
    }
);

//middleware(['auth', 'verified'])

require __DIR__ . '/auth.php';
