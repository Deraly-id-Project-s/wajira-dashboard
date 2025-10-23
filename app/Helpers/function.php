<?php

use App\Models\PageClick;
use App\Models\PageVisitor;
use Illuminate\Support\Facades\Log;

if (!function_exists('pageClickTracker')) {
    function pageClickTracker(string $url): bool
    {
        $page = PageClick::where('url', $url)->first();
        try {
            $page->page_click += 1;
            $page->save();

            return true;
        } catch (\Exception $err) {
            return false;
        }
    }
}

if (!function_exists('pageVisitor')) {
    function pageVisitor(
        string $session_id,
        string $ip_address,
        string $user_agent,
        string $platform,
        string $country,
        string $url_visited = '/',
        ?string $referrer = null
    ): bool {
        $visitor = PageVisitor::CheckHost($ip_address, $session_id)->last_accessed_at ?? null;

        try {
            $visitor_data = new PageVisitor;
            $visitor_data->session_id = $session_id;
            $visitor_data->ip_address = $ip_address;
            $visitor_data->user_agent = $user_agent;
            $visitor_data->platform = $platform;
            $visitor_data->url_visited = $url_visited;
            $visitor_data->referrer = $referrer;
            $visitor_data->country = $country;
            $visitor_data->last_accessed_at = $visitor ?? now();

            $visitor_data->save();
        } catch (\Exception $err) {
            Log::info('Page Visitor Error: ' . $err->getMessage());
        }

        return true;
    }
}
