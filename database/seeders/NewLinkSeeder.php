<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Link;

class NewLinkSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $links = [
            [
                'platform_name' => 'GoogleMaps',
                'url' => 'https://www.google.com/maps',
                'special_code' => 'gmap',
                'additional_parameter' => '-7.73921433474684, 110.43359607061397',
                'is_show' => true,
            ]
        ];

        foreach ($links as $link) {
            Link::updateOrCreate(
                ['platform_name' => $link['platform_name']],
                $link
            );
        }
    }
}
