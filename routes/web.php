<?php

use App\Http\Controllers\NewsController;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// outer class
Route::get('/', [NewsController::class, 'showLatest']);
Route::get('/news', [NewsController::class, 'index'])->name('news');

// user authorized grup
Route::prefix('dashboard')->middleware(['auth', 'verified'])->group(
    function () {
        Route::get('/', function () {
            return Inertia::render('Dashboard/Index');
        })->name('dashboard');
        Route::get('/setting', function () {
            return Inertia::render('Setting');
        })->name('setting');
        Route::get('/news', [NewsController::class, 'show'])->name('my.news');
        Route::post('/news', [NewsController::class, 'store'])->name('create.news');
        Route::get('/news/create', [NewsController::class, 'create'])->name('form.news');
    }
);


//FOR EMAIL

// Route::get('/email/verify', function () {
//     return view('auth.verify-email');
// })->middleware('auth')->name('verification.notice');

// Route::get('/email/verify/{id}/{hash}', function (EmailVerificationRequest $request) {
//     $request->fulfill();

//     return redirect('/home');
// })->middleware(['auth', 'signed'])->name('verification.verify');

// Route::post('/email/verification-notification', function (Request $request) {
//     $request->user()->sendEmailVerificationNotification();

//     return back()->with('message', 'Verification link sent!');
// })->middleware(['auth', 'throttle:6,1'])->name('verification.send');

require __DIR__ . '/auth.php';
