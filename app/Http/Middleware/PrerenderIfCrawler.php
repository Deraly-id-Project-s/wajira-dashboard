<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class PrerenderIfCrawler
{
    public function handle(Request $request, Closure $next)
    {
        $userAgent = $request->header('User-Agent');
        $isCrawler = preg_match('/bot|crawler|spider|slurp|facebookexternalhit/i', $userAgent);

        if ($request->isMethod('GET') && $isCrawler) {
            $url = 'https://service.prerender.io/' . $request->fullUrl();
            return redirect()->away($url);
        }

        return $next($request);
    }
}
