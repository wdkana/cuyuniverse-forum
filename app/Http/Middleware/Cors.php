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
        $whitelist = ['localhost', '*.cuyuniverse.co', 'cuyuniverse.co', 'https://cuyuniverse.co', 'http://cuyuniverse.co'];
        $noWhiteList = '*';
        $cred = true;

        foreach ($browsers as $browser) {
            if (strpos($userAgent, $browser) !==  false) {
                $isBrowser = true;
                break;
            }
        }
        if ($isBrowser === true) {
            return $next($request)
                ->header('Access-Control-Allow-Origin', $whitelist)
                ->header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
                ->header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type')
                ->header('Access-Control-Allow-Credentials', $cred)
                ->header('max_age', 120);
        }
        return $next(abort(403, ''));
    }
}
