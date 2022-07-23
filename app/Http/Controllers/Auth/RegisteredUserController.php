<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     *
     * @return \Inertia\Response
     */
    public function create()
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request)
    {

        $forbidnames = ["admin", "dea", "afrizal", "administrator", "root", "support", "helper", "moderator", "ceo", "owner", "deaafrizal", "afrizaldea", "dea.afrizal", "afrizal.dea", "admin1", "admin2", "admin3", "cuyuniverse", "cuy universe", "cuyuniversity"];

        foreach ($forbidnames as $forbidname) {
            if (strpos($forbidname, strtolower($request->username)) !== false) {
                return to_route('outer.main');
                break;
            }
        }


        $request->validate([
            'username' => 'required|string|min:4|max:40|unique:users|alpha_dash',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'username' => $request->username,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        event(new Registered($user));

        // dihapus biar gak auto-login pasca register
        // Auth::login($user);

        return redirect(RouteServiceProvider::HOME);
    }
}
