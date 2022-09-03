<?php

use App\Http\Controllers\AuthorController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PostsController;
use App\Http\Controllers\OuterController;
use Illuminate\Support\Facades\Route;

// ..
// dont use PREFIX for this main routes!
// ..

// outer class

Route::controller(OuterController::class)->name('outer.')->group(
    function () {
        Route::get('/', 'index')->name('main')->middleware('throttle:25,1');
        Route::get('/teams', 'Teams')->name('teams');
        Route::get('/post/{id}', 'find')->name('byId');
    }
);

Route::controller(AuthorController::class)->name('author.')->middleware('throttle:30,1')->group(
    function () {
        Route::get('/author/{author}', 'profile')->name('profile');
        Route::get('/cuypeople/status', 'userOnlineStatus')->name('status');
    }
);

// user dashboard authorized grup

Route::middleware(['auth', 'verified'])->group(function () {
    Route::controller(DashboardController::class)->name('dash.')->group(
        function () {
            Route::get('/dashboard', 'index')->name('main');
            Route::get('/dashboard/notif', 'notification')->name('notif');
            Route::get('/dashboard/saved-post', 'showSavedPost')->name('saved.post');
            Route::get('/dashboard/manage-posts', 'manage_posts')->name('manage.posts');
            Route::get('/dashboard/setting-profile', 'setting')->name('setting.profile');
            Route::get('/dashboard/stats', 'stats')->name('stats');
            Route::get('/dashboard/integration', 'integration')->name('integration');
            Route::put('/dashboard/update-username', 'updateUsername')->name('update.username')->middleware('isValidUser');
            Route::get('/dashboard/mark-notification-as-read/{id}', 'markNotificationAsRead')->name('notif.mark-as-read')->middleware('isValidUser');
            Route::get('/dashboard/change-password', 'changePassword')->name('change.password');
            Route::put('/dashboard/update-password', 'updatePassword')->name('update.password')->middleware('isValidUser');
            Route::post('/dashboard/photo', 'updatePhoto')->name('update.photo')->middleware('isValidUser');
            Route::put('/dashboard/integration/cuy-cli', 'cli_integration')->name('integration.cli')->middleware('isValidUser');
        }
    );

    //user dashboard posts
    Route::controller(PostsController::class)->name('posts.')->group(
        function () {
            Route::get('/dashboard/manage-posts/posts', 'show')->name('main');
            Route::post('/dashboard/manage-posts/posts', 'store')->name('store')->middleware('isValidUser');
            Route::post('/dashboard/manage-posts/posts/delete', 'destroy')->name('remove')->middleware('isValidUser');
            Route::post('/post/comment', 'storeComment')->name('storeComment')->middleware('isValidUser');
            Route::post('/post/like/love', 'storeLike')->name('storeLike')->middleware('isValidUser');
            Route::post('/post/saved-post/saved', 'storeSavedPosts')->name('storeSavedPosts')->middleware('isValidUser');
        }
    );
});


require __DIR__ . '/auth.php';
