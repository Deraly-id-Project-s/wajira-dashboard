<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\PageVisitor;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class PageVisitorSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('page_visitors')->truncate();

        for ($i = 0; $i < 30; $i++) {
            $date = now()->subDays($i);

            $visitorCount = rand(5, 100);

            for ($j = 0; $j < $visitorCount; $j++) {
                PageVisitor::create([
                    'session_id' => Str::uuid(),
                    'ip_address' => fake()->ipv4(),
                    'user_agent' => fake()->userAgent(),
                    'platform' => fake()->randomElement(['Windows', 'Linux', 'MacOS', 'Android', 'iOS']),
                    'url_visited' => fake()->url(),
                    'referrer' => fake()->url(),
                    'country' => fake()->country(),
                    'last_accessed_at' => null,
                    'created_at' => $date->setTime(rand(0, 23), rand(0, 59), rand(0, 59)),
                    'updated_at' => $date,
                ]);
            }
        }
    }
}
