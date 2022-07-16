<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class MadingController extends Controller
{
    public function index()
    {
        return Inertia::render('Mading/Index', [
            'title' => "MADING",
            'description' => "Mading ON!",
        ]);
    }
}
