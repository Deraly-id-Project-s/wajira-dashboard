<?php

use Exception;
use App\Models\PageClick;

if (!function_exists('pageClickTracker')) {
    function pageClickTracker(string $url): bool
    {
        $page = PageClick::where('url', $url)->first();
        try {
            $page->page_click += 1;
            $page->save();

            return true;
        } catch (Exception $err) {
            return false;   
        }
    }
}