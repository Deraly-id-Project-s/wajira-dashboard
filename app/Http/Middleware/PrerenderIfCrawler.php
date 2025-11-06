<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use GuzzleHttp\Client;

class PrerenderIfCrawler
{
    public function handle(Request $request, Closure $next)
    {
        $userAgent = $request->header('User-Agent');
        $isCrawler = preg_match('/bot|crawler|spider|slurp|facebookexternalhit|bingbot|googlebot/i', $userAgent);

        if ($request->isMethod('GET') && !$request->is('api/*') && $isCrawler) {
            try {
                $client = new Client();
                $response = $client->get('https://service.prerender.io/' . $request->fullUrl(), [
                    'headers' => [
                        'X-Prerender-Token' => env('PRERENDER_TOKEN'),
                    ]
                ]);

                return response($response->getBody(), $response->getStatusCode())
                    ->header('Content-Type', 'text/html');
            } catch (\Exception $e) {
                return $next($request);
            }
        }

        return $next($request);
    }
}
