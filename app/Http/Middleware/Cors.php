<?php

namespace App\Http\Middleware;

use Closure;
use Browser;
use Illuminate\Http\Request;

class Cors
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
        $userAgent = Browser::userAgent();
        $browsers = ['Mozilla', 'Firefox', 'Chrome', 'Edge', 'Safari'];
        $isBrowser = false;

        foreach ($browsers as $browser) {
            if (strpos($userAgent, $browser) !==  false) {
                $isBrowser = true;
                break;
            }
        }
        if ($isBrowser === true) {
            return $next($request)
                ->header('Access-Control-Allow-Origin', ['localhost', 'http://174.138.20.8'])
                ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
                ->header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type')
                ->header('max_age', 600);
        } else {
            return response('You cannot access this web!', 400);
        }
    }
}
