<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\PageClick;
use Illuminate\Support\Carbon;

class PageClickSeeder extends Seeder
{
    /**
     * Jalankan seeder.
     */
    public function run(): void
    {
        $pages = [
            [
                'page_name' => 'home page',
                'url' => '/',
                'page_click' => 0,
            ],
            [
                'page_name' => 'motorcycle product',
                'url' => '/products/motorcycles',
                'page_click' => 0,
            ],
            [
                'page_name' => 'motorcycle product detail',
                'url' => '/products/motorcycles/detail',
                'page_click' => 0,
            ],
            [
                'page_name' => 'commodity product',
                'url' => '/commodity',
                'page_click' => 0,
            ],
            [
                'page_name' => 'about us',
                'url' => '/about-us',
                'page_click' => 0,
            ],
            [
                'page_name' => 'gallery',
                'url' => '/gallery',
                'page_click' => 0,
            ],
        ];

        foreach ($pages as $page) {
            PageClick::updateOrCreate(
                ['page_name' => $page['page_name']],
                $page
            );
        }
    }
}
