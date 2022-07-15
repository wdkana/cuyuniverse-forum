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
        $whitelist = ['localhost', 'http://174.138.20.8', 'http://cuyuniverse.co', 'http://www.cuyuniverse.co', 'https://cuyuniverse.co', 'https://www.cuyuniverse.co', 'http://137.184.248.42', '137.184.248.42', '174.138.20.8', '*.cuyuniverse.co', 'http://*.cuyuniverse.co', 'https://*.cuyuniverse.co'];
        $normal = '*';

        foreach ($browsers as $browser) {
            if (strpos($userAgent, $browser) !==  false) {
                $isBrowser = true;
                break;
            }
        }
        if ($isBrowser === true) {
            return $next($request)
                ->header('Access-Control-Allow-Origin', $normal)
                ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
                ->header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type')
                ->header('Access-Control-Allow-Credentials', true)
                ->header('max_age', 120);
        }
        return $next(abort(403, ''));
    }
}
