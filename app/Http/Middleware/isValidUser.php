<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class isValidUser
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        if ($request->token == null) {
            return abort(403);
        }

        $user_data_token = User::find(Auth::user()->id)->where('token', $request->token)->first();

        if ($user_data_token == null) {
            return abort(403);
        }
        if ($user_data_token->token !== $request->token) {
            return abort(403);
        }
        return $next($request);
    }
}
