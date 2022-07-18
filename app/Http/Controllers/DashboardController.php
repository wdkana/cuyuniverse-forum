<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard/Index', [
            'title' => 'DASHBOARD'
        ]);
    }

    public function setting()
    {
        return Inertia::render('Dashboard/Setting', [
            'page' => 'SETTING',
            'next' => 'POSTINGAN SAYA',
            'nextRoute' => 'posts.main'
        ]);
    }
}
