<?php

namespace Database\Seeders;

use App\Models\Link;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class LinkSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $links = [
            [
                'platform_name' => 'WhatsApp',
                'url' => '08211919192',
                'is_show' => true,
            ],
            [
                'platform_name' => 'Instagram',
                'url' => 'https://www.instagram.com/',
                'is_show' => true,
            ],
            [
                'platform_name' => 'TikTok',
                'url' => 'https://www.tiktok.com/',
                'is_show' => true,
            ],
            [
                'platform_name' => 'YouTube',
                'url' => 'https://www.youtube.com/',
                'is_show' => true,
            ],
            [
                'platform_name' => 'Facebook',
                'url' => 'https://www.facebook.com/',
                'is_show' => false,
            ],
        ];

        foreach ($links as $link) {
            Link::updateOrCreate(
                ['platform_name' => $link['platform_name']],
                $link
            );
        }
    }
}
